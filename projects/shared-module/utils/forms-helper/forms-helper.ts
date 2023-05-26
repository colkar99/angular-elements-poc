import {
    AbstractControl,
    FormArray,
    FormGroup,
    ValidatorFn,
} from '@angular/forms';
import { ElementRef } from '@angular/core';
import { map } from 'rxjs/operators';
import { merge, Observable } from 'rxjs';
import { ChangedControl } from '../types/types';
import moment, { Moment } from 'moment';
export class FormsHelper {
    static focusOnError = (componentER: ElementRef): void => {
        const invalidControl = componentER.nativeElement.querySelector(
            'input.ng-invalid, select.ng-invalid, textarea.ng-invalid, div.ng-invalid'
        );

        if (invalidControl) {
            invalidControl.focus();
        }
    };

    static getFormArrayChangedControl = (
        formArray: FormArray
    ): Observable<ChangedControl> =>
        merge(
            ...formArray.controls.map(
                (control: AbstractControl | FormGroup, controlIndex: number) =>
                    control.valueChanges.pipe(
                        map((data) => ({
                            controlIndex,
                            control,
                            data,
                        }))
                    )
            )
        );

    static momentValidator = (): ValidatorFn => {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const myMoment = moment(
                control.value === undefined ? '' : control.value,
                'MM/DD/YYYY'
            );
            return myMoment.isValid()
                ? null
                : { momentValidator: { value: control.value } };
        };
    };

    static momentMinDateValidator = (minDate: Moment): ValidatorFn => {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const myMoment = moment(
                control.value === undefined ? '' : control.value,
                'MM/DD/YYYY'
            );

            if (!myMoment.isValid()) return null;

            return myMoment.isBefore(minDate, 'day')
                ? { min: { min: minDate, actual: myMoment } }
                : null;
        };
    };

    static momentMaxDateValidator = (maxDate: Moment): ValidatorFn => {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const myMoment = moment(
                control.value === undefined ? '' : control.value,
                'MM/DD/YYYY'
            );

            if (!myMoment.isValid()) return null;

            return myMoment.isAfter(maxDate, 'day')
                ? { max: { max: maxDate, actual: myMoment } }
                : null;
        };
    };

    static reorderFormArray = (
        fromIndex: number,
        toIndex: number,
        formArray: FormArray
    ): void => {
        const from = FormsHelper.clamp(fromIndex, formArray.length - 1);
        const to = FormsHelper.clamp(toIndex, formArray.length - 1);

        if (from === to) {
            return;
        }

        const previous = formArray.at(from);
        const current = formArray.at(to);
        formArray.setControl(to, previous);
        formArray.setControl(from, current);
    };

    static clamp = (value: number, max: number): number =>
        Math.max(0, Math.min(max, value));

    static removeError = (control: AbstractControl, error: string) => {
        const err = control.errors; // get control errors
        if (err) {
            delete err[error];
            if (!Object.keys(err).length) {
                // if no errors left
                control.setErrors(null); // set control errors to null making it VALID
            } else {
                control.setErrors(err); // controls got other errors so set them back
            }
        }
    };
}
