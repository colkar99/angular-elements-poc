import { Component, OnInit, Input, ViewEncapsulation } from "@angular/core";
import { ICard } from "../interfaces/ICard";
import { CommonHelperService } from "../services/ui-components-helper.service";

@Component({
    selector: "card-deck",
    templateUrl: "./card-deck.component.html",
    styleUrls: ["./card-deck.component.scss"],
})
export class CardDeckComponent implements OnInit {
    @Input() CardList: ICard[];
    constructor(private commonHelper: CommonHelperService) {}

    ngOnInit(): void {
        // this.CardList = [this.commonHelper.DefaultCardFallback];
    }
}
