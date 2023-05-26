import { Injectable } from "@angular/core";
import { Moment } from "moment";
import { utc } from "moment-timezone";
import { Adapter } from "../adapter/adapter";

export class BulkClaimSummary {
  constructor(
    public ClaimCount: number,
    public InvoiceCount: number,
    public SkuCount: number,
    public Amount: number
  ) {}
}

export class CreatedBulkSummary {
  constructor(
    public Id: number,
    public ClaimCount: number,
    public InvoiceCount: number,
    public SkuCount: number,
    public Amount: number
  ) {}
}

export type ValidateBulkClaimsQuery = {
  ClaimValidations: BulkClaimValidation[];
  InvoiceMonth: Moment;
};

export type BulkSubmission = {
  ClaimValidations: BulkClaimValidation[];
  InvoiceMonth: Moment;
  FileName: string;
};

export type BulkClaimSummaryObj = {
  ClaimCount: number;
  InvoiceCount: number;
  SkuCount: number;
  Amount: number;
};

export class Setting {
  constructor(public Key: string, public Value: string) {}
}

export class UserBulkClaim {
  constructor(
    public BulkId: number,
    public Month: string,
    public ClaimDate: Moment,
    public Status: string,
    public ClaimedAmount: number,
    public AwardedAmount: number,
    public FileName: string
  ) {}
}

export class BulkClaimValidation {
  constructor(
    public PurchaseOrderNumber: string,
    public EndUserInvoiceDate: string,
    public InvoiceNumber: string,
    public CustomerSoldTo: string,
    public SKU: string,
    public QTY: string,
    public PrimaryRepEmail: string,
    public Share2Email: string,
    public Share2Percent: string,
    public Share3Email: string,
    public Share3Percent: string,
    public Share4Email: string,
    public Share4Percent: string,
    public Share5Email: string,
    public Share5Percent: string,
    public Share6Email: string,
    public Share6Percent: string,
    public Share7Email: string,
    public Share7Percent: string,
    public Share8Email: string,
    public Share8Percent: string,
    public Share9Email: string,
    public Share9Percent: string,
    public Share10Email: string,
    public Share10Percent: string
  ) {}
}

export class ValidatedBulkClaim {
  constructor(
    public purchaseOrderNumber: string,
    public endUserInvoiceDate: string,
    public invoiceNumber: string,
    public customerSoldTo: string,
    public sku: string,
    public qty: string,
    public primaryRepEmail: string,
    public share2Email: string,
    public share2Percent: string,
    public share3Email: string,
    public share3Percent: string,
    public share4Email: string,
    public share4Percent: string,
    public share5Email: string,
    public share5Percent: string,
    public share6Email: string,
    public share6Percent: string,
    public share7Email: string,
    public share7Percent: string,
    public share8Email: string,
    public share8Percent: string,
    public share9Email: string,
    public share9Percent: string,
    public share10Email: string,
    public share10Percent: string,
    public state: string
  ) {}
}

export type CapReport = {
  AsOfUtc: Date;
  EpochId: number;
  CapType: string;
  period: number;
};

export type CapReportResponse = {
  user: string;
  userEmail: string;
  capType: string;
  capEntityName: string;
  epoch: string;
  capId: number;
  globalPointUtilization: number;
  pointLimit: number;
  periodName: string;
};

@Injectable({
  providedIn: "root",
})
export class UserBulkClaimAdapter implements Adapter<UserBulkClaim> {
  constructor() {}

  adapt(bulkClaim: any): UserBulkClaim {
    return new UserBulkClaim(
      bulkClaim.bulkId,
      bulkClaim.month,
      utc(bulkClaim.claimDate).local(),
      bulkClaim.status,
      bulkClaim.claimedAmount,
      bulkClaim.awardedAmount,
      bulkClaim.fileName
    );
  }
}

@Injectable({
  providedIn: "root",
})
export class ValidatedBulkClaimAdapter implements Adapter<ValidatedBulkClaim> {
  constructor() {}

  adapt(bulkClaim: BulkClaimValidation): ValidatedBulkClaim {
    return new ValidatedBulkClaim(
      bulkClaim.PurchaseOrderNumber,
      bulkClaim.EndUserInvoiceDate,
      bulkClaim.InvoiceNumber,
      bulkClaim.CustomerSoldTo,
      bulkClaim.SKU,
      bulkClaim.QTY,
      bulkClaim.PrimaryRepEmail,
      bulkClaim.Share2Email,
      bulkClaim.Share2Percent,
      bulkClaim.Share3Email,
      bulkClaim.Share3Percent,
      bulkClaim.Share4Email,
      bulkClaim.Share4Percent,
      bulkClaim.Share5Email,
      bulkClaim.Share5Percent,
      bulkClaim.Share6Email,
      bulkClaim.Share6Percent,
      bulkClaim.Share7Email,
      bulkClaim.Share7Percent,
      bulkClaim.Share8Email,
      bulkClaim.Share8Percent,
      bulkClaim.Share9Email,
      bulkClaim.Share9Percent,
      bulkClaim.Share10Email,
      bulkClaim.Share10Percent,
      ""
    );
  }
}

@Injectable({
  providedIn: "root",
})
export class BulkClaimSummaryAdapter implements Adapter<BulkClaimSummary> {
  adapt(bulkClaim: any): BulkClaimSummary {
    return new BulkClaimSummary(
      bulkClaim.claimCount,
      bulkClaim.invoiceCount,
      bulkClaim.skuCount,
      bulkClaim.amount
    );
  }
}

@Injectable({
  providedIn: "root",
})
export class CreatedBulkClaimSummaryAdapter
  implements Adapter<CreatedBulkSummary>
{
  adapt(bulkClaim: any): CreatedBulkSummary {
    return new CreatedBulkSummary(
      bulkClaim.id,
      bulkClaim.claimCount,
      bulkClaim.invoiceCount,
      bulkClaim.skuCount,
      bulkClaim.amount
    );
  }
}
