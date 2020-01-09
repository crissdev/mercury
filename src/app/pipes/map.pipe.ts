import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'map',
})
export class MapPipe implements PipeTransform {
  transform(value: any[], prop: string): any[] {
    if (Array.isArray(value)) {
      console.assert(typeof prop === 'string');
      return value.map(item => item[prop]);
    } else {
      return value;
    }
  }
}
