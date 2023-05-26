import { ConfirmDialogModalComponent } from './../../ui-components/confirm-dialog-modal/confirm-dialog-modal.component';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmReasons } from '../../ui-components/confirm-dialog-modal/confirm-dialog-modal.component';
import { DialogReasons } from '../../ui-components/message-dialog-modal/message-dialog-modal.component';
import { AbstractControl } from '@angular/forms';
import { ClaimStatus } from '../enums';

export class Mapping<T> {
    [id: string]: T;
}

export type ChangedControl = {
    controlIndex: number;
    control: AbstractControl;
    data: any;
};

export type ConfirmDialogReasons = ConfirmReasons | ModalDismissReasons;
export type MessageDialogReasons = DialogReasons | ModalDismissReasons;
export type ConfirmDialogContent = Partial<ConfirmDialogModalComponent>;
export type ClaimStatuses = ClaimStatus;

export type JsonPatchOperations =
    | 'add'
    | 'remove'
    | 'replace'
    | 'copy'
    | 'move'
    | 'test';

export type JsonPatchOperation = {
    op: JsonPatchOperations;
    path: string;
    value: any;
};

export type Pagination = {
    Page?: number
    PageSize: number;
    PageIndex?: number;
};

export type PaginationResponse = {
    HasNextPage?: boolean;
    HasPreviousPage?: boolean;
    Sorts?: string;
    Filters?: String;
    TotalPages?: number;
    TotalCount?: number;
} & Pagination;

export type PagedCollection<T> = {
    data: T[];
    pagination: PaginationResponse;
};

export type JsonPatchDocument<T> = Array<JsonPatchOperation>;
