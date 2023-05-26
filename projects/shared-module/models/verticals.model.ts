import { Injectable } from '@angular/core';
import { Adapter } from '../adapter/adapter';

export class Vertical {
    constructor(public id: number, public industryName: string) {}
}

@Injectable({
    providedIn: 'root',
})
export class VerticalAdapter implements Adapter<Vertical> {
    adapt(vertical: any): Vertical {
        return new Vertical(vertical.Id, vertical.IndustryName);
    }
}
