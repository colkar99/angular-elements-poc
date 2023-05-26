import { Pipe, PipeTransform, isDevMode } from '@angular/core';

@Pipe({ name: 'relativeAsset' })
export class RelativeAssetPipe implements PipeTransform {
    transform(fileName: string): string {
        let relativeAssetBasePath = isDevMode()
            ? '/assets/'
            : '/scripts/libs/assets/';
        return relativeAssetBasePath + fileName;
    }
}
