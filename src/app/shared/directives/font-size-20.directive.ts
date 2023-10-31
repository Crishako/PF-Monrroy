import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFontSize20]'
})
export class FontSize20Directive {

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Cambiar el tamaño de fuente a 20px
    this.renderer.setStyle(this.el.nativeElement, 'font-size', '20px');
  }

}
