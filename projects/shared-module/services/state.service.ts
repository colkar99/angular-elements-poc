import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import cloneDeep from 'lodash-es/cloneDeep';
export class StateService<T> {
    private state$: BehaviorSubject<T>;
    private originalState: T;

    protected get state(): T {
        return this.state$.getValue();
    }

    constructor(initialState: T) {
        this.originalState = cloneDeep(initialState);
        this.state$ = new BehaviorSubject<T>(cloneDeep(initialState));
    }

    getOriginalStateClone = (): T =>
        cloneDeep(this.originalState);

    clear = (): void => {
        this.setFullState(cloneDeep(this.originalState));
    };

    protected select<K>(mapFn: (state: T) => K): Observable<K> {
        return this.state$.asObservable().pipe(
            map((state: T) => mapFn(state)),
            distinctUntilChanged()
        );
    }

    setFullState(newState: T): void {
        this.state$.next(newState);
    }

    protected setState(newState: Partial<T>): void {
        this.state$.next({
            ...this.state,
            ...newState,
        });
    }
}
