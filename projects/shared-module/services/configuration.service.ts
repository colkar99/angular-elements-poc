import { environment } from "src/environments/environment";
import { WindowService } from "../services/window.service";
import * as moment from "moment-timezone";
import { Injectable, isDevMode } from "@angular/core";
import { Mapping } from "../utils/types/types";

@Injectable({
  providedIn: "root",
})
export class ConfigurationService {
  constructor(private windowService: WindowService) {}

  getChannelManagerBaseUrl = (): string => {
    if (isDevMode()) {
      return environment.baseUrl;
    } else {
      return this.windowService.getChannelManagerBaseUrl();
    }
  };

  getPrmOneBaseUrl = (): string => {
    if (isDevMode()) {
      return environment.prmOneUrl;
    } else {
      return this.windowService.getPrmOneBaseUrl();
    }
  };

  getTimeZone = (): string => {
    let zone = moment.tz(moment.tz.guess()).format("z");
    return isNaN(+zone) ? `(${zone})` : `(GMT${zone.substring(0, 1)}${+zone})`;
  };

  getClientThemeName = (): string => {
    if (isDevMode()) {
      return environment.clientThemeName;
    } else {
      return this.windowService.getClientThemeName();
    }
  };

  getLabels = (): Mapping<string> => {
    return this.windowService.getLabels();
  };
}
