import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { default as fastDeepEqual } from 'fast-deep-equal';
import { clone, difference, head } from 'ramda';
export class ReallyPristine {
    private originalValue: any;
    private latestNotification: boolean;

    constructor(
        private form: FormGroup | AbstractControl,
        private replaySubject: ReplaySubject<boolean>,
        private forcePristineSubject$?: Subject<void>
    ) {
        this.forcePristineSubject$?.subscribe(
            () => (this.originalValue = clone(this.form.value))
        );

        if (!this.form.dirty) {
            this.originalValue = this.form.value;
        }

        this.form.valueChanges.subscribe((newValues) => {
            if (this.form.dirty) {
                const newValue = this.form.value;

                if (fastDeepEqual(this.originalValue, newValue) === false) {
                    if (this.replaySubject) {
                        this.replaySubject.next(false);
                        this.latestNotification = false;
                    }
                } else {
                    if (this.replaySubject) {
                        this.replaySubject.next(true);
                    } else {
                        this.form.markAsPristine();
                    }

                    this.latestNotification = true;
                }
            }
        });
    }

    markReallyPristine = (): void => {
        this.originalValue = this.form.value;

        if (this.replaySubject) {
            this.replaySubject.next(true);
        } else {
            this.form.markAsPristine();
        }

        this.latestNotification = true;
    };

    getDiffWithOriginal = () =>
        head(difference([this.form.value], [this.originalValue]));

    setCurrentAsOriginal = () => (this.originalValue = this.form.value);

    isReallyPristine$: Observable<boolean> = this.replaySubject.asObservable();
}
