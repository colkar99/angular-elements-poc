import { prop } from "ramda";
import {
  ClaimSharedUser,
  ClaimSharedUserAdapter,
  ClaimSharedUserForCreation,
} from "./claim-share.model";
import { CompanyAdapter } from "./company.model";
// import { Company } from "src/app/shared/models/company.model";
import { Invoice, ListInvoicesAdapter } from "./invoice-sku-submit.model";
import { ClaimNote, ClaimNoteAdapter } from "./notes-attachments-model";
import { Injectable } from "@angular/core";
import { Adapter } from "../adapter/adapter";
import { Moment } from "moment-timezone";
import { utc } from "moment-timezone";
import {
  ClaimProductForCreation,
  ClaimProductFull,
  ClaimProductFullAdapter,
} from "./claim-product.model";
import * as moment from "moment";
import { Product } from "./product.model";
export type Claim = {
  PurchaseOrderNumber: string;
  Date: Moment;
  CompanyId: number;
  VerticalId: number;
  Id: number;
  TenantId: number;
  UserId: number;
  StatusId: number;
  Total: number;
  ParticipantTotal: number;
  CreatedOnUtc: Moment;
  BulkId?: number;
  ModifiedOnUtc?: Moment;
  AuditPassOnUtc?: Moment;
  LockedTillUtc?: Moment;
  DeliveryDate?: Moment;
  SalesManagerId: number;
  TypeHistoryId: number;
};
export type ClaimTypeHistory = {
  CompanyValidationOption: number;
  Id: number;
  InvoiceValidationOption: number;
  IsCustom: true;
  Name: string;
  SharingValidationOption: number;
  Version: number;
  VerticalValidationOption: number;
};
export type CappedPoint = {
  ProductId: number;
  UserId: number;
  Points: number;
};

export enum CappedPointType {
  Product,
  User,
}

type CappedPointTypeProp = Exclude<keyof CappedPoint, "Points">;

const cappedPointTypeCond = (x: CappedPointType): CappedPointTypeProp => {
  switch (x) {
    case CappedPointType.Product:
      return "ProductId";
    case CappedPointType.User:
      return "UserId";
  }
};

export const createCappedPointsMap =
  (p: CappedPointType) => (cappedPoints: CappedPoint[]) =>
    cappedPoints.reduce(
      (acc, curr) =>
        acc.has(prop(cappedPointTypeCond(p), curr))
          ? acc.set(
              prop(cappedPointTypeCond(p), curr),
              parseFloat(
                (
                  acc.get(prop(cappedPointTypeCond(p), curr)) + curr.Points
                ).toFixed(2)
              )
            )
          : acc.set(
              prop(cappedPointTypeCond(p), curr),
              parseFloat(curr.Points.toFixed(2))
            ),

      new Map<number, number>()
    );

export type ClaimFull = Claim & {
  Products: Product[];
  CappedPoints: CappedPoint[];
  SharedUsers: ClaimSharedUser[];
  Invoices: Invoice[];
  Notes: ClaimNote[];
  Rewards: ClaimReward[];
  Company: any;
  SubmittedOnUtc?: Moment;
  TypeHistoryId: number;
  TypeHistory: any;
  ClaimShareUserCountLimit: number;
  ProductGroups: Array<Product>;
  ProductSerialNumbers: Array<Product>;
};

export type ClaimReward = {
  id: number;
  type: string;
  name: string;
  points: number;
  quantity: number;
  totalPoints: number;
  createdBy: number;
  createdOnUtc: Moment;
};

export type UserPointPotential = {
  userId: number;
  potentialRewards: PotentialReward[];
};

export type PotentialReward = {
  productSKU: string;
  pointsPotential: number;
};
@Injectable({
  providedIn: "root",
})
export class ClaimRewardAdapter implements Adapter<ClaimReward> {
  constructor() {}
  adapt(claimReward: any): ClaimReward {
    const o = {
      createdOnUtc: utc(claimReward.CreatedOnUtc).local(),
      id: claimReward.Id,
      type: claimReward.Type,
      createdBy: claimReward.CreatedBy,
      points: claimReward.Points,
      quantity: claimReward.Quantity,
      totalPoints: claimReward.TotalPoints,
      name: claimReward.Name,
    };
    return o;
  }
}
@Injectable({
  providedIn: "root",
})
export class ClaimFullAdapter implements Adapter<ClaimFull> {
  constructor(
    private companyAdapter: CompanyAdapter,
    private claimProductFullAdapter: ClaimProductFullAdapter,
    private listInvoicesAdapter: ListInvoicesAdapter,
    private claimNoteAdapter: ClaimNoteAdapter,
    private claimShareAdapter: ClaimSharedUserAdapter,
    private claimRewardAdapter: ClaimRewardAdapter
  ) {}

