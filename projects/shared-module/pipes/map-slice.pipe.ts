import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'mapSlice' })
export class MapSlicePipe implements PipeTransform {
    transform<K, V>(
        map: Map<K, V>,
        startIndex: number,
        endIndex: number = map.size
    ): Map<K, V> {
        return Array.from(map.keys())
            .slice(startIndex, endIndex)
            .reduce((m, k) => m.set(k, map.get(k)), new Map<K, V>());
    }
}
