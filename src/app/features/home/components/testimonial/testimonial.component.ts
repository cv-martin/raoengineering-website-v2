import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <section class="relative py-24 overflow-hidden bg-white border-t border-slate-100">

      <!-- Subtle background accent -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-amber-50 blur-[80px] opacity-60"></div>
      </div>

      <div class="relative z-10 max-w-4xl mx-auto px-6 text-center">

        <!-- Quote icon -->
        <div appScrollReveal revealDirection="scale" [revealDelay]="0" [revealThreshold]="0.2"
             class="flex justify-center mb-8">
          <div class="w-14 h-14 rounded-full bg-[#d5a021]/10 flex items-center justify-center">
            <svg class="w-7 h-7 text-[#d5a021]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
          </div>
        </div>

        <!-- Quote text -->
        <blockquote appScrollReveal revealDirection="up" [revealDelay]="120" [revealThreshold]="0.2"
                    class="text-xl md:text-2xl font-light text-slate-700 leading-relaxed italic mb-8 max-w-3xl mx-auto">
          "RCE Engineering continues to exceed expectations for us and our partners.
          Their team has been a trusted resource across projects ranging from early
          site selection to complex, multi-phase developments. Their attention to
          detail, understanding of local codes, and ability to deliver innovative
          solutions have played a key role in our continued success."
        </blockquote>

        <!-- Attribution -->
        <div appScrollReveal revealDirection="fade" [revealDelay]="300" [revealThreshold]="0.2"
             class="flex items-center justify-center gap-4">
          <div class="h-px w-12 bg-[#d5a021]/40"></div>
          <cite class="not-italic text-sm font-semibold text-slate-500 tracking-wide uppercase">Long-term Development Partner</cite>
          <div class="h-px w-12 bg-[#d5a021]/40"></div>
        </div>

      </div>
    </section>
  `,
  styles: []
})
export class TestimonialComponent {}