  adapt(claimFull: ClaimFull): ClaimFull {
    claimFull.Date = moment(claimFull.Date);
    claimFull.DeliveryDate = moment(claimFull.DeliveryDate);
    claimFull.CreatedOnUtc = utc(claimFull.CreatedOnUtc).local();

    claimFull.LockedTillUtc =
      claimFull.LockedTillUtc == null
        ? null
        : utc(claimFull.LockedTillUtc).local();
    claimFull.ModifiedOnUtc =
      claimFull.ModifiedOnUtc == null
        ? null
        : utc(claimFull.ModifiedOnUtc).local();
    claimFull.AuditPassOnUtc =
      claimFull.AuditPassOnUtc == null
        ? null
        : utc(claimFull.AuditPassOnUtc).local();

    claimFull.SubmittedOnUtc =
      claimFull.SubmittedOnUtc == null ? null : utc(claimFull.SubmittedOnUtc);

    claimFull.Company = this.companyAdapter.adapt(claimFull.Company);
    claimFull.Products = claimFull.Products.map((item) =>
      this.claimProductFullAdapter.adapt(item)
    );
    claimFull.Invoices = claimFull.Invoices.map((invoice) =>
      this.listInvoicesAdapter.adapt(invoice)
    );
    claimFull.Notes = claimFull.Notes.map((note) =>
      this.claimNoteAdapter.adapt(note)
    );
    claimFull.SharedUsers = claimFull.SharedUsers.map((user) =>
      this.claimShareAdapter.adapt(user)
    );
    claimFull.Rewards = claimFull.Rewards.map((reward) =>
      this.claimRewardAdapter.adapt(reward)
    );
    claimFull.TypeHistory = claimFull.TypeHistory;
    claimFull.TypeHistoryId = claimFull.TypeHistoryId;

    return claimFull;
  }
}

@Injectable({
  providedIn: "root",
})
export class ClaimAdapter implements Adapter<Claim> {
  constructor() {}

  adapt(claim: Claim): Claim {
    claim.Date = utc(claim.Date);
    claim.CreatedOnUtc = utc(claim.CreatedOnUtc).local();

    claim.LockedTillUtc =
      claim.LockedTillUtc == null ? null : utc(claim.LockedTillUtc).local();
    claim.ModifiedOnUtc =
      claim.ModifiedOnUtc == null ? null : utc(claim.ModifiedOnUtc).local();
    claim.AuditPassOnUtc =
      claim.AuditPassOnUtc == null ? null : utc(claim.AuditPassOnUtc).local();

    return claim;
  }
}
@Injectable({
  providedIn: "root",
})
export class ClaimRulesApplyAdapter implements Adapter<ClaimReward> {
  constructor() {}
  adapt(claimRulesApply: ClaimReward): ClaimReward {
    claimRulesApply.createdOnUtc = utc(claimRulesApply.createdOnUtc).local();

    return claimRulesApply;
  }
}

export abstract class ClaimBase {
  constructor(
    public VerticalId: number,
    public SalesManagerId: number,
    public PurchaseOrderNumber: string,
    public Date: string,
    public DeliveryDate: string,
    public CompanyId: number,
    public TypeHistoryId
  ) {}
}
export class ClaimForCreation extends ClaimBase {
  constructor(
    VerticalId: number,
    SalesManagerId: number,
    PurchaseOrderNumber: string,
    DeliveryDate: string,
    Date: string,
    CompanyId: number,
    TypeHistoryId: number,
    public productGroups: Array<Product>,
    public SharedUsers: Array<ClaimSharedUserForCreation>,
    public ProductSerialNumbers: Array<Product>
  ) {
    super(
      VerticalId,
      SalesManagerId,
      PurchaseOrderNumber,
      Date,
      DeliveryDate,
      CompanyId,
      TypeHistoryId
    );
  }
}

export class ClaimForUpdate extends ClaimBase {
  constructor(
    VerticalId: number,
    SalesManagerId: number,
    PurchaseOrderNumber: string,
    Date: string,
    DeliveryDate: string,
    CompanyId: number,
    TypeHistoryId: number,
    public productGroups: Array<Product>,
    public SharedUsers: Array<ClaimSharedUserForCreation>,
    public Submitted: boolean,
    public ProductSerialNumbers: Array<Product>
  ) {
    super(
      VerticalId,
      SalesManagerId,
      PurchaseOrderNumber,
      Date,
      DeliveryDate,
      CompanyId,
      TypeHistoryId
    );
  }
}
