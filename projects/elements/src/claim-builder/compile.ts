import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ClaimElementModule } from './claim-builder.module';

enableProdMode();

platformBrowserDynamic()
  .bootstrapModule(ClaimElementModule)
  .catch((err) => console.error(err));
