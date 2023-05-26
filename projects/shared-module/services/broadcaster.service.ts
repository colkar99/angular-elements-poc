import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

interface BroadcastEvent<D = any> {
    key: EventName;
    data?: D;
}

export enum EventName {
    ClaimLoaded,
    RuleConfigurationLoaded,
    RuleOptionsFormGroupValueRequested,
    RuleOptionsFormGroupValueSent,
    BuilderFormGroupValueRequested,
    RuleOptionsFormGroupReset,
    BuilderFormGroupReset,
    BuilderFormGroupValueSent,
    BuilderFormGroupNeedsValidation,
    ArchiveError,
    BundleNameConflict,
    InternalServerError,
    CreateError,
    ShowCreatedInfo,
    SeedExpressionGroups,
    SeedOptions,
    CapCreated,
    TacClickedCity,
    TacLetsFlyClick,
    TacLetsFlyClickShowMovingPlane,
}

@Injectable({
    providedIn: 'root',
})
export class Broadcaster<D = any> {
    private _eventBus: Subject<BroadcastEvent>;
    private _dataBus?: BehaviorSubject<D>;
    public data$: Observable<D>;

    constructor() {
        this._eventBus = new Subject<BroadcastEvent>();
        this._dataBus = new BehaviorSubject<D>(null);
        this.data$ = this._dataBus.asObservable();
    }

    broadcast(event: BroadcastEvent) {
        this._eventBus.next(event);
    }

    send = (data: D) => this._dataBus.next(data);

    on<T>(key: EventName): Observable<T> {
        return this._eventBus.asObservable().pipe(
            filter((event) => event.key === key),
            map((event) => <T>event.data)
        );
    }
}
