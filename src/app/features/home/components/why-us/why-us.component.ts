import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

interface PillarStep {
  label: string;
  subtext?: string;
}

interface Pillar {
  id: string;
  title: string;
  shortTitle: string;
  icon: string;
  description: string;
  steps: PillarStep[];
  emoji: string;
  focusTitle: string;
  colorClass: string;
  tagClass: string;
  dotClass: string;
  glowClass: string;
  processType: string;
  statusDotClass: string;
  bgImage: string;
  layout: 'Standard' | 'Reverse' | 'Center';
}

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  animations: [
    trigger('contentFade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('400ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ],
  template: `
    <section class="py-24 bg-slate-50 relative overflow-hidden">
      <!-- Executive Background Elements -->
      <div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(213,160,33,0.03)_0%,transparent_50%)]"></div>
      
      <div class="container mx-auto px-6 relative z-10">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <div appScrollReveal revealDirection="fade" [revealDelay]="0"
               class="inline-block px-4 py-1 border border-[#d5a021]/30 rounded-full text-[#d5a021] text-[10px] font-bold tracking-[0.4em] uppercase mb-6 bg-white shadow-sm">
            Institutional Journey
          </div>
          <h2 appScrollReveal revealDirection="up" [revealDelay]="100"
              class="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6 uppercase italic">
            Why <span class="text-[#d5a021]">Rao’s Consulting Engineers?</span>
          </h2>
          <p appScrollReveal revealDirection="up" [revealDelay]="220"
             class="text-xl text-slate-600 font-light max-w-3xl mx-auto leading-relaxed">
            We move projects from <span class="text-slate-900 font-bold">concept to construction</span> — efficiently.
          </p>
        </div>

        <!-- DASHBOARD CONTAINER -->
        <div appScrollReveal revealDirection="scale" [revealDelay]="80" [revealThreshold]="0.1"
             class="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-w-7xl mx-auto relative">
          
          <!-- SEGMENTED SELECTOR (Top Bar) -->
          <div class="grid grid-cols-2 lg:flex lg:flex-nowrap border-b border-slate-100 bg-slate-50/50">
            <button 
              *ngFor="let pillar of pillars; let i = index"
              appScrollReveal
              revealDirection="up"
              [revealDelay]="200 + (i * 80)"
              [revealThreshold]="0.05"
              (click)="selectPillar(pillar)"
              [class.active]="selectedPillar.id === pillar.id"
              class="pillar-tab flex-1 flex flex-col items-center justify-center py-6 px-4 transition-all duration-300 relative group border-b-4 border-transparent hover:bg-white"
            >
              <div 
                class="w-10 h-10 mb-2 rounded-xl flex items-center justify-center transition-all duration-500 transform group-hover:-translate-y-1"
                [ngClass]="selectedPillar.id === pillar.id ? 'bg-[#d5a021] text-white shadow-xl rotate-3' : 'bg-slate-200 text-slate-400 group-hover:bg-slate-300'"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path [attr.d]="pillar.icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </svg>
              </div>
              <span 
                class="text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300"
                [ngClass]="selectedPillar.id === pillar.id ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-600'"
              >
                {{ pillar.shortTitle }}
              </span>
              <!-- Active Indicator Line -->
              <div 
                *ngIf="selectedPillar.id === pillar.id"
                class="absolute bottom-[-4px] left-0 w-full h-1 bg-[#d5a021] z-20"
              ></div>
            </button>
          </div>

          <!-- CONTENT PANE (Fully Redesigned for Variety) -->
          <div class="relative min-h-[650px] overflow-hidden"
               [ngClass]="selectedPillar.colorClass">
            
            <!-- Dynamic Background Glow -->
            <div 
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[600px] md:h-[600px] rounded-full blur-[100px] md:blur-[140px] opacity-20 transition-colors duration-1000 pointer-events-none"
              [ngClass]="selectedPillar.glowClass"
            ></div>

            <!-- Background Asset Watermark -->
            <div class="absolute inset-0 opacity-[0.05] pointer-events-none transition-all duration-1000"
                 [style.background-image]="'url(' + selectedPillar.bgImage + ')'"
                 [style.background-size]="'cover'"
                 [style.background-position]="'center'">
            </div>
            
            <div *ngIf="selectedPillar" @contentFade
                 class="p-8 md:p-14 lg:p-16 flex flex-col items-center justify-center relative z-10 h-full"
                 [ngClass]="{'md:flex-row gap-12 lg:gap-20': selectedPillar.layout !== 'Center'}">
              
              <!-- VARIANT 1: LEFT NARRATIVE (Standard / Reverse) -->
              <div class="w-full md:w-[48%] lg:w-[45%]"
                   [ngClass]="{'md:order-2': selectedPillar.layout === 'Reverse'}">
                <div 
                  class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-8 border shadow-sm backdrop-blur-sm"
                  [ngClass]="selectedPillar.tagClass"
                >
                  <span class="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]" [ngClass]="selectedPillar.dotClass"></span>
                  Pillar 0{{ getPillarIndex(selectedPillar.id) }}
                </div>
                
                <h3 class="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-[1.15] tracking-tight">
                  {{ selectedPillar.title }}
                </h3>
                
                <p class="text-slate-600 text-xl md:text-2xl font-light mb-12 leading-relaxed border-l-4 border-[#d5a021]/20 pl-8">
                  {{ selectedPillar.description }}
                </p>
                
                <div class="p-8 bg-white/70 backdrop-blur-md rounded-3xl border border-white/50 flex items-center gap-8 group/focus hover:border-[#d5a021]/40 transition-all hover:shadow-2xl hover:-translate-y-1">
                  <div class="w-20 h-20 rounded-2xl bg-[#f8fafc] shadow-inner flex items-center justify-center text-4xl transition-transform group-hover/focus:scale-110 group-hover/focus:rotate-6">
                     {{ selectedPillar.emoji }}
                  </div>
                  <div>
                     <div class="text-[#d5a021] text-xs font-bold uppercase tracking-[0.2em] mb-2">Executive Focus</div>
                     <div class="text-slate-900 text-xl font-bold tracking-tight">{{ selectedPillar.focusTitle }}</div>
                  </div>
                </div>
              </div>

              <!-- VARIANT 2: PROCESS PANEL -->
              <div class="w-full md:w-[52%] lg:w-[55%] mt-12 md:mt-0"
                   [ngClass]="{'md:order-1': selectedPillar.layout === 'Reverse'}">
                
                <!-- Specialized Visual for Entitlement Strategy -->
                <div *ngIf="selectedPillar.id === 'vision'" class="bg-indigo-950 rounded-3xl p-10 shadow-3xl border border-white/10 relative overflow-hidden">
                   <div class="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent"></div>
                   <div class="relative z-10">
                      <div class="flex items-center justify-between mb-10 border-b border-white/10 pb-6">
                         <span class="text-white text-xs font-mono uppercase tracking-[0.3em]">Entitlement Rhythm</span>
                         <span class="text-blue-400 font-mono text-[10px]">VERIFIED 2024</span>
                      </div>
                      <div class="space-y-8">
                         <div *ngFor="let step of selectedPillar.steps; let i = index" class="relative">
                            <div class="flex items-center justify-between mb-2">
                               <span class="text-white text-sm font-medium tracking-wide">{{ step.label }}</span>
                               <span class="text-[#d5a021] text-[10px] font-mono">COMPLETE</span>
                            </div>
                            <div class="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                               <div class="h-full bg-blue-500 transition-all duration-1000 delay-300" [style.width]="(80 + (i*5)) + '%'"></div>
                            </div>
                            <p class="text-slate-400 text-xs mt-3 font-light leading-relaxed">{{ step.subtext }}</p>
                         </div>
                      </div>
                   </div>
                </div>

                <!-- Specialized Visual for Technical Precision -->
                <div *ngIf="selectedPillar.id === 'precision'" class="p-4 bg-slate-100 rounded-3xl border border-slate-200">
                   <div class="bg-white rounded-2xl p-8 border border-slate-200 shadow-xl">
                      <div class="flex items-center gap-3 mb-8">
                         <div class="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></div>
                         <span class="text-slate-900 text-[10px] font-bold uppercase tracking-[0.3em]">Standard Audit Cycle</span>
                      </div>
                      <div class="space-y-6">
                         <div *ngFor="let step of selectedPillar.steps" class="flex gap-6 items-start group/step">
                            <div class="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover/step:bg-amber-50 group-hover/step:border-amber-200 transition-colors">
                               <svg class="w-5 h-5 text-slate-400 group-hover/step:text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                               </svg>
                            </div>
                            <div>
                               <div class="text-slate-900 font-bold text-base mb-1">{{ step.label }}</div>
                               <div class="text-slate-500 text-sm font-light leading-snug">{{ step.subtext }}</div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                <!-- Specialized Visual for Texas Authority (Minimal Map Only) -->
                <div *ngIf="selectedPillar.id === 'territory'" class="bg-slate-900 rounded-3xl p-1 shadow-3xl border border-slate-800 relative overflow-hidden group/texas">
                   <div class="bg-slate-950 rounded-2xl p-10 lg:p-12 relative overflow-hidden min-h-[460px] flex flex-col items-center justify-center">
                      <!-- High Fidelity Texas Map Asset (CENTERED & FITTED) -->
                      <div class="absolute inset-8 opacity-90 bg-[url('assets/images/brand/texas_map_outline.png')] bg-contain bg-center bg-no-repeat group-hover/texas:scale-110 transition-transform duration-[10s] ease-out pointer-events-none"></div>
                   </div>
                </div>

                <!-- Specialized Visual for ROI & Accountability -->
                <div *ngIf="selectedPillar.id === 'accountability'" class="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-3xl ring-1 ring-white/10 group/img">
                   <img [src]="selectedPillar.bgImage" alt="Accountability" class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover/img:scale-100">
                   <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                   <div class="absolute bottom-10 left-10 right-10">
                      <div class="text-[#d5a021] text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Firm Philosophy</div>
                      <div class="text-white text-3xl font-bold leading-tight mb-6">Built on Logic, Excellence, <br> & Family.</div>
                      <div class="flex gap-1.5">
                         <div class="w-8 h-1 bg-[#d5a021] rounded-full"></div>
                         <div class="w-2 h-1 bg-white/20 rounded-full"></div>
                         <div class="w-2 h-1 bg-white/20 rounded-full"></div>
                      </div>
                   </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        <!-- Bottom CTA -->
        <div class="mt-20 text-center">
           <button class="bg-[#d5a021] text-white px-12 py-5 rounded-full font-bold uppercase tracking-[0.3em] text-sm hover:bg-amber-600 transition-all shadow-2xl hover:shadow-[#d5a021]/30 hover:-translate-y-1 active:scale-95">
              Initiate Strategic Review
           </button>
           <p class="text-slate-400 mt-8 text-xs font-mono uppercase tracking-[0.2em]">© 2026 Rao’s Consulting Engineers • SATX Headquarters</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .pillar-tab.active {
      background: #ffffff;
    }
    .pillar-tab:not(.active):hover {
      background: #ffffff;
    }
  `]
})
export class WhyUsComponent {
  isTransitioning = false;

