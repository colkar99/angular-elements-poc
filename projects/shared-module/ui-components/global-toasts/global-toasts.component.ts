import { GlobalToastService } from '../../services/global-toast.service';
import { Component, TemplateRef } from '@angular/core';
import { Toast } from '../../models/global-toast.model';

@Component({
    selector: 'app-toasts',
    templateUrl: './global-toasts.component.html',
    styleUrls: ['./global-toasts.component.scss'],
    host: { '[class.ngb-toasts]': 'true' },
})
export class GlobalToastsComponent {
    constructor(public toastService: GlobalToastService) {}

    isTemplate(toast: Toast) {
        return toast.TextOrTpl instanceof TemplateRef;
    }
}
