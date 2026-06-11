import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Project {
  title: string;
  category: string;
  location: string;
  image: string;
  description: string;
  challengesSummary?: string;
  scope: string;
  services: string[];
  acreage?: number;
  featured?: boolean;
  hasActualImage?: boolean; // New flag to distinguish site photography from fallbacks
  rotate?: number;
}

interface CategoryMetadata {
  id: string;
  title: string;
  description: string;
  stats: string[];
}

@Component({
  selector: 'app-experience-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <header class="page-header relative h-[75vh] min-h-[700px] flex flex-col items-center justify-center overflow-hidden bg-slate-950 pt-32 pb-12">
      <!-- Layer 1: High-Impact Technical Blueprint -->
      <div class="absolute inset-0 z-0 scale-110">
        <img src="assets/images/brand/experience_hero_blueprint.png" 
          alt="Technical Engineering Sketch" 
          class="w-full h-full object-cover opacity-[0.95] mix-blend-screen brightness-110 contrast-125">
      </div>

      <!-- Layer 2: Subtle Gold Horizon Glow -->
      <div class="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-[#d5a021]/10 to-transparent mix-blend-overlay"></div>

      <!-- Layer 3: Dynamic Gradient System (Clearer Center) -->
      <div class="absolute inset-0 bg-slate-950/20 z-20"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950 z-20 opacity-80"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 z-20"></div>
      
      <!-- Layer 4: Micro-Grid Precision Pattern (Ultra Subtle) -->
      <div class="absolute inset-0 z-20 opacity-[0.03] pointer-events-none" 
           style="background-image: radial-gradient(circle at 1.5px 1.5px, #d5a021 1px, transparent 0); background-size: 50px 50px;"></div>

      <div class="header-content container relative z-30 text-center px-4 max-w-5xl">
        <div class="inline-flex items-center gap-3 mb-6 animate-fade-in">
          <span class="h-[1px] w-8 bg-[#d5a021]"></span>
          <span class="text-[#d5a021] font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs">Proven Project Delivery</span>
          <span class="h-[1px] w-8 bg-[#d5a021]"></span>
        </div>
        
        <h1 class="page-title text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
          Engineering the <br class="hidden md:block">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#d5a021] via-yellow-200 to-[#d5a021]">Built Environment</span>
        </h1>
        
        <p class="page-subtitle text-base md:text-xl text-slate-300 mb-10 font-light max-w-2xl mx-auto leading-relaxed border-l-2 border-[#d5a021]/20 pl-6">
          Architecting Texas through rigorous technical analysis, precision site execution, and complex infrastructure delivery.
        </p>

        <!-- Executive Metrics Bar -->
        <div class="max-w-4xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-around gap-8 relative overflow-hidden group">
          <div class="absolute inset-0 bg-gradient-to-r from-[#d5a021]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="text-center relative z-10 w-full md:w-auto">
            <div class="text-3xl md:text-4xl font-bold text-white mb-1">Texas<span class="text-[#d5a021] text-xl">Wide</span></div>
            <div class="text-[10px] uppercase tracking-[0.2em] text-[#d5a021] font-bold">Deep Infrastructure</div>
          </div>
        </div>

      </div>

      <!-- Scroll Indicator -->
      <button (click)="scrollToProjects()" class="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce opacity-50 hover:opacity-100 transition-opacity duration-300 group cursor-pointer border-none bg-transparent z-40">
        <span class="text-[9px] text-white uppercase tracking-[0.4em] font-bold group-hover:text-[#d5a021] transition-colors mb-1">Explore Portfolio</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[#d5a021]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>
    </header>

    <div class="bg-slate-50 py-16">
      <div class="container mx-auto px-4">
        
        <!-- PROJECT FILTER BAR -->
        <div class="flex flex-wrap justify-center gap-4 mb-10">
          <button *ngFor="let filter of filters" 
            (click)="setFilter(filter)"
            [class.bg-[#d5a021]]="activeFilter === filter"
            [class.text-slate-900]="activeFilter === filter"
            [class.bg-white]="activeFilter !== filter"
            [class.text-slate-600]="activeFilter !== filter"
            [class.border-[#d5a021]]="activeFilter === filter"
            class="px-6 py-2 rounded-full border border-slate-200 text-xs font-bold uppercase tracking-widest transition-all hover:border-[#d5a021] shadow-sm">
            {{ filter }}
          </button>
        </div>

        <!-- SEARCH BAR -->
        <div class="max-w-xl mx-auto mb-20 relative px-4">
          <div class="relative group">
            <input 
              type="text" 
              [(ngModel)]="searchQuery" 
              placeholder="Search projects by name, location, or scope..." 
              class="w-full bg-white border border-slate-200 rounded-full pl-14 pr-12 py-5 text-sm focus:border-[#d5a021] outline-none transition-all shadow-sm group-hover:shadow-md italic font-light tracking-wide">
            
            <!-- Search Icon -->
            <svg class="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-hover:text-[#d5a021] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>

            <!-- Clear Button -->
            <button *ngIf="searchQuery" 
              (click)="searchQuery = ''" 
              class="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-900 transition-colors p-1">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <!-- Search Progress Ring (Ultra Subtle) -->
          <div *ngIf="searchQuery" class="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
            <span class="text-[9px] uppercase tracking-[0.2em] font-bold text-slate-400">Filtering {{ filteredProjects.length }} Result{{ filteredProjects.length !== 1 ? 's' : '' }}</span>
          </div>
        </div>
        <!-- TECHNICAL SECTOR HUD (Heads-Up Display) -->
        <div *ngIf="activeFilter === 'All'" 
             class="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-12 pointer-events-none transition-all duration-700"
             [ngClass]="showHud ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'">
          
          <!-- The Authority Axis (Vertical Guide) -->
          <div class="absolute left-6 top-0 bottom-0 w-px bg-slate-200 opacity-30"></div>
          
          <div *ngFor="let categoryId of ['Commercial', 'Offices/Business parks', 'Retail & Restaurants', 'Multi / Family', 'Single Family']; let idx = index" 
               class="relative flex items-center gap-6 group transition-all duration-500"
               [ngClass]="activeSector === categoryId ? 'opacity-100 scale-110' : 'opacity-20 translate-x-1'">
            
            <!-- Index Circle -->
            <div class="w-12 h-12 rounded-full border border-slate-900 flex items-center justify-center bg-white shadow-2xl relative overflow-hidden transition-colors"
                 [ngClass]="activeSector === categoryId ? 'border-[#d5a021] bg-slate-950 shadow-[#d5a021]/20' : 'border-slate-200'">
              
              <!-- Local Progress Hatching Fill -->
              <div *ngIf="activeSector === categoryId" 
                   class="absolute bottom-0 left-0 right-0 bg-[#d5a021] opacity-20 transition-all duration-300"
                   [style.height.%]="sectorProgress"></div>
                   
              <span class="text-[11px] font-mono font-black"
                    [ngClass]="activeSector === categoryId ? 'text-[#d5a021]' : 'text-slate-500'">
                0{{ idx + 1 }}
              </span>
            </div>

            <!-- Leader Line & Callout -->
            <div class="flex items-center gap-4 pointer-events-auto transition-all duration-500"
                 [ngClass]="activeSector === categoryId ? 'translate-x-0' : '-translate-x-4 opacity-0'">
              <div class="h-px w-12 bg-[#d5a021]"></div>
              <div class="bg-slate-950 text-white px-4 py-2 rounded-lg shadow-2xl border border-white/10">
                <div class="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d5a021] whitespace-nowrap">
                  {{ activeSector === categoryId ? (categoryId === 'Retail & Restaurants' ? 'Retail / Rest' : categoryId) : '' }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="projects-grid" class="scroll-mt-32">
          <!-- VIEW: "ALL" - DOSSIER REEL LAYOUT (Executive Redesign V3) -->
          <div *ngIf="activeFilter === 'All'" class="-mx-4 md:-mx-8">
            <div *ngFor="let categoryId of ['Commercial', 'Offices/Business parks', 'Retail & Restaurants', 'Multi / Family', 'Single Family']; let idx = index" 
                 [id]="'sector-' + categoryId"
                 [ngClass]="idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/80'"
                 class="py-40 border-b border-slate-100 relative overflow-hidden min-h-[90vh] flex flex-col justify-center">
            
            <!-- Background Decoration (Perspective Lines) -->
            <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-50"></div>
            
            <div class="container mx-auto px-4 md:px-8">
              
              <!-- Section Header (Premium Chapter ID) -->
              <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
                <div class="flex flex-col gap-4">
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-full border border-[#d5a021]/30 flex items-center justify-center text-[#d5a021] font-mono text-sm font-bold bg-[#d5a021]/5 shadow-sm">
                      0{{ idx + 1 }}
                    </div>
                    <span class="text-[#d5a021] font-mono text-[10px] tracking-[0.4em] font-bold uppercase">Engineering Sector</span>
                    <div class="h-px w-24 bg-gradient-to-r from-[#d5a021]/30 to-transparent"></div>
                  </div>
                  <h3 class="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter">
                    {{ categoryMetadata[categoryId].title }}
                  </h3>
                </div>
                <div class="hidden md:block text-right pb-2">
                  <div class="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-1">Statewide Portfolio</div>
                  <div class="text-sm text-[#d5a021] font-medium tracking-tight border-b-2 border-[#d5a021]/10 pb-1 italic">Texas Engineering Authority</div>
                </div>
              </div>

              <div class="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
                
                <!-- Left Column: The Dossier Narrative -->
                <div class="lg:w-1/4">
                  <div class="lg:sticky lg:top-32 bg-white/60 backdrop-blur-md p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest mb-6 bg-slate-950 text-white shadow-lg shadow-slate-950/20">
                      <span class="w-1.5 h-1.5 rounded-full bg-[#d5a021] animate-pulse"></span>
                      Portfolio Excellence
                    </div>
                    
                    <p class="text-slate-600 text-base leading-relaxed font-light mb-10 italic">
                      "{{ categoryMetadata[categoryId].description }}"
                    </p>
  
                    <!-- Sector Highlights -->
                    <div class="space-y-6 mb-10">

                      
                      <div class="space-y-3">
                        <div *ngFor="let stat of categoryMetadata[categoryId].stats" class="flex items-center gap-3 text-xs text-slate-700 font-semibold uppercase tracking-tight">
                          <svg class="w-3.5 h-3.5 text-[#d5a021]" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                          </svg>
                          {{ stat }}
                        </div>
                      </div>
                    </div>
  
                    <button (click)="setFilter(categoryId)" class="w-full bg-white border-2 border-slate-900 text-slate-900 px-6 py-4 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-900 hover:text-white transition-all group flex items-center justify-center gap-3">
                      Master Archive
                      <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 10l4 4m0 0l-4 4m4-4H3"></path>
                      </svg>
                    </button>
                  </div>
                </div>
  
                <!-- Right Column: The Project Reel (Horizontal Interaction) -->
                <div class="lg:w-3/4 overflow-hidden">
                  
                  <!-- Visual Highlights Reel -->
                  <div *ngIf="getVisualProjects(categoryId).length > 0">
                    <div class="flex items-center justify-between mb-8">
                      <h4 class="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400">Featured Dossiers</h4>
                      <div class="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase">
                        Swipe for More <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                      </div>
                    </div>
                    
                    <!-- Horizontal Scroll Reel -->
                    <div class="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory custom-scrollbar scroll-smooth">
                      <div *ngFor="let project of getVisualProjects(categoryId)" class="flex-none w-[320px] md:w-[450px] snap-start transition-transform duration-500 hover:scale-[0.98]">
                        <ng-container *ngTemplateOutlet="projectCard; context: { $implicit: project }"></ng-container>
                      </div>
                    </div>
                  </div>
  
                  <!-- Technical Registry (Clean List) -->
                  <div class="mt-8 pt-12 border-t border-slate-200/60">
                    <div class="flex items-center gap-6 mb-10">
                      <h4 class="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400">Project Registry</h4>
                      <div class="h-px bg-slate-200 flex-grow"></div>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div *ngFor="let project of getRegistryProjects(categoryId)" 
                           class="bg-white p-6 rounded-2xl border border-slate-100 hover:border-[#d5a021]/30 transition-all group flex flex-col gap-4 shadow-sm">
                        <div class="flex justify-between items-start">
                          <div class="text-[9px] font-bold uppercase tracking-[0.1em] text-[#d5a021]">{{ project.location }}</div>
                          <div class="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-[#d5a021] transition-colors"></div>
                        </div>
                        <div>
                          <h4 class="text-base font-bold text-slate-900 group-hover:text-[#d5a021] transition-colors leading-tight">{{ project.title }}</h4>
                          <p class="text-slate-500 text-xs mt-2 line-clamp-2 italic leading-relaxed">{{ project.description }}</p>
                        </div>
                        <div class="pt-4 border-t border-slate-50">
                          <div class="text-[8px] font-bold uppercase tracking-widest text-slate-400 mb-2">Technical Scope</div>
                          <div class="text-xs text-slate-700 leading-snug font-medium line-clamp-2">{{ project.scope }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
  
                </div>
  
              </div>
            </div>
          </div>
          </div>

          <!-- VIEW: FILTERED (Specific Category) -->
          <!-- Only show this standard grid if NOT 'All' -->
          <div *ngIf="activeFilter !== 'All' && activeFilter !== 'Retail & Restaurants'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 animate-fade-in">
           <ng-container *ngFor="let project of filteredProjects">
              <ng-container *ngTemplateOutlet="projectCard; context: { $implicit: project }"></ng-container>
           </ng-container>
        </div>


        <!-- TEMPLATE: STANDARD PROJECT CARD -->
        <ng-template #projectCard let-project>
            <div class="group relative overflow-hidden rounded-xl shadow-md transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl bg-white border border-slate-100 flex flex-col h-full">
            
            <!-- Panoramic Image (Fixed Aspect Ratio) -->
            <div class="relative aspect-video overflow-hidden bg-slate-100">
              <img [src]="project.image" 
                [alt]="project.title"
                [style.transform]="project.rotate ? 'rotate(' + project.rotate + 'deg) scale(1.8)' : ''"
                class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 saturate-[1.1] contrast-[1.05]">
              
              <!-- Sector Badge (Refined) -->
              <div class="absolute top-5 left-5 z-20">
                <span class="bg-slate-950/80 backdrop-blur-md text-[#d5a021] text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-sm border border-white/5 shadow-xl">
                  {{ project.category }}
                </span>
              </div>
            </div>

            <!-- Content Container (Portfolio Style) -->
            <div class="p-8 flex flex-grow flex-col">
              <!-- Location Metadata -->
              <div class="flex items-center gap-2 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-[#d5a021]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span class="text-[11px] uppercase tracking-[0.2em] text-[#d5a021] font-bold">{{ project.location }}</span>
              </div>

              <h3 class="text-2xl font-bold text-slate-900 mb-4 group-hover:text-[#d5a021] transition-colors leading-tight tracking-tight">
                {{ project.title }}
              </h3>
              
              <p class="text-slate-600 text-sm font-normal leading-relaxed mb-8 line-clamp-3 italic opacity-85">
                {{ project.description }}
              </p>

              <!-- Services & Scope (Discrete) -->
              <div class="mt-auto">
                <div class="mb-5 pt-5 border-t border-slate-50">
                  <div class="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-3">Engineering Scope</div>
                  <div class="text-xs text-slate-700 leading-snug line-clamp-2 min-h-[2.5em]">{{ project.scope }}</div>
                </div>

                <div class="flex flex-wrap gap-1.5">
                  <span *ngFor="let service of project.services" 
                    class="text-[9px] font-bold uppercase tracking-tight text-slate-500 border border-slate-100 px-2 py-1 rounded-sm bg-slate-50 transition-colors group-hover:border-[#d5a021]/20">
                    {{ service }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Card Hover Accent -->
            <div class="absolute bottom-0 left-0 w-full h-1 bg-[#d5a021] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>
        </ng-template>

        <!-- SPECIAL RETAIL LAYOUT (List + Gallery) -->
          <div *ngIf="activeFilter === 'Retail & Restaurants'" class="mb-32 animate-fade-in">
          <!-- 1. Text List Section -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 mb-24 px-4 md:px-12 bg-white rounded-2xl p-12 border border-slate-100 shadow-sm">
            <div *ngFor="let project of filteredProjects" class="border-l-2 border-[#d5a021]/30 pl-6 hover:border-[#d5a021] transition-colors group">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-[10px] uppercase tracking-[0.2em] text-[#d5a021] font-bold">{{ project.location }}</span>
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#d5a021] transition-colors">{{ project.title }}</h3>
              <p class="text-slate-600 text-sm leading-relaxed mb-3">{{ project.description }}</p>
              <div class="text-xs text-slate-500 italic"><span class="font-bold text-slate-400 uppercase text-[9px] tracking-wider not-italic mr-2">Scope:</span>{{ project.scope }}</div>
            </div>
          </div>

          <!-- 2. Image Gallery (4 Featured Images) -->
          <div class="text-center mb-12">
            <span class="h-px w-12 bg-[#d5a021] inline-block mb-4"></span>
            <h3 class="text-2xl font-bold text-slate-900 uppercase tracking-widest">Selected <span class="text-[#d5a021]">Retail Portfolio</span></h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div *ngFor="let img of retailImages" class="relative group overflow-hidden rounded-lg aspect-[4/3]">
              <img [src]="img" alt="Retail Project" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 saturate-[1.1]">
              <div class="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
          </div>
        </div>


        <!-- SITE INSPECTIONS SECTION -->
        <section class="inspection-services rounded-lg overflow-hidden bg-slate-900 border border-slate-800 relative shadow-2xl">
          <!-- Background Pattern -->
          <div class="absolute inset-0 opacity-10 pointer-events-none" style="background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0); background-size: 24px 24px;"></div>
          
          <div class="relative z-10 p-8 md:p-12 lg:p-20 text-center text-white">
            <span class="text-[#d5a021] font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Field Operations</span>
            <h2 class="text-4xl font-bold mb-4 tracking-tight leading-tight">Professional <span class="text-[#d5a021]">Site Inspections</span></h2>
            <p class="text-slate-400 max-w-2xl mx-auto mb-16 text-lg font-light">Comprehensive engineering oversight for projects of all scales, ensuring technical compliance from ground-breaking to completion.</p>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 max-w-6xl mx-auto text-left">
              <!-- Service Item 1 -->
              <div class="group">
                <div class="text-[#d5a021] font-mono text-sm mb-4">01 / Scoping</div>
                <h3 class="text-lg font-bold text-white mb-2">Pre-Construction</h3>
                <p class="text-slate-400 text-sm leading-relaxed font-light">Detailed site evaluations, feasibility studies, and regulatory compliance reviews.</p>
              </div>

              <!-- Service Item 2 -->
              <div class="group">
                <div class="text-[#d5a021] font-mono text-sm mb-4">02 / Oversight</div>
                <h3 class="text-lg font-bold text-white mb-2">Progress Inspections</h3>
                <p class="text-slate-400 text-sm leading-relaxed font-light">Regular monitoring to ensure construction adheres to approved plans and standards.</p>
              </div>

              <!-- Service Item 3 -->
              <div class="group">
                <div class="text-[#d5a021] font-mono text-sm mb-4">03 / Auditing</div>
                <h3 class="text-lg font-bold text-white mb-2">Compliance Verification</h3>
                <p class="text-slate-400 text-sm leading-relaxed font-light">Final inspections and certification that work meets local, state, and federal regulations.</p>
              </div>

              <!-- Service Item 4 -->
              <div class="group">
                <div class="text-[#d5a021] font-mono text-sm mb-4">04 / Reporting</div>
                <h3 class="text-lg font-bold text-white mb-2">Detailed Reporting</h3>
                <p class="text-slate-400 text-sm leading-relaxed font-light">Comprehensive documentation with photos, measurements, and recommendations.</p>
              </div>
            </div>

            <div class="border-t border-white/5 pt-10 flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
              <div class="text-left">
                <h4 class="text-[#d5a021] font-bold mb-1 tracking-wide uppercase text-sm">Texas Service Area</h4>
                <p class="text-slate-400 text-xs font-light">Serving developments from small commercial sites to large-scale communities.</p>
              </div>
              <a routerLink="/contact" class="px-10 py-4 bg-[#d5a021] text-slate-900 font-bold uppercase tracking-widest text-xs rounded hover:bg-yellow-400 transition shadow-lg hover:shadow-[#d5a021]/20 whitespace-nowrap">
                Schedule a Site Visit
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ExperiencePageComponent {
  projects: Project[] = [
    // COMMERCIAL - FLAGSHIP
    {
      title: 'Montgomery Pines Crossing',
      category: 'Commercial',
      location: 'Porter, TX',
      image: 'assets/projects/comercial/comercial_unnamed.jpg',
      description: 'A 43-acre commercial development in Porter, TX. Master planned the subdivision into several parcels.',
      scope: '±1200 LF public road, ±2800 LF Sanitary Sewer main, ±3000 LF Water main, ±1500 LF Storm Drain System.',
      services: ['Master Planning', 'Infrastructure Design', 'Permitting'],
      featured: true
    },
    {
      title: 'Hero Way Crossing',
      category: 'Commercial',
      location: 'Leander, TX',
      image: 'assets/projects/comercial/comerciall_unnamed.jpg',
      description: 'A 16.85-acre commercial development in Leander, TX has been subdivided into 4 commercial lots.',
      scope: '±1200 LF Sanitary Sewer main and ±900 LF of Water Main , Storm Drainage system and Water Quality Pond.',
      services: ['Infrastructure Design', 'Site Development', 'Permitting'],
    },
    {
      title: 'Whitestone Commercial',
      category: 'Commercial',
      location: 'Cedar Park, TX',
      image: 'assets/projects/comercial/comerciall_unnamed.jpg', // Generic placeholder as requested
      description: 'A 5-acre commercial development in City of Cedar Park, TX. Future Land Use plan revision and Rezoning.',
      scope: 'Rezoning and site development permit. Coordination with City Council.',
      services: ['Rezoning', 'Permitting', 'City Council Representation'],
    },

    // RETAIL & RESTAURANTS
    {
      title: 'Tex Stop FM-78 - Schertz, TX',
      category: 'Retail & Restaurants',
      location: 'Schertz, TX',
      image: 'assets/projects/RETAIL_AND RESTAURANTS/RETAIL_AND RESTAURANTS.jpg',
      description: '6,500 C-store with 10 MPD gas station and a Burger King. Automated carwash and pizza store included.',
      scope: 'Special Use permit, Site plan approval, subdivision plat.',
      services: ['Special Use Permit', 'Site Plan', 'Subdivision Plat'],
    },
    {
      title: 'Heritage Ridge - Liberty Hill, TX',
      category: 'Retail & Restaurants',
      location: 'Liberty Hill, TX',
      image: 'assets/projects/comercial/comercial_unnamed.jpg',
      description: 'Three story mixed commercial/Retail Development.',
      scope: 'Utility Evaluation, site development and TCEQ approval.',
      services: ['Utility Evaluation', 'Site Development', 'TCEQ Approval'],
    },
    {
      title: 'Burger King - Kenedy, TX',
      category: 'Retail & Restaurants',
      location: 'Kenedy, TX',
      image: 'assets/projects/RETAIL_AND RESTAURANTS/RETAIL_AND RESTAURANTS_2.jpg',
      description: 'Subdivided the property and designed the 3,250 sqft Burger King restaurant.',
      scope: 'Subdivision and site design.',
      services: ['Subdivision', 'Site Design', 'Permitting'],
    },
    {
      title: 'Burger King - Wurzbach - San Antonio, TX',
      category: 'Retail & Restaurants',
      location: 'San Antonio, TX',
      image: 'assets/projects/RETAIL_AND RESTAURANTS/RETAIL_AND RESTAURANTS_1.jpg',
      description: 'Subdivided the property and designed the 3,250 sqft Burger King restaurant.',
      scope: 'Subdivision and restaurant design.',
      services: ['Subdivision', 'Site Design', 'Permitting'],
    },
    {
      title: 'Burger King Loop 410 - San Antonio, TX',
      category: 'Retail & Restaurants',
      location: 'San Antonio, TX',
      image: 'assets/projects/RETAIL_AND RESTAURANTS/RETAIL_AND RESTAURANTS_2.jpg',
      description: 'Designed the 2,250 sqft Burger King drive-thru only restaurant.',
      scope: 'Drive-thru restaurant site design.',
      services: ['Site Design', 'Civil Engineering', 'Permitting'],
    },
    {
      title: 'Burger King - Seguin, TX',
      category: 'Retail & Restaurants',
      location: 'Seguin, TX',
      image: 'assets/projects/RETAIL_AND RESTAURANTS/RETAIL_AND RESTAURANTS_2.jpg',
      description: '3,250 sqft Burger King restaurant with highway infrastructure.',
      scope: 'Deceleration lane design on Hwy 46.',
      services: ['Traffic Engineering', 'Site Design', 'Civil Engineering'],
    },
    {
      title: 'Burger King - Floresville, TX',
      category: 'Retail & Restaurants',
      location: 'Floresville, TX',
      image: 'assets/projects/RETAIL_AND RESTAURANTS/RETAIL_AND RESTAURANTS_3.jpg',
      description: '3,250 sqft restaurant with drive-thru and self-store units on the same lot.',
      scope: 'Integrated site development for multiple uses.',
      services: ['Site Engineering', 'Utility Planning', 'Permitting'],
    },
    {
      title: 'Burger King & C-store - Converse, TX',
      category: 'Retail & Restaurants',
      location: 'Converse, TX',
      image: 'assets/projects/RETAIL_AND RESTAURANTS/RETAIL_AND RESTAURANTS_1.jpg',
      description: '5,500 C-store with 10 MPD gas station, Burger King, and automated carwash.',
      scope: 'Automated carwash and pizza store with drive-thru.',
      services: ['Architecture Coordination', 'Civil Engineering', 'Permitting'],
    },

    // MULTI / FAMILY PROJECTS
    {
      title: 'Oaks of Leander - Leander, TX',
      category: 'Multi / Family',
      location: 'Leander, TX',
      image: 'assets/projects/MULTI-FAMILY/MULTI-FAMILY_oaks_of_Leander_Leander_TX.jpg',
      description: 'The proposed development consists of a 200-unit apartment complex with a clubhouse and swimming pool.',
      scope: 'Full site development and utility planning.',
      services: ['Site Development', 'Utility Engineering', 'Landscape Coordination'],
    },
    {
      title: 'Whitestone Oaks - Cedar Park, TX',
      category: 'Multi / Family',
      location: 'Cedar Park, TX',
      image: 'assets/projects/MULTI-FAMILY/multi-family_whitestone_ oaks_apartment.jpg',
      description: 'The proposed development consists of a 96-unit apartment complex with a clubhouse and swimming pool.',
      scope: 'Project development and permitting.',
      services: ['Site Design', 'Permitting', 'Construction Admin'],
    },
    {
      title: 'Synergy Business Park - Cedar Park, TX',
      category: 'Offices/Business parks',
      location: 'Cedar Park, TX',
      image: 'assets/projects/MULTI-FAMILY/multi_family_Synergy _Business_Park Cedar_Park_TX.jpg',
      description: 'A 20,000 sqft industrial/office park designed within the City of Cedar Park.',
      scope: 'We have secured the site development and building permit.',
      services: ['Industrial Design', 'Site Permit', 'Construction Planning'],
      rotate: 90
    },
    {
      title: 'Salerno Commercial - Round Rock, TX',
      category: 'Commercial',
      location: 'Round Rock, TX',
      image: 'assets/projects/MULTI-FAMILY/multi_family_Salerno_Commercial Round_Rock_Park TX_A_7,000.jpg',
      description: 'A 7,000 sqft C-store with 7 MPD gas pumps including a 2,300 sqft restaurant and 7,000 sqft of retail.',
      scope: 'We have subdivided the plat and secured site development and building permits within the City of Round Rock.',
      services: ['Subdivision Plat', 'Site Development', 'Permitting'],
    },
    {
      title: 'Webberville Apartments - Austin, TX',
      category: 'Multi / Family',
      location: 'Austin, TX',
      image: 'assets/projects/MULTI-FAMILY/multi_family_Weberville_Apartments_Austin_TX.jpg',
      description: 'The proposed development consists of a 274-unit apartment complex with a clubhouse and swimming pool.',
      scope: 'Comprehensive civil infrastructure design.',
      services: ['Civil Engineering', 'Utility Design', 'Permitting'],
    },
    {
      title: 'Violet Crown - Austin, TX',
      category: 'Multi / Family',
      location: 'Austin, TX',
      image: 'assets/projects/MULTI-FAMILY/multi_family_violet_crown_Austin_tx.jpg',
      description: 'The proposed development consists of 28 condominium units in a three-story building with first-floor parking in downtown Austin.',
      scope: 'Three-story building with first-floor parking in downtown.',
      services: ['Urban Site Design', 'Utility Coordination', 'Permitting'],
    },
    {
      title: 'Greenlight Village Townhomes - Leander, TX',
      category: 'Multi / Family',
      location: 'Leander, TX',
      image: 'assets/projects/MULTI-FAMILY/multi_family_greenlight_village_townhomes.jpg',
      description: 'A 50-unit townhome development involved in the rezoning process through the site development permit.',
      scope: 'Rezoning through site development permit.',
      services: ['Rezoning', 'Site Development', 'Permitting']
    },
    {
      title: 'Parkview at Prue Townhomes - San Antonio, TX',
      category: 'Multi / Family',
      location: 'San Antonio, TX',
      image: 'assets/projects/MULTI-FAMILY/multi_family_par_view.jpg',
      description: 'A 58-unit townhome development involved in the rezoning process through the site development permit.',
      scope: 'Complete site development services.',
      services: ['Rezoning', 'Site Development', 'Permitting']
    },
    {
      title: 'Canyon Ridge Apartments - Porter, TX',
      category: 'Multi / Family',
      location: 'Porter, TX',
      image: 'assets/projects/SINGLE_FAMILY/SINGLE_FAMILY.jpg',
      description: 'A premium apartment development designed to integrate seamlessly into Porter.',
      scope: 'Complete site development, drainage modeling, and structural engineering.',
      services: ['Site Development', 'Drainage Modeling', 'Utility Design'],
    },
    {
      title: 'Vista Ridge Professional Suites - Cedar Park, TX',
      category: 'Offices/Business parks',
      location: 'Cedar Park, TX',
      image: 'assets/projects/MULTI-FAMILY/vista_ridge_professional_suites.jpg',
      description: 'Sophisticated professional suite development designed with modern aesthetics and functional community integration.',
      scope: 'Site development permit, utility coordination, and grading optimization.',
      services: ['Site Development', 'Permitting', 'Utility Design'],
    },

    // SINGLE FAMILY PROJECTS (User List)
    {
      title: 'Namami Sai - San Antonio, TX',
      category: 'Single Family',
      location: 'San Antonio, TX',
      image: 'assets/images/brand/contact_hero_blueprint.png', // Fallback/Placeholder
      description: 'A single-family subdivision within the City of San Antonio.',
      scope: 'We have been involved from rezoning all the way through to subdivision improvements.',
      services: ['Rezoning', 'Subdivision Improvements', 'Planning'],
    },
    {
      title: 'Singleton Bend One - Travis County, TX',
      category: 'Single Family',
      location: 'Travis County, TX',
      image: 'assets/images/brand/experience_hero_blueprint.png', // Fallback/Placeholder
      description: 'A 10-acre tract designed as a 10-luxury-home condominium subdivision within Travis County.',
      scope: 'We have designed all the infrastructure.',
      services: ['Infrastructure Design', 'Condominium Planning', 'Site Design'],
    },
    {
      title: 'PSRG at Neenah - Austin, TX',
      category: 'Single Family',
      location: 'Austin, TX',
      image: 'assets/images/brand/contact_hero_blueprint.png', // Fallback/Placeholder
      description: 'A 16-acre tract, zoned SF-2, developed as a 55-lot subdivision within the Austin city limits.',
      scope: 'We have designed all infrastructure and managed the SER approval process.',
      services: ['Infrastructure Design', 'SER Approval', 'Subdivision'],
    },
    {
      title: 'Classen Classics - San Antonio, TX',
      category: 'Single Family',
      location: 'San Antonio, TX',
      image: 'assets/images/brand/experience_hero_blueprint.png', // Fallback/Placeholder
      description: 'A small single family residential subdivision.',
      scope: 'We have designed road ways, Utilities and drainage structures.',
      services: ['Roadway Design', 'Utilities', 'Drainage'],
    },
  ];

  filters: string[] = ['All', 'Commercial', 'Offices/Business parks', 'Retail & Restaurants', 'Single Family', 'Multi / Family'];
  searchQuery: string = '';
  activeFilter: string = 'All';
  activeSector: string | null = null;
  sectorProgress: number = 0;
  showHud: boolean = false;

  retailImages: string[] = [
    'assets/projects/RETAIL_AND RESTAURANTS/RETAIL_AND RESTAURANTS.jpg',
    'assets/projects/RETAIL_AND RESTAURANTS/RETAIL_AND RESTAURANTS_1.jpg',
    'assets/projects/RETAIL_AND RESTAURANTS/RETAIL_AND RESTAURANTS_2.jpg',
    'assets/projects/RETAIL_AND RESTAURANTS/RETAIL_AND RESTAURANTS_3.jpg'
  ];

  singleFamilyImages: string[] = [
    'assets/projects/SINGLE_FAMILY/SINGLE_FAMILY.jpg'
  ];

  categoryMetadata: Record<string, CategoryMetadata> = {
    'Commercial': {
      id: 'Commercial',
      title: 'Commercial Infrastructure',
      description: 'Engineering the backbone of Texas commerce through complex infrastructure design and large-scale site development.',
      stats: ['Master Planning', 'Utility Feasibility', 'Agency Coordination']
    },
    'Retail & Restaurants': {
      id: 'Retail & Restaurants',
      title: 'Retail & Restaurants',
      description: 'Precision site engineering for national brands and regional developers, optimized for permitting speed and constructability.',
      stats: ['Traffic Engineering', 'Platting', 'Expedited Permitting']
    },
    'Multi / Family': {
      id: 'Multi / Family',
      title: 'Multi / Family Developments',
      description: 'Sophisticated civil solutions for high-density residential projects, balancing technical compliance with developer ROI.',
      stats: ['SUD/MUD Coordination', 'Hydrology Modeling', 'Site Optimization']
    },
    'Single Family': {
      id: 'Single Family',
      title: 'Single Family Residential',
      description: 'Transforming raw land into premium residential communities through rigorous technical analysis and precision execution.',
      stats: ['Subdivision Layout', 'Roadway Design', 'TCEQ Compliance']
    },
    'Offices/Business parks': {
      id: 'Offices/Business parks',
      title: 'Offices & Business Parks',
      description: 'Designing high-performance corporate campuses and business environments that foster innovation and operational excellence.',
      stats: ['Site Development', 'Building Permitting', 'Industrial Planning']
    }
  };

  // Helper to check if a project has a real project image or a blueprint fallback
  isActualImage(imagePath: string): boolean {
    return imagePath.includes('assets/projects/') &&
      !imagePath.includes('blueprint') &&
      !imagePath.includes('comercial_unnamed.jpg') &&
      !imagePath.includes('comerciall_unnamed.jpg');
  }

  getVisualProjects(category: string): Project[] {
    return this.getProjectsByCategory(category).filter(p => this.isActualImage(p.image));
  }

  getRegistryProjects(category: string): Project[] {
    return this.getProjectsByCategory(category).filter(p => !this.isActualImage(p.image));
  }

  get filteredProjects(): Project[] {
    let filtered = this.projects;

    if (this.activeFilter !== 'All') {
      filtered = filtered.filter(p => p.category === this.activeFilter);
    }

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.location.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) || 
        p.scope.toLowerCase().includes(query)
      );
    }

    return filtered;
  }

  getProjectsByCategory(category: string): Project[] {
    return this.projects.filter(p => p.category === category);
  }

  setFilter(category: string) {
    this.activeFilter = category;
    // Scroll to the top of the grid when filter changes to ensure user sees results
    setTimeout(() => {
      const gridElement = document.getElementById('projects-grid');
      if (gridElement) {
        const headerOffset = 100; // Account for fixed header
        const elementPosition = gridElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  }

  scrollToProjects() {
    const gridElement = document.getElementById('projects-grid');
    if (gridElement) {
      gridElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // HUD Logic
  ngOnInit() {
    this.setupIntersectionObserver();
    this.setupScrollListener();
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '-10% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeSector = entry.target.id.replace('sector-', '');
        }
      });
    }, options);

    // Initial observer setup happens after a small delay to ensure DOM is ready
    setTimeout(() => {
      const sectors = document.querySelectorAll('[id^="sector-"]');
      sectors.forEach(s => observer.observe(s));
    }, 500);
  }

  private setupScrollListener() {
    window.addEventListener('scroll', () => {
      // Toggle HUD visibility: Show only if scrolled past hero (400px) 
      // AND not at the very bottom (footer area)
      const scrollPos = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      this.showHud = scrollPos > 500 && (scrollPos + windowHeight < totalHeight - 600);

      if (!this.activeSector) return;

      const element = document.getElementById(`sector-${this.activeSector}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        const height = element.offsetHeight;
        const scrolled = Math.max(0, Math.min(100, (Math.abs(rect.top) / (height - window.innerHeight)) * 100));
        this.sectorProgress = scrolled;
      }
    });
  }

  getSectorIndex(categoryId: string): number {
    const sectors = ['Commercial', 'Offices/Business parks', 'Retail & Restaurants', 'Multi / Family', 'Single Family'];
    return sectors.indexOf(categoryId) + 1;
  }
}
