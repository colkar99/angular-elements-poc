import { Injectable } from "@angular/core";
import { Adapter } from "../adapter/adapter";
import { TranslatePipe } from '../pipes/translate.pipe';
export class Country {
    constructor(
        public Id: number,
        public Name: string
    ) { }
}

export class StateProvince {
    constructor(
        public Id: number,
        public Name: string,
        public CountryId: number
    ) { }
}


@Injectable({
    providedIn: "root",
})
export class CountryAdapter implements Adapter<Country> {
    adapt(item: any): Country {
        return new Country(
            item.Id,
            item.Name
        );
    }

}

@Injectable({
    providedIn: "root",
})
export class StateProvinceAdapter implements Adapter<StateProvince> {
    adapt(item: any): StateProvince {
        return new StateProvince(
            item.Id,
            item.Name,
            item.CountryId
        );
    }
}
