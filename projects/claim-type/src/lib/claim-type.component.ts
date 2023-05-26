import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-claim-type',
  templateUrl: './claim-type.component.html',
  styleUrls: ['./claim-type.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ClaimTypeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.navigateByUrl('claim-type/dashboard');
  }
}
