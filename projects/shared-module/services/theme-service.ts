import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public theme: string = '';
  public tac_1: string = '';

  constructor(
    private httpClient: HttpClient,
    private configurationService: ConfigurationService
  ) {}

  getTheme(): Promise<boolean> {
    let customThemePath = isDevMode()
      ? `/client-themes/${this.configurationService.getClientThemeName()}.css`
      : `/scripts/libs/client-themes/${this.configurationService.getClientThemeName()}.css`;
    return new Promise<boolean>((resolve) => {
      this.httpClient
        .get(customThemePath, { responseType: 'text' })
        .subscribe({
          next: (response: string) => {
            this.theme = response;
          },
          error: () => {
            this.theme = '';
          },
        })
        .add(() => resolve(true));
    });
  }
}
