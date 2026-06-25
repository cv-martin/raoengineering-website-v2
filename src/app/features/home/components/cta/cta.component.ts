import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [CommonModule, RouterModule, ScrollRevealDirective],
  template: `
    <section class="relative py-36 overflow-hidden bg-slate-900">

      <!-- Decorative radial glow -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#d5a021]/10 blur-[120px]"></div>
        <div class="absolute top-0 right-0 w-96 h-96 rounded-full bg-amber-400/5 blur-[80px]"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-blue-500/5 blur-[80px]"></div>
      </div>

      <!-- Dot grid -->
      <div class="absolute inset-0 opacity-[0.04] pointer-events-none"
           style="background-image: radial-gradient(circle, #ffffff 1px, transparent 1px); background-size: 36px 36px;"></div>

      <!-- Thin top border accent -->
      <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d5a021]/50 to-transparent"></div>

      <div class="relative z-10 max-w-4xl mx-auto px-6 text-center">

        <!-- Eyebrow -->
        <div appScrollReveal revealDirection="fade" [revealDelay]="0" [revealThreshold]="0.2"
             class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d5a021]/30 bg-[#d5a021]/10 mb-8">
          <span class="w-1.5 h-1.5 rounded-full bg-[#d5a021] animate-pulse"></span>
          <span class="text-[#d5a021] text-[10px] font-bold tracking-[0.4em] uppercase">Let's Build Together</span>
        </div>

        <!-- Heading -->
        <h2 appScrollReveal revealDirection="up" [revealDelay]="120" [revealThreshold]="0.2"
            class="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 leading-[1.1]">
          Ready to Start<br>
          <span class="text-[#d5a021]">Your Project?</span>
        </h2>

        <!-- Subtext -->
        <p appScrollReveal revealDirection="up" [revealDelay]="240" [revealThreshold]="0.2"
           class="text-lg md:text-xl text-slate-400 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
          Let's discuss how Rao's Consulting Engineers can support your next development —
          from concept through construction.
        </p>

        <!-- CTA Buttons -->
        <div appScrollReveal revealDirection="up" [revealDelay]="360" [revealThreshold]="0.2"
             class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a routerLink="/contact"
             class="group relative inline-flex items-center gap-3 bg-[#d5a021] text-white px-10 py-5 font-bold uppercase tracking-[0.2em] text-sm transition-all duration-300 hover:bg-amber-500 hover:shadow-2xl hover:shadow-[#d5a021]/30 hover:-translate-y-1 active:scale-95 rounded-sm">
            Contact Us Today
            <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
          <a routerLink="/experience"
             class="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium tracking-wide transition-colors duration-300 border border-white/10 px-8 py-5 rounded-sm hover:border-white/30 hover:bg-white/5">
            View Our Portfolio
          </a>
        </div>

        <!-- Trust signals -->
        <div appScrollReveal revealDirection="up" [revealDelay]="480" [revealThreshold]="0.2"
             class="mt-16 pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
          <div class="flex items-center gap-3 text-slate-500">
            <svg class="w-5 h-5 text-[#d5a021]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span class="text-sm">Texas-Based Firm</span>
          </div>
          <div class="flex items-center gap-3 text-slate-500">
            <svg class="w-5 h-5 text-[#d5a021]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            <span class="text-sm">Licensed &amp; Insured</span>
          </div>
          <div class="flex items-center gap-3 text-slate-500">
            <svg class="w-5 h-5 text-[#d5a021]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span class="text-sm">Fast Turnaround</span>
          </div>
        </div>

      </div>
    </section>
  `,
})
export class CtaComponent {}
