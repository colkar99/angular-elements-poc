import { Adapter } from '../adapter/adapter';
import { Product, ProductAdapter } from './product.model';
import { Injectable } from '@angular/core';

export type Invoice = {
    Id: number;
    Number: string;
    UserId: number;
    ClaimId?: number;
    CompanyId?: number;
    FileName: string;
    PurchaseOrderNumber: string;
    Date?: Date;
    CreatedOnUtc?: Date;
    UpdatedOnUtc?: Date;
};

@Injectable({
    providedIn: 'root',
})
export class ListInvoicesAdapter implements Adapter<Invoice> {
    adapt(invoice: Invoice): Invoice {
        return invoice;
    }
}
