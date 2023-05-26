import { Injectable } from "@angular/core";
import Decimal from "decimal.js-light";
// import { ProductSerialValidationStates } from '../../feature/claim-builder/sku-search/sku-search-helper';
import { Adapter } from "../adapter/adapter";

export class Product {
  constructor(
    public Id: number,
    public Sku: string,
    public ShortDescription: string,
    public Name: string,
    public Points: number,
    public Quantity: number = 1,
    public SerialRequired: boolean,
    public OwnerSharePercent: number,
    public ParticipantSharePercent: number,
    public ParentProductIds?: number[],
    public Children?: Array<Product>,
    public ProductId?: number,
    public OrderId?: number,
    public RelativeLevel?: number,
    public IsChild?: boolean,
    public SerialNumber?: string,
    public RequiresBundle?: boolean,
    public IsPartOfBundle?: boolean,
    public selected?: boolean,
    public bundleValidationRequired: boolean = false
  ) {}

  getParticipantPoints(quantity?: number) {
    if (this.OwnerSharePercent + this.ParticipantSharePercent == 100) {
      const participantPointsPerUnit = new Decimal(
        this.Points - this.Points * (this.OwnerSharePercent / 100)
      );
      const participantPointsPerProduct = participantPointsPerUnit.mul(
        quantity || this.Quantity
      );
      return +participantPointsPerProduct;
    }
    const participantPointsPerUnit = new Decimal(
      (this.ParticipantSharePercent / 100) * this.Points
    );
    return +participantPointsPerUnit.mul(quantity || this.Quantity);
  }
}

export class ProductGroup extends Product {
  constructor(
    Id: number,
    Sku: string,
    ShortDescription: string,
    Name: string,
    Points: number,
    Quantity: number = 1,
    SerialRequired: boolean,
    OwnerSharePercent: number,
    ParticipantSharePercent: number,
    ParentProductIds?: number[],
    public Children?: Array<Product>,
    public SerialNumbers: Array<string> = [],
    ProductId?: number,
    OrderId?: number,
    RelativeLevel?: number,
    IsChild?: boolean,
    selected: boolean = false
  ) {
    super(
      Id,
      Sku,
      ShortDescription,
      Name,
      Points,
      Quantity,
      SerialRequired,
      OwnerSharePercent,
      ParticipantSharePercent,
      ParentProductIds,
      Children,
      ProductId,
      OrderId,
      RelativeLevel,
      IsChild
    );
  }
}

export class ProductSerialValidation {
  constructor(public ProductId: number, public SerialNumber: string) {}
}

export interface ProductSerialValidationForEndPoint {
  ClaimId: number;
  ProductSerialPairs: ProductSerialValidation[];
}

export class ValidatedProductSerial extends ProductSerialValidation {
  constructor(ProductId: number, SerialNumber: string, public State: any) {
    super(ProductId, SerialNumber);
  }
}

@Injectable({
  providedIn: "root",
})
export class ProductAdapter implements Adapter<Product> {
  adapt(item: any): Product {
    return new Product(
      item.Id,
      item.Sku,
      item.ShortDescription,
      item.Name,
      item.Points,
      item.Quantity,
      item.SerialRequired,
      item.OwnerSharePercent,
      item.ParticipantSharePercent,
      item.ParentProductIds,
      item.Children,
      item.ProductId,
      item.OrderId,
      item.RelativeLevel,
      (item.IsChild = false),
      item.SerialNumber,
      item.RequiresBundle,
      item.IsPartOfBundle,
      item.selected
    );
  }
}

@Injectable({
  providedIn: "root",
})
export class ProductSerialValidationAdapter
  implements Adapter<ValidatedProductSerial>
{
  adapt(product: any): ValidatedProductSerial {
    return new ValidatedProductSerial(
      product.productId,
      product.serialNumber,
      product.state
    );
  }
}
