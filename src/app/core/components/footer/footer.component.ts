import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="relative bg-slate-950 text-white pt-20 pb-10 overflow-hidden border-t border-white/5">
      
      <!-- Texture Overlay -->
      <div class="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
           style="background-image: url('/assets/images/brand/rce_topographic_texture_1768626380325.png'); background-size: cover;"></div>

      <div class="container mx-auto px-6 md:px-12 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 border-b border-white/10 pb-16">
          
          <!-- BRAND & MISSION -->
          <div class="col-span-1 lg:col-span-1">
             <a routerLink="/" class="group inline-flex mb-6">
               <img src="assets/logo/RCE_logo2023-2.png" alt="Rao's Consulting Engineers" class="h-16 w-auto opacity-80 group-hover:opacity-100 transition-all duration-300" style="filter: invert(1);">
             </a>
            <p class="text-slate-500 text-sm leading-relaxed max-w-xs">
              Providing the technical authority and strategic foresight required for Texas infrastructure development.
            </p>
          </div>

          <!-- SERVICES -->
          <div class="col-span-1">
            <h4 class="text-[#d5a021] text-sm font-bold tracking-wide mb-6">Capabilities</h4>
            <ul class="space-y-4">
              <li><a routerLink="/services/land-development" class="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"><span class="w-1 h-1 bg-[#d5a021] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>Land Development</a></li>
              <li><a routerLink="/services/water-resources" class="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"><span class="w-1 h-1 bg-[#d5a021] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>Water Resources</a></li>
              <li><a routerLink="/services/transportation" class="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"><span class="w-1 h-1 bg-[#d5a021] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>Transportation</a></li>
              <li><a routerLink="/services/environmental" class="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"><span class="w-1 h-1 bg-[#d5a021] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>Environmental</a></li>
              <li><a routerLink="/services/permitting" class="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"><span class="w-1 h-1 bg-[#d5a021] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>Strategic Permitting</a></li>
            </ul>
          </div>

          <!-- COMPANY -->
          <div class="col-span-1">
            <h4 class="text-[#d5a021] text-sm font-bold tracking-wide mb-6">Firm Profile</h4>
            <ul class="space-y-4">
              <li><a routerLink="/about" class="text-sm text-slate-400 hover:text-white transition-colors">Our History</a></li>
              <li><a routerLink="/experience" class="text-sm text-slate-400 hover:text-white transition-colors">Portfolio</a></li>
              <li><a routerLink="/careers" class="text-sm text-slate-400 hover:text-white transition-colors">Careers</a></li>
              <li><a routerLink="/contact" class="text-sm text-slate-400 hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <!-- CONTACT -->
          <div class="col-span-1">
            <h4 class="text-[#d5a021] text-sm font-bold tracking-wide mb-6">Headquarters & Offices</h4>
            <div class="space-y-6 text-sm text-slate-400">
              
              <!-- Cedar Park -->
              <div class="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#d5a021] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div class="space-y-1">
                  <strong class="text-white block">Cedar Park Office</strong>
                  <span class="block text-slate-400">1908 Yaupon Trail, Unit 206</span>
                  <span class="block text-slate-400">Cedar Park, TX 78613</span>
                </div>
              </div>

              <!-- San Antonio -->
              <div class="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#d5a021] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div class="space-y-1">
                  <strong class="text-white block">San Antonio Office</strong>
                  <span class="block text-slate-400">318 E. Nakoma St, Suite 111</span>
                  <span class="block text-slate-400">San Antonio, TX 78216</span>
                </div>
              </div>

              <!-- Phones -->
              <div class="flex items-center gap-3 pt-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#d5a021] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div class="flex flex-col">
                  <span class="font-medium">210-549-7557</span>
                  <span class="font-medium">512-856-4595</span>
                </div>
              </div>
              
              <!-- Email/Web -->
              <div class="flex items-start gap-3">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#d5a021] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                 </svg>
                 <div class="flex flex-col text-xs">
                  <a href="mailto:rao@raosengineering.com" (click)="onEmailClick()" class="hover:text-white transition-colors break-all">rao&#64;raosengineering.com</a>
                   <a href="https://www.raosengineering.com" target="_blank" class="hover:text-white transition-colors mt-1">www.raosengineering.com</a>
                 </div>
              </div>

            </div>
          </div>

        </div>

        <div class="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-xs text-slate-600 font-medium">
            &copy; {{ currentYear }} Rao's Consulting Engineers. All rights reserved.
          </p>
             <div class="flex items-center gap-6">
               <div class="flex items-center gap-4">
                 <div class="bg-white p-2 rounded-md shadow-sm hover:shadow-md transition-all group/cert">
                   <img src="assets/certification/nmsdc.jpeg" alt="NMSDC Certified" title="NMSDC Certified" class="h-20 w-auto grayscale-0 group-hover/cert:scale-105 transition-transform">
                 </div>
                 <div class="bg-white p-2 rounded-md shadow-sm hover:shadow-md transition-all group/cert">
                   <img src="assets/certification/MBE-Logo.webp" alt="MBE Certified" title="MBE Certified" class="h-20 w-auto grayscale-0 group-hover/cert:scale-105 transition-transform">
                 </div>
               </div>
                <div class="flex gap-4">
                  <!-- LinkedIn -->
                  <a href="https://www.linkedin.com/in/raos-engineers/" target="_blank" rel="noopener noreferrer" (click)="onExternalLinkClick('https://www.linkedin.com/in/raos-engineers/', 'LinkedIn')" class="text-slate-500 hover:text-[#0077b5] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
             </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: []
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  constructor(private analytics: AnalyticsService) {}

  /** Track email link clicks in the footer. */
  onEmailClick(): void {
    this.analytics.trackEmailClick('footer');
  }

  /** Track external link clicks (LinkedIn, Facebook, etc.) in the footer. */
  onExternalLinkClick(url: string, label: string): void {
    this.analytics.trackExternalLinkClick(url, label);
  }
}
