import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- HERO -->
    <section class="hero">
      <div class="hero-bg">
        <img src="assets/abstract-hero.png" alt="Architectural engineering geometry" class="bg-image">
        <div class="hero-overlay"></div>
        <div class="technical-overlay"></div>
      </div>
      <div class="hero-content">
        <h1>Legacy of <span class="text-gold">Trust</span></h1>
        <p class="subtitle">Serving Texas with integrity since 2006.</p>
      </div>
    </section>

    <!-- CAPABILITY DASHBOARD (Balanced Horizontal & Zero-Scroll) -->
    <section class="capability-section py-20 bg-white relative overflow-hidden">
      <!-- Technical Motifs -->
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,188,212,0.03)_0%,transparent_50%)]"></div>
      <div class="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.01)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

      <div class="container mx-auto px-8 max-w-[1920px] relative z-10">
        
        <!-- Dashboard Header: Re-balanced & Wide -->
        <div class="flex flex-col lg:flex-row lg:items-center justify-between mb-16 border-b border-slate-100 pb-12 gap-8">
          <div class="max-w-4xl">
             <div class="inline-block px-4 py-1 border border-cyan-500/20 rounded-full text-cyan-500 text-[10px] font-bold tracking-[0.5em] uppercase mb-6 bg-cyan-50/30">
                Institutional Profile
             </div>
             <h2 class="text-4xl md:text-7xl font-bold text-slate-900 tracking-tighter leading-none">
                About <span class="text-cyan-500">Rao's Consulting</span> <br> 
                <span class="text-slate-400">Engineers (RCE)</span>
             </h2>
          </div>
          
          <!-- Balanced Legacy Stat -->
          <div class="mt-8 lg:mt-0 flex items-center gap-10 bg-slate-50 px-12 py-8 rounded-3xl border border-slate-100 shadow-sm">
             <div class="flex flex-col">
                <span class="text-6xl font-bold text-[#d5a021] leading-none">21+</span>
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mt-3">Years Legacy</span>
             </div>
             <div class="h-16 w-px bg-slate-200"></div>
             <div class="text-base text-slate-500 font-light leading-relaxed max-w-[220px]">
                Elite engineering planning & design since 2005.
                <span class="block mt-3 text-[11px] font-medium text-slate-400 tracking-wide">Texas Registered Engineering Firm <span class="whitespace-nowrap">F-17655</span></span>
             </div>
          </div>
        </div>

        <!-- STRETCHED 4-COLUMN HORIZON -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          
          <!-- Pillar 01 -->
          <div class="relative group p-10 rounded-3xl bg-slate-50/50 border border-slate-100/80 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-700">
             <div class="flex items-center gap-4 mb-6">
                <span class="text-cyan-500 font-mono text-lg font-bold">01</span>
                <div class="h-px w-8 bg-cyan-500/20"></div>
             </div>
             <h3 class="text-sm font-bold text-slate-900 uppercase tracking-[0.3em] mb-4">Core Infrastructure</h3>
             <p class="text-slate-600 text-base leading-relaxed font-light">
                Comprehensive expertise in the planning and design of public and private infrastructure, specializing in institutional, multi / family, and commercial subdivision projects.
             </p>
          </div>

          <!-- Pillar 02 -->
          <div class="relative group p-10 rounded-3xl bg-slate-50/50 border border-slate-100/80 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-700">
             <div class="flex items-center gap-4 mb-6">
                <span class="text-cyan-500 font-mono text-lg font-bold">02</span>
                <div class="h-px w-8 bg-cyan-500/20"></div>
             </div>
             <h3 class="text-sm font-bold text-slate-900 uppercase tracking-[0.3em] mb-4">Regional Command</h3>
             <p class="text-slate-600 text-base leading-relaxed font-light">
                Established presence across the Greater San Antonio area, Houston, Austin, and Dallas. Designing private roadways that power high-consequence Texas developments.
             </p>
          </div>

          <!-- Pillar 03 -->
          <div class="relative group p-10 rounded-3xl bg-slate-50/50 border border-slate-100/80 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-700">
             <div class="flex items-center gap-4 mb-6">
                <span class="text-cyan-500 font-mono text-lg font-bold">03</span>
                <div class="h-px w-8 bg-cyan-500/20"></div>
             </div>
             <h3 class="text-sm font-bold text-slate-900 uppercase tracking-[0.3em] mb-4">Hydrologic Expertise</h3>
             <p class="text-slate-600 text-base leading-relaxed font-light">
                Specialized mastery in managing City and FEMA CLOMR/LOMR processes. Delivering innovative solutions for complex drainage systems and grading.
             </p>
          </div>

          <!-- Pillar 04 -->
          <div class="relative group p-10 rounded-3xl bg-slate-50/50 border border-slate-100/80 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-700">
             <div class="flex items-center gap-4 mb-6">
                <span class="text-cyan-500 font-mono text-lg font-bold">04</span>
                <div class="h-px w-8 bg-cyan-500/20"></div>
             </div>
             <h3 class="text-sm font-bold text-slate-900 uppercase tracking-[0.3em] mb-4">Strategic Permitting</h3>
             <p class="text-slate-600 text-base leading-relaxed font-light">
                Adept navigation of permitting requirements for TxDOT, TCEQ, and SAWS across numerous Texas municipalities including San Antonio, Dallas, Austin, Houston, Frisco, Round Rock, and Cedar Park.
             </p>
          </div>

        </div>
      </div>
    </section>

    <!-- VIDEO SECTION -->
    <section class="video-section">
      <div class="container">
        <div class="section-header">
          <h2>See Our Work <span class="text-gold">In Action</span></h2>
          <p class="section-subtitle">Engineering excellence across Central Texas</p>
        </div>
        <div class="video-container relative group cursor-pointer" (click)="playVideo(videoPlayer)">
          <video #videoPlayer (play)="isPlaying = true" (pause)="isPlaying = false" controls class="showcase-video" poster="assets/images/about_video_poster.jpg">
            <source src="assets/videos/video.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
          
          <!-- Custom Play Overlay -->
          <div class="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/40 group-hover:bg-slate-900/30 transition-all z-10 backdrop-blur-[2px]"
               *ngIf="!isPlaying">
             <div class="w-20 h-20 bg-[#d5a021] rounded-full flex items-center justify-center shadow-2xl mb-4 transform group-hover:scale-110 transition-transform duration-300 border-4 border-white/10">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-slate-900 ml-1" viewBox="0 0 20 20" fill="currentColor">
                 <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
               </svg>
             </div>
             <div class="bg-black/50 px-6 py-2 rounded-full border border-white/20 backdrop-blur-md">
                <span class="text-white font-bold uppercase tracking-widest text-xs">Click to Watch Our Story</span>
             </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PHILOSOPHY -->
    <section class="philosophy-section">
      <div class="container">
        <div class="section-header">
          <h2>Our <span class="text-gold">Philosophy</span></h2>
        </div>
        <div class="values-grid">
          <div class="value-item">
            <h3>Logic</h3>
            <p>
              Engineering is the art of applying scientific principles to practical problems. We bring rigorous logic to every drainage study, utility design, and site plan.
            </p>
          </div>
          <div class="value-item">
            <h3>Excellence</h3>
            <p>
              Good enough isn't in our vocabulary. We strive for perfection in our technical deliverables and our client communication.
            </p>
          </div>
          <div class="value-item">
            <h3>Family</h3>
            <p>
              We are a family-owned firm, and we treat our clients like partners. When you work with Rao Engineering, you're not just a project number.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CULTURE SECTION -->
    <section class="culture-section">
      <div class="container">
        <div class="section-header">
          <h2>Our <span class="text-cyan">Culture</span></h2>
          <p>A family-focused environment where excellence thrives</p>
        </div>
        <div class="culture-grid">
          <div class="culture-item">
            <h3>Family First</h3>
            <p>
              We believe in work-life balance and treat every team member like family. Your success and well-being matter to us.
            </p>
          </div>
          <div class="culture-item">
            <h3>Continuous Learning</h3>
            <p>
              We invest in ongoing training and professional development to keep our team at the forefront of engineering innovation.
            </p>
          </div>
          <div class="culture-item">
            <h3>Client Partnership</h3>
            <p>
              We don't just work for clients—we work with them. Your project becomes our mission.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- SERVICE AREA -->
    <section class="service-area-section">
      <div class="container">
        <h2>Serving <span class="text-gold">Texas</span></h2>
        <p class="section-subtitle">
          From San Antonio, Austin, Houston, Dallas, and beyond—we're your Texas engineering partner.
        </p>
        <div class="stats-row">
          <div class="stat-item">
            <span class="stat-number text-gold">20+</span>
            <span class="stat-label">Years Experience</span>
          </div>

          <div class="stat-item">
            <span class="stat-number text-orange">100%</span>
            <span class="stat-label">Client Satisfaction</span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      position: relative;
      height: 55vh;
      min-height: 350px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #1a202c;
      color: #ffffff;
      text-align: center;
      padding: 0 2rem;
      overflow: hidden;
    }

    .hero-bg {
      position: absolute;
      inset: 0;
      z-index: 0;
    }

    .bg-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(26, 32, 44, 0.5) 0%, rgba(15, 23, 42, 0.85) 100%);
    }

    .technical-overlay {
      position: absolute;
      inset: 0;
      background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1.5px, transparent 1.5px);
      background-size: 38px 38px;
      pointer-events: none;
    }

    .hero-content {
      position: relative;
      z-index: 10;
      max-width: 800px;
    }

    .hero h1 {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 700;
      margin: 0 0 1.25rem 0;
      letter-spacing: -0.02em;
      line-height: 1.15;
    }

    .hero .subtitle {
      font-size: clamp(1rem, 1.8vw, 1.2rem);
      color: rgba(255, 255, 255, 0.8);
      line-height: 1.6;
      margin: 0;
      font-weight: 400;
    }

    .text-gold {
      color: #d5a021;
    }

    .text-cyan {
      color: #06b6d4;
    }

    .text-orange {
      color: #f97316;
    }

    .container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .history-section {
      padding: 5rem 0;
      background: #ffffff;
    }

    .grid-2 {
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      gap: 3rem;
      align-items: center;
    }

    .text-content h2 {
      font-size: 1.75rem;
      font-weight: 600;
      color: #111827;
      margin: 0 0 1.5rem 0;
    }

    .text-content p {
      font-size: 1.1rem;
      line-height: 1.8;
      color: #374151;
      margin: 0 0 1.25rem 0;
    }

    .stat-box {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      padding: 3rem 2rem;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }

    .big-number {
      display: block;
      font-size: 4rem;
      font-weight: 700;
      color: #d5a021;
      line-height: 1;
      margin-bottom: 0.5rem;
    }

    .stat-box .label {
      display: block;
      font-size: 1rem;
      color: #6b7280;
      font-weight: 500;
    }

    .video-section {
      padding: 5rem 0;
      background: #f9fafb;
      border-top: 1px solid #e5e7eb;
    }

    .section-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .section-header h2 {
      font-size: 1.75rem;
      font-weight: 700;
      color: #111827;
      margin: 0 0 0.75rem 0;
    }

    .section-subtitle {
      font-size: 1.1rem;
      color: #6b7280;
      margin: 0;
    }

    .video-container {
      max-width: 800px;
      margin: 0 auto;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
      background: #ffffff;
      border: 1px solid #e5e7eb;
    }

    .showcase-video {
      width: 100%;
      height: auto;
      display: block;
    }

    .philosophy-section {
      padding: 5rem 0;
      background: #ffffff;
      border-top: 1px solid #e5e7eb;
    }

    .values-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }

    .value-item {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      padding: 2rem;
      border-radius: 4px;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .value-item:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }

    .value-item h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #111827;
      margin: 0 0 1rem 0;
    }

    .value-item p {
      font-size: 1rem;
      line-height: 1.7;
      color: #4b5563;
      margin: 0;
    }

    .culture-section {
      padding: 5rem 0;
      background: #f9fafb;
      border-top: 1px solid #e5e7eb;
    }

    .culture-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }

    .culture-item {
      background: #ffffff;
      border: 1px solid #e5e7eb;
      padding: 2rem;
      border-radius: 4px;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .culture-item:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }

    .culture-item h3 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #111827;
      margin: 0 0 0.75rem 0;
    }

    .culture-item p {
      font-size: 0.95rem;
      line-height: 1.6;
      color: #4b5563;
      margin: 0;
    }

    .service-area-section {
      padding: 5rem 0;
      background: #ffffff;
      border-top: 1px solid #e5e7eb;
      text-align: center;
    }

    .service-area-section h2 {
      font-size: 1.75rem;
      font-weight: 700;
      color: #111827;
      margin: 0 0 0.75rem 0;
    }

    .service-area-section .section-subtitle {
      margin-bottom: 3rem;
    }

    .stats-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 3rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .stat-number {
      font-size: 3rem;
      font-weight: 700;
      line-height: 1;
    }

    .stat-label {
      font-size: 0.9rem;
      color: #6b7280;
      font-weight: 500;
    }

    @media (max-width: 768px) {
      .hero {
        height: 40vh;
        min-height: 280px;
      }

      .grid-2,
      .values-grid,
      .culture-grid,
      .stats-row {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .history-section,
      .video-section,
      .philosophy-section,
      .culture-section,
      .service-area-section {
        padding: 3rem 0;
      }

      .container {
        padding: 0 1.25rem;
      }
    }
  `]
})
export class AboutComponent {
  isPlaying = false;

  playVideo(video: HTMLVideoElement) {
    if (this.isPlaying) return;
    video.play();
    this.isPlaying = true;
  }
}
