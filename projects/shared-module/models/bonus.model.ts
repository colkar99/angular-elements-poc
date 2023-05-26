// import { Injectable } from '@angular/core';
// import { Moment, utc } from 'moment-timezone';

// import { Adapter } from '../adapter/adapter';
// import moment from 'moment';
// import {
//     Frequency,
//     Status,
// } from 'src/app/feature/rules-engine/rules-builder/utils/enums';
// import {
//     ExpressionGroup,
//     BonusAction,
// } from 'src/app/feature/rules-engine/rules-builder/utils/types';

// export type BonusFull = {
//     id: number;
//     name: string;
//     frequency: Frequency;
//     status: Status;
//     startDate: Moment;
//     endDate: Moment;
//     updatedBy: number;
//     updatedOnUtc: Moment;
//     createdBy: number;
//     createdOnUtc: Moment;
//     createdByName: string;
//     updatedByName: string;
//     roles: number[];
//     expressionGroups: ExpressionGroup[];
//     action: BonusAction;
// };

// export type Bonus = Omit<
//     BonusFull,
//     'createdByName' | 'updatedByName' | 'expressionGroups' | 'roles' | 'action'
// > & {
//     tenantId: number;
//     expressionId: number;
// };

// @Injectable({
//     providedIn: 'root',
// })
// export class BonusAdapter implements Adapter<Bonus> {
//     constructor() {}

//     adapt = (bonus: Bonus) => {
//         bonus.createdOnUtc = utc(bonus.createdOnUtc).local();
//         bonus.updatedOnUtc = utc(bonus.updatedOnUtc).local();
//         bonus.startDate = moment(bonus.startDate);
//         bonus.endDate = moment(bonus.endDate);
//         return bonus;
//     };
// }
// @Injectable({
//     providedIn: 'root',
// })
// export class BonusFullAdapter implements Adapter<BonusFull> {
//     constructor() {}

//     adapt = (bonus: BonusFull) => {
//         bonus.createdOnUtc = utc(bonus.createdOnUtc).local();
//         bonus.updatedOnUtc = utc(bonus.updatedOnUtc).local();
//         bonus.startDate = moment(bonus.startDate);
//         bonus.endDate = moment(bonus.endDate);
//         return bonus;
//     };
// }
