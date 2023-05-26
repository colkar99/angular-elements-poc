import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ICard } from '../interfaces/ICard';
import { CommonHelperService } from '../services/ui-components-helper.service';

@Component({
    selector: 'lib-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
    @Input() Card: ICard;
    constructor(private commonHelper: CommonHelperService) {}

    ngOnInit(): void {}
}
