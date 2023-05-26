import { Inject, Injectable, InjectionToken, isDevMode } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEventType,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, timeout } from 'rxjs/operators';
import { ConfigurationService } from 'projects/shared-module/services/configuration.service';

export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    @Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number,
    private configurationService: ConfigurationService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (isDevMode()) {
      // Inject With Credentials into the request; required by XHR requests to a different domain in order to enable cookies.
      req = req.clone({
        withCredentials: true,
      });
    }

    if (req.url.startsWith(this.configurationService.getPrmOneBaseUrl())) {
      let newHeaders = req.headers.set('X-Version', environment.prmOneVersion);

      const accessToken = localStorage.getItem('prmone-access-token');
      if (accessToken != null) {
        newHeaders = newHeaders.set('Authorization', `Bearer ${accessToken}`);
      }

      req = req.clone({
        headers: newHeaders,
      });
    }

    const timeoutValue = req.headers.get('timeout') || this.defaultTimeout;
    const timeoutValueNumeric = Number(timeoutValue);

    return next.handle(req).pipe(
      timeout(timeoutValueNumeric),
      tap({
        next: (response: HttpEvent<any>) => {
          if (response.type !== HttpEventType.Response) return;

          const newAccessToken = response.headers.get('X-ACCESS-TOKEN');

          if (newAccessToken != null) {
            localStorage.setItem('prmone-access-token', newAccessToken);
          }
        },
      })
    );
  }
}
