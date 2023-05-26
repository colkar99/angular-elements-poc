import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { TranslatePipe } from '../../../../shared-module/pipes/translate.pipe';
@Component({
  selector: 'app-claim-type-dashboard',
  templateUrl: './claim-type-dashboard.component.html',
  styleUrls: ['./claim-type-dashboard.component.scss'],
})
export class ClaimTypeDashboardComponent implements OnInit {
  @BlockUI('rules-table') blockUI: NgBlockUI;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translationPipe: TranslatePipe
  ) {}

  ngOnInit(): void {}
}
