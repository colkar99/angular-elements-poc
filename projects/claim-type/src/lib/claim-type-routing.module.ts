import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Custom imports
import { ClaimTypeBuilderComponent } from './claim-type-builder/claim-type-builder.component';
import { ClaimTypeDashboardComponent } from './claim-type-dashboard/claim-type-dashboard.component';
import { ClaimTypeComponent } from './claim-type.component';

const routes: Routes = [
  {
    path: 'claim-type',
    children: [
      {
        path: 'dashboard',
        component: ClaimTypeDashboardComponent,
      },
      {
        path: ':type',
        component: ClaimTypeBuilderComponent,
      },
      {
        path: ':type/:id',
        component: ClaimTypeBuilderComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class ClaimTypeRoutingModule {}
