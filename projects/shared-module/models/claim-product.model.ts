import { Injectable } from '@angular/core';
import { Adapter } from '../adapter/adapter';
import { Product, ProductAdapter } from './product.model';

export interface ClaimProductForCreation {
    ProductId: number;
    SerialNumber: string;
    Quantity?: number;
    ParentProductIds?: number[]

}

export type ClaimProductFull = {
    Id: number;
    Product: Product;
    ProductId: number;
    SerialNumber: string;
};

@Injectable({
    providedIn: 'root',
})
export class ClaimProductFullAdapter implements Adapter<Product> {
    constructor(private productAdapter: ProductAdapter) {}

    adapt(claimProductFull: Product): Product {
        claimProductFull = this.productAdapter.adapt(
            claimProductFull
        );
        return claimProductFull;
    }
}
