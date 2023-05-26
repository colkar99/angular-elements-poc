import { Injectable } from '@angular/core';
import { Adapter } from '../adapter/adapter';

export class SalesManager {
    constructor(
        public FirstName: string,
        public LastName: string,
        public Email: string,
        public Id: number,
        public PartnerId: number
    ) {}
}

@Injectable({
    providedIn: 'root',
})
export class SalesManagerAdapter implements Adapter<SalesManager> {
    adapt(user: SalesManager): SalesManager {
        return new SalesManager(
            user.FirstName,
            user.LastName,
            user.Email,
            user.Id,
            user.PartnerId
        );
    }
}
