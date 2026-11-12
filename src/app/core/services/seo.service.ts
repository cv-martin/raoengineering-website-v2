import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

/**
 * Per-page <title>, meta description, canonical URL and Open Graph fields.
 *
 * Before this existed, all 11 routes shared the single title and description
 * declared in index.html, so every page looked identical to search engines and
 * to link previews. Route metadata now lives in `data.seo` on each route in
 * app.routes.ts; AppComponent applies it on every NavigationEnd.
 */
export const SITE_ORIGIN = 'https://www.raosengineering.com';
const SITE_NAME = "Rao's Consulting Engineers";

export interface SeoData {
  title: string;
  description: string;
  /** Optional absolute or site-relative share image. Defaults to the logo. */
  image?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly doc = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  apply(seo: SeoData, url: string): void {
    const canonical = this.canonicalUrl(url);
    const image = this.absolute(seo.image ?? '/assets/logo/rce_share_1200x630.png');

    this.title.setTitle(seo.title);
    this.meta.updateTag({ name: 'description', content: seo.description });

    this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:title', content: seo.title });
    this.meta.updateTag({ property: 'og:description', content: seo.description });
    this.meta.updateTag({ property: 'og:url', content: canonical });
    this.meta.updateTag({ property: 'og:image', content: image });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: seo.title });
    this.meta.updateTag({ name: 'twitter:description', content: seo.description });
    this.meta.updateTag({ name: 'twitter:url', content: canonical });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.setCanonical(canonical);
  }

  /** Strips query strings and fragments; keeps a trailing slash only on the root. */
  private canonicalUrl(url: string): string {
    const path = (url.split(/[?#]/)[0] || '/').replace(/\/+$/, '');
    return path ? `${SITE_ORIGIN}${path}` : `${SITE_ORIGIN}/`;
  }

  private absolute(path: string): string {
    return /^https?:\/\//i.test(path)
      ? path
      : `${SITE_ORIGIN}/${path.replace(/^\//, '')}`;
  }

  private setCanonical(href: string): void {
    let link = this.doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }
}
