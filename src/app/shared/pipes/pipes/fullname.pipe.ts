import { Pipe, PipeTransform } from '@angular/core';
import { Student } from 'src/app/dashboard/models/student';

@Pipe({
  name: 'fullname',
})
export class FullnamePipe implements PipeTransform {
  transform(value: Student, ...args: unknown[]): unknown {
    const firstArg = args[0];
    const result = `${value.nombre} ${value.apellido}`;

    switch (firstArg) {
      case 'lowercase':
        return result.toLowerCase();
      case 'uppercase':
        return result.toUpperCase();

      default:
        return result;
    }
  }
}
