import { Component, OnInit, ViewChild } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { map, switchMap, share } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { Sort } from '@angular/material/sort';

import { GlobalToastService } from '../../../../shared-module/services/global-toast.service';
import { ClaimTypeApiService } from '../claim-type-api.service';
import { ClaimType } from '../utils/claimType';
import { Status } from '../utils/enum';
import { TranslatePipe } from '../../../../shared-module/pipes/translate.pipe';
import { sortingDirectionHanlder } from '../../../../shared-module/utils/helper-functions/helper-functions';
import {
  PaginationResponse,
  PagedCollection,
} from '../../../../shared-module/utils/types/types';

@Component({
  selector: 'app-claim-type-list',
  templateUrl: './claim-type-list.component.html',
  styleUrls: ['./claim-type-list.component.scss'],
})
export class ClaimTypeListComponent implements OnInit {
  @BlockUI('block-all') blockUI: NgBlockUI;
  pageSize: number = 10;
  @ViewChild(NgbPagination) paginator: NgbPagination;
  claimTypes$: Observable<PagedCollection<ClaimType>>;
  private pageNumberSubject$ = new BehaviorSubject<number>(1);
  errorMessage: string = '';
  sortingProperty: string = '';

  sortData(sort: Sort) {
    this.sortingProperty = sortingDirectionHanlder(sort);
    this.loadClaimTypes(1);
  }

  public get Status(): typeof Status {
    return Status;
  }

  constructor(
    private apiService: ClaimTypeApiService,
    private globalToasterService: GlobalToastService,
    private translationPipe: TranslatePipe
  ) {}

  ngOnInit(): void {
    this.blockUI.start();
    this.claimTypes$ = this.pageNumberSubject$.pipe(
      switchMap((pageNumber) => {
        let paggedData: PaginationResponse = {
          Page: pageNumber,
          PageSize: this.pageSize,
          Sorts: this.sortingProperty,
        };
        return this.apiService.getClaimTypes(paggedData).pipe(
          map((response: PagedCollection<ClaimType>) => {
            this.blockUI.stop();
            return response;
          })
        );
      }),
      share()
    );
  }

  pageSizeChanged = (pageSize: string) => {
    this.pageSize = +pageSize;
    this.loadClaimTypes(1);
  };

  loadClaimTypes = (pageNumber: number) =>
    this.pageNumberSubject$.next(pageNumber);
  //Load all Claim Type

  //Delete Claim Type Method
  deleteClaimType(claimType: ClaimType) {
    this.blockUI.start();
    this.apiService
      .deleteClaimType(claimType.id)
      .subscribe({
        next: (response) => {
          this.globalToasterService.show(
            this.translationPipe.transform('Claimtype.DeletedSuccessfully')
          );
          this.loadClaimTypes(this.paginator.page);
        },
        error: (errorMessage) => (this.errorMessage = errorMessage),
      })
      .add(() => this.blockUI.stop());
  }
}
