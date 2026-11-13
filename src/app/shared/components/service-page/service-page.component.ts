import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServiceHudComponent } from '../service-hud/service-hud.component';
import { ServiceNavigatorComponent } from '../service-navigator/service-navigator.component';
import { ServicePageContent } from './service-page.model';

/**
 * The single template shared by every service page. A service page supplies
 * only its content (see service-page.model.ts); layout, styling and scroll
 * behaviour live here, so a change made once applies to all services.
 */
@Component({
  selector: 'app-service-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ServiceHudComponent, ServiceNavigatorComponent],
  templateUrl: './service-page.component.html',
  styleUrl: './service-page.component.css',
})
export class ServicePageComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) content!: ServicePageContent;

  // Per-service theme, exposed to the stylesheet as CSS custom properties.
  @HostBinding('style.--service-accent') get accent() { return this.content.theme.accent; }
  @HostBinding('style.--service-accent-dark') get accentDark() { return this.content.theme.accentDark; }
  @HostBinding('style.--service-accent-rgb') get accentRgb() { return this.content.theme.accentRgb; }
  @HostBinding('style.--service-texture') get texture() { return `url('${this.content.theme.texture}')`; }

  private observer?: IntersectionObserver;
  private animatedStats = new Set<HTMLElement>();

  constructor(
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    // Scroll animations need a real browser; skip during prerendering.
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    setTimeout(() => this.initializeAnimations(), 100);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private initializeAnimations(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.skipAnimations();
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('stat-item')) {
              const element = entry.target as HTMLElement;
              if (!this.animatedStats.has(element)) {
                this.animatedStats.add(element);
                this.animateStats(element);
              }
            }
          } else if (!entry.target.classList.contains('stat-item')) {
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px' }
    );

    this.elementRef.nativeElement
      .querySelectorAll('.animate-on-scroll')
      .forEach((el: Element) => this.observer?.observe(el));
  }

  private skipAnimations(): void {
    this.elementRef.nativeElement
      .querySelectorAll('.animate-on-scroll')
      .forEach((el: Element) => el.classList.add('no-animation', 'visible'));
  }

  private animateStats(element: HTMLElement): void {
    const numberElement = element.querySelector('.stat-number[data-target]') as HTMLElement | null;
    if (!numberElement) return;

    const target = parseInt(numberElement.getAttribute('data-target') || '0', 10);
    const steps = 60;
    const increment = target / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      numberElement.textContent = Math.min(Math.floor(increment * step), target).toString();
      if (step >= steps) {
        numberElement.textContent = target.toString();
        clearInterval(timer);
      }
    }, 2000 / steps);
  }
}
