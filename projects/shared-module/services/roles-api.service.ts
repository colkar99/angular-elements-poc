import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { ConfigurationService } from "../services/configuration.service";
import { Role } from "../models/role.model";
import { PaginationResponse } from "../utils/types/types";
import { getPaginationHeader } from "../utils/helper-functions/helper-functions";

@Injectable({
  providedIn: "root",
})
export class RolesApiService {
  public apiUrl: string;
  public prmOneUrl: string;
  isLoading$ = new Subject<boolean>();
  constructor(
    private http: HttpClient,
    private configurationService: ConfigurationService
  ) {
    this.apiUrl = this.configurationService.getChannelManagerBaseUrl();
    this.prmOneUrl = this.configurationService.getPrmOneBaseUrl();
  }

  getAllRoles = (params: PaginationResponse): Observable<Array<Role>> =>
    this.http.get<Array<Role>>(`${this.prmOneUrl}/api/roles`, {
      params: getPaginationHeader(params),
    });
}
