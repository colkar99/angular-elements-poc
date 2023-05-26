import { TemplateRef } from '@angular/core';
import { NgbToastOptions } from '@ng-bootstrap/ng-bootstrap/toast/toast-config';

export type ToastOptions = NgbToastOptions & {
    ClassName?: string;
};

export type Toast = ToastOptions & {
    TextOrTpl: string | TemplateRef<any>;
};
