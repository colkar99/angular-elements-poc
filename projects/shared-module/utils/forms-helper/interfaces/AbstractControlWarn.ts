import { AbstractControl } from '@angular/forms';

export interface AbstractControlValidationStates<T> extends AbstractControl {
    validation: T;
}
