// import {
//     BonusFieldType,
//     BooleanOperator,
//     ComparativeOperator,
//     Frequency,
//     RuleActions,
//     Status,
// } from '../../feature/rules-engine/rules-builder/utils/enums';
// import { Injectable } from '@angular/core';
// import { Adapter } from '../adapter/adapter';

// export enum FieldDataType {
//     Numeric = 1,
//     Text = 2,
// }

// export type BonusRuleConfiguration = {
//     fields: FieldOption[];
//     booleanOperators: BooleanOperator[];
//     actions: Action[];
//     frequencies: Frequency[];
//     statuses: Status[];
// };

// export type ConditionField = Omit<FieldOption, 'comparativeOperators'>;

// export type FieldOption = {
//     type: BonusFieldType;
//     dataType: FieldDataType;
//     comparativeOperators: ComparativeOperator[];
// };

// export type Action = {
//     type: RuleActions;
//     dataType: FieldDataType;
// };

// export type T4 = {
//     id: number;
//     name: string;
// };

// @Injectable({
//     providedIn: 'root',
// })
// export class RuleConfigurationAdapter
//     implements Adapter<BonusRuleConfiguration>
// {
//     constructor() {}

//     adapt = (config: BonusRuleConfiguration): BonusRuleConfiguration => {
//         return config;
//     };
// }
