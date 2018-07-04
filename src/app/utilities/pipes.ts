import { Pipe, PipeTransform } from '@angular/core';


// tslint:disable-next-line:use-pipe-transform-interface
@Pipe({ name: 'transfromArray' })

export class TransfromArray implements PipeTransform {
    transform(value, args) {
        return Array.from(value);
    }
}
