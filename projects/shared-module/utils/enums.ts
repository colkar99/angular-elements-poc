export enum FeatureComponent {
  ClaimBuilder,
  ClaimSummary,
  BonusDashboard,
  NotFound,
  BundleDashboard,
  CapsDashboard,
  ClaimTypeDashboard,
  GlobeTrotters,
  GlobeTrottersLeaderboard,
}

export enum ClaimStatus {
  New = 10,
  UnderReview = 20,
  Complete = 30,
  Cancelled = 40,
  Rejected = 50,
  SKUMismatched = 51,
  InvalidInvoice = 52,
  SendToManager = 60,
  Audit = 70,
  AuditReadyForValidation = 71,
  AuditFailValidation = 73,
  Draft = 80,
  EmailNotificationSent = 90,
}

export enum ApplyBonusRuleErrorStates {
  Inactive,
  Error,
}
