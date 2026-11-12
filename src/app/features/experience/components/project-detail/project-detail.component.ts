import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

interface Project {
  title: string;
  location: string;
  heroImage: string;
  services: string[];
  challenge: string;
  solution: string;
  outcome: string;
  stats: { label: string; value: string }[];
}

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bg-white min-h-screen" *ngIf="project; else notFound">
      
      <!-- HERO SECTION -->
      <section class="relative h-[70vh] w-full overflow-hidden">
        <div class="absolute inset-0">
          <img [src]="project.heroImage" [alt]="project.title" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
          <!-- Technical Dot Grid overlay for consistency -->
          <div class="absolute inset-0 opacity-20 pointer-events-none"
               style="background-image: radial-gradient(circle, #ffffff 1px, transparent 1px); background-size: 40px 40px;">
          </div>
        </div>
        
        <div class="absolute bottom-0 left-0 w-full p-8 md:p-16 z-10 text-white">
          <div class="max-w-7xl mx-auto">
            <span class="text-[#d5a021] font-bold tracking-[0.2em] uppercase text-sm mb-4 block animate-fade-in-up">Project Case Study</span>
            <h1 class="text-4xl md:text-6xl font-bold leading-tight mb-4 animate-fade-in-up delay-100">{{ project.title }}</h1>
            <p class="text-xl text-slate-300 flex items-center animate-fade-in-up delay-200">
              <svg class="w-5 h-5 mr-2 text-[#d5a021]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              {{ project.location }}
            </p>
          </div>
        </div>
      </section>

      <!-- CONTENT SECTION -->
      <section class="py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          <!-- LEFT: Narrative -->
          <div class="lg:col-span-2 space-y-12">
            
            <!-- Challenge -->
            <div>
              <h2 class="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                <span class="w-8 h-1 bg-[#d5a021] mr-4"></span> The Challenge
              </h2>
              <p class="text-lg text-slate-600 leading-relaxed">{{ project.challenge }}</p>
            </div>

            <!-- Solution -->
            <div>
              <h2 class="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                <span class="w-8 h-1 bg-slate-200 mr-4"></span> The Solution
              </h2>
              <p class="text-lg text-slate-600 leading-relaxed">{{ project.solution }}</p>
            </div>

            <!-- Outcome -->
            <div class="bg-slate-50 p-8 rounded-lg border-l-4 border-[#d5a021]">
              <h3 class="text-xl font-bold text-slate-900 mb-2">Project Outcome</h3>
              <p class="text-slate-600 italic">"{{ project.outcome }}"</p>
            </div>

            <!-- Back Button -->
            <div class="pt-8">
              <a routerLink="/" class="text-slate-500 hover:text-slate-900 font-medium flex items-center transition-colors">
                ← Back to Home
              </a>
            </div>
          </div>

          <!-- RIGHT: Data Dossier -->
          <div class="lg:col-span-1">
            <div class="bg-white border border-slate-200 shadow-xl p-8 rounded-sm sticky top-24">
              <h3 class="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Project Data</h3>
              
              <!-- Services List -->
              <div class="mb-8">
                <h4 class="font-bold text-slate-900 mb-3">Services Delivered</h4>
                <div class="flex flex-wrap gap-2">
                  <span *ngFor="let service of project.services" 
                    class="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold uppercase tracking-wide rounded-sm">
                    {{ service }}
                  </span>
                </div>
              </div>

              <!-- Key Stats -->
              <div class="space-y-6">
                 <div *ngFor="let stat of project.stats" class="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                    <span class="block text-xs text-slate-400 uppercase mb-1">{{ stat.label }}</span>
                    <span class="block text-2xl font-bold text-slate-900">{{ stat.value }}</span>
                 </div>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>

    <ng-template #notFound>
      <div class="min-h-screen flex items-center justify-center bg-slate-50">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-slate-300 mb-4">Project Not Found</h1>
          <a routerLink="/" class="text-[#d5a021] hover:underline">Return Home</a>
        </div>
      </div>
    </ng-template>
  `,
  styles: [`
    .animate-fade-in-up {
      animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      opacity: 0;
      transform: translateY(20px);
    }
    .delay-100 { animation-delay: 0.1s; }
    .delay-200 { animation-delay: 0.2s; }
    
    @keyframes fadeInUp {
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class ProjectDetailComponent implements OnInit {
  project: Project | null = null;

  // Mock Database
  private projects: Record<string, Project> = {
    'whitestone-oaks-apartments': {
      title: 'Whitestone Oaks Apartments',
      location: 'Cedar Park, TX',
      heroImage: 'assets/images/projects/residential_whitestone.png',
      services: ['Civil Engineering', 'Site Grading', 'Drainage Analysis', 'Permitting'],
      challenge: 'The site featured challenging karst geology with strict aquifer recharge zone regulations and significant elevation changes that complicated the grading plan.',
      solution: 'Rao Engineering developed a sophisticated terraced grading strategy that minimized retaining wall costs while optimizing buildable area. We implemented a specialized underground stormwater detention system to meet strict impervious cover limits without sacrificing unit yield.',
      outcome: 'A premier 320-unit luxury community that integrates seamlessly with the natural Hill Country landscape, delivered on schedule and fully compliant with TCEQ regulations.',
      stats: [
        { label: 'Units', value: '320 Luxury Apt' },
        { label: 'Site Area', value: '18 Acres' },
        { label: 'Timeline', value: '14 Months' }
      ]
    }
  };

  constructor(
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.project = this.projects[slug] || null;
        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo(0, 0);
        }
      }
    });
  }
}
