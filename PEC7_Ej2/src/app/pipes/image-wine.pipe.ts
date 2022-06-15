import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageWine'
})
export class ImageWinePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value === '' ? 'assets/images/wine1.jpg' : value; 
  }

}
