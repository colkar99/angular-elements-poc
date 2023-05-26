import { Role } from '../../../../shared-module/models/role.model';
import {
  HiddenOptionalRequiredValidationOption,
  HiddenOptionalValidationOption,
  Status,
} from './enum';

export interface ClaimType {
  name: string;
  status: Status;
  companyValidationOption: HiddenOptionalRequiredValidationOption;
  verticalValidationOption: HiddenOptionalRequiredValidationOption;
  invoiceValidationOption: HiddenOptionalRequiredValidationOption;
  sharingValidationOption: HiddenOptionalValidationOption;
  skuValidationOption: HiddenOptionalValidationOption;
  salesManagerBonusValidationOption: HiddenOptionalRequiredValidationOption;
  roles?: number[];
  version?: number;
  id?: number;
  createdByName?: string;
  updatedByName?: string;
  updatedBy?: number;
  updatedOnUtc?: Date;
  createdBy?: number;
  createdOnUtc?: Date;
  isCustom: boolean;
  auditable: boolean;
}
