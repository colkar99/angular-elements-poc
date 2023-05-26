export enum Status {
    Draft = 1,
    Active = 2,
    Archived = 3,
}

export enum HiddenOptionalRequiredValidationOption {
    hidden = 1,
    visibleOptional = 2,
    visibleRequired = 3
}

export enum HiddenOptionalValidationOption {
    hidden = 1,
    visibleOptional = 2,
}

export enum ClaimTypeSaveMethods {
    saveAndContinue = 1,
    saveAndNew = 2,
    saveAndClose = 3
}
export enum Page {
    Create,
    Edit
  }