import {
    Component,
    OnInit,
    ViewChild,
    Input,
    Output,
    ElementRef,
    EventEmitter,
    OnChanges,
    SimpleChanges,
    ChangeDetectorRef,
} from '@angular/core';
import { IFileUpload } from '../interfaces/FileUpload';
import { CommonHelperService } from '../services/ui-components-helper.service';

@Component({
    selector: 'file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit, OnChanges {
    @Input() fileInput: IFileUpload;
    @ViewChild('file') file: ElementRef;
    @Output('onSelectFile') onSelectFile = new EventEmitter<File>(null);
    fileName: string = '';

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges) {
        this.fileName = changes.fileInput.currentValue.fileName;
    }
    onFileUpload(file: File) {
        if (this.fileInput.showFileName) this.fileName = file[0].name;
        this.onSelectFile.emit(file);
    }
}
