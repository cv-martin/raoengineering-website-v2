import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav [ngClass]="{'bg-slate-900/95 backdrop-blur-md py-4': isScrolled, 'py-6': !isScrolled}"
         class="fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-white/5">
      
      <div class="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between relative z-[60]">
        
        <!-- Strategic Brand Identity -->
        <a routerLink="/" class="group flex items-center">
          <img src="assets/logo/RCE_logo2023-2.png" alt="Rao's Consulting Engineers" class="h-12 md:h-16 w-auto opacity-95 group-hover:opacity-100 transition-all duration-300" style="filter: invert(1);">
        </a>

        <!-- Console Command Center (Desktop) -->
        <div class="hidden lg:flex items-center gap-12">
          <a routerLink="/" class="nav-link" routerLinkActive="active-link" [routerLinkActiveOptions]="{exact: true}">Home</a>
          
          <!-- Services Mega Menu Trigger -->
          <div class="relative group h-full py-2">
            <button class="nav-link flex items-center gap-2 group-hover:text-[#d5a021]">
              Services
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 opacity-60 group-hover:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <!-- Standard Dropdown Menu -->
            <div class="absolute top-full left-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 overflow-hidden">
              <div class="py-2">
                <a routerLink="/services/land-development" (click)="onServiceClick('Land Development')" class="block px-6 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors border-l-2 border-transparent hover:border-[#d5a021]">
                  Land Development
                </a>
                <a routerLink="/services/water-resources" (click)="onServiceClick('Water Resources')" class="block px-6 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors border-l-2 border-transparent hover:border-[#d5a021]">
                  Water Resources
                </a>
                <a routerLink="/services/transportation" (click)="onServiceClick('Transportation')" class="block px-6 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors border-l-2 border-transparent hover:border-[#d5a021]">
                  Transportation
                </a>
                <a routerLink="/services/environmental" (click)="onServiceClick('Environmental')" class="block px-6 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors border-l-2 border-transparent hover:border-[#d5a021]">
                  Environmental
                </a>
                <a routerLink="/services/permitting" (click)="onServiceClick('Permitting & Regulatory')" class="block px-6 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors border-l-2 border-transparent hover:border-[#d5a021]">
                  Permitting & Regulatory
                </a>
                <div class="h-px bg-white/10 my-2 mx-4"></div>
                <a routerLink="/services" (click)="onServiceClick('All Services')" class="block px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#d5a021] hover:text-white transition-colors">
                  View All Services →
                </a>
              </div>
            </div>
          </div>

          <a routerLink="/experience" class="nav-link" routerLinkActive="active-link">Projects</a>
          <a routerLink="/about" class="nav-link" routerLinkActive="active-link">About RCE</a>
        </div>

        <!-- Action Module -->
        <div class="hidden lg:flex items-center gap-8">
          <span class="text-white/60 font-mono text-xs tracking-widest hidden xl:block">
            210-549-7557
          </span>
          <a routerLink="/contact" (click)="onContactClick('navbar_desktop')" class="relative group overflow-hidden bg-[#d5a021] text-slate-900 px-8 py-3 font-bold text-xs uppercase tracking-[0.15em] hover:bg-white transition-all duration-300 skew-x-[-10deg]">
             <span class="block skew-x-[10deg]">Contact Us</span>
          </a>
        </div>

        <!-- Mobile Trigger -->
        <button class="lg:hidden text-white p-2" (click)="toggleMobileMenu()">
          <div class="space-y-1.5">
            <span class="block w-8 h-[2px] bg-white transition-transform duration-300" [class.rotate-45]="isMobileMenuOpen" [class.translate-y-2]="isMobileMenuOpen"></span>
            <span class="block w-8 h-[2px] bg-[#d5a021] transition-opacity duration-300" [class.opacity-0]="isMobileMenuOpen"></span>
            <span class="block w-8 h-[2px] bg-white transition-transform duration-300" [class.-rotate-45]="isMobileMenuOpen" [class.-translate-y-2]="isMobileMenuOpen"></span>
          </div>
        </button>
      </div>

      <!-- Mobile Command Center -->
      <div class="fixed inset-0 bg-slate-950/98 backdrop-blur-xl z-40 transition-transform duration-500 lg:hidden flex flex-col pt-32 px-8"
           [class.translate-x-full]="!isMobileMenuOpen"
           [class.translate-x-0]="isMobileMenuOpen">
           
           <div class="flex flex-col gap-8">
             <a routerLink="/" (click)="toggleMobileMenu()" class="text-4xl font-bold text-white hover:text-[#d5a021]">Home</a>
             
             <!-- Mobile Services Accordion -->
             <div class="space-y-4">
               <p class="text-[#d5a021] text-xs font-black tracking-[0.3em] uppercase opacity-70">Services</p>
                <a routerLink="/services/land-development" (click)="onServiceClick('Land Development', true)" class="block text-xl text-white/80 hover:text-white">Land Development</a>
                 <a routerLink="/services/water-resources" (click)="onServiceClick('Water Resources', true)" class="block text-xl text-white/80 hover:text-white">Water Resources</a>
                 <a routerLink="/services/transportation" (click)="onServiceClick('Transportation', true)" class="block text-xl text-white/80 hover:text-white">Transportation</a>
                 <a routerLink="/services/environmental" (click)="onServiceClick('Environmental', true)" class="block text-xl text-white/80 hover:text-white">Environmental</a>
                 <a routerLink="/services/permitting" (click)="onServiceClick('Permitting & Regulatory', true)" class="block text-xl text-white/80 hover:text-white">Permitting & Regulatory</a>
             </div>

             <a routerLink="/experience" (click)="toggleMobileMenu()" class="text-4xl font-bold text-white hover:text-[#d5a021]">Projects</a>
             <a routerLink="/about" (click)="toggleMobileMenu()" class="text-4xl font-bold text-white hover:text-[#d5a021]">About RCE</a>
             
             <a routerLink="/contact" (click)="onContactClick('navbar_mobile')" class="mt-8 w-full bg-[#d5a021] text-slate-900 py-4 text-center font-bold uppercase tracking-widest">
               Contact Us
             </a>
           </div>
      </div>
    </nav>
  `,
  styles: [`
    .nav-link {
      @apply text-sm font-medium tracking-normal text-slate-300 hover:text-white transition-colors relative py-2;
    }
    .nav-link::after {
      content: '';
      @apply absolute bottom-0 left-0 w-0 h-[2px] bg-[#d5a021] transition-all duration-300;
    }
    .nav-link:hover::after, .active-link::after {
      @apply w-full;
    }
    .active-link {
      @apply text-white;
    }
  `]
})
export class NavbarComponent {
  isScrolled = false;
  isMobileMenuOpen = false;

  constructor(private analytics: AnalyticsService) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    // Lock body scroll when menu is open
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  /**
   * Track which service a visitor selects from the navbar.
   * Also closes the mobile menu if triggered from the mobile drawer.
   */
  onServiceClick(serviceName: string, isMobile: boolean = false): void {
    this.analytics.trackServiceClick(serviceName, 'navbar');
    if (isMobile) this.toggleMobileMenu();
  }

  /**
   * Track when a visitor clicks the Contact Us CTA in the navbar.
   * Also closes the mobile menu if triggered from the mobile drawer.
   */
  onContactClick(source: string): void {
    this.analytics.trackContactClick(source);
    if (source === 'navbar_mobile') this.toggleMobileMenu();
  }
}
