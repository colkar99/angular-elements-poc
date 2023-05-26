import { HttpHeaderResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';

import { GlobalToastService } from '../../../../shared-module/services/global-toast.service';
import { ClaimTypeApiService } from '../claim-type-api.service';
import { ClaimType } from '../utils/claimType';
import { ClaimTypeSaveMethods, Page } from '../utils/enum';
import { TranslatePipe } from '../../../../shared-module/pipes/translate.pipe';
import {
  Role,
  ROLES_FILTER_DATA_CLAIMTYPE,
} from '../../../../shared-module/models/role.model';
import { PaginationResponse } from '../../../../shared-module/utils/types/types';
import { RolesApiService } from '../../../../shared-module/services/roles-api.service';
import { stringFormat } from '../../../../shared-module/utils/helper-functions/helper-functions';

@Component({
  selector: 'app-claim-type-builder',
  templateUrl: './claim-type-builder.component.html',
  styleUrls: ['./claim-type-builder.component.scss'],
})
export class ClaimTypeBuilderComponent implements OnInit {
  @ViewChild('rolesInput') rolesInput: ElementRef<HTMLInputElement>;
  @BlockUI('block-all') blockUI: NgBlockUI;
  claimTypeForm: FormGroup;
  errorMessage: string = '';
  claimType: ClaimType;
  id: number;
  pageType: number;
  currentStatus: number;
  allRoles: Role[] = [];
  filteredRoles: Role[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  isLoading: boolean = false;
  searchTerms = new Subject<string>();

  public get Page(): typeof Page {
    return Page;
  }

  public get ClaimTypeSaveMethods(): typeof ClaimTypeSaveMethods {
    return ClaimTypeSaveMethods;
  }

  constructor(
    private apiService: ClaimTypeApiService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private globalToasterService: GlobalToastService,
    private translationPipe: TranslatePipe,
    private rolesApiService: RolesApiService
  ) {}
  title: string = this.translationPipe.transform('Claimtype.CreateClaimType');
  public get selectedRoles(): Array<number> {
    return <Array<number>>this.claimTypeForm.get('roles').value;
  }
  ngOnInit(): void {
    this.pageType =
      this.activatedRoute.snapshot.params['type'] == 'create'
        ? Page.Create
        : Page.Edit;
    this.initializeClaimTypeFormGroup();
    if (this.pageType === Page.Edit) {
      this.id = +this.activatedRoute.snapshot.params['id'];
      this.title = this.translationPipe.transform('Claimtype.EditClaimType');
      this.getClaimTypeById(this.id);
    }

    let paggedData: PaginationResponse = { Page: 1, PageSize: 100 };
    // this.rolesApiService.getAllRoles(paggedData).subscribe((roles: Role[]) => this.allRoles = roles)
    this.searchTerms
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map(
          (value) =>
            (paggedData.Filters = stringFormat(
              ROLES_FILTER_DATA_CLAIMTYPE,
              value
            ))
        ),
        switchMap(() => this.rolesApiService.getAllRoles(paggedData))
      )
      .subscribe(
        (data: Role[]) => {
          data.map((role) => this.setAllRoles(role));
          this.filteredRoles = data.filter(
            (role) => !this.selectedRoles.includes(role.id)
          );
          this.isLoading = false;
        },
        (err) => (this.isLoading = false)
      );
  }

  setAllRoles(role: Role) {
    let rolePresent = false;
    this.allRoles.forEach((r) => {
      if (r.id == role.id) rolePresent = true;
    });
    if (!rolePresent) this.allRoles.push(role);
  }
  //Set values to claim form
  setClaimTypeValues() {
    const {
      name,
      status,
      companyValidationOption,
      verticalValidationOption,
      invoiceValidationOption,
      sharingValidationOption,
      skuValidationOption,
      salesManagerBonusValidationOption,
      roles,
      auditable,
    } = this.claimType;
    this.claimTypeForm.patchValue({
      name,
      status,
      companyValidationOption,
      verticalValidationOption,
      invoiceValidationOption,
      sharingValidationOption,
      skuValidationOption,
      salesManagerBonusValidationOption,
      roles,
      auditable,
    });
  }
  //Initialize form during page loading
  initializeClaimTypeFormGroup() {
    this.claimTypeForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(250)]],
      status: [null, Validators.required],
      companyValidationOption: [null, Validators.required],
      verticalValidationOption: [null, Validators.required],
      invoiceValidationOption: [null, Validators.required],
      sharingValidationOption: [null, Validators.required],
      skuValidationOption: [null, Validators.required],
      salesManagerBonusValidationOption: [null, Validators.required],
      roles: [[], Validators.required],
      auditable: [null, Validators.required],
    });
  }

  chipInputBlurred(event: Event): void {
    this.claimTypeForm.get('roles').markAsTouched();
  }

  chipInputChanged(event: InputEvent | any): void {
    this.isLoading = true;
    this.searchTerms.next(event.target?.value);

    this.ensureRoleSuggestionPanelIsVisible();
  }

  roleRemoved(removedRoleId: number): void {
    const index = this.selectedRoles.indexOf(removedRoleId);

    if (index >= 0) {
      let removedRole = this.selectedRoles.splice(index, 1);
      this.allRoles.forEach((role) => {
        if (role.id === removedRole[0]) this.filteredRoles.push(role);
      });
    }

    this.claimTypeForm.get('roles').updateValueAndValidity();
  }

  roleSelected(event: MatAutocompleteSelectedEvent): void {
    this.addRole(event.option.value);
    this.ensureRoleSuggestionPanelIsVisible();
  }

  private ensureRoleSuggestionPanelIsVisible() {
    this.rolesInput.nativeElement.blur();
    setTimeout(() => {
      this.rolesInput.nativeElement.focus();
    }, 0);
  }

  private addRole(value: Role) {
    if (!value) return;

    const existingRole = this.allRoles.find((role) => role.id === value.id);

    if (existingRole != null && !this.selectedRoles.includes(existingRole.id)) {
      this.selectedRoles.push(existingRole.id);
      this.filteredRoles = this.filteredRoles.filter(
        (role) => role.id != existingRole.id
      );

      // Clear the input value
      this.rolesInput.nativeElement!.value = '';

      this.claimTypeForm.get('roles').updateValueAndValidity();
    }
  }

  get formFieldClasses(): any {
    return {
      invalid:
        this.claimTypeForm.get('roles').touched &&
        this.claimTypeForm.get('roles').invalid,
    };
  }

  getRoleById(roleId: number): Role {
    return this.allRoles.find((role) => role.id === roleId);
  }
  //Save button method
  submit(methodType?: number) {
    if (!this.claimTypeForm.valid) {
      this.errorMessage = this.translationPipe.transform(
        'ClaimType.Error.FillRequiredDetails'
      );
      this.claimTypeForm.markAllAsTouched();
      return;
    }
    if (this.pageType === Page.Edit) {
      this.editAction(methodType);
    } else {
      this.createAction(methodType);
    }
  }

  //Create Method
  createAction(methodType: number) {
    this.blockUI.start();

    this.apiService
      .createClaimType(this.claimTypeForm.value)
      .subscribe({
        next: (response: HttpHeaderResponse) => {
          this.errorMessage = '';
          this.globalToasterService.show(
            this.translationPipe.transform('Claimtype.CreatedSuccessfully')
          );
          if (methodType === ClaimTypeSaveMethods.saveAndContinue) {
            this.setClaimTypeIdFromHeader(response);
          } else if (methodType === ClaimTypeSaveMethods.saveAndNew) {
            this.initializeClaimTypeFormGroup();
            this.claimType = null;
          } else if (methodType === ClaimTypeSaveMethods.saveAndClose) {
            this.route.navigate(['/claim-type/dashboard'], {
              relativeTo: this.activatedRoute,
            });
          }
        },
        error: (errorMessage) => (this.errorMessage = errorMessage),
      })
      .add(() => this.blockUI.stop());
  }

  //Edit method
  editAction(methodType: number) {
    this.blockUI.start();
    this.apiService
      .editClaimType(this.claimTypeForm.getRawValue(), this.claimType.id)
      .subscribe({
        next: (response: HttpHeaderResponse) => {
          this.errorMessage = '';
          this.globalToasterService.show(
            this.translationPipe.transform('Claimtype.UpdatedSuccessfully')
          );
          if (methodType === ClaimTypeSaveMethods.saveAndContinue) {
            this.getClaimTypeById(this.id);
          }
          if (methodType === ClaimTypeSaveMethods.saveAndNew) {
            this.route.navigate(['/claim-type/create'], {
              relativeTo: this.activatedRoute,
            });
          } else if (methodType === ClaimTypeSaveMethods.saveAndClose) {
            this.route.navigate(['/claim-type/dashboard'], {
              relativeTo: this.activatedRoute,
            });
          }
        },
        error: (errorMessage) => (this.errorMessage = errorMessage),
      })
      .add(() => this.blockUI.stop());
  }

  //Used to get claim type ID From Response Header
  setClaimTypeIdFromHeader(header: HttpHeaderResponse) {
    let location = header.headers.get('location').split('/');
    let id = +location[location.length - 1];
    this.route.navigate([`/claim-type/edit/${id}`], {
      relativeTo: this.activatedRoute,
    });
  }

  //Used to get claim type by ID
  getClaimTypeById(id: number) {
    this.blockUI.start();
    this.apiService
      .getClaimTypeById(id)
      .subscribe({
        next: (response: ClaimType) => {
          this.claimType = { ...response };
          this.claimType.roles = this.claimType?.roles.map(
            (role: any) => role.id
          );
          response.roles.map((role: any) => this.setAllRoles(role));
          this.currentStatus = response.status;
          this.setClaimTypeValues();
          if (this.pageType === Page.Edit && !this.claimType.isCustom) {
            this.disableNonStatusFields();
          }
        },
        error: (errorMessage) => (this.errorMessage = errorMessage),
      })
      .add(() => this.blockUI.stop());
  }

  //Disabled field method for non custom claim types and details view
  disableNonStatusFields() {
    for (let field in this.claimTypeForm.value) {
      if (field === 'status') continue;
      this.claimTypeForm.controls[field].disable();
    }
  }

  //Delete Claim Type Method
  deleteClaimType() {
    this.blockUI.start();
    this.apiService
      .deleteClaimType(this.claimType.id)
      .subscribe({
        next: (response: HttpHeaderResponse) => {
          this.globalToasterService.show(
            this.translationPipe.transform('Claimtype.DeletedSuccessfully')
          );
          this.route.navigate(['/claim-type/dashboard'], {
            relativeTo: this.activatedRoute,
          });
        },
        error: (errorMessage) => (this.errorMessage = errorMessage),
      })
      .add(() => this.blockUI.stop());
  }

  //Go back action for
  goBack() {
    this.route.navigate(['/claim-type/dashboard'], {
      relativeTo: this.activatedRoute,
    });
  }
}
