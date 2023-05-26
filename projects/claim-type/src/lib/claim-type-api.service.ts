import {
  HttpClient,
  HttpHeaderResponse,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ConfigurationService } from '../../../shared-module/services/configuration.service';
import { ClaimType } from './utils/claimType';
import { RouteUrls } from './utils/routeUrl';
import { TranslatePipe } from '../../../shared-module/pipes/translate.pipe';
import {
  PaginationResponse,
  PagedCollection,
} from '../../../shared-module/utils/types/types';
import { getPaginationHeader } from '../../../shared-module/utils/helper-functions/helper-functions';

@Injectable({
  providedIn: 'root',
})
export class ClaimTypeApiService {
  baseUrl: string = '';

  constructor(
    private http: HttpClient,
    private configuration: ConfigurationService,
    private translationPipe: TranslatePipe
  ) {
    this.baseUrl = this.configuration.getPrmOneBaseUrl();
  }

  //Create Claim type
  createClaimType(data: ClaimType): Observable<HttpHeaderResponse | any> {
    return this.http
      .post<ClaimType>(`${this.baseUrl}${RouteUrls.createClaim}`, data, {
        observe: 'response',
      })
      .pipe(
        catchError((error) => {
          return throwError(this.getServerErrorMessage(error));
        })
      );
  }

  //Edit Claim type by ID
  editClaimType(
    data: ClaimType,
    id: number
  ): Observable<HttpHeaderResponse | any> {
    return this.http
      .put<ClaimType>(`${this.baseUrl}${RouteUrls.editClaimType}${id}`, data, {
        observe: 'response',
      })
      .pipe(
        catchError((error) => {
          return throwError(this.getServerErrorMessage(error));
        })
      );
  }

  //Get Claim type by ID
  getClaimTypeById(id: number): Observable<ClaimType> {
    return this.http
      .get<ClaimType>(`${this.baseUrl}${RouteUrls.getClaimTypeById}${id}`)
      .pipe(
        catchError((error) => {
          return throwError(this.getServerErrorMessage(error));
        })
      );
  }

  //Get all claim types
  getClaimTypes(
    claimsTypePaginated: PaginationResponse
  ): Observable<PagedCollection<ClaimType>> {
    return this.http
      .get<ClaimType[]>(`${this.baseUrl}${RouteUrls.getAllClaimTypes}`, {
        observe: 'response',
        params: getPaginationHeader(claimsTypePaginated),
      })
      .pipe(
        map((res) => ({
          data: res.body,
          pagination: JSON.parse(
            res.headers.get('X-Pagination')
          ) as PaginationResponse,
        }))
      );
  }

  //Delete claim type service
  deleteClaimType(id: number): Observable<HttpHeaderResponse | any> {
    return this.http
      .delete(`${this.baseUrl}${RouteUrls.deleteClaimType}${id}`, {
        observe: 'response',
      })
      .pipe(
        catchError((error) => {
          return throwError(this.getServerErrorMessage(error));
        })
      );
  }

  //Global Error handler for Claim type module
  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 400: {
        return this.translationPipe.transform('Claimtype.ErrorSaving');
      }
      case 403: {
        return this.translationPipe.transform('Common.NoAccess');
      }
      case 500: {
        return this.translationPipe.transform('ClaimType.InternalServerError');
      }
      case 409: {
        return this.translationPipe.transform(
          'ClaimType.AtLeastOneActiveRecordViolation'
        );
      }
      default: {
        return this.translationPipe.transform('ClaimType.DefaultError');
      }
    }
  }
}
