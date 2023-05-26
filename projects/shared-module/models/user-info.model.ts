import { Injectable } from '@angular/core';
import { Adapter } from '../adapter/adapter';

export class User {
    constructor(
        public FirstName: string,
        public LastName: string,
        public Email: string,
        public Id: number,
        public PartnerId: number
    ) {}
}

@Injectable({
    providedIn: 'root',
})
export class UserAdapter implements Adapter<User> {
    adapt(user: User): User {
        return new User(
            user.FirstName,
            user.LastName,
            user.Email,
            user.Id,
            user.PartnerId
        );
    }
}
