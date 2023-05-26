import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "removeFileExtension" })
export class RemoveFileExtension implements PipeTransform {
    transform(fileName: string): string {
        return fileName.substring(0, fileName.indexOf("."));
    }
}
