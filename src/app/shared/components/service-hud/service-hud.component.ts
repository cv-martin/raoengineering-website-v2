import { Component, Inject, Input, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

interface ServiceItem {
  id: string;
  title: string;
  shortTitle: string;
}

@Component({
  selector: 'app-service-hud',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- TECHNICAL SERVICE HUD (Heads-Up Display) -->
    <div class="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-12 pointer-events-none transition-all duration-700"
         [ngClass]="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'">
      
      <!-- The Authority Axis (Vertical Guide) -->
      <div class="absolute left-6 top-0 bottom-0 w-px bg-slate-200 opacity-30"></div>
      
      <div *ngFor="let service of services; let idx = index" 
           class="relative flex items-center gap-6 group transition-all duration-500"
           [ngClass]="currentServiceId === service.id ? 'opacity-100 scale-110' : 'opacity-20 translate-x-1'">
        
        <!-- Index Circle -->
        <a [routerLink]="['/services', service.id]"
           (click)="scrollToTop()"
           class="w-12 h-12 rounded-full border border-slate-900 flex items-center justify-center bg-white shadow-2xl relative overflow-hidden transition-colors pointer-events-auto"
           [ngClass]="currentServiceId === service.id ? 'border-[#d5a021] bg-slate-950 shadow-[#d5a021]/20' : 'border-slate-200 hover:border-[#d5a021]'">
          
          <!-- Page Progress Hatching Fill (Only on Active) -->
          <div *ngIf="currentServiceId === service.id" 
               class="absolute bottom-0 left-0 right-0 bg-[#d5a021] opacity-20 transition-all duration-150"
               [style.height.%]="scrollProgress"></div>
               
          <span class="text-[11px] font-mono font-black"
                [ngClass]="currentServiceId === service.id ? 'text-[#d5a021]' : 'text-slate-500 group-hover:text-[#d5a021]'">
            0{{ idx + 1 }}
          </span>
        </a>

        <!-- Leader Line & Callout -->
        <div class="flex items-center gap-4 transition-all duration-500"
             [ngClass]="currentServiceId === service.id ? 'translate-x-0' : '-translate-x-4 opacity-0'">
          <div class="h-px w-12 bg-[#d5a021]"></div>
          <div class="bg-slate-950 text-white px-4 py-2 rounded-lg shadow-2xl border border-white/10">
            <div class="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d5a021] whitespace-nowrap">
              {{ service.shortTitle }}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class ServiceHudComponent implements OnInit, OnDestroy {
  @Input() currentServiceId: string = '';
  scrollProgress: number = 0;
  isVisible: boolean = false;

  services: ServiceItem[] = [
    { id: 'land-development', title: 'Land Development', shortTitle: 'Land Dev' },
    { id: 'water-resources', title: 'Water Resources', shortTitle: 'Water' },
    { id: 'transportation', title: 'Transportation', shortTitle: 'Transp' },
    { id: 'environmental', title: 'Environmental', shortTitle: 'Enviro' },
    { id: 'permitting', title: 'Permitting', shortTitle: 'Permit' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private scrollListener = () => {
    const scrollPos = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    // HUD Visibility: Show only when scrolled past Hero (500px+) 
    // and disappear before deep footer/field operations (last 600px)
    this.isVisible = scrollPos > 500 && (scrollPos + windowHeight < totalHeight - 600);

    const scrollableRange = totalHeight - windowHeight;
    if (scrollableRange <= 0) return;
    this.scrollProgress = Math.max(0, Math.min(100, (scrollPos / scrollableRange) * 100));
  };

  ngOnInit() {
    // No window during prerendering; the HUD is a scroll affordance only.
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    window.addEventListener('scroll', this.scrollListener);
    // Initial calculation
    setTimeout(this.scrollListener, 100);
  }

  ngOnDestroy() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    window.removeEventListener('scroll', this.scrollListener);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
