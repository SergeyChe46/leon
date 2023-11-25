import { Pipe, PipeTransform } from '@angular/core';
import { Book } from 'src/app/models/book.interface';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(
    value: any[],
    column: string,
    order: 'asc' | 'desc' = 'asc'
  ): Book[] {
    return value.sort((a, b) => {
      if (order === 'asc') {
        return a[column] - b[column];
      } else if (order === 'desc') {
        return b[column] - a[column];
      }
      return 0;
    });
  }
}
