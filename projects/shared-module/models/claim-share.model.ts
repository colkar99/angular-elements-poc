import { Injectable } from '@angular/core';
import { Adapter } from '../adapter/adapter';
import { User, UserAdapter } from './user-info.model';

export class ClaimShare {
    constructor(
        public ShareUser: User,
        public Percentage: number,
        public Points: number
    ) {}
}

export type ClaimSharedUser = {
    User: User;
    Percent: number;
    UserId: number;
};

export class ClaimShareSplit {
    constructor(public Points: number, public Percent: number) {}
}

export interface ClaimSharedUserForCreation {
    UserId: number;
    Percent: number;
}

@Injectable({
    providedIn: 'root',
})
export class ClaimSharedUserAdapter implements Adapter<ClaimSharedUser> {
    constructor(private userInfoAdapter: UserAdapter) {}

    adapt(claimShare: ClaimSharedUser): ClaimSharedUser {
        claimShare.User = this.userInfoAdapter.adapt(claimShare.User);
        return claimShare;
    }
}
