import { SharedModule } from 'projects/shared-module/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkStepperModule } from '@angular/cdk/stepper';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';

import { MaterialModule } from 'projects/material-module/material.module';
import { APP_BASE_HREF } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
// import { DevPortalComponent } from './dev-portal/dev-portal.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

// import { RulesEngineModule } from './feature/rules-engine/rules-engine.module';
// import { NotFoundComponent } from './not-found/not-found.component';
import { ThemeService } from 'projects/shared-module/services/theme-service';
import { ClaimBuilderModule } from 'projects/claim-builder/src/public-api';
import { ClaimTypeModule } from 'projects/claim-type/src/public-api';
import { AppRoutingModule } from './app-routing.module';
import { DevPotalComponent } from './dev-portal/dev-portal.component';
import { ClaimTypeBaseComponent } from './feature/claim-type-base/claim-type.component';

// function initializeThemeTac(
//     themeService: ThemeService
// ): () => Promise<boolean> {
//     return () => themeService.getTacTheme();
// }
@NgModule({
  declarations: [AppComponent, DevPotalComponent, ClaimTypeBaseComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    RouterModule,

    // AppRoutingModule,
    CdkStepperModule,
    NoopAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    MatDatepickerModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    ClaimBuilderModule,
    ClaimTypeModule,
  ],
  providers: [
    // {
    //     provide: APP_INITIALIZER,
    //     useFactory: initializeThemeTac,
    //     deps: [ThemeService],
    //     multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

// Mitigation to the Breaking Angular 10 Change where ModuleWithProviders now require a generic type
declare module '@angular/core' {
  interface ModuleWithProviders<T = any> {
    ngModule: Type<T>;
    providers?: Provider[];
  }
}
