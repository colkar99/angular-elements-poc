import { MapSlicePipe } from './pipes/map-slice.pipe';
import { RelativeAssetPipe } from './pipes/relative-asset.pipe';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalBuilderComponent } from './ui-components/modal-builder/modal-builder.component';
import { CardDeckComponent } from './ui-components/card-deck/card-deck.component';
import { CardComponent } from './ui-components/card/card.component';
import { RemoveFileExtension } from './pipes/remove-file-extension.pipe';
import { IsMomentFormControlValid } from './pipes/invoice-info-form-date-validation-pipe';
import { WindowService } from './services/window.service';
import { MessageDialogModalComponent } from './ui-components/message-dialog-modal/message-dialog-modal.component';
import { ConfirmDialogModalComponent } from './ui-components/confirm-dialog-modal/confirm-dialog-modal.component';
import { GlobalToastsComponent } from './ui-components/global-toasts/global-toasts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BlockUIModule } from 'ng-block-ui';
import { CommonService } from './services/common.service';
import { TranslatePipe } from './pipes/translate.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { FileUploadComponent } from './ui-components/file-upload/file-upload.component';
import {
  DEFAULT_TIMEOUT,
  HttpRequestInterceptor,
} from 'projects/shared-module/infrastructure/http-request-interceptor';
import { ThemeService } from 'projects/shared-module/services/theme-service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

function initializeTheme(themeService: ThemeService): () => Promise<boolean> {
  return () => themeService.getTheme();
}
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { NotFoundComponent } from './ui-components/not-found/not-found.component';
@NgModule({
  declarations: [
    ModalBuilderComponent,
    CardDeckComponent,
    CardComponent,
    RemoveFileExtension,
    IsMomentFormControlValid,
    RelativeAssetPipe,
    MapSlicePipe,
    MessageDialogModalComponent,
    ConfirmDialogModalComponent,
    GlobalToastsComponent,
    TranslatePipe,
    TruncatePipe,
    FileUploadComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    BlockUIModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [
    ModalBuilderComponent,
    CardDeckComponent,
    CardComponent,
    RemoveFileExtension,
    IsMomentFormControlValid,
    RelativeAssetPipe,
    MapSlicePipe,
    MessageDialogModalComponent,
    ConfirmDialogModalComponent,
    GlobalToastsComponent,
    BlockUIModule,
    TranslatePipe,
    TruncatePipe,
    FileUploadComponent,
    NotFoundComponent,
  ],
  providers: [
    WindowService,
    CommonService,
    { provide: Window, useValue: window },
    TranslatePipe,
    {
      provide: APP_BASE_HREF,
      useValue: '/',
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
    { provide: DEFAULT_TIMEOUT, useValue: 60000 },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeTheme,
      deps: [ThemeService],
      multi: true,
    },
  ],
})
export class SharedModule {}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
