import { Injectable } from "@angular/core";
import { ICard } from "../interfaces/ICard";
import { CardAssetsConstants } from "../constants/card-assets.constants";
@Injectable({
    providedIn: "root",
})
export class CommonHelperService {
    constructor() {}

    private defaultCardFallback: ICard = {
        ImageSource: CardAssetsConstants.ImageSource,
        Content: CardAssetsConstants.Content,
        Header: CardAssetsConstants.Header,
        RouterLink: CardAssetsConstants.RouterLink,
    };

    get DefaultCardFallback(): ICard {
        return this.defaultCardFallback;
    }
}
