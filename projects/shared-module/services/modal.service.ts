import { Injectable, Type, ElementRef } from '@angular/core';
import {
    NgbModal,
    NgbModalOptions,
    NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { from, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { ConfirmDialogModalComponent } from '../ui-components/confirm-dialog-modal/confirm-dialog-modal.component';
import { MessageDialogModalComponent } from '../ui-components/message-dialog-modal/message-dialog-modal.component';
import {
    ConfirmDialogContent,
    ConfirmDialogReasons,
    MessageDialogReasons,
} from '../utils/types/types';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    constructor(private ngbModal: NgbModal) {}

    openMessageDialogModal(
        title: string,
        messageContent: string,
        options?: NgbModalOptions
    ): Observable<MessageDialogReasons> {
        return this.openFromComponent<
            MessageDialogModalComponent,
            MessageDialogReasons
        >(
            MessageDialogModalComponent,
            { title: title, messageContent: messageContent },
            options
        );
    }

    openConfirmModal(
        confirmTemplateModel: ConfirmDialogContent,
        options?: NgbModalOptions
    ): Observable<ConfirmDialogReasons> {
        return this.openFromComponent<
            ConfirmDialogModalComponent,
            ConfirmDialogReasons
        >(ConfirmDialogModalComponent, confirmTemplateModel, options);
    }

    openFromElementRef(
        elementRef: ElementRef,
        options?: NgbModalOptions
    ): NgbModalRef {
        const modal = this.openModalBase(elementRef, undefined, options);
        return modal;
    }

    openFromComponent<T, R>(
        component: Type<T>,
        componentModel?: Partial<T>,
        options?: NgbModalOptions
    ): Observable<R> {
        const modal = this.openModalBase(component, componentModel, options);
        return from(modal.result).pipe(take(1));
    }

    private openModalBase<T>(
        template: Type<T> | ElementRef,
        templateModel?: Partial<T>,
        options?: NgbModalOptions
    ): NgbModalRef {
        const modal = this.ngbModal.open(template, {
            centered: true,
            container: document
                .getElementsByTagName('app-root')[0]
                .shadowRoot.getElementById('spaRoot'),
            ...options,
        });

        if (modal.componentInstance && templateModel) {
            Object.assign(modal.componentInstance, templateModel);
        }

        return modal;
    }
}