  getPillarIndex(id: string): number {
    return this.pillars.findIndex(p => p.id === id) + 1;
  }

  pillars: Pillar[] = [
    {
      id: 'vision',
      shortTitle: 'Entitlement Strategy',
      title: 'From Concept to Construction — Efficiently.',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      description: 'Land development is not just design — it’s entitlement navigation, risk management, and execution. We understand the regulatory landscape in Texas and structure every project to move through agencies with clarity and purpose.',
      emoji: '📈',
      focusTitle: 'Concept-to-Construction Efficiency',
      colorClass: 'bg-white',
      tagClass: 'bg-indigo-50 border-indigo-100 text-indigo-600',
      dotClass: 'bg-indigo-500',
      glowClass: 'bg-indigo-400',
      processType: 'STRATEGY MAP',
      statusDotClass: 'bg-indigo-500',
      bgImage: 'assets/images/brand/experience_hero_blueprint.png',
      layout: 'Standard',
      steps: [
        { label: 'Entitlement Navigation', subtext: 'Moving from raw land to actionable permits' },
        { label: 'Regulatory Clarity', subtext: 'Structuring submittals for agency alignment' },
        { label: 'Execution Planning', subtext: 'Phasing for market timing and ROI' }
      ]
    },
    {
      id: 'precision',
      shortTitle: 'Technical Precision',
      title: 'Designed with Approval in Mind',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      description: 'Our plans are engineered for constructability and agency approval. We anticipate reviewer concerns before submission and minimize costly cycles of comments and delays.',
      emoji: '📐',
      focusTitle: 'Approval-Minded Engineering',
      colorClass: 'bg-slate-50/50',
      tagClass: 'bg-amber-50 border-amber-100 text-[#d5a021]',
      dotClass: 'bg-[#d5a021]',
      glowClass: 'bg-amber-400',
      processType: 'TECHNICAL AUDIT',
      statusDotClass: 'bg-amber-500',
      bgImage: 'assets/images/brand/contact_hero_blueprint.png',
      layout: 'Reverse',
      steps: [
        { label: 'Drainage & Stormwater', subtext: 'Rigorous hydrologic modeling and compliance' },
        { label: 'Site Grading Optimization', subtext: 'Balancing earthwork for cost-efficiency' },
        { label: 'Utility Coordination', subtext: 'Ensuring seamless SAWS/infrastructure sync' }
      ]
    },
    {
      id: 'territory',
      shortTitle: 'Texas Authority',
      title: 'Deep Knowledge of Texas Jurisdictions',
      icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      description: 'From municipal review processes to agency coordination, we understand how Texas cities operate. That experience translates into faster approvals, cleaner submittals, and fewer surprises.',
      emoji: '📍',
      focusTitle: 'Jurisdictional Logic & Speed',
      colorClass: 'bg-white',
      tagClass: 'bg-red-50 border-red-100 text-red-600',
      dotClass: 'bg-red-500',
      glowClass: 'bg-red-400',
      processType: 'AGENCY SYNC',
      statusDotClass: 'bg-red-500',
      bgImage: 'assets/images/brand/rce_topographic_texture_1768626380325.png',
      layout: 'Standard',
      steps: [
        { label: 'Agency Coordination', subtext: 'Navigating TxDOT, TCEQ, and City Staff' },
        { label: 'Regional Local Code Audit', subtext: 'Ensuring absolute jurisdictional compliance' },
        { label: 'Expedited Approval Cycles', subtext: 'Mastering the municipal review rhythm' }
      ]
    },
    {
      id: 'accountability',
      shortTitle: 'ROI & Accountability',
      title: 'Business-Minded Engineering',
      icon: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z',
      description: 'We think like developers because we work alongside them. Engineering decisions impact ROI, construction cost, and market timing. We design accordingly, with executive-level oversight from start to finish.',
      emoji: '🤝',
      focusTitle: 'Business-Minded ROI Oversight',
      colorClass: 'bg-slate-900/5',
      tagClass: 'bg-slate-900 border-slate-700 text-slate-400',
      dotClass: 'bg-[#d5a021]',
      glowClass: 'bg-slate-400',
      processType: 'EXECUTIVE OVERLOOK',
      statusDotClass: 'bg-green-500',
      bgImage: 'assets/abstract-hero.png',
      layout: 'Reverse',
      steps: [
        { label: 'Developer-Minded ROI', subtext: 'Engineering decisions mapped to budget realities' },
        { label: 'Progressive Oversight', subtext: 'Director-level review on all key deliverables' },
        { label: 'Proactive Communication', subtext: 'Defined deliverables with no ambiguity' }
      ]
    }
  ];

  selectedPillar: Pillar = this.pillars[0];

  selectPillar(pillar: Pillar) {
    if (this.selectedPillar.id === pillar.id) return;
    this.selectedPillar = pillar;
  }
}
