import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ElementModule } from '../abstract/element.module';
import {
  ClaimBuilderComponent,
  ClaimBuilderModule,
} from '../../../claim-builder/src/public-api';

@NgModule({
  imports: [BrowserModule, ClaimBuilderModule],
  entryComponents: [ClaimBuilderComponent],
})
export class ClaimElementModule extends ElementModule {
  constructor(injector: Injector) {
    super(injector, ClaimBuilderComponent, 'claim-builder');
  }
}
