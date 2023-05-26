import { WindowService } from "../services/window.service";
import { Injectable } from "@angular/core";
import { ConfigurationService } from "./configuration.service";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  constructor(
    private windowService: WindowService,
    private configurationService: ConfigurationService
  ) {}

  claimHistoryRoute(): string {
    return `${this.configurationService.getChannelManagerBaseUrl()}/${this.windowService.getClaimHistoryRelativeRoute()}`;
  }
}
