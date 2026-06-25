import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, RouterModule, ScrollRevealDirective],
  template: `
    <section class="relative py-24 bg-white overflow-hidden">
      <!-- Decorative Backdrop Image: Gold Architectural Skyline Sketch -->
      <div class="absolute inset-0 z-0 pointer-events-none opacity-[0.08] lg:opacity-[0.12]">
        <img src="assets/images/brand/austin-skyline-gold-sketch.png" 
          alt="" 
          class="w-full h-full object-contain object-left translate-x-[-10%] scale-150 select-none">
      </div>

      <!-- Geometry Accent -->
      <div class="absolute top-0 right-0 w-1/3 h-full bg-slate-50 skew-x-12 translate-x-32 z-0 hidden lg:block"></div>

      <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <!-- Left Column: Context & Categories -->
          <div class="space-y-10">
            <div appScrollReveal revealDirection="left" [revealDelay]="0" [revealThreshold]="0.15">
              <span class="text-[#d5a021] font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Our Portfolio</span>
              <h2 class="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                Selected Project <br/>Experience
              </h2>
              <p class="text-lg text-slate-600 leading-relaxed max-w-xl font-light">
                From master-planned communities to complex municipal infrastructure, our portfolio reflects 
                decades of engineering precision across Texas.
              </p>
            </div>

            <!-- Modern Category Ribbons -->
            <div class="space-y-6">
              <!-- Commercial -->
              <div appScrollReveal revealDirection="left" [revealDelay]="100" [revealThreshold]="0.1"
                   class="group border-l-4 border-slate-200 hover:border-[#d5a021] pl-6 transition-all duration-300">
                <h3 class="text-xl font-bold text-slate-800 mb-2 group-hover:text-[#d5a021] transition-colors">Commercial & Retail</h3>
                <p class="text-slate-500 text-sm font-medium tracking-wide">National QSRs • Medical Suites • Retail Pads</p>
              </div>

              <!-- Residential -->
              <div appScrollReveal revealDirection="left" [revealDelay]="200" [revealThreshold]="0.1"
                   class="group border-l-4 border-slate-200 hover:border-[#d5a021] pl-6 transition-all duration-300">
                <h3 class="text-xl font-bold text-slate-800 mb-2 group-hover:text-[#d5a021] transition-colors">Residential & Multi / Family</h3>
                <p class="text-slate-500 text-sm font-medium tracking-wide">Garden-Style Apartments • Townhomes • Master Plans</p>
              </div>

              <!-- Public -->
              <div appScrollReveal revealDirection="left" [revealDelay]="300" [revealThreshold]="0.1"
                   class="group border-l-4 border-slate-200 hover:border-[#d5a021] pl-6 transition-all duration-300">
                <h3 class="text-xl font-bold text-slate-800 mb-2 group-hover:text-[#d5a021] transition-colors">Transportation</h3>
                <p class="text-slate-500 text-sm font-medium tracking-wide">Municipal Drainage • Roadway Expansion • Utility Systems</p>
              </div>
            </div>

            <div class="pt-4">
              <a routerLink="/experience" class="inline-flex items-center text-slate-900 font-bold border-b-2 border-slate-900 pb-1 hover:text-[#d5a021] hover:border-[#d5a021] transition-all group">
                Explore Full Portfolio
                <svg class="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </a>
            </div>
          </div>

          <!-- Right Column: Featured Showcase Card -->
          <div appScrollReveal revealDirection="right" [revealDelay]="150" [revealThreshold]="0.1"
               class="relative group">
            <!-- Image Frame -->
            <div class="relative overflow-hidden rounded-lg shadow-2xl aspect-[4/5] md:aspect-[4/3] transform transition-transform duration-500 hover:-translate-y-2">
              <img src="assets/images/projects/residential_whitestone.png" alt="Whitestone Oaks Apartments Civil Engineering" 
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
              
              <!-- Gradient Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>

              <!-- Floating Card Content -->
              <div class="absolute bottom-0 left-0 w-full p-8 md:p-10">
                <div class="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-sm">
                  <span class="text-[#d5a021] text-xs font-bold uppercase tracking-widest mb-2 block">Featured Case Study</span>
                  <h3 class="text-2xl font-bold text-white mb-3">Whitestone Oaks Apartments</h3>
                  <p class="text-slate-300 text-sm mb-6 line-clamp-2">
                    Comprehensive civil site services including complex grading modeling and drainage optimization for this flagship development.
                  </p>
                  <a [routerLink]="['/experience', 'whitestone-oaks-apartments']" class="text-white text-sm font-bold uppercase tracking-wide flex items-center hover:text-[#d5a021] transition-colors">
                    View Case Study <span class="ml-2">→</span>
                  </a>
                </div>
              </div>
            </div>

            <!-- Decorative Offset Border -->
            <div class="absolute -inset-4 border-2 border-slate-200 z-[-1] rounded-lg transform translate-x-4 translate-y-4 hidden md:block group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500"></div>
          </div>

        </div>
      </div>
    </section>
  `,
  styles: []
})
export class ExperienceComponent { }
