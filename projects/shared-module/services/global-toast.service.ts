import { Injectable, TemplateRef } from '@angular/core';
import { Toast, ToastOptions } from '../models/global-toast.model';

@Injectable({ providedIn: 'root' })
export class GlobalToastService {
    toasts: Toast[] = [];

    show(textOrTpl: string | TemplateRef<any>, options: ToastOptions = {}) {
        let coalescedoptions: ToastOptions = {
            delay: 3000,
            autohide: true,
            ariaLive: 'polite',
            ClassName: 'bg-success text-light',
            ...options,
        };

        let toast: Toast = { TextOrTpl: textOrTpl, ...coalescedoptions };
        this.toasts.push(toast);
    }

    remove(toast: Toast) {
        this.toasts = this.toasts.filter((t) => t !== toast);
    }
}
