import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appResaltarAlumno]'
})
export class ResaltarAlumnoDirective {

  @Input('appResaltarAlumno') calificaciones: { matematicas: number; historia: number; ciencias: number } = { matematicas: 0, historia: 0, ciencias: 0 };

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const promedio = (this.calificaciones.matematicas + this.calificaciones.historia + this.calificaciones.ciencias) / 3;
    console.log(promedio);
    
    if (promedio >= 90) {
      this.el.nativeElement.style.backgroundColor = 'green';
    }
    if (promedio <= 50){
      this.el.nativeElement.style.backgroundColor = 'red';
    } 
  }
}
