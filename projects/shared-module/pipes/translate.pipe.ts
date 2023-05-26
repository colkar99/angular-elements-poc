import { ConfigurationService } from "projects/shared-module/services/configuration.service";
import { Pipe, PipeTransform, Injectable } from "@angular/core";
import { Mapping } from "../utils/types/types";

@Pipe({
  name: "translate",
  pure: false,
})
@Injectable({
  providedIn: "root",
})
export class TranslatePipe implements PipeTransform {
  public labels: Mapping<string>;

  constructor(private configurationService: ConfigurationService) {
    this.labels = this.configurationService.getLabels();
  }

  transform(key: any, args?: any): any {
    return this.labels && this.labels[key] != undefined
      ? this.labels[key]
      : key;
  }
}
