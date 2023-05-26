import { NotFoundComponent } from 'projects/shared-module/ui-components/not-found/not-found.component';
import { DevEnvironmentGuard } from 'projects/shared-module/infrastructure/dev-environment.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { prop } from 'ramda';
import { AppComponent } from './app.component';
import { DevPotalComponent } from './dev-portal/dev-portal.component';
import { ClaimTypeBaseComponent } from './feature/claim-type-base/claim-type.component';

const routes: Routes = [
  {
    path: 'dev-portal',
    component: DevPotalComponent,
    canActivate: [DevEnvironmentGuard],
  },
  // {
  //     path: 'Claims',
  //     loadChildren: () =>
  //         import('./feature/claim-builder/claim-builder.module').then(
  //             prop('ClaimBuilderModule')
  //         ),
  // },
  // Lazy Load Feature Module
  // {
  //     path: 'rules-engine',
  //     loadChildren: () =>
  //         import('./feature/rules-engine/rules-engine.module').then(
  //             prop('RulesEngineModule')
  //         ),
  // },
  // {
  //     path: 'caps',
  //     loadChildren: () =>
  //         import('./feature/caps/caps.module').then(prop('CapsModule')),
  // },
  //   {
  //     path: 'claim-type',
  //     loadChildren: () =>
  //       import('./feature/claim-type-base/claim-type-base.module').then(
  //         (m) => m.ClaimTypeBaseModule
  //       ),
  //   },
  {
    path: 'claim-type',
    component: ClaimTypeBaseComponent,
  },
  // {
  //     path: 'top-achievers-promotion',
  //     loadChildren: () =>
  //         import('./feature/tac/tac.module').then(prop('TacModule')),
  // },

  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
