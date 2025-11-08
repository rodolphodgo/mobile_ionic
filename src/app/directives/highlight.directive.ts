import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]', 
  standalone: true, 
})
export class HighlightDirective {
  
  @HostBinding('style.boxShadow') 
  boxShadow!: string;

  @HostListener('mouseenter') 
  onMouseEnter() {
    this.boxShadow = '0 4px 10px rgba(123, 30, 58, 0.5)'; 
  }

  @HostListener('mouseleave') 
  onMouseLeave() {
    this.boxShadow = 'none';
  }

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.cursor = 'pointer';
  }
}