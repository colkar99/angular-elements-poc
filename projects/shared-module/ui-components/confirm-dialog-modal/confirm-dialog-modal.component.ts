import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import {
  NgbActiveModal,
  ModalDismissReasons,
} from "@ng-bootstrap/ng-bootstrap";
import { TranslatePipe } from "../../pipes/translate.pipe";
export enum ConfirmReasons {
  DISMISSED_WITH_CANCEL = "Dismissed with Cancel Click",
  CLOSED_WITH_OK = "Closed With Ok Click",
}

export const ConfirmDialogReasons = {
  ...ConfirmReasons,
  ...ModalDismissReasons,
};

@Component({
  selector: "app-confirm-dialog-modal",
  templateUrl: "./confirm-dialog-modal.component.html",
  styleUrls: ["./confirm-dialog-modal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogModalComponent implements OnInit {
  title: string;
  prompt: string;
  actionButtonText: string = this.translatePipe.transform(
    "Shared.UI.ConfirmDialog.Button.Ok"
  );
  Reasons = ConfirmDialogReasons;

  constructor(
    public activeModal: NgbActiveModal,
    private translatePipe: TranslatePipe
  ) {}

  ngOnInit(): void {}
}
