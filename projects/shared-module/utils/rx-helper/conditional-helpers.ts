import { all, complement, compose, equals, find, not } from 'ramda';
import { ObservableInput, combineLatest, Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

export const equalsT = equals(true);
export const equalsF = equals(false);
export const notEquals = compose(complement, equals);
const notEqualsUndefined = notEquals(undefined);
const findFalsy = find(equalsF);
const findTruthy = find(equalsT);

export const allTrue = (...observables: Array<ObservableInput<boolean>>) =>
    combineLatest(observables).pipe(map(all(equalsT)), distinctUntilChanged());

export const allFalse = (...observables: Array<ObservableInput<boolean>>) =>
    combineLatest(observables).pipe(map(all(equalsF), distinctUntilChanged()));

export const anyTrue = (...observables: Array<ObservableInput<boolean>>) =>
    combineLatest(observables).pipe(
        map((values) => values.find(equalsT) != undefined),
        distinctUntilChanged()
    );

export const anyFalse = (...observables: Array<ObservableInput<boolean>>) =>
    combineLatest(observables).pipe(
        map((values) => values.find(equalsF) != undefined),
        distinctUntilChanged()
    );

export const complement_ = (ob$: Observable<boolean>) => ob$.pipe(map(not));
