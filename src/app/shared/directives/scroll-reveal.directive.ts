import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  /** Direction the element comes from before revealing */
  @Input() revealDirection: RevealDirection = 'up';
  /** Delay before the animation starts (ms) */
  @Input() revealDelay: number = 0;
  /** How much of the element must be visible to trigger (0-1) */
  @Input() revealThreshold: number = 0.15;
  /** If true, animation will re-trigger every time the element enters viewport */
  @Input() revealRepeat: boolean = false;

  private observer: IntersectionObserver | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    // Apply the initial "hidden" state class
    const directionClass = this.getDirectionClass();
    this.renderer.addClass(this.el.nativeElement, 'reveal-ready');
    if (directionClass) {
      this.renderer.addClass(this.el.nativeElement, directionClass);
    }

    // Apply delay as inline style
    if (this.revealDelay > 0) {
      this.renderer.setStyle(
        this.el.nativeElement,
        'transition-delay',
        `${this.revealDelay}ms`
      );
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.addClass(this.el.nativeElement, 'revealed');
            if (!this.revealRepeat) {
              this.observer?.unobserve(this.el.nativeElement);
            }
          } else if (this.revealRepeat) {
            this.renderer.removeClass(this.el.nativeElement, 'revealed');
          }
        });
      },
      { threshold: this.revealThreshold }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private getDirectionClass(): string {
    switch (this.revealDirection) {
      case 'up':    return 'reveal-from-up';
      case 'down':  return 'reveal-from-down';
      case 'left':  return 'reveal-from-left';
      case 'right': return 'reveal-from-right';
      case 'scale': return 'reveal-from-scale';
      case 'fade':  return 'reveal-from-fade';
      default:      return 'reveal-from-up';
    }
  }
}
