import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import {
  ModalDismissReasons,
  NgbActiveModal,
} from "@ng-bootstrap/ng-bootstrap";
import { TranslatePipe } from "../../pipes/translate.pipe";

export enum DialogReasons {
  CLOSED_WITH_OK = "Closed With Ok Click",
}

export const MessageDialogReasons = {
  ...DialogReasons,
  ...ModalDismissReasons,
};

@Component({
  selector: "app-message-dialog-modal",
  templateUrl: "./message-dialog-modal.component.html",
  styleUrls: ["./message-dialog-modal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageDialogModalComponent implements OnInit {
  title: string;
  messageContent: string;
  Reasons = DialogReasons;

  constructor(
    public activeModal: NgbActiveModal,
    private translatePipe: TranslatePipe
  ) {}

  ngOnInit(): void {}
}
