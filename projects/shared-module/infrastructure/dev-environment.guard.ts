import { Injectable, isDevMode } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class DevEnvironmentGuard implements CanActivate {
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        let isDevEnvironment: boolean = isDevMode();
        return isDevEnvironment;
    }
}
