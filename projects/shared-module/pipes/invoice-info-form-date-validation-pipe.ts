import { Moment } from "moment";
import { Pipe, PipeTransform } from "@angular/core";
import { FormControl } from "@angular/forms";
@Pipe({
  pure: false,
  name: "isMomentFormControlValid",
})
export class IsMomentFormControlValid implements PipeTransform {
  transform(momentFormControl: FormControl): boolean {
    return (
      momentFormControl.touched &&
      (!(<Moment>momentFormControl.value)?.isValid() ||
        momentFormControl.errors?.required)
    );
  }
}
