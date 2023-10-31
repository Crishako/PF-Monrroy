import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'promedio'
})
export class PromedioPipe implements PipeTransform {

  transform(calificaciones: { matematicas: number; historia: number; ciencias: number }, decimales: number = 2): number {
    const promedio = (calificaciones.matematicas + calificaciones.historia + calificaciones.ciencias) / 3;
    return parseFloat(promedio.toFixed(decimales));
  }

}
