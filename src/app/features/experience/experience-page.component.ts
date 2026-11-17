import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GalleryImage, ProjectGalleryComponent } from './components/project-gallery/project-gallery.component';

interface Project {
  title: string;
  category: string;
  location: string;
  /**
   * A photograph of the COMPLETED development. This is what a prospective
   * client looks for, so it leads the card whenever it exists. Only ever a
   * picture of this project: never stock, never another job's site.
   */
  photo?: string;
  /** Alt text and caption for the photo. Required whenever `photo` is set. */
  photoCaption?: string;

  /**
   * An engineering exhibit - one of RCE's own drawing sheets, or a project
   * rendering. Shown alongside the photo, or on its own before the project is
   * built. `exhibitKind` labels it so a rendering is never read as a photo.
   */
  exhibit?: string;
  exhibitCaption?: string;
  exhibitKind?: 'rendering';
  /**
   * Two or more images of the same project, shown as one gallery with
   * labelled selectors, a counter, arrows and a full-size viewer. It takes
   * the place of the single lead image. A project with fewer than two
   * images keeps the normal display.
   */
  gallery?: GalleryImage[];
  /** Shape of the gallery's main image frame (CSS aspect-ratio). Default 16 / 9. */
  galleryAspect?: string;
  /** Short honest status for the case-study chip, e.g. 'Construction plans prepared'. */
  status?: string;
  /** Up to three verified key figures for the case-study tiles. */
  highlights?: { value: string; label: string }[];
  description: string;
  challengesSummary?: string;
  /** Engineering scope. Omitted where the real scope has not been supplied. */
  scope?: string;
  services?: string[];
  acreage?: number;
  featured?: boolean;
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
  imports: [CommonModule, RouterModule, FormsModule, ProjectGalleryComponent],
  template: `
    <header class="page-header relative overflow-hidden bg-slate-950 pb-8 pt-24 text-white lg:pb-12 lg:pt-32">
      <div class="absolute inset-0 z-0">
        <img src="assets/images/brand/experience_hero_blueprint.png" alt="" aria-hidden="true"
             class="h-full w-full object-cover opacity-30 mix-blend-screen">
      </div>
      <div class="absolute inset-0 z-10 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/60"></div>
      <div class="container relative z-20 mx-auto grid max-w-6xl gap-5 px-4 lg:grid-cols-5 lg:gap-8 lg:items-end">
        <div class="lg:col-span-3">
          <p class="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d5a021] md:text-xs">Site civil engineering &middot; Projects</p>
          <h1 class="page-title mt-2 text-2xl font-bold leading-tight tracking-tight md:text-5xl">{{ sectorH1[activeFilter] }}</h1>
          <p class="page-subtitle mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">{{ sectorLines[activeFilter] }}</p>
          <ul class="mt-4 flex flex-wrap gap-1.5 lg:gap-2" aria-label="Engineering capabilities">
            <li *ngFor="let c of capabilities" class="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">{{ c }}</li>
          </ul>
          <div class="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
            <a routerLink="/contact" class="rounded bg-[#d5a021] px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-900 transition hover:bg-yellow-400">Discuss your site</a>
            <p class="text-sm text-slate-300">
              San Antonio <a href="tel:+12105497557" class="font-semibold text-white underline-offset-4 hover:text-[#d5a021] hover:underline">210-549-7557</a>
              <span class="mx-1 text-slate-500">&middot;</span>
              Austin <a href="tel:+15128564595" class="font-semibold text-white underline-offset-4 hover:text-[#d5a021] hover:underline">512-856-4595</a>
            </p>
          </div>
        </div>
        <div class="lg:col-span-2">
          <dl class="grid grid-cols-3 gap-2 lg:gap-3">
            <div *ngFor="let st of sectorStats" class="flex flex-col-reverse rounded-lg border border-white/10 bg-white/5 px-3 py-2 lg:p-4">
              <dt class="mt-0.5 text-xs font-semibold leading-tight text-slate-400">{{ st.label }}</dt>
              <dd class="text-xl font-bold lg:text-2xl">{{ st.value }}</dd>
            </div>
          </dl>
          <p class="mt-4 text-xs text-slate-400">Related services:
            <ng-container *ngFor="let sv of sectorServices; let last = last"><a [routerLink]="sv.link" class="font-semibold text-slate-200 hover:text-[#d5a021]">{{ sv.name }}</a><span *ngIf="!last"> &middot; </span></ng-container>
          </p>
        </div>
      </div>
    </header>

    <div class="bg-slate-50 py-10">
      <div class="container mx-auto px-4">
        
        <!-- SECTOR MENU: one page per sector (no 'All') -->
        <nav aria-label="Project sectors" class="sticky top-[80px] z-30 lg:top-[112px] -mx-4 mb-10 flex gap-2 overflow-x-auto border-b border-slate-200 bg-slate-50/95 px-4 py-3 backdrop-blur [scrollbar-width:none] md:flex-wrap md:justify-center md:gap-3">
          <a *ngFor="let sec of sectors" [routerLink]="['/experience', sectorSlug(sec)]" fragment="projects-grid"
             [attr.aria-current]="sec === activeFilter ? 'page' : null"
             class="shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-widest shadow-sm transition-all hover:border-[#d5a021] md:px-5 md:text-xs"
             [ngClass]="sec === activeFilter ? 'border-[#d5a021] bg-[#d5a021] text-slate-900' : 'border-slate-200 bg-white text-slate-600'">
            {{ sectorLabel(sec) }}
          </a>
        </nav>

        <div id="projects-grid" class="scroll-mt-32">

          <!-- Case studies: projects with plan sets or galleries -->
          <div *ngIf="caseStudies.length" class="mb-12 grid gap-6 md:grid-cols-2">
            <ng-container *ngFor="let project of caseStudies">
              <ng-container *ngTemplateOutlet="projectCard; context: { $implicit: project }"></ng-container>
            </ng-container>
          </div>

          <!-- Projects with a site photo -->
          <div *ngIf="photoProjects.length" class="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <ng-container *ngFor="let project of photoProjects">
              <ng-container *ngTemplateOutlet="projectCard; context: { $implicit: project }"></ng-container>
            </ng-container>
          </div>

          <!-- Everything else: compact rows, no empty image panels -->
          <section *ngIf="otherProjects.length" class="mb-16" aria-labelledby="more-projects-title">
            <h2 id="more-projects-title" class="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-slate-500">
              More {{ sectorLabel(activeFilter) }} projects
            </h2>
            <ul class="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <li *ngFor="let p of visibleRows" class="grid gap-2 px-6 py-5 md:grid-cols-12 md:items-center md:gap-6">
                <div class="md:col-span-4">
                  <p class="font-bold text-slate-900">{{ p.title }}</p>
                  <p class="mt-0.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#7a5a0e]">{{ p.location }}</p>
                </div>
                <p class="text-sm leading-relaxed text-slate-600 md:col-span-5">{{ p.description }}</p>
                <ul class="flex flex-wrap gap-1.5 md:col-span-3 md:justify-end" aria-label="Services">
                  <li *ngFor="let s of p.services" class="rounded-sm border border-slate-100 bg-slate-50 px-2 py-1 text-[9px] font-bold uppercase tracking-tight text-slate-500">{{ s }}</li>
                </ul>
              </li>
            </ul>
            <button *ngIf="otherProjects.length > rowLimit && !showAllRows" type="button" (click)="showAllRows = true"
                    class="mt-4 rounded-full border-2 border-slate-900 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-900 transition-colors hover:bg-slate-900 hover:text-white">
              Show all {{ otherProjects.length }} projects
            </button>
          </section>
        </div>

        <!-- TEMPLATE: STANDARD PROJECT CARD -->
        <ng-template #projectCard let-project>
          <ng-container *ngIf="hasGallery(project); else standardCard">
            <!-- CASE STUDY CARD: compact; the full plan set opens in the viewer -->
            <article class="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
              <app-project-gallery #viewer [viewerOnly]="true" [images]="project.gallery" [projectTitle]="project.title"></app-project-gallery>
              <button type="button" (click)="viewer.openLightbox()"
                      class="group relative block aspect-video w-full overflow-hidden bg-slate-950 focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#d5a021]"
                      [attr.aria-label]="'View ' + project.gallery.length + ' plan views for ' + project.title">
                <img [src]="project.gallery[0].src" [alt]="project.gallery[0].alt"
                     class="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]">
                <span class="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-slate-950/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#d5a021]">
                  <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/></svg>
                  {{ project.gallery.length }} views
                </span>
              </button>
              <div class="flex flex-1 flex-col p-6">
                <div class="flex flex-wrap items-center justify-between gap-2">
                  <p class="text-[11px] font-bold uppercase tracking-[0.15em] text-[#7a5a0e]">{{ project.location }}</p>
                  <span *ngIf="project.status" class="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600">{{ project.status }}</span>
                </div>
                <h3 class="mt-2 text-xl font-bold leading-tight text-slate-900">{{ project.title }}</h3>
                <p class="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">{{ project.description }}</p>
                <dl *ngIf="project.highlights?.length" class="mt-4 grid grid-cols-3 gap-2">
                  <div *ngFor="let h of project.highlights" class="flex flex-col-reverse rounded-lg bg-slate-50 px-3 py-2">
                    <dt class="text-[9px] font-bold uppercase leading-tight tracking-[0.1em] text-slate-500">{{ h.label }}</dt>
                    <dd class="break-words text-sm font-bold leading-tight text-slate-900">{{ h.value }}</dd>
                  </div>
                </dl>
                <div class="mt-auto flex items-center justify-between gap-3 pt-5">
                  <p class="min-w-0 truncate text-xs text-slate-500">{{ (project.services || []).join(' · ') }}</p>
                  <button type="button" (click)="viewer.openLightbox()"
                          class="shrink-0 rounded-full border-2 border-slate-900 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-900 transition-colors hover:bg-slate-900 hover:text-white">View plans</button>
                </div>
              </div>
            </article>
          </ng-container>
          <ng-template #standardCard>
            <div class="group relative overflow-hidden rounded-xl shadow-md transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl bg-white border border-slate-100 flex flex-col h-full">
            
            <ng-container *ngIf="!hasGallery(project); else projectGallery">
            <!-- Lead visual: completed-site photo, else engineering exhibit,
                 else a drafting panel. Never a stand-in from another project. -->
            <div class="relative aspect-video overflow-hidden bg-slate-100">
              <img *ngIf="leadImage(project)"
                [src]="leadImage(project)"
                [alt]="project.title + ' - ' + (leadCaption(project) || project.location)"
                (error)="onPhotoError(project)"
                [style.transform]="project.rotate ? 'rotate(' + project.rotate + 'deg) scale(1.8)' : ''"
                class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 saturate-[1.1] contrast-[1.05]">

              <!-- Nothing verified yet: a drafting panel, honestly labelled -->
              <div *ngIf="!leadImage(project)"
                   class="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center text-center px-6"
                   role="img"
                   [attr.aria-label]="project.title + ' - no site photograph available'">
                <div class="absolute inset-0 opacity-[0.18] pointer-events-none"
                     style="background-image: linear-gradient(to right, #d5a021 1px, transparent 1px), linear-gradient(to bottom, #d5a021 1px, transparent 1px); background-size: 28px 28px;"></div>
                <div class="absolute inset-4 border border-[#d5a021]/20 rounded pointer-events-none"></div>
                <svg class="w-8 h-8 text-[#d5a021]/70 mb-3 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                </svg>
                <div class="relative z-10 text-[10px] font-bold uppercase tracking-[0.3em] text-[#d5a021]">{{ project.category }}</div>
                <div class="relative z-10 text-[9px] uppercase tracking-[0.2em] text-slate-400 mt-1">{{ project.location }}</div>
              </div>


              <!-- Says what the lead image is, so a drawing or a rendering is
                   never mistaken for a photograph of a finished site. -->
              <div *ngIf="leadImage(project) && !photoOf(project)" class="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-slate-950/90 to-transparent px-5 pt-8 pb-3 flex items-center gap-2">
                <span *ngIf="!project.photo"
                      class="shrink-0 text-[8px] font-bold uppercase tracking-[0.18em] text-slate-900 bg-[#d5a021] px-1.5 py-0.5 rounded-sm">
                  {{ project.exhibitKind === 'rendering' ? 'Rendering' : 'Drawing' }}
                </span>
                <span class="text-[9px] uppercase tracking-[0.18em] text-slate-200 font-semibold truncate">
                  {{ leadCaption(project) }}
                </span>
              </div>
            </div>

            <!-- Second visual: the engineering behind the built photo. A real
                 <img>, so it carries its own alt text for search. -->
            <div *ngIf="secondaryExhibit(project)" class="relative border-t border-slate-100 bg-slate-50">
              <img [src]="secondaryExhibit(project)"
                   [alt]="project.title + ' - ' + (project.exhibitCaption || 'engineering exhibit')"
                      class="w-full h-28 object-cover opacity-90">
              <div class="absolute inset-0 flex items-end px-5 pb-2 bg-gradient-to-t from-white/95 to-transparent">
                <span class="text-[9px] uppercase tracking-[0.18em] text-slate-600 font-semibold">
                  {{ project.exhibitCaption }}
                </span>
              </div>
            </div>

            </ng-container>
            <ng-template #projectGallery>
              <app-project-gallery [images]="project.gallery" [projectTitle]="project.title" [aspect]="project.galleryAspect || '16 / 9'"></app-project-gallery>
            </ng-template>

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
                <div *ngIf="project.scope" class="mb-5 pt-5 border-t border-slate-50">
                  <div class="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-3">Engineering Scope</div>
                  <div class="text-xs text-slate-700 leading-snug line-clamp-2">{{ project.scope }}</div>
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
        </ng-template>

        <!-- HOW EVERY RCE PROJECT RUNS: one slim strip (RCE employee training manual) -->
        <section class="mb-8 rounded-2xl border border-slate-200 bg-white px-6 py-5" aria-labelledby="process-title">
          <div class="flex flex-col gap-4 lg:flex-row lg:items-center">
            <h2 id="process-title" class="shrink-0 text-sm font-bold text-slate-900 lg:w-48">How every RCE project runs</h2>
            <ol class="grid flex-1 grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3 lg:grid-cols-6">
              <li *ngFor="let st of processSteps; let i = index" class="flex items-baseline gap-2" [attr.title]="st.text">
                <span class="text-[11px] font-bold text-[#7a5a0e]">{{ i + 1 | number: '2.0' }}</span>
                <span class="text-xs font-semibold text-slate-700">{{ st.title }}<span class="sr-only">: {{ st.text }}</span></span>
              </li>
            </ol>
          </div>
        </section>

        <!-- CALL TO ACTION (replaces the long site-inspections block) -->
        <section class="flex flex-col items-start justify-between gap-6 rounded-2xl bg-slate-950 px-7 py-8 text-white md:flex-row md:items-center lg:px-10">
          <div>
            <p class="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d5a021]">Planning a site?</p>
            <p class="mt-2 text-xl font-bold lg:text-2xl">Talk to RCE before you commit.</p>
            <p class="mt-1 max-w-2xl text-sm leading-relaxed text-slate-300">
              Due diligence, zoning, platting, design and permitting from one Texas team, plus site inspections from pre-construction through final compliance.
            </p>
          </div>
          <a routerLink="/contact" class="shrink-0 rounded bg-[#d5a021] px-8 py-4 text-xs font-bold uppercase tracking-widest text-slate-900 transition hover:bg-yellow-400">Start a conversation</a>
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
  /**
   * IMAGE POLICY
   * Only images of the project itself - a photograph of the completed
   * development, or the project's own rendering. No CAD site plans, no stock
   * photography, and never another project's picture.
   *
   * Every image here was checked by opening the file, not by trusting the
   * path. Projects without a verified image show a drafting panel until a
   * real photograph exists; that is deliberate, not an oversight.
   *
   * Known limitation: every file except vista_ridge is a 312-546px thumbnail
   * upscaled into the card. Replace with originals when they are available.
   */
  projects: Project[] = [
    // ========================= COMMERCIAL =========================
    {
      title: 'Montgomery Pines Crossing',
      category: 'Multi / Family',
      location: 'Porter, TX',
      gallery: [
        {
          src: 'assets/projects/MULTI-FAMILY/montgomery-pines-apartments.jpg',
          label: 'Apartment Development',
          alt: 'Aerial view of the Montgomery Pines Crossing multi-family site in Montgomery County, Texas, with Montgomery Pines Rd marked. RCE civil scope: site development design, roadway, drainage and stormwater, utilities, and grading and erosion control.'
        },
        {
          src: 'assets/projects/MULTI-FAMILY/montgomery-pines-roadway-corrected.jpg',
          label: 'Roadway Improvements',
          alt: 'Aerial view of Montgomery Pines Rd beside Interstate 69 and the Eastex Freeway Frontage Rd in Montgomery County, Texas, with the multi-family site at lower right. RCE civil scope: roadway design and layout, grading and drainage, utilities coordination, and construction support.'
        }
      ],
      highlights: [
        { value: '43 ac', label: 'Site' },
        { value: '±1,200 LF', label: 'Public road' },
        { value: '±3,000 LF', label: 'Water main' }
      ],
      description: 'Master-planned 43-acre multi-family tract in Porter, TX, subdivided into development parcels served by a new public road and public utilities.',
      scope: '±1,200 LF public roadway, ±2,800 LF sanitary sewer main, ±3,000 LF water main and ±1,500 LF storm sewer.',
      services: ['Master Planning', 'Infrastructure Design', 'Permitting'],
      acreage: 43,
      featured: true
    },
    {
      title: 'Hero Way Crossing',
      category: 'Commercial',
      location: 'Leander, TX',
      gallery: [
        {
          src: 'assets/projects/comercial/hero-way-crossing-grading-drainage.jpg',
          label: 'Grading & Drainage',
          alt: 'RCE grading and drainage plan for Hero Way Crossing in Leander, Texas, showing site grading over existing contours, storm drainage and a water quality pond. City of Leander public improvement plans, project 20-PICP-012.'
        },
        {
          src: 'assets/projects/comercial/hero-way-crossing-sewer-plan-profile.jpg',
          label: 'Sewer Plan & Profile',
          alt: 'RCE sanitary sewer plan and profile for Hero Way Crossing in Leander, Texas, showing the public sewer main with manholes and pipe slopes in plan and profile.'
        },
        {
          src: 'assets/projects/comercial/hero-way-crossing-final-plat.jpg',
          label: 'Final Plat',
          alt: 'Hero Way Crossing short form final plat in Leander, Texas: 16.860 acres in four commercial and retail lots in one block, with RCE named as civil engineer.'
        }
      ],
      highlights: [
        { value: '16.86 ac', label: 'Site' },
        { value: '4', label: 'Commercial lots' },
        { value: '20-PICP-012', label: 'City of Leander case' }
      ],
      description: '16.86-acre commercial subdivision in Leander, TX: four commercial lots with public utility extensions, storm drainage and a water quality pond.',
      scope: '±1,200 LF sanitary sewer main, ±900 LF water main, storm sewer system and water quality pond.',
      services: ['Infrastructure Design', 'Site Development', 'Permitting'],
      acreage: 16.85
    },
    {
      title: 'Whitestone Commercial',
      category: 'Commercial',
      location: 'Cedar Park, TX',
      gallery: [
        {
          src: 'assets/projects/comercial/whitestone-commercial-rendering.jpg',
          label: 'Rendering',
          alt: 'Rendering of the Whitestone Commercial retail center in Cedar Park, Texas: a single-storey row of storefronts with parking and landscaping.'
        },
        {
          src: 'assets/projects/comercial/whitestone-commercial-site-layout.jpg',
          label: 'Site Layout',
          alt: 'RCE site layout for Whitestone Commercial on W Whitestone Blvd at Lone Star Dr in Cedar Park, Texas: 22,500 sqft of office, retail and restaurant space with a detention and water quality pond.'
        },
        {
          src: 'assets/projects/comercial/whitestone-commercial-rezoning.jpg',
          label: 'Rezoning',
          alt: 'Zoning map of the Whitestone Commercial property in Cedar Park, Texas, outlined between neighbouring zoning districts, with RCE rezoning facts: Future Land Use Plan amendment and rezoning from SR to General Business with a Conditional Overlay.'
        }
      ],
      highlights: [
        { value: '22,500 sf', label: 'Building area' },
        { value: 'SR → GB-CO', label: 'Rezoning' },
        { value: 'FLUP', label: 'Plan amendment' }
      ],
      description: '5-acre mixed commercial site on W Whitestone Blvd, Cedar Park, TX, with 22,500 SF of office, retail and restaurant space.',
      scope: 'Future Land Use Plan amendment and rezoning from SR to General Business with a Conditional Overlay (GB-CO), presented to the City of Cedar Park, plus the site layout with detention and water quality.',
      services: ['FLUP Amendment', 'Rezoning', 'Site Layout', 'City Council Representation'],
      acreage: 5
    },
    {
      title: 'Salerno Commercial',
      category: 'Commercial',
      location: 'Round Rock, TX',
      gallery: [
        {
          src: 'assets/projects/comercial/salerno-commercial-concept.jpg',
          label: 'Site Plan Illustration',
          alt: 'Site plan illustration of Salerno Commercial at 4955 University Blvd, Round Rock, Texas, showing the building, parking, access from University Blvd and Salerno Estates, and a detention pond.'
        },
        {
          src: 'assets/projects/comercial/salerno-commercial-detention-pond.jpg',
          label: 'Detention Pond',
          alt: 'RCE detention pond plan for Salerno Commercial in Round Rock, Texas, with the pond in plan and section and its outlet details. City of Round Rock site development permit plans, case SDP26-00006.'
        },
        {
          src: 'assets/projects/comercial/salerno-commercial-water-plan-profile.jpg',
          label: 'Water Plan & Profile',
          alt: 'RCE public water plan and profile for Salerno Commercial, showing a 12-inch public water main and fire hydrant in plan and profile.'
        },
        {
          src: 'assets/projects/comercial/salerno-commercial-grading.jpg',
          label: 'Grading Plan',
          alt: 'RCE grading plan for Salerno Commercial, showing site grading and an 18-inch to 36-inch storm drain network beside University Blvd and Salerno Estates.'
        }
      ],
      highlights: [
        { value: '28', label: 'Plan sheets' },
        { value: '12-inch', label: 'Public water main' },
        { value: 'SDP26-00006', label: 'City case' }
      ],
      description: 'Commercial site on University Blvd, Round Rock, TX, with a convenience store, restaurant and retail space, taken through final plat and site development permit review.',
      scope: 'Final plat and site development permit plans for the City of Round Rock (case SDP26-00006): grading, drainage, detention pond, public water and sanitary sewer.',
      services: ['Subdivision Plat', 'Site Development', 'Permitting']
    },

    {
      title: 'Georgetown Plaza',
      category: 'Commercial',
      location: 'Georgetown, TX',
      gallery: [
        {
          src: 'assets/projects/comercial/georgetown-plaza-storefront.jpg',
          label: 'Storefront Rendering',
          alt: 'Architectural rendering of the Georgetown Plaza retail storefront on E University Ave in Georgetown, Texas, showing a row of tenant spaces with glass frontage.'
        },
        {
          src: 'assets/projects/comercial/georgetown-plaza-corner.jpg',
          label: 'Corner Rendering',
          alt: 'Architectural rendering of the Georgetown Plaza retail building seen from the parking area, with landscaping, a walkway and tenant storefronts.'
        }
      ],
      highlights: [
        { value: '18', label: 'Plan sheets' },
        { value: 'Detention', label: 'Basin design' },
        { value: '2025', label: 'Plan set' }
      ],
      galleryAspect: '2.2 / 1',
      description: 'Site development plan set for a multi-tenant retail plaza on E University Ave, Georgetown, TX, prepared to City of Georgetown UDC criteria.',
      scope: 'Final plat, utility, grading, drainage and detention basin, sanitary sewer, erosion control and tree preservation plans.',
      services: ['Site Development', 'Grading & Drainage', 'Utilities']
    },

    // ========================== C-STORES ==========================
    // Fuel and convenience retail. Scope lines are intentionally absent where
    // the project record has not been supplied - do not invent them.
    {
      title: 'Tex Stop - Converse',
      category: 'C-Stores',
      location: 'Converse, TX',
      description: 'Convenience store and fuel center site in Converse, TX: site layout, fuel canopy circulation, grading, drainage and utility service.',
      services: ['Site Development', 'Permitting'],
    },
    {
      title: 'Shell - Converse',
      category: 'C-Stores',
      location: 'Converse, TX',
      photo: 'assets/projects/photos/shell-converse.jpg',
      photoCaption: 'Converse, TX',
      description: 'Shell-branded fuel station and convenience store in Converse, TX: site civil design and permitting.',
      services: ['Site Development', 'Permitting'],
    },
    {
      title: 'Tex Stop FM-78 - Schertz',
      category: 'C-Stores',
      location: 'Schertz, TX',
      description: '6,500 SF convenience store with a 10-MPD fuel canopy, Burger King, automated car wash and pizza store on FM 78, Schertz, TX.',
      scope: 'Specific use permit, subdivision plat and site plan approval.',
      services: ['Special Use Permit', 'Site Plan', 'Subdivision Plat']
    },
    {
      title: 'Misty Valley C-Store',
      category: 'C-Stores',
      location: 'Texas',
      description: 'Convenience store and fuel center: site civil design and permitting.',
      services: ['Site Development', 'Permitting']
    },
    {
      title: 'Swiftco Gas Station - Schertz',
      category: 'C-Stores',
      location: 'Schertz, TX',
      description: 'Fuel station and convenience store site in Schertz, TX: site civil design and permitting.',
      services: ['Site Development', 'Permitting']
    },
    {
      title: 'Cameron C-Store',
      category: 'C-Stores',
      location: 'Cameron, TX',
      description: 'Convenience store and fuel center site in Cameron, TX: site civil design and permitting.',
      services: ['Site Development', 'Permitting']
    },
    {
      title: 'Kelly Lane C-Store',
      category: 'C-Stores',
      location: 'Pflugerville, TX',
      description: 'Convenience store and fuel center on Kelly Lane, Pflugerville, TX: site civil design and permitting.',
      services: ['Site Development', 'Permitting']
    },
    {
      title: 'Weiss Lane C-Store',
      category: 'C-Stores',
      location: 'Pflugerville, TX',
      description: 'Convenience store and fuel center on Weiss Lane, Pflugerville, TX: site civil design and permitting.',
      services: ['Site Development', 'Permitting']
    },
    {
      title: 'Nolina Neighborhood Mart',
      category: 'C-Stores',
      location: 'Georgetown, TX',
      description: 'Neighborhood convenience store site in Georgetown, TX: site civil design and permitting.',
      services: ['Site Development', 'Permitting']
    },
    {
      title: 'Salerno Neighborhood Mart',
      category: 'C-Stores',
      location: 'Round Rock, TX',
      description: 'Neighborhood convenience store site in Round Rock, TX: site civil design and permitting.',
      services: ['Site Development', 'Permitting']
    },
    {
      title: 'South New Braunfels C-Store',
      category: 'C-Stores',
      location: 'San Antonio, TX',
      description: 'Convenience store and fuel center on S New Braunfels Ave, San Antonio, TX: site civil design and permitting.',
      services: ['Site Development', 'Permitting']
    },

    // ==================== RETAIL & RESTAURANTS ====================
    {
      title: 'Burger King & C-Store - Converse',
      category: 'C-Stores',
      location: 'Converse, TX',
      photo: 'assets/projects/photos/burger-king-and-c-store-converse.jpg',
      photoCaption: 'Converse, TX',
      description: '5,500 SF convenience store with a 10-MPD fuel canopy, Burger King and automated car wash in Converse, TX.',
      scope: 'Multi-use pad site: fuel canopy, restaurant drive-thru stacking, car wash and pizza store.',
      services: ['Architecture Coordination', 'Civil Engineering', 'Permitting'],
      featured: true
    },
    {
      title: 'Burger King - Wurzbach',
      category: 'Retail & Restaurants',
      location: 'San Antonio, TX',
      photo: 'assets/projects/photos/burger-king-wurzbach.jpg',
      photoCaption: 'San Antonio, TX',
      description: 'Subdivision plat and site civil design for a 3,250 SF Burger King with drive-thru.',
      scope: 'Subdivision plat, site layout, grading, drainage and utilities.',
      services: ['Subdivision', 'Site Design', 'Permitting']
    },
    {
      title: 'Burger King - Converse',
      category: 'Retail & Restaurants',
      location: 'Converse, TX',
      photo: 'assets/projects/photos/burger-king-converse.jpg',
      photoCaption: 'Converse, TX',
      description: 'Burger King pad site engineered together with the adjoining convenience store and fuel center.',
      scope: 'Pad site layout, drive-thru stacking, grading, drainage and permitting.',
      services: ['Site Design', 'Permitting']
    },
    {
      title: 'Heritage Ridge',
      category: 'Commercial',
      location: 'Liberty Hill, TX',
      gallery: [
        {
          src: 'assets/projects/comercial/heritage-ridge-site-plan.jpg',
          label: 'Site Plan',
          alt: 'RCE site plan for Lot 5 of Heritage Ridge Commercial in Liberty Hill, Texas: a three-storey building of 10,500 sq ft per floor on a 1.266-acre lot with parking and setbacks.'
        },
        {
          src: 'assets/projects/comercial/heritage-ridge-grading-drainage.jpg',
          label: 'Grading & Drainage',
          alt: 'RCE grading and drainage plan for Lot 5 of Heritage Ridge Commercial in Liberty Hill, Texas, with a 1.156-acre drainage easement tract.'
        }
      ],
      highlights: [
        { value: '3 storeys', label: '10,500 sf per floor' },
        { value: '1.266 ac', label: 'Lot 5' },
        { value: '11', label: 'Plan sheets' }
      ],
      description: 'Lot 5 of the Heritage Ridge commercial subdivision, Liberty Hill, TX: site civil design for a three-story building of 10,500 SF per floor on a 1.266-acre lot.',
      scope: '11-sheet site development plan set (February 2022): final plat, site plan, paving, grading and drainage, utility and erosion control plans.',
      services: ['Site Development', 'Grading & Drainage', 'Utilities']
    },
    {
      title: 'Burger King - Kenedy',
      category: 'Retail & Restaurants',
      location: 'Kenedy, TX',
      photo: 'assets/projects/photos/burger-king-kenedy.jpg',
      photoCaption: 'Kenedy, TX',
      description: 'Subdivision plat and site civil design for a 3,250 SF Burger King with drive-thru.',
      scope: 'Subdivision plat, site layout, grading, drainage and utilities.',
      services: ['Subdivision', 'Site Design', 'Permitting']
    },
    {
      title: 'Burger King Loop 410',
      category: 'Retail & Restaurants',
      location: 'San Antonio, TX',
      photo: 'assets/projects/photos/burger-king-loop-410.jpg',
      photoCaption: 'San Antonio, TX',
      description: 'Site civil design for a 2,250 SF drive-thru-only Burger King on Loop 410.',
      scope: 'Drive-thru stacking, access, grading, drainage and utilities.',
      services: ['Site Design', 'Civil Engineering', 'Permitting']
    },
    {
      title: 'Burger King - Seguin',
      category: 'Retail & Restaurants',
      location: 'Seguin, TX',
      exhibit: 'assets/projects/comercial/burger-king-seguin-rendering.jpg',
      exhibitCaption: 'Illustrative visualization, SH 46',
      exhibitKind: 'rendering',
      description: '3,250 SF Burger King with a right-turn deceleration lane on SH 46.',
      scope: 'Deceleration lane design on SH 46 plus site civil design.',
      services: ['Traffic Engineering', 'Site Design', 'Civil Engineering']
    },
    {
      title: 'Burger King - Floresville',
      category: 'Retail & Restaurants',
      location: 'Floresville, TX',
      photo: 'assets/projects/photos/burger-king-floresville.jpg',
      photoCaption: 'Floresville, TX',
      description: '3,250 SF Burger King with drive-thru sharing one lot with self-storage units.',
      scope: 'Shared access, grading, drainage and utility layout for two uses on one lot.',
      services: ['Site Engineering', 'Utility Planning', 'Permitting']
    },

    // ======================= MULTI / FAMILY =======================
    {
      title: 'Oaks of Leander',
      category: 'Multi / Family',
      location: 'Leander, TX',
      description: '200-unit apartment community with clubhouse and pool: site development and utility design.',
      scope: 'Site development permit plans, grading, drainage and water and wastewater service.',
      services: ['Site Development', 'Utility Engineering', 'Landscape Coordination'],
      featured: true
    },
    {
      title: 'Whitestone Oaks',
      category: 'Multi / Family',
      location: 'Cedar Park, TX',
      description: '96-unit apartment community with clubhouse and pool.',
      scope: 'Site civil design and site development permitting.',
      services: ['Site Design', 'Permitting', 'Construction Admin']
    },
    {
      title: 'Webberville Apartments',
      category: 'Multi / Family',
      location: 'Austin, TX',
      description: '274-unit apartment community with clubhouse and pool.',
      scope: 'Site civil design: grading, drainage, water and wastewater.',
      services: ['Civil Engineering', 'Utility Design', 'Permitting']
    },
    {
      title: 'Violet Crown',
      category: 'Multi / Family',
      location: 'Austin, TX',
      description: '28-unit, three-story condominium building with ground-level parking in central Austin.',
      scope: 'Urban infill site design and utility coordination.',
      services: ['Urban Site Design', 'Utility Coordination', 'Permitting']
    },
    {
      title: 'Greenlight Village Townhomes',
      category: 'Multi / Family',
      location: 'Leander, TX',
      description: '50-unit townhome community taken from rezoning through site development permit.',
      scope: 'Rezoning, site layout and site development permit plans.',
      services: ['Rezoning', 'Site Development', 'Permitting']
    },
    {
      title: 'Parkview at Prue Townhomes',
      category: 'Multi / Family',
      location: 'San Antonio, TX',
      description: '58-unit townhome community taken from rezoning through site development permit.',
      scope: 'Rezoning, site layout and site development permit plans.',
      services: ['Rezoning', 'Site Development', 'Permitting']
    },
    {
      title: 'Canyon Ridge Apartments',
      category: 'Multi / Family',
      location: 'Porter, TX',
      description: 'Apartment community in Porter, TX: site development, drainage analysis and utility design.',
      scope: 'Site development, drainage modeling and utility design.',
      services: ['Site Development', 'Drainage Modeling', 'Utility Design']
    },

    // =================== OFFICES / BUSINESS PARKS ===================
    {
      title: 'Synergy Business Park',
      category: 'Offices/Business parks',
      location: 'Cedar Park, TX',
      description: '20,000 SF office and light-industrial park in Cedar Park, TX.',
      scope: 'Site development permit plans through city approval.',
      services: ['Industrial Design', 'Site Permit', 'Construction Planning'],
      featured: true
    },
    {
      title: 'Vista Ridge Professional Suites',
      category: 'Offices/Business parks',
      location: 'Cedar Park, TX',
      description: 'Professional office suites in Cedar Park, TX: site development, grading and utility coordination.',
      scope: 'Site development permit, utility coordination and grading design.',
      services: ['Site Development', 'Permitting', 'Utility Design']
    },

    // ======================== SINGLE FAMILY ========================
    {
      title: 'Namami Sai',
      category: 'Single Family',
      location: 'San Antonio, TX',
      description: 'Single family subdivision in San Antonio, TX, taken from rezoning through subdivision improvement plans.',
      scope: 'Rezoning, platting and subdivision improvement plans.',
      services: ['Rezoning', 'Subdivision Improvements', 'Planning']
    },
    {
      title: 'Singleton Bend One',
      category: 'Single Family',
      location: 'Travis County, TX',
      description: '10-acre, 10-home condominium regime in Travis County, TX.',
      scope: 'Street, drainage, water and wastewater design.',
      services: ['Infrastructure Design', 'Condominium Planning', 'Site Design'],
      acreage: 10
    },
    {
      title: 'PSRG at Neenah',
      category: 'Single Family',
      location: 'Austin, TX',
      description: '16-acre, SF-2 tract developed as a 55-lot single family subdivision in Austin, TX.',
      scope: 'Subdivision infrastructure design and Austin Water Service Extension Request (SER) approval.',
      services: ['Infrastructure Design', 'SER Approval', 'Subdivision'],
      acreage: 16
    },
    {
      title: 'Classen Classics',
      category: 'Single Family',
      location: 'San Antonio, TX',
      description: 'Single family residential subdivision in San Antonio, TX.',
      scope: 'Residential street, utility and drainage design.',
      services: ['Roadway Design', 'Utilities', 'Drainage']
    },
  ];

  /** Display order for the sector sections and the filter bar. */
  sectors: string[] = [
    'Commercial',
    'C-Stores',
    'Retail & Restaurants',
    'Offices/Business parks',
    'Multi / Family',
    'Single Family'
  ];

  get filters(): string[] {
    return ['All', ...this.sectors];
  }
  searchQuery: string = '';
  activeFilter: string = 'Commercial';

  /** One line per sector: what RCE delivers there (unique text per page). */
  readonly sectorLines: Record<string, string> = {
    'Commercial': 'Commercial pads and multi-lot sites taken from due diligence and zoning through platting, site development permit and city approval.',
    'C-Stores': 'Convenience store and fuel center sites engineered for canopy and truck circulation, TxDOT or city driveway permits, and site plan approval.',
    'Retail & Restaurants': 'Restaurant and retail pad sites designed for drive-thru stacking, access, parking and drainage, through site plan approval.',
    'Offices/Business parks': 'Office and business park sites with platting, shared access, grading, detention and utility service for multi-building campuses.',
    'Multi / Family': 'Apartment and townhome communities from rezoning and master planning through roadways, utilities and site development permit.',
    'Single Family': 'Single family subdivisions from rezoning and platting through streets, drainage, lift stations and water and wastewater plans.'
  };

  readonly sectorH1: Record<string, string> = {
    'Commercial': 'Commercial Site Engineering Projects in Texas',
    'C-Stores': 'C-Store & Fuel Station Engineering Projects in Texas',
    'Retail & Restaurants': 'Retail & Restaurant Site Engineering Projects in Texas',
    'Offices/Business parks': 'Office & Business Park Engineering Projects in Texas',
    'Multi / Family': 'Multi-Family Engineering Projects in Texas',
    'Single Family': 'Single Family Subdivision Engineering Projects in Texas'
  };

  readonly capabilities = ['Roadways', 'Bridges & Culverts', 'Lift Stations', 'H&H Analysis', '100-yr Detention',
    'Platting', 'Water & Wastewater', 'City Comment Response'];

  categoryMetadata: Record<string, CategoryMetadata> = {
    'Commercial': {
      id: 'Commercial',
      title: 'Commercial Infrastructure',
      description: 'Site civil engineering for commercial pads and multi-lot developments: due diligence, zoning and entitlements, platting, site development permit plans, hydrologic and hydraulic analysis, detention ponds up to the 100-year storm, culverts and public utility extensions, with city and county review comments addressed through approval.',
      stats: ['Master Planning', 'Utility Feasibility', 'Agency Coordination']
    },
    'C-Stores': {
      id: 'C-Stores',
      title: 'C-Stores & Fuel',
      description: 'Convenience store and fuel center sites across Texas: fuel canopy and truck circulation layout, driveway permits with the city or TxDOT, on-site water quality and detention, and utility service through site plan approval.',
      stats: ['Fuel Canopy Layout', 'Driveway & TxDOT Permits', 'Expedited Site Plans']
    },
    'Retail & Restaurants': {
      id: 'Retail & Restaurants',
      title: 'Retail & Restaurants',
      description: 'Pad-site and in-line retail engineering for national brands and local developers: drive-thru stacking, parking and accessible routes, grading, storm drainage and utility connections prepared for site plan approval.',
      stats: ['Traffic Engineering', 'Platting', 'Expedited Permitting']
    },
    'Multi / Family': {
      id: 'Multi / Family',
      title: 'Multi / Family Developments',
      description: 'Multi-family site engineering from master planning to construction: parcel layout, public roadways, fire lane and access design, culverts, detention up to the 100-year storm, lift stations, and water and wastewater service coordinated with the city, MUD or utility provider.',
      stats: ['SUD/MUD Coordination', 'Hydrology Modeling', 'Site Optimization']
    },
    'Single Family': {
      id: 'Single Family',
      title: 'Single Family Residential',
      description: 'Single family subdivision engineering: preliminary and final plats, lot and street layout, residential roadways, bridges and culverts, hydrologic and hydraulic analysis, detention ponds, lift stations, and water and wastewater plans submitted for city or county approval.',
      stats: ['Subdivision Layout', 'Roadway Design', 'TCEQ Compliance']
    },
    'Offices/Business parks': {
      id: 'Offices/Business parks',
      title: 'Offices & Business Parks',
      description: 'Office and business park sites: lot layout and platting, shared access and parking, grading and drainage, detention and utility service for multi-building developments.',
      stats: ['Site Development', 'Building Permitting', 'Industrial Planning']
    }
  };

  /**
   * Photos that 404 because the file has not been supplied yet. Tracked by
   * title so a missing drop-in costs nothing: the card quietly falls back to
   * the exhibit, or to the drafting panel.
   */
  private missingPhotos = new Set<string>();

  onPhotoError(project: Project): void {
    this.missingPhotos.add(project.title);
  }

  /** The photo, unless we already know its file is not there. */
  photoOf(project: Project): string | undefined {
    return project.photo && !this.missingPhotos.has(project.title)
      ? project.photo
      : undefined;
  }

  /** Anything visual at all - a photo or an exhibit. */
  hasGallery(project: Project): boolean {
    return (project.gallery?.length ?? 0) > 1;
  }

  hasImage(project: Project): boolean {
    return !!(this.photoOf(project) || project.exhibit || this.hasGallery(project));
  }

  /** What leads the card: the built photo if we have one, else the exhibit. */
  leadImage(project: Project): string | undefined {
    return this.photoOf(project) || project.exhibit;
  }

  leadCaption(project: Project): string | undefined {
    return this.photoOf(project) ? project.photoCaption : project.exhibitCaption;
  }

  /** The exhibit only counts as a second image when a photo already leads. */
  secondaryExhibit(project: Project): string | undefined {
    return this.photoOf(project) && project.exhibit ? project.exhibit : undefined;
  }

  /** How many projects sit in a sector, for the section header count. */
  getSectorCount(category: string): number {
    return this.projects.filter(p => p.category === category).length;
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
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        (p.scope || '').toLowerCase().includes(query) ||
        (p.services || []).some(sv => sv.toLowerCase().includes(query))
      );
    }

    return filtered;
  }

  /** Projects in a sector, those with verified imagery first. */
  getProjectsByCategory(category: string): Project[] {
    const inSector = this.projects.filter(p => p.category === category);
    return [
      ...inSector.filter(p => this.photoOf(p) || this.hasGallery(p)),
      ...inSector.filter(p => !this.photoOf(p) && !this.hasGallery(p) && p.exhibit),
      ...inSector.filter(p => !this.hasImage(p))
    ];
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

  getSectorIndex(categoryId: string): number {
    return this.sectors.indexOf(categoryId) + 1;
  }

  // ---- sector pages ---------------------------------------------------------
  readonly sectorSlugs: Record<string, string> = {
    'Commercial': 'commercial',
    'C-Stores': 'c-stores',
    'Retail & Restaurants': 'retail-restaurants',
    'Offices/Business parks': 'offices-business-parks',
    'Multi / Family': 'multi-family',
    'Single Family': 'single-family'
  };

  sectorSlug(sector: string): string { return this.sectorSlugs[sector] ?? 'commercial'; }

  sectorLabel(sector: string): string {
    const labels: Record<string, string> = { 'Offices/Business parks': 'Offices & Business Parks', 'Multi / Family': 'Multi-Family' };
    return labels[sector] ?? sector;
  }

  /** The five RCE services; each sector links only the ones its projects used. */
  private readonly serviceLinks: Record<string, { name: string; link: string }> = {
    land: { name: 'Land Development', link: '/services/land-development' },
    water: { name: 'Water Resources', link: '/services/water-resources' },
    transport: { name: 'Transportation', link: '/services/transportation' },
    env: { name: 'Environmental', link: '/services/environmental' },
    permit: { name: 'Permitting', link: '/services/permitting' }
  };
  private readonly sectorServiceKeys: Record<string, string[]> = {
    'Commercial': ['land', 'water', 'permit'],
    'C-Stores': ['land', 'transport', 'permit'],
    'Retail & Restaurants': ['land', 'transport', 'permit'],
    'Offices/Business parks': ['land', 'water', 'permit'],
    'Multi / Family': ['land', 'water', 'transport', 'permit'],
    'Single Family': ['land', 'water', 'transport', 'permit']
  };

  get sectorServices(): { name: string; link: string }[] {
    return (this.sectorServiceKeys[this.activeFilter] ?? []).map(k => this.serviceLinks[k]);
  }

  get sectorProjects(): Project[] { return this.projects.filter(p => p.category === this.activeFilter); }
  get caseStudies(): Project[] { return this.sectorProjects.filter(p => this.hasGallery(p)); }
  get photoProjects(): Project[] { return this.sectorProjects.filter(p => !this.hasGallery(p) && !!this.leadImage(p)); }
  get otherProjects(): Project[] { return this.sectorProjects.filter(p => !this.hasGallery(p) && !this.leadImage(p)); }

  get sectorStats(): { value: string; label: string }[] {
    const ps = this.sectorProjects;
    const cities = new Set(ps.map(p => p.location.replace(/,\s*TX$/i, '').trim()).filter(c => c && c.toLowerCase() !== 'texas'));
    return [
      { value: String(ps.length), label: 'Projects' },
      { value: String(cities.size), label: 'Texas communities' },
      { value: String(this.caseStudies.length), label: 'Case studies' }
    ].filter(st => st.value !== '0');   // never show a zero as 'proof'
  }

  /** From RCE's employee training manual (typical project lifecycle). */
  readonly processSteps = [
    { title: 'Due diligence', text: 'Survey, title, floodplain and utility data gathered and checked.' },
    { title: 'Feasibility', text: 'Grading, drainage and utility concepts, with risks flagged early.' },
    { title: 'Design', text: 'Calculations and plan production to RCE CAD standards.' },
    { title: 'Quality review', text: 'Self-check, peer review and principal review before sealing.' },
    { title: 'Permitting', text: 'Submittals, comment responses and agency coordination.' },
    { title: 'Construction support', text: 'Support through construction when the project calls for it.' }
  ];

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(d => { this.activeFilter = d['sector'] || 'Commercial'; });
  }

  ngAfterViewInit(): void {
    // Sector menu links carry #projects-grid: keep the visitor at the projects.
    if (typeof document !== 'undefined' && this.route.snapshot.fragment === 'projects-grid') {
      setTimeout(() => document.getElementById('projects-grid')?.scrollIntoView({ block: 'start' }), 0);
    }
  }

  readonly rowLimit = 6;
  showAllRows = false;
  get visibleRows(): Project[] {
    return this.showAllRows ? this.otherProjects : this.otherProjects.slice(0, this.rowLimit);
  }
}
