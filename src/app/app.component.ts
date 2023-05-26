import {
  Component,
  OnInit,
  ViewEncapsulation,
  ElementRef,
  isDevMode,
} from '@angular/core';
import { Router } from '@angular/router';

import { ThemeService } from 'projects/shared-module/services/theme-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AppComponent implements OnInit {
  title = 'ChannelManager';

  constructor(
    private elementRef: ElementRef,
    private themeService: ThemeService // private router: Router
  ) {}

  ngOnInit(): void {
    const sheet: CSSStyleSheet = new CSSStyleSheet();
    (<any>sheet).replaceSync(this.themeService.theme);

    //Tac theme inject in the root component////
    const tacTheme: CSSStyleSheet = new CSSStyleSheet();
    (<any>tacTheme).replaceSync(this.themeService.tac_1);
    const shadowRoot: any = this.elementRef.nativeElement.shadowRoot;

    shadowRoot.adoptedStyleSheets = [sheet, tacTheme];
    if (isDevMode()) {
      // this.router.navigate(['/dev-portal']);
    }
  }
}
