import { Injectable } from '@angular/core';
import { Adapter } from '../adapter/adapter';

type WithFowardSlashSuffix<T> = { [P in keyof T & string as `/${P}`]: T[P] };

type CompanyForUpdateKeys = keyof WithFowardSlashSuffix<CompanyForCreation>;
export class Company {
    constructor(
        public Id: number,
        public Name: string,
        public ContactPerson: string,
        public Phone: string,
        public PartnerId: number,
        public CreatedBy: number,
        public Address1: string,
        public Address2: string,
        public ZipPostalCode: string,
        public City: string,
        public CountryId: number,
        public StateProvinceId: number,
        public Extension: string
    ) {}
}

export class CompanyForCreation {
    constructor(
        public StateProvinceId: number,
        public Name: string,
        public Address1: string,
        public ZipPostalCode: string,
        public City: string,
        public ContactPerson?: string,
        public Phone?: string,
        public Extension?: string,
        public Address2?: string
    ) {}
}

@Injectable({
    providedIn: 'root',
})
export class CompanyAdapter implements Adapter<Company> {
    adapt(item: Company): Company {
        if(item == null) return null;
        return new Company(
            item.Id,
            item.Name,
            item.ContactPerson,
            item.Phone,
            item.PartnerId,
            item.CreatedBy,
            item.Address1,
            item.Address2,
            item.ZipPostalCode,
            item.City,
            item.CountryId,
            item.StateProvinceId,
            item.Extension
        );
    }
}
