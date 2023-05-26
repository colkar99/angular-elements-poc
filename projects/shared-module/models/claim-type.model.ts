import { Injectable } from '@angular/core';
import { Adapter } from '../adapter/adapter';

export class ClaimType {
    constructor(public id: number, public description: string) {}
}

@Injectable({
    providedIn: 'root',
})
export class ClaimTypeAdapter implements Adapter<ClaimType> {
    adapt(claimType: any): ClaimType {
        return new ClaimType(claimType.Id, claimType.Description);
    }
}
