import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServiceNavigatorComponent } from '../../../shared/components/service-navigator/service-navigator.component';
import { ServiceHudComponent } from '../../../shared/components/service-hud/service-hud.component';

@Component({
  selector: 'app-environmental',
  standalone: true,
  imports: [CommonModule, RouterModule, ServiceNavigatorComponent, ServiceHudComponent],
  templateUrl: './environmental.component.html',
  styleUrl: './environmental.component.css'
})
export class EnvironmentalComponent implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      this.initializeAnimations();
    }, 100);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private initializeAnimations(): void {
    if (typeof window === 'undefined') return; // prerender has no browser
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      this.skipAnimations();
      return;
    }

    // Set up Intersection Observer for scroll animations
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Element is entering viewport - show it
            entry.target.classList.add('visible');
          } else {
            // Element is leaving viewport - hide it
            entry.target.classList.remove('visible');
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px'
      }
    );

    // Observe all elements with animate-on-scroll class
    const elements = this.elementRef.nativeElement.querySelectorAll('.animate-on-scroll');
    elements.forEach((el: Element) => this.observer?.observe(el));
  }

  private skipAnimations(): void {
    const elements = this.elementRef.nativeElement.querySelectorAll('.animate-on-scroll');
    elements.forEach((el: Element) => {
      el.classList.add('no-animation');
      el.classList.add('visible');
    });
  }
}
