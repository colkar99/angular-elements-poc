import {
  Component,
  isDevMode,
  OnInit,
  ViewEncapsulation,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { finalize } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { WindowService } from 'projects/shared-module/services/window.service';
import { ThemeService } from 'projects/shared-module/services/theme-service';
import { DevPortalApiService } from '../services/dev-portal.service';

enum ClaimBuilderFormKeys {
  ClaimId = 1,
  LoadClaim,
  LoadSummary,
  SkuQuantityLimit,
  FixedPointMinimumInvoiceDate,
  DaysInPastMinimumInvoiceDateOffset,
  VerticalsEnabled,
  DeliveryDateEnabled,
  IsBulkPartner,
  CapsEnabled,
  GlobeTrotterDefaultLocationId,
  GlobeTrotterEngagementTrackingId,
  GlobeTrotterGameId,
  GlobeTrotterTheme,
  GlobeTrotterTerms,
  MaxShares,
}

type AuthStatus = {
  isAuthenticated: boolean;
  isLoginInProgress: boolean;
};
enum Page {
  DevPortal = 1,
  ClaimType = 2,
}
@Component({
  selector: 'app-dev-portal',
  templateUrl: './dev-portal.component.html',
  styleUrls: ['./dev-portal.component.scss'],
})
export class DevPotalComponent {
  title = 'ChannelManager';
  currentPage: number = Page.DevPortal;
  prmAuthStatus: AuthStatus = {
    isAuthenticated: false,
    isLoginInProgress: false,
  };
  cmAuthStatus: AuthStatus = {
    isAuthenticated: false,
    isLoginInProgress: false,
  };

  claimBuilderFormGroup: FormGroup;
  globeTrotterFormGroup: FormGroup;
  userLoginFormGroup: FormGroup;

  @BlockUI('cm-auth') cmAuthBlockUi: NgBlockUI;
  @BlockUI('prm-auth') prmAuthBlockUi: NgBlockUI;

  constructor(
    private router: Router,
    private windowService: WindowService,
    private elementRef: ElementRef,
    private themeService: ThemeService,
    private fb: FormBuilder,
    private devPortalApiService: DevPortalApiService
  ) {
    this.claimBuilderFormGroup = this.fb.group({
      fixedPointMinimumInvoiceDate: [
        this.windowService.getLocalStorageItem(
          ClaimBuilderFormKeys[
            ClaimBuilderFormKeys.FixedPointMinimumInvoiceDate
          ]
        ),
      ],
      daysInPastMinimumInvoiceDateOffset: [
        this.windowService.getLocalStorageItem(
          ClaimBuilderFormKeys[
            ClaimBuilderFormKeys.DaysInPastMinimumInvoiceDateOffset
          ]
        ),
        Validators.required,
      ],
      skuQuantityLimit: [
        this.windowService.getLocalStorageItem(
          ClaimBuilderFormKeys[ClaimBuilderFormKeys.SkuQuantityLimit]
        ),
        Validators.required,
      ],
      claimId: [
        this.windowService.getLocalStorageItem(
          ClaimBuilderFormKeys[ClaimBuilderFormKeys.ClaimId]
        ),
      ],
      loadExistingClaim: [
        this.windowService.getLocalStorageItem(
          ClaimBuilderFormKeys[ClaimBuilderFormKeys.LoadClaim]
        ) === 'true',
      ],
      loadSummary: [
        this.windowService.getLocalStorageItem(
          ClaimBuilderFormKeys[ClaimBuilderFormKeys.LoadSummary]
        ) === 'true',
      ],

      deliveryDateEnabled: [
        this.windowService.getLocalStorageItem(
          ClaimBuilderFormKeys[ClaimBuilderFormKeys.DeliveryDateEnabled]
        ) === 'true',
      ],
      isBulkPartner: [
        this.windowService.getLocalStorageItem(
          ClaimBuilderFormKeys[ClaimBuilderFormKeys.IsBulkPartner]
        ) === 'true',
      ],
      capsEnabled: [
        this.windowService.getLocalStorageItem(
          ClaimBuilderFormKeys[ClaimBuilderFormKeys.CapsEnabled]
        ) === 'true',
      ],
      maxShares: [
        this.windowService.getLocalStorageItem(
          ClaimBuilderFormKeys[ClaimBuilderFormKeys.MaxShares]
        ),
        Validators.required,
      ],
    });

    this.globeTrotterFormGroup = this.fb.group({
      globeTrotterDefaultLocationId: [
        this.windowService.getLocalStorageItem(
          ClaimBuilderFormKeys[
            ClaimBuilderFormKeys.GlobeTrotterDefaultLocationId
          ]
        ),
        Validators.required,
      ],
      globeTrotterGameId: [
        this.windowService.getLocalStorageItem(
          ClaimBuilderFormKeys[ClaimBuilderFormKeys.GlobeTrotterGameId]
        ),
        Validators.required,
      ],
      globeTrotterEngagementTrackingId: [
        this.windowService.getLocalStorageItem(
          ClaimBuilderFormKeys[
            ClaimBuilderFormKeys.GlobeTrotterEngagementTrackingId
          ]
        ),
        Validators.required,
      ],
      globeTrotterTheme: [
        this.windowService.getLocalStorageItem(
          ClaimBuilderFormKeys[ClaimBuilderFormKeys.GlobeTrotterTheme]
        ),
        Validators.required,
      ],
      globeTrotterTerms: [
        this.windowService.getLocalStorageItem(
          ClaimBuilderFormKeys[ClaimBuilderFormKeys.GlobeTrotterTerms]
        ),
        Validators.required,
      ],
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.loginChannelManager();
    this.loginPrmOne();
  }
  loginChannelManager() {
    this.cmAuthBlockUi.start();
    this.cmAuthStatus.isLoginInProgress = true;
    this.devPortalApiService
      .channelManagerLogon$()
      .pipe(
        finalize(() => {
          this.cmAuthBlockUi.stop();
          this.cmAuthStatus.isLoginInProgress = false;
        })
      )
      .subscribe({
        next: (response: HttpResponse<any>) => {
          this.cmAuthStatus.isAuthenticated = !response.url.includes('/login');
        },
        error: () => {
          this.cmAuthStatus.isAuthenticated = false;
        },
      });
  }

  loginPrmOne() {
    this.prmAuthBlockUi.start();
    this.prmAuthStatus.isLoginInProgress = true;
    this.devPortalApiService
      .prmOneLogon$()
      .pipe(
        finalize(() => {
          this.prmAuthBlockUi.stop();
          this.prmAuthStatus.isLoginInProgress = false;
        })
      )
      .subscribe({
        next: (response: HttpResponse<any>) => {
          this.prmAuthStatus.isAuthenticated =
            response.headers.get('X-ACCESS-TOKEN') != null;
        },
        error: () => {
          this.prmAuthStatus.isAuthenticated = false;
        },
      });
  }

  bootstrapClaimBuilder = () => {
    const claimId = this.claimBuilderFormGroup.get('claimId').value;
    const loadClaim: boolean =
      this.claimBuilderFormGroup.get('loadExistingClaim').value;
    const loadSummary: boolean =
      this.claimBuilderFormGroup.get('loadSummary').value;

    const deliveryDateEnabled = this.claimBuilderFormGroup.get(
      'deliveryDateEnabled'
    ).value;

    const isBulkPartner = this.claimBuilderFormGroup.get('isBulkPartner').value;

    const capsEnabled = this.claimBuilderFormGroup.get('capsEnabled').value;

    var fixedPointMinimumInvoiceDateTimeStamp = Date.parse(
      this.claimBuilderFormGroup.get('fixedPointMinimumInvoiceDate').value
    );

    let fixedPointMinimumInvoiceDate = isNaN(
      fixedPointMinimumInvoiceDateTimeStamp
    )
      ? new Date('0001-01-01T00:00:00')
      : new Date(fixedPointMinimumInvoiceDateTimeStamp);
    let daysInPastMinimumInvoiceDateOffset: number =
      this.claimBuilderFormGroup.get(
        'daysInPastMinimumInvoiceDateOffset'
      ).value;
    let skuQuantityLimit: boolean =
      this.claimBuilderFormGroup.get('skuQuantityLimit').value;

    let maxShares: number = this.claimBuilderFormGroup.get('maxShares').value;

    this.windowService.setLocalStorageItem(
      ClaimBuilderFormKeys[ClaimBuilderFormKeys.FixedPointMinimumInvoiceDate],
      this.claimBuilderFormGroup.get('fixedPointMinimumInvoiceDate').value
    );
    this.windowService.setLocalStorageItem(
      ClaimBuilderFormKeys[
        ClaimBuilderFormKeys.DaysInPastMinimumInvoiceDateOffset
      ],
      daysInPastMinimumInvoiceDateOffset.toString()
    );
    this.windowService.setLocalStorageItem(
      ClaimBuilderFormKeys[ClaimBuilderFormKeys.ClaimId],
      claimId
    );
    this.windowService.setLocalStorageItem(
      ClaimBuilderFormKeys[ClaimBuilderFormKeys.LoadClaim],
      loadClaim.toString()
    );
    this.windowService.setLocalStorageItem(
      ClaimBuilderFormKeys[ClaimBuilderFormKeys.LoadSummary],
      loadSummary.toString()
    );

    this.windowService.setSpaProp('deliveryDateEnabled', deliveryDateEnabled);

    this.windowService.setLocalStorageItem(
      ClaimBuilderFormKeys[ClaimBuilderFormKeys.IsBulkPartner],
      isBulkPartner.toString()
    );

    this.windowService.setSpaProp('isBulkPartner', isBulkPartner);

    this.windowService.setLocalStorageItem(
      ClaimBuilderFormKeys[ClaimBuilderFormKeys.CapsEnabled],
      capsEnabled.toString()
    );

    this.windowService.setSpaProp('capsEnabled', capsEnabled);
    this.windowService.setLocalStorageItem(
      ClaimBuilderFormKeys[ClaimBuilderFormKeys.CapsEnabled],
      capsEnabled.toString()
    );

    this.windowService.setLocalStorageItem(
      ClaimBuilderFormKeys[ClaimBuilderFormKeys.SkuQuantityLimit],
      skuQuantityLimit.toString()
    );

    this.windowService.setLocalStorageItem(
      ClaimBuilderFormKeys[ClaimBuilderFormKeys.MaxShares],
      maxShares.toString()
    );

    this.windowService.setSpaProp(
      'fixedPointMinimumInvoiceDate',
      fixedPointMinimumInvoiceDate
    );
    this.windowService.setSpaProp(
      'daysInPastMinimumInvoiceDateOffset',
      daysInPastMinimumInvoiceDateOffset
    );
    this.windowService.setSpaProp('skuQuantityLimit', skuQuantityLimit);
    this.windowService.setSpaProp('maxShares', maxShares);
    if (!loadClaim) {
      //this.router.navigate(['/Claims/dashboard']);
    } else if (!loadSummary) {
      //this.router.navigate([`Claims/beginClaim/${claimId}`]);
    } else {
      // this.router.navigateByUrl(`/Claims/summary/${claimId}`);
    }
  };

  bootstrapBonus = () => {
    // this.router.navigate([`rules-engine/dashboard/bonuses`]);
  };

  bootstrapBundle = () => {
    // this.router.navigate([`rules-engine/dashboard/bundles`]);
  };

  bootstrapCaps = () => {
    //this.router.navigate([`caps/dashboard`]);
  };

  //Bootstrap claim type module
  bootstrapClaimType = () => {
    this.currentPage = Page.ClaimType;
    // this.router.navigate(['claim-type']);
  };

  bootstrapGlobeTrotters = () => {
    const globeTrotterDefaultLocationId = this.globeTrotterFormGroup.get(
      'globeTrotterDefaultLocationId'
    ).value;
    const globeTrotterEngagementTrackingId = this.globeTrotterFormGroup.get(
      'globeTrotterEngagementTrackingId'
    ).value;
    const globeTrotterGameId =
      this.globeTrotterFormGroup.get('globeTrotterGameId').value;
    const globeTrotterTheme =
      this.globeTrotterFormGroup.get('globeTrotterTheme').value;
    const globeTrotterTerms =
      this.globeTrotterFormGroup.get('globeTrotterTerms').value;

    this.windowService.setLocalStorageItem(
      ClaimBuilderFormKeys[ClaimBuilderFormKeys.GlobeTrotterDefaultLocationId],
      globeTrotterDefaultLocationId
    );

    this.windowService.setLocalStorageItem(
      ClaimBuilderFormKeys[ClaimBuilderFormKeys.GlobeTrotterGameId],
      globeTrotterGameId
    );

    this.windowService.setLocalStorageItem(
      ClaimBuilderFormKeys[
        ClaimBuilderFormKeys.GlobeTrotterEngagementTrackingId
      ],
      globeTrotterEngagementTrackingId
    );

    this.windowService.setLocalStorageItem(
      ClaimBuilderFormKeys[ClaimBuilderFormKeys.GlobeTrotterTheme],
      globeTrotterTheme
    );

    this.windowService.setLocalStorageItem(
      ClaimBuilderFormKeys[ClaimBuilderFormKeys.GlobeTrotterTerms],
      globeTrotterTerms
    );

    this.windowService.setSpaProp(
      'globeTrotterDefaultLocationId',
      globeTrotterDefaultLocationId
    );
    this.windowService.setSpaProp(
      'globeTrotterEngagementTrackingId',
      globeTrotterEngagementTrackingId
    );
    this.windowService.setSpaProp('globeTrotterGameId', globeTrotterGameId);
    this.windowService.setSpaProp('globeTrotterTheme', globeTrotterTheme);
    this.windowService.setSpaProp('globeTrotterTerms', globeTrotterTerms);

    // this.router.navigate([
    //   `top-achievers-promotion/dashboard/${globeTrotterGameId}`,
    // ]);
  };

  backToDev() {
    this.currentPage = Page.DevPortal;
    this.router.navigateByUrl('/');
  }
}
