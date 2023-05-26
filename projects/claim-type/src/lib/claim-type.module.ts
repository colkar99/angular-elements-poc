import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatRadioModule } from '@angular/material/radio';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';

//Custom
import { ClaimTypeDashboardComponent } from './claim-type-dashboard/claim-type-dashboard.component';
import { ClaimTypeListComponent } from './claim-type-list/claim-type-list.component';
import { ClaimTypeBuilderComponent } from './claim-type-builder/claim-type-builder.component';
import { ClaimTypeRoutingModule } from './claim-type-routing.module';
import { SharedModule } from '../../../shared-module/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslatePipe } from '../../../shared-module/pipes/translate.pipe';
import { ClaimTypeComponent } from './claim-type.component';

@NgModule({
  declarations: [
    ClaimTypeComponent,
    ClaimTypeDashboardComponent,
    ClaimTypeListComponent,
    ClaimTypeBuilderComponent,
  ],
  imports: [
    CommonModule,
    ClaimTypeRoutingModule,
    SharedModule,
    NgbModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSortModule,
    MatAutocompleteModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
  ],
  exports: [ClaimTypeComponent],
})
export class ClaimTypeModule {}
