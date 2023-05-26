import {
  Component,
  ComponentRef,
  Input,
  OnInit,
  TemplateRef,
} from "@angular/core";
import { MatStepper, MatHorizontalStepper } from "@angular/material/stepper";
import { IDynamicStep } from "../interfaces/IDynamicStep";
import { IDynamicStepper } from "../interfaces/IDynamicStepper";
import { IDynamicStepperFooter } from "../interfaces/IDynamicStepperFooter";
import { DynamicStepperFooterFallback } from "../constants/DynamicStepperFooterFallback";
import { TranslatePipe } from "../../pipes/translate.pipe";

@Component({
  selector: "dynamic-stepper",
  templateUrl: "./dynamic-stepper.component.html",
  styleUrls: ["./dynamic-stepper.component.scss"],
})
export class DynamicStepperComponent implements OnInit {
  @Input() Stepper: IDynamicStepper;
  @Input() Steps: IDynamicStep[];
  @Input() Footer: IDynamicStepperFooter;
  // tslint:disable-next-line: no-input-rename
  @Input("selectedComponentTemplate") selectedTemplateRef: ComponentRef<any>;

  constructor(private translatePipe: TranslatePipe) {}

  ngOnInit(): void {
    this.Footer = DynamicStepperFooterFallback;
  }
}
