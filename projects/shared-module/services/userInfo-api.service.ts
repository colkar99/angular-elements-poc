import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";
// import { Leaderboard } from 'src/app/feature/tac/utils/types';
import { USERINFO_URL_ENDPOINT } from "../constants/apiUrls.constants";
import { User, UserAdapter } from "../models/user-info.model";
import { PagedCollection, PaginationResponse } from "../utils/types/types";
import { ConfigurationService } from "./configuration.service";
import { getPaginationHeader } from "../utils/helper-functions/helper-functions";
@Injectable({
  providedIn: "root",
})
export class UserInfoApiService {
  public apiUrl: string;
  public prmOneUrl: string;

  constructor(
    private http: HttpClient,
    private userAdapter: UserAdapter,
    private configurationService: ConfigurationService
  ) {
    this.apiUrl = this.configurationService.getChannelManagerBaseUrl();
    this.prmOneUrl = this.configurationService.getPrmOneBaseUrl();
  }

  getUserInfo(): Observable<User> {
    return this.http
      .get(`${this.apiUrl}/${USERINFO_URL_ENDPOINT}`)
      .pipe(map((data: any) => this.userAdapter.adapt(data)));
  }

  getTacUserDetails = (userId: number): Observable<any> =>
    this.http
      .get(`${this.prmOneUrl}/${USERINFO_URL_ENDPOINT}/${userId}/tac-data`)
      .pipe(map((d) => d as any));

  getLeaderboardData(
    userId: number,
    paginationOptions: PaginationResponse
  ): Observable<PagedCollection<any>> {
    return this.http
      .get<any[]>(
        `${this.prmOneUrl}/${USERINFO_URL_ENDPOINT}/${userId}/tac-leaderboard`,
        { observe: "response", params: getPaginationHeader(paginationOptions) }
      )
      .pipe(
        map((res) => ({
          data: res.body,
          pagination: JSON.parse(
            res.headers.get("X-Pagination")
          ) as PaginationResponse,
        }))
      );
  }
}
