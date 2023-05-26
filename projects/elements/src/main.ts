import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ClaimElementModule } from './claim-builder/claim-builder.module';
// import { environment } from './environments/environment';

// if (environment.production) {
//   enableProdMode();
// }

declare var __webpack_public_path__: string;
__webpack_public_path__ = 'valueFormerlyAssignedUsing_deployUrl';

enableProdMode();

platformBrowserDynamic()
  .bootstrapModule(ClaimElementModule)
  .catch((err) => console.error(err));
