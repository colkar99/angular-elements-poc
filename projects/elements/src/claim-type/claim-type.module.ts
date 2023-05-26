import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ElementModule } from '../abstract/element.module';
import {
  ClaimTypeComponent,
  ClaimTypeModule,
} from '../../../claim-type/src/public-api';

@NgModule({
  imports: [BrowserModule, ClaimTypeModule],
  entryComponents: [ClaimTypeComponent],
})
export class ClaimTypeElementModule extends ElementModule {
  constructor(injector: Injector) {
    super(injector, ClaimTypeComponent, 'claim-type');
  }
}
