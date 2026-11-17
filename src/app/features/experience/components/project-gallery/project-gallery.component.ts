import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';

export interface GalleryImage {
  src: string;
  /** Full description for screen readers and search. */
  alt: string;
  /** Short name shown on the selector, for example "Apartment Development". */
  label: string;
}

/**
 * A project gallery for two or more images.
 *
 * Built so a visitor can see at once that there is more than one view:
 *  - the selected image is shown whole (never cropped, so engineering callouts
 *    and the RCE logo stay intact);
 *  - every image has its own labelled selector with a thumbnail, directly
 *    below, so nothing depends on swiping;
 *  - a counter and previous/next buttons sit between the two;
 *  - swiping is an extra on touch screens, never the only way;
 *  - selecting the image opens a full-size viewer with zoom.
 * It never rotates by itself.
 */
@Component({
  selector: 'app-project-gallery',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section *ngIf="!viewerOnly" class="bg-white" role="group" aria-roledescription="gallery"
             [attr.aria-label]="projectTitle + ' images'"
             (keydown)="onGalleryKey($event)">

      <!-- Selected image, shown whole -->
      <div class="relative overflow-hidden bg-slate-950" [style.aspect-ratio]="aspect"
           (touchstart)="onTouchStart($event)" (touchend)="onTouchEnd($event)">
        <button #openButton type="button" (click)="openLightbox()"
                class="absolute inset-0 block h-full w-full cursor-zoom-in focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#d5a021]"
                [attr.aria-label]="'Enlarge image ' + (index + 1) + ' of ' + count + ': ' + current.label">
          <img [src]="current.src" [alt]="current.alt" draggable="false"
               class="block h-full w-full select-none object-contain">
        </button>
      </div>

      <!-- Counter and previous / next -->
      <div class="flex items-center justify-between gap-3 border-t border-slate-100 bg-slate-50 px-4 py-2.5">
        <p class="text-[11px] leading-snug text-slate-600">
          <span class="font-bold text-slate-900">{{ index + 1 }} of {{ count }}</span> images
          <span class="text-slate-500"> &middot; select a view below or open the image full size</span>
        </p>
        <div class="flex shrink-0 items-center gap-2">
          <button type="button" (click)="prev()" aria-label="Previous image" [ngClass]="arrowButton">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button type="button" (click)="next()" aria-label="Next image" [ngClass]="arrowButton">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>

      <!-- One labelled selector per image -->
      <div class="grid gap-2 bg-white p-3" role="group" aria-label="Choose an image"
           [ngClass]="count >= 4 ? 'grid-cols-2 sm:grid-cols-4' : (count === 3 ? 'grid-cols-3' : 'grid-cols-2')">
        <button *ngFor="let img of images; let i = index" type="button"
                (click)="select(i)"
                [attr.aria-pressed]="i === index"
                [attr.aria-label]="'Show image ' + (i + 1) + ' of ' + count + ': ' + img.label"
                class="flex min-h-[56px] flex-col gap-2 rounded-lg border-2 p-2 text-left transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-[#d5a021]/40"
                [ngClass]="i === index ? 'border-[#d5a021] bg-[#d5a021]/10' : 'border-slate-200 bg-white hover:border-[#d5a021]/60'">
          <img [src]="img.src" alt="" aria-hidden="true" draggable="false"
               class="aspect-video w-full shrink-0 rounded bg-slate-100 object-cover">
          <span class="flex min-w-0 flex-1 items-start justify-between gap-2">
          <span class="min-w-0">
            <span class="block break-words text-[11px] font-bold leading-tight text-slate-900">{{ img.label }}</span>
            <span class="mt-1 block text-[9px] font-bold uppercase tracking-[0.12em]"
                  [ngClass]="i === index ? 'text-[#7a5a0e]' : 'text-slate-500'">
              {{ i === index ? 'Viewing' : 'View' }}
            </span>
          </span>
            <svg *ngIf="i === index" class="mt-0.5 h-4 w-4 shrink-0 text-[#7a5a0e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
          </span>
        </button>
      </div>

      <!-- Announces the change to screen readers -->
      <p class="sr-only" aria-live="polite" aria-atomic="true">Showing image {{ index + 1 }} of {{ count }}: {{ current.label }}</p>
    </section>

    <!-- Full-size viewer. Moved to <body> after the view loads so it is not
         trapped inside a card that lifts on hover. -->
    <div #lightbox [ngClass]="lightboxOpen ? 'flex' : 'hidden'"
         class="fixed inset-0 z-[1000] flex-col bg-slate-950/[0.97] text-white"
         role="dialog" aria-modal="true" [attr.aria-label]="projectTitle + ' image viewer'"
         (keydown)="onLightboxKey($event)">
      <div class="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <div class="min-w-0">
          <p class="truncate text-[10px] font-bold uppercase tracking-[0.25em] text-[#d5a021]">{{ projectTitle }}</p>
          <p class="truncate text-sm font-semibold">{{ current.label }} <span class="font-normal text-white/60">&middot; {{ index + 1 }} of {{ count }}</span></p>
        </div>
        <div class="flex shrink-0 items-center gap-2">
          <button type="button" (click)="zoomOut()" [disabled]="zoomIndex === 0" aria-label="Zoom out" [ngClass]="viewerButton">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/></svg>
          </button>
          <span class="w-12 text-center text-xs tabular-nums text-white/80" aria-live="polite">{{ zoom * 100 }}%</span>
          <button type="button" (click)="zoomIn()" [disabled]="zoomIndex === zoomLevels.length - 1" aria-label="Zoom in" [ngClass]="viewerButton">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          </button>
          <button #closeButton type="button" (click)="closeLightbox()" aria-label="Close image viewer" [ngClass]="viewerButton">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
      </div>

      <div class="relative min-h-0 flex-1">
        <div #scroller class="absolute inset-0 flex overflow-auto" tabindex="0" role="region"
             aria-label="Image. Scroll to move around when zoomed in."
             (touchstart)="onTouchStart($event)" (touchend)="onTouchEnd($event)">
          <img [src]="current.src" [alt]="current.alt" draggable="false"
               (load)="onViewerImageLoad($any($event.target))" (click)="toggleZoom()"
               class="m-auto shrink-0 select-none"
               [ngClass]="zoom === 1 ? 'cursor-zoom-in' : 'cursor-zoom-out'"
               [style.width.px]="fitWidth ? fitWidth * zoom : null"
               [style.maxWidth]="fitWidth ? 'none' : '100%'"
               [style.maxHeight]="fitWidth ? 'none' : '100%'">
        </div>
        <button type="button" (click)="prev()" aria-label="Previous image"
                class="absolute left-3 top-1/2 -translate-y-1/2" [ngClass]="viewerArrow">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <button type="button" (click)="next()" aria-label="Next image"
                class="absolute right-3 top-1/2 -translate-y-1/2" [ngClass]="viewerArrow">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  `
})
export class ProjectGalleryComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input({ required: true }) images: GalleryImage[] = [];
  @Input() projectTitle = '';
  /** Shape of the main image frame (CSS aspect-ratio). Wide images use a wider frame. */
  @Input() aspect = '16 / 9';
  /** Render only the full-size viewer (cards open it with openLightbox()). */
  @Input() viewerOnly = false;

  @ViewChild('openButton') openButton?: ElementRef<HTMLButtonElement>;
  @ViewChild('lightbox') lightbox?: ElementRef<HTMLElement>;
  @ViewChild('closeButton') closeButton?: ElementRef<HTMLButtonElement>;
  @ViewChild('scroller') scroller?: ElementRef<HTMLElement>;

  index = 0;
  lightboxOpen = false;

  readonly zoomLevels = [1, 1.5, 2, 3];
  zoomIndex = 0;
  /** Width in pixels of the whole image fitted inside the viewer. */
  fitWidth = 0;
  private naturalRatio = 16 / 9;

  readonly arrowButton =
    'inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:border-[#d5a021] hover:text-[#7a5a0e] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#d5a021]/40';
  readonly viewerButton =
    'inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-[#d5a021] hover:text-[#d5a021] disabled:opacity-40 disabled:hover:border-white/20 disabled:hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-[#d5a021]/50';
  readonly viewerArrow =
    'inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-slate-950/70 text-white transition-colors hover:border-[#d5a021] hover:text-[#d5a021] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#d5a021]/50';

  private lastFocused: HTMLElement | null = null;
  private touchStartX = 0;
  private touchStartY = 0;
  private readonly isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    @Inject(DOCUMENT) private doc: Document
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  get count(): number { return this.images.length; }
  get current(): GalleryImage { return this.images[this.index] ?? this.images[0]; }
  get zoom(): number { return this.zoomLevels[this.zoomIndex]; }

  ngOnChanges(): void {
    if (this.index >= this.images.length) { this.index = 0; }
  }

  ngAfterViewInit(): void {
    // A fixed-position viewer inside a card that moves on hover would be
    // confined to the card, so it lives on <body> instead.
    if (this.isBrowser && this.lightbox) {
      this.doc.body.appendChild(this.lightbox.nativeElement);
    }
  }

  ngOnDestroy(): void {
    if (this.lightboxOpen) { this.unlockScroll(); }
    this.lightbox?.nativeElement.remove();
  }

  // ---- navigation ---------------------------------------------------------
  select(i: number): void {
    this.index = (i + this.count) % this.count;
    this.zoomIndex = 0;
  }
  prev(): void { this.select(this.index - 1); }
  next(): void { this.select(this.index + 1); }

  onGalleryKey(e: KeyboardEvent): void {
    if (e.key === 'ArrowLeft') { this.prev(); e.preventDefault(); }
    else if (e.key === 'ArrowRight') { this.next(); e.preventDefault(); }
    else if (e.key === 'Home') { this.select(0); e.preventDefault(); }
    else if (e.key === 'End') { this.select(this.count - 1); e.preventDefault(); }
  }

  // Swipe is an extra on touch screens; every action also has a button.
  onTouchStart(e: TouchEvent): void {
    const t = e.changedTouches[0];
    this.touchStartX = t.clientX;
    this.touchStartY = t.clientY;
  }
  onTouchEnd(e: TouchEvent): void {
    if (this.lightboxOpen && this.zoom > 1) { return; }   // swiping pans when zoomed
    const t = e.changedTouches[0];
    const dx = t.clientX - this.touchStartX;
    const dy = t.clientY - this.touchStartY;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) { this.next(); } else { this.prev(); }
    }
  }

  // ---- full-size viewer ---------------------------------------------------
  openLightbox(): void {
    if (!this.isBrowser) { return; }
    this.lastFocused = this.doc.activeElement as HTMLElement | null;
    this.zoomIndex = 0;
    this.lightboxOpen = true;
    this.doc.body.style.overflow = 'hidden';
    setTimeout(() => {
      this.closeButton?.nativeElement.focus();
      this.measure();
    }, 0);
  }

  closeLightbox(): void {
    this.lightboxOpen = false;
    this.unlockScroll();
    (this.lastFocused ?? this.openButton?.nativeElement)?.focus();
  }

  private unlockScroll(): void { this.doc.body.style.overflow = ''; }

  zoomIn(): void { if (this.zoomIndex < this.zoomLevels.length - 1) { this.zoomIndex++; } }
  zoomOut(): void { if (this.zoomIndex > 0) { this.zoomIndex--; } }
  toggleZoom(): void { this.zoomIndex = this.zoomIndex === 0 ? 2 : 0; }

  onViewerImageLoad(img: HTMLImageElement): void {
    if (img.naturalWidth && img.naturalHeight) {
      this.naturalRatio = img.naturalWidth / img.naturalHeight;
    }
    this.measure();
  }

  @HostListener('window:resize')
  onResize(): void { if (this.lightboxOpen) { this.measure(); } }

  /** Fit the whole image inside the viewer, never cropping it. */
  private measure(): void {
    const el = this.scroller?.nativeElement;
    if (!el) { return; }
    this.fitWidth = Math.floor(Math.min(el.clientWidth, el.clientHeight * this.naturalRatio));
  }

  onLightboxKey(e: KeyboardEvent): void {
    switch (e.key) {
      case 'Escape': this.closeLightbox(); e.preventDefault(); break;
      case 'ArrowLeft': this.prev(); e.preventDefault(); break;
      case 'ArrowRight': this.next(); e.preventDefault(); break;
      case '+': case '=': this.zoomIn(); e.preventDefault(); break;
      case '-': case '_': this.zoomOut(); e.preventDefault(); break;
      case '0': this.zoomIndex = 0; e.preventDefault(); break;
      case 'Tab': this.trapFocus(e); break;
    }
  }

  /** Keep Tab inside the open viewer. */
  private trapFocus(e: KeyboardEvent): void {
    const root = this.lightbox?.nativeElement;
    if (!root) { return; }
    const items = Array.from(root.querySelectorAll<HTMLElement>('button:not([disabled]), [tabindex="0"]'));
    if (!items.length) { return; }
    const first = items[0];
    const last = items[items.length - 1];
    const active = this.doc.activeElement;
    if (e.shiftKey && active === first) { last.focus(); e.preventDefault(); }
    else if (!e.shiftKey && active === last) { first.focus(); e.preventDefault(); }
  }
}
