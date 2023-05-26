import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  constructor(private translationPipe: TranslatePipe) {}

  ngOnInit(): void {}
}
