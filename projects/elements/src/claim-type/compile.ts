import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ClaimTypeElementModule } from './claim-type.module';

enableProdMode();

platformBrowserDynamic()
  .bootstrapModule(ClaimTypeElementModule)
  .catch((err) => console.error(err));
