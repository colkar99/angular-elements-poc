import { Injectable } from '@angular/core';
import { Adapter } from '../adapter/adapter';

export type ClaimNote = {
    id: number;

    date: Date;

    note: string;

    attachmentId?: number;

    attachmentName?: string;
};

export type ClaimNoteForCreation = { Note: string };

export type ClaimNoteAttachmentForCreation = { File: Blob; FileName: string };

@Injectable({
    providedIn: 'root',
})
export class ClaimNoteAdapter implements Adapter<ClaimNote> {
    adapt = (claimNote: any): ClaimNote => ({
        id: claimNote.Id,
        date: new Date(claimNote.CreatedOnUtc),
        attachmentId: claimNote.AttachmentId,
        note: claimNote.Note,
    });
}
