export type Role = {
    id: number;
    name: string;
    systemName?: string;
    roleType?: RoleType;
    description?: string;
};

export enum RoleType {
    Internal = 1,
    Incentive = 2,
    Security = 3,
}

export const ROLES_FILTER_DATA_CLAIMTYPE = `Name@={0},RoleType==${RoleType.Incentive}|${RoleType.Internal}`;
export const ROLES_FILTER_DATA_TBB = `Name@={0},RoleType==${RoleType.Incentive}`;

