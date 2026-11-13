import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- HERO SECTION: Command Your Career (Blueprint Style) -->
    <header class="page-header relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-slate-950 pt-20">
      <!-- Layer 1: Background Image (Team/Professional) -->
      <div class="absolute inset-0 z-0">
        <img src="assets/images/team/professional_ceo_portrait_1770853096194.png" 
          alt="Engineering Team" 
          title="Engineering Team" 
          class="w-full h-full object-cover opacity-40 scale-105 animate-subtle-zoom mix-blend-screen brightness-110 contrast-125">
      </div>

      <!-- Layer 2: Gold Horizon & Haze -->
      <div class="absolute inset-0 z-10 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950/90"></div>
      <div class="absolute inset-0 z-10 bg-gradient-to-r from-slate-950/90 via-transparent to-slate-950/90"></div>
      
      <!-- Layer 3: Blueprint Grid -->
      <div class="absolute inset-0 z-20 opacity-[0.05] pointer-events-none" 
           style="background-image: radial-gradient(circle at 1.5px 1.5px, #d5a021 1px, transparent 0); background-size: 50px 50px;"></div>

      <div class="header-content container relative z-30 text-center px-4 max-w-5xl animate-fade-in text-white">
        <div class="inline-block py-1.5 px-4 border border-[#d5a021]/30 rounded-full bg-slate-950/50 backdrop-blur-md mb-8">
          <span class="text-[#d5a021] text-[10px] font-bold tracking-[0.3em] uppercase">Classified: Top Talent Only</span>
        </div>
        
        <h1 class="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] drop-shadow-2xl">
          COMMAND YOUR <br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#d5a021] via-yellow-200 to-[#d5a021]">CAREER</span>
        </h1>
        
        <p class="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed font-light border-l-2 border-[#d5a021]/50 pl-6 text-left md:text-center md:border-l-0 md:pl-0">
          Join the elite engineering force shaping the future of Texas infrastructure. 
          High stakes. Massive impact. Unmatched legacy.
        </p>

        <div class="flex flex-col md:flex-row gap-6 justify-center">
          <a href="#positions" class="group relative px-8 py-4 bg-[#d5a021] text-slate-900 font-bold uppercase tracking-widest overflow-hidden rounded transition-all hover:shadow-[0_0_20px_rgba(213,160,33,0.4)]">
            <span class="relative z-10">View Active Directives</span>
            <div class="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </a>
          <a routerLink="/about" class="px-8 py-4 border border-[#d5a021]/30 text-white font-bold uppercase tracking-widest hover:bg-[#d5a021]/10 transition-colors duration-300 backdrop-blur-sm rounded hover:border-[#d5a021]">
            Read Our Manifesto
          </a>
        </div>
      </div>
    </header>

    <!-- MISSION BRIEFING (Dark/Technical) -->
    <section class="py-24 bg-slate-950 text-white relative border-y border-white/5">
       <!-- Background Pattern -->
       <div class="absolute inset-0 opacity-[0.03] pointer-events-none" 
            style="background-image: url('assets/images/brand/rce_topographic_texture_1768626380325.png'); background-size: cover;"></div>

      <div class="container mx-auto px-6 relative z-10 max-w-7xl">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div class="flex items-center gap-3 mb-4">
               <span class="h-px w-8 bg-[#d5a021]"></span>
               <h2 class="text-[#d5a021] text-xs font-bold tracking-[0.3em] uppercase">Mission Briefing</h2>
            </div>
            
            <h3 class="text-4xl md:text-5xl font-bold mb-8 leading-tight">Why We Serve <span class="text-white">Texas</span></h3>
            <p class="text-slate-400 text-lg leading-relaxed mb-6 font-light">
              At Rao's Consulting Engineers, we don't just draft plans; we engineer the backbone of civilization. 
              From critical water systems to sprawling transportation networks, our work defines how Texas lives, moves, and grows.
            </p>
            <p class="text-slate-400 text-lg leading-relaxed mb-10 font-light">
              We operate with military precision and a family ethos. Excellence is our standard, and integrity is our currency.
            </p>
            
            <div class="grid grid-cols-2 gap-6">
              <div class="p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-[#d5a021]/30 transition-colors group">
                <div class="text-4xl font-black text-white mb-2 group-hover:text-[#d5a021] transition-colors">100%</div>
                <div class="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Client Retention</div>
              </div>
              <div class="p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-[#d5a021]/30 transition-colors group">
                <div class="text-4xl font-black text-white mb-2 group-hover:text-[#d5a021] transition-colors">A+</div>
                <div class="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Culture Rating</div>
              </div>
            </div>
          </div>
          
          <div class="relative group">
            <div class="absolute -inset-4 border border-[#d5a021]/20 rounded-2xl transform rotate-2 group-hover:rotate-1 transition-transform duration-700"></div>
            <div class="absolute -inset-4 border border-white/5 rounded-2xl transform -rotate-2 group-hover:-rotate-1 transition-transform duration-700"></div>
            <img src="assets/images/team/infrastructure_designer_portrait_2_1770853202858.png" 
              alt="Team Collaboration" 
              title="Team Collaboration" 
              class="relative rounded-xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 w-full object-cover aspect-[4/3] border border-white/10">
          </div>
        </div>
      </div>
    </section>

    <!-- ACTIVE DIRECTIVES (JOBS) -->
    <section id="positions" class="py-24 bg-slate-900 relative">
      <div class="container mx-auto px-6 max-w-5xl">
        <div class="text-center mb-16">
          <span class="text-[#d5a021] text-xs font-bold tracking-[0.3em] uppercase block mb-3">Personnel Requirements</span>
          <h3 class="text-4xl font-bold text-white tracking-tight">Active Directives</h3>
        </div>

        <div class="space-y-4">
          <!-- Job Item 1 -->
          <div class="group relative bg-slate-950 border border-white/5 p-8 rounded-xl hover:border-[#d5a021]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
             <div class="absolute top-0 left-0 w-1 h-full bg-[#d5a021] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>
             
             <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 pl-4">
              <div>
                <h4 class="text-2xl font-bold text-white mb-2 group-hover:text-[#d5a021] transition-colors">Senior Civil Engineer (P.E.)</h4>
                <div class="flex gap-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <span class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-[#d5a021] rounded-full"></span> San Antonio Office</span>
                  <span>•</span>
                  <span>Full-Time</span>
                </div>
              </div>
              <a href="mailto:rao@raosengineering.com?subject=Application: Senior Civil Engineer" 
                 class="px-8 py-3 bg-white/5 text-white text-xs font-bold uppercase tracking-widest hover:bg-[#d5a021] hover:text-slate-900 transition-all rounded border border-white/10 hover:border-[#d5a021]">
                Initiate Application
              </a>
            </div>
          </div>

          <!-- Job Item 2 (Placeholder example) -->
           <div class="group relative bg-slate-950 border border-white/5 p-8 rounded-xl hover:border-[#d5a021]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
             <div class="absolute top-0 left-0 w-1 h-full bg-[#d5a021] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>
             
             <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 pl-4">
              <div>
                <h4 class="text-2xl font-bold text-white mb-2 group-hover:text-[#d5a021] transition-colors">Graduate Engineer (E.I.T.)</h4>
                <div class="flex gap-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <span class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-[#d5a021] rounded-full"></span> San Antonio Office</span>
                  <span>•</span>
                  <span>Full-Time</span>
                </div>
              </div>
              <a href="mailto:rao@raosengineering.com?subject=Application: Graduate Engineer" 
                 class="px-8 py-3 bg-white/5 text-white text-xs font-bold uppercase tracking-widest hover:bg-[#d5a021] hover:text-slate-900 transition-all rounded border border-white/10 hover:border-[#d5a021]">
                Initiate Application
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
    @keyframes subtle-zoom {
      0% { transform: scale(1.05); }
      50% { transform: scale(1.10); }
      100% { transform: scale(1.05); }
    }
    .animate-subtle-zoom {
      animation: subtle-zoom 20s infinite ease-in-out;
    }
  `]
})
export class CareersComponent { }
