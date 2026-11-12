import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AnalyticsService } from '../../core/services/analytics.service';
import {
  CONTACT_FALLBACK_EMAIL,
  CONTACT_FALLBACK_PHONES,
  CONTACT_FORM_ENDPOINT,
  ZOHO_FORM_URL,
  isContactFormConfigured,
  isZohoFormConfigured
} from '../../core/config/contact-form.config';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="contact-page min-h-screen grid grid-cols-1 lg:grid-cols-2">
      
      <!-- LEFT PANEL: Visual & Info (Dark Mode + Texture) -->
      <div class="relative bg-slate-900 flex flex-col p-8 md:p-12 lg:p-20 overflow-hidden min-h-[50vh] lg:min-h-screen">
         <!-- Background Layers - MAX VISIBILITY -->
         <div class="absolute inset-0 z-0">
           <img src="assets/images/brand/contact_hero_mobilization.png" class="w-full h-full object-cover opacity-100 brightness-110 saturate-125">
         </div>
         <!-- Strategic Gradient for Text Readability Only -->
         <div class="absolute inset-0 z-10 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-transparent"></div>
         
         <!-- Content z-20: Vertically Centered Title -->
         <div class="relative z-20 flex-grow flex flex-col justify-center">
           <!-- Badge -->
           <div class="inline-flex items-center gap-3 mb-8">
             <span class="h-[2px] w-12 bg-[#d5a021]"></span>
             <span class="text-[#d5a021] font-extrabold tracking-[0.3em] uppercase text-sm drop-shadow-md">Executive Access</span>
           </div>
           
           <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 tracking-tight leading-[1.1] drop-shadow-xl">
             Architecting <br>
             <span class="text-white">The Future</span>
           </h1>
           
           <div class="pl-8 border-l-4 border-[#d5a021]">
             <p class="text-white text-xl md:text-2xl font-light leading-relaxed drop-shadow-md max-w-xl">
               Direct engagement for <span class="text-[#d5a021] font-semibold">Senior Executives</span>, <span class="text-[#d5a021] font-semibold">Architects</span>, and <span class="text-[#d5a021] font-semibold">Solution Engineers</span>.
             </p>
           </div>
         </div>

         <!-- Contact Details (Bottom Left) -->
         <div class="relative z-20 space-y-8 mt-12 lg:mt-0 pt-12 border-t border-white/10 lg:border-none">
            <div class="space-y-6">
               <div class="space-y-2">
                 <h3 class="text-white/80 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                    <span class="w-2 h-2 bg-[#d5a021] rounded-full"></span> Headquarters
                 </h3>
                 <p class="text-3xl text-white font-bold tracking-tight">Cedar Park, Texas</p>
                 <p class="text-slate-400 text-sm max-w-xs">Austin area headquarters, with a branch office in San Antonio. Serving clients across Texas.</p>
               </div>
               
               <div class="flex flex-col gap-3 pt-4 border-t border-white/10 w-fit">
                 <div class="flex gap-4 items-center">
                   <span class="text-xl text-slate-200 font-mono">210-549-7557</span>
                   <span class="text-slate-600">/</span>
                   <span class="text-xl text-slate-200 font-mono">512-856-4595</span>
                 </div>
                 <a href="mailto:rao@raosengineering.com" (click)="onEmailClick()" class="block text-xl text-slate-200 hover:text-[#d5a021] transition-colors border-b border-transparent hover:border-[#d5a021] w-fit">rao&#64;raosengineering.com</a>
               </div>
            </div>

            <!-- Certifications -->
            <div class="pt-8 border-t border-white/20">
               <h3 class="text-white/60 font-bold uppercase tracking-widest text-[10px] mb-4">Authorized Certifications</h3>
               <div class="flex flex-wrap gap-4">
                  <!-- NMSDC -->
                  <div class="bg-white p-2 rounded w-20 h-14 flex items-center justify-center shadow-2xl hover:scale-105 transition-transform">
                    <img src="assets/certification/nmsdc.jpeg" class="max-h-full max-w-full object-contain">
                  </div>
                  <!-- MBE - Verified Path -->
                  <div class="bg-white p-1 rounded w-20 h-14 flex items-center justify-center shadow-2xl hover:scale-105 transition-transform">
                    <img src="assets/certification/MBE-Logo.webp" class="max-h-full max-w-full object-contain">
                  </div>
               </div>
            </div>
         </div>
      </div>

      <!-- RIGHT PANEL: Form (Clean Dark/Slate) -->
      <div class="bg-slate-50 flex items-center justify-center p-8 md:p-12 lg:p-20 relative">
         <!-- Geometric Accent -->
         <div class="absolute top-0 right-0 w-32 h-32 bg-[#d5a021]/5 rounded-bl-[100px] pointer-events-none"></div>

         <div class="w-full max-w-lg relative z-10">
            
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
              <h2 class="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Project Consultation</h2>
            </div>
            <div class="h-1 w-12 bg-[#d5a021] mb-8"></div>

            <!--
              Zoho Forms embed. Zoho receives the inquiry, stores it against the
              account and sends the notification, so a submission survives even
              if the notification e-mail fails. Shown whenever a form URL is
              configured; the hand-built form below stays as the fallback.
            -->
            <div *ngIf="useZohoForm" class="zoho-embed">
              <iframe
                [src]="zohoFormUrl"
                title="RCE Project Consultation form"
                loading="lazy"
                class="w-full border-0"
                style="min-height: 800px;"></iframe>

              <p class="mt-6 text-xs text-slate-500">
                Trouble with the form? Email
                <a [href]="'mailto:' + fallbackEmail" class="font-semibold text-slate-700 underline">{{ fallbackEmail }}</a>
                or call
                <span *ngFor="let phone of fallbackPhones; let last = last"><a [href]="'tel:' + phone" class="font-semibold text-slate-700 underline">{{ phone }}</a><span *ngIf="!last"> / </span></span>.
              </p>
            </div>

            <form (ngSubmit)="onSubmit()" class="space-y-8" *ngIf="!isSuccess && !useZohoForm">
               
               <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <!-- Name -->
                 <div class="group relative">
                   <input type="text" id="name" name="name" [(ngModel)]="formData.name" required placeholder=" "
                     class="peer w-full bg-transparent border-b border-slate-300 px-0 py-3 text-slate-900 font-medium focus:border-[#d5a021] focus:outline-none transition-colors placeholder-transparent">
                   <label for="name" class="absolute left-0 -top-3.5 text-xs text-slate-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#d5a021] font-bold uppercase tracking-wider">Full Name</label>
                 </div>

                 <!-- Phone (New) -->
                 <div class="group relative">
                   <input type="tel" id="phone" name="phone" [(ngModel)]="formData.phone" placeholder=" "
                     class="peer w-full bg-transparent border-b border-slate-300 px-0 py-3 text-slate-900 font-medium focus:border-[#d5a021] focus:outline-none transition-colors placeholder-transparent">
                   <label for="phone" class="absolute left-0 -top-3.5 text-xs text-slate-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#d5a021] font-bold uppercase tracking-wider">Phone Number</label>
                 </div>

                 <!-- Email -->
                 <div class="group relative">
                   <input type="email" id="email" name="email" [(ngModel)]="formData.email" required placeholder=" "
                     class="peer w-full bg-transparent border-b border-slate-300 px-0 py-3 text-slate-900 font-medium focus:border-[#d5a021] focus:outline-none transition-colors placeholder-transparent">
                   <label for="email" class="absolute left-0 -top-3.5 text-xs text-slate-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#d5a021] font-bold uppercase tracking-wider">Email Address</label>
                 </div>
               </div>

               <!-- Subject -->
               <div class="group relative">
                 <select id="subject" name="subject" [(ngModel)]="formData.subject"
                   class="peer w-full bg-transparent border-b border-slate-300 px-0 py-3 text-slate-900 font-medium focus:border-[#d5a021] focus:outline-none transition-colors cursor-pointer">
                    <option value="" disabled selected class="text-slate-300"></option>
                    <option value="Infrastructure Design">Infrastructure Design</option>
                    <option value="Land Development">Land Development</option>
                    <option value="Hydrology Study">Hydrology & Water Resources</option>
                    <option value="Executive Partnership">Executive Partnership</option>
                 </select>
                 <label for="subject" class="absolute left-0 -top-3.5 text-xs text-slate-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#d5a021] font-bold uppercase tracking-wider">Project Category</label>
               </div>

               <!-- Message -->
               <div class="group relative">
                 <textarea id="message" name="message" [(ngModel)]="formData.message" rows="4" placeholder=" "
                   class="peer w-full bg-transparent border-b border-slate-300 px-0 py-3 text-slate-900 font-medium focus:border-[#d5a021] focus:outline-none transition-colors resize-none placeholder-transparent"></textarea>
                 <label for="message" class="absolute left-0 -top-3.5 text-xs text-slate-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#d5a021] font-bold uppercase tracking-wider">Project Brief</label>
               </div>

               <!-- Delivery failure: never claim the message was received. -->
               <div *ngIf="isError" class="bg-red-50 p-5 rounded border border-red-200 animate-fade-in">
                 <p class="text-red-700 text-sm font-bold uppercase tracking-wider mb-2">Message not sent</p>
                 <p class="text-slate-700 text-sm mb-4">
                   We could not deliver your inquiry from the website. Your details are still
                   in the form below, so nothing is lost. Please send them directly:
                 </p>
                 <a [href]="mailtoHref" class="inline-block bg-slate-900 text-white font-bold py-3 px-6 text-xs uppercase tracking-widest hover:bg-[#d5a021] hover:text-slate-900 transition-colors">
                   Email this inquiry
                 </a>
                 <div class="mt-4 text-sm text-slate-600 space-y-1">
                   <p>Or email <a [href]="'mailto:' + fallbackEmail" class="font-semibold text-slate-900 underline">{{ fallbackEmail }}</a></p>
                   <p>
                     Or call
                     <span *ngFor="let phone of fallbackPhones; let last = last">
                       <a [href]="'tel:' + phone" class="font-semibold text-slate-900 underline">{{ phone }}</a><span *ngIf="!last"> / </span>
                     </span>
                   </p>
                 </div>
               </div>

               <!-- Submit -->
               <button type="submit" [disabled]="isSubmitting" class="w-full bg-slate-900 text-white font-bold py-4 px-8 uppercase tracking-widest hover:bg-[#d5a021] hover:text-slate-900 transition-colors flex items-center justify-between group disabled:opacity-50 disabled:cursor-not-allowed">
                 <span>{{ isSubmitting ? 'Sending...' : 'Send Message' }}</span>
                 <svg *ngIf="!isSubmitting" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                 </svg>
                 <!-- Loading Spinner -->
                 <svg *ngIf="isSubmitting" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                   <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                   <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
               </button>
            </form>

            <!-- Success State -->
            <div *ngIf="isSuccess && !useZohoForm" class="text-center py-12 animate-fade-in">
              <div class="w-16 h-16 bg-[#d5a021] text-slate-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-slate-900 mb-2">Message Received</h3>
              <p class="text-slate-600 mb-8">We have received your inquiry. One of our engineers will reach out to you shortly.</p>
              <button (click)="isSuccess = false" class="text-[#d5a021] font-bold uppercase tracking-widest text-xs hover:text-slate-900 transition-colors">
                Send another message →
              </button>
            </div>
            
         </div>
      </div>

    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    /* Force header to have a dark background on this page only */
    ::ng-deep app-header nav {
      background-color: #0f172a !important; /* slate-900 */
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
  `]
})
export class ContactComponent {
  formData = {
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  };

  isSubmitting = false;
  isSuccess = false;
  isError = false;

  readonly fallbackEmail = CONTACT_FALLBACK_EMAIL;
  readonly fallbackPhones = CONTACT_FALLBACK_PHONES;

  /** True when inquiries go to Zoho Forms rather than the hand-built form. */
  readonly useZohoForm = isZohoFormConfigured();
  readonly zohoFormUrl: SafeResourceUrl;

  constructor(
    private analytics: AnalyticsService,
    sanitizer: DomSanitizer
  ) {
    // The URL is a compile-time constant from our own config, not user input.
    this.zohoFormUrl = sanitizer.bypassSecurityTrustResourceUrl(ZOHO_FORM_URL);
  }

  /**
   * A mailto: link carrying whatever the visitor typed, shown only after a
   * failed submission. It is a link the visitor chooses to click, not an
   * automatic redirect — a redirect does nothing at all on a device with no
   * mail client configured, which is how inquiries were being lost silently.
   */
  get mailtoHref(): string {
    const subject = encodeURIComponent(
      `Project Inquiry: ${this.formData.subject || 'General'}`
    );
    const body = encodeURIComponent(
      `Name: ${this.formData.name}
` +
      `Phone: ${this.formData.phone}
` +
      `Email: ${this.formData.email}
` +
      `Project category: ${this.formData.subject}

` +
      `Project brief:
${this.formData.message}`
    );
    return `mailto:${CONTACT_FALLBACK_EMAIL}?subject=${subject}&body=${body}`;
  }

  /** Track when a visitor clicks the email address link in the contact panel. */
  onEmailClick(): void {
    this.analytics.trackEmailClick('contact_page');
  }

  async onSubmit() {
    this.isSubmitting = true;
    this.isSuccess = false;
    this.isError = false;

    // No endpoint configured yet — fail honestly rather than pretend to send.
    if (!isContactFormConfigured()) {
      this.reportFailure('not_configured');
      this.isSubmitting = false;
      return;
    }

    try {
      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...this.formData,
          _subject: `New Project Inquiry: ${this.formData.subject} from ${this.formData.name}`
        })
      });

      // FormSubmit answers HTTP 200 even when it rejects the submission (for
      // example while the form is still awaiting activation), so the status
      // code alone must never be treated as proof of delivery. The body's
      // "success" flag is the real answer.
      let accepted = response.ok;
      let reason = `http_${response.status}`;

      if (response.ok) {
        try {
          const body = await response.json();
          if ('success' in body) {
            accepted = String(body.success) === 'true';
            if (!accepted) {
              reason = 'rejected_by_provider';
              console.error('Contact form rejected:', body.message);
            }
          }
        } catch {
          // A 2xx with no JSON body: treat as accepted, as Formspree-style
          // endpoints answer 200 with an empty body on success.
        }
      }

      if (accepted) {
        this.isSuccess = true;
        // Track successful form submission with the chosen project category.
        // Mark 'form_submit' as a Key Event in GA4 — this is a primary business conversion.
        this.analytics.trackFormSubmit(this.formData.subject || 'Not specified');
        // Only clear the form once the inquiry has genuinely been accepted.
        this.formData = { name: '', phone: '', email: '', subject: '', message: '' };
      } else {
        this.reportFailure(reason);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      this.reportFailure('network_error');
    } finally {
      this.isSubmitting = false;
    }
  }

  /**
   * Shows the failure panel and records the reason. The form data is kept so
   * the visitor can still send it by e-mail or phone, and the success state is
   * never set — an inquiry RCE did not receive must not look like one it did.
   */
  private reportFailure(reason: string): void {
    this.isError = true;
    this.isSuccess = false;
    this.analytics.trackMailtoFallback(
      `${this.formData.subject || 'Not specified'} (${reason})`
    );
  }
}
