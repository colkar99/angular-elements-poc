// import { Injectable } from '@angular/core';
// import { Moment, utc } from 'moment-timezone';
// import { Status } from 'src/app/feature/rules-engine/rules-builder/utils/enums';
// import { Adapter } from '../adapter/adapter';
// import { BonusFull } from './bonus.model';

// export type Bundle = {
//     id: number;
//     name: string;
//     status: Status;
//     tenantId: number;
//     createdOnUtc: Moment;
//     updatedOnUtc: Moment;
//     createdBy: number;
//     updatedBy: number;
//     expressionId: number;
// };

// export type BonusExclusionsForBundle =
//     | 'frequency'
//     | 'startDate'
//     | 'endDate'
//     | 'roles'
//     | 'action';

// export type BundleFull = Omit<BonusFull, BonusExclusionsForBundle>;
// @Injectable({
//     providedIn: 'root',
// })
// export class BundleFullAdapter implements Adapter<BundleFull> {
//     constructor() {}

//     adapt = (bundle: BundleFull): BundleFull => {
//         bundle.createdOnUtc = utc(bundle.createdOnUtc).local();
//         bundle.updatedOnUtc = utc(bundle.updatedOnUtc).local();
//         return bundle;
//     };
// }

// @Injectable({
//     providedIn: 'root',
// })
// export class BundleAdapter implements Adapter<Bundle> {
//     constructor() {}

//     adapt = (bundle: Bundle): Bundle => {
//         bundle.createdOnUtc = utc(bundle.createdOnUtc).local();
//         bundle.updatedOnUtc = utc(bundle.updatedOnUtc).local();
//         return bundle;
//     };
// }
