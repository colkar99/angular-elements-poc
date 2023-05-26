import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DevPortalApiService {
  readonly CM_LOGON_URL_ENDPOINT = `login?isAdmin=1`;
  readonly PRMONE_LOGON_URL_ENDPOINT = `api/identity/token`;

  constructor(private http: HttpClient) {}

  channelManagerLogon$(): Observable<any | HttpErrorResponse> {
    const formData = new FormData();
    formData.append('Email', environment.apiUsername);
    formData.append('Password', environment.apiPassword);
    formData.append('RememberMe', 'false');

    return this.http.post(
      `${environment.baseUrl}/${this.CM_LOGON_URL_ENDPOINT}`,
      formData,
      {
        withCredentials: true,
        responseType: 'text',
        observe: 'response',
      }
    );
  }

  prmOneLogon$(): Observable<any | HttpErrorResponse> {
    return this.http.post(
      `${environment.prmOneUrl}/${this.PRMONE_LOGON_URL_ENDPOINT}`,
      {
        email: environment.apiUsername,
        password: environment.apiPassword,
      },
      {
        observe: 'response',
      }
    );
  }
}
