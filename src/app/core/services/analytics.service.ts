import { Injectable } from '@angular/core';

// Extend the global Window interface so TypeScript knows about the gtag function
// injected by the Google tag script in index.html.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * AnalyticsService
 *
 * Central service for all Google Analytics 4 (GA4) event tracking.
 * All components should use this service — never call window.gtag() directly.
 *
 * Measurement ID is set in index.html via the GA4 script tag.
 * Replace G-PLACEHOLDER with your real GA4 Measurement ID before going live.
 */
@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  /**
   * Generic event dispatcher.
   * Guards against SSR or bot environments where window.gtag may not exist.
   */
  trackEvent(
    eventName: string,
    parameters: Record<string, string | number | boolean> = {}
  ): void {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, parameters);
    }
  }

  /**
   * Track SPA page navigation.
   * Called by AppComponent on every Router NavigationEnd event.
   * GA4 enhanced measurement handles the very first load; this covers all
   * subsequent in-app navigations without reloading the browser.
   */
  trackPageView(pagePath: string, pageTitle: string): void {
    this.trackEvent('page_view', {
      page_path: pagePath,
      page_title: pageTitle,
      page_location: typeof window !== 'undefined' ? window.location.href : pagePath
    });
  }

  // ─── Service & Navigation Events ────────────────────────────────────────────

  /**
   * Fired when a visitor clicks a specific service link in the navbar or footer.
   * Helps identify which engineering services attract the most interest.
   */
  trackServiceClick(serviceName: string, source: 'navbar' | 'footer' | 'page' = 'navbar'): void {
    this.trackEvent('service_click', {
      service_name: serviceName,
      click_source: source
    });
  }

  /**
   * Fired when a visitor clicks a project/portfolio item.
   */
  trackProjectClick(projectName: string): void {
    this.trackEvent('project_click', {
      project_name: projectName
    });
  }

  // ─── Contact & Conversion Events (Mark these as Key Events in GA4) ──────────

  /**
   * Fired when a visitor clicks the Contact Us page link or button.
   * Mark as a Key Event in GA4 — it represents intent to reach out.
   */
  trackContactClick(source: string = 'navbar'): void {
    this.trackEvent('contact_click', {
      click_source: source
    });
  }

  /**
   * Fired when a visitor clicks a phone number link.
   * Mark as a Key Event in GA4.
   */
  trackPhoneClick(phoneNumber: string, source: string = 'contact'): void {
    this.trackEvent('phone_click', {
      phone_number: phoneNumber,
      click_source: source
    });
  }

  /**
   * Fired when a visitor clicks an email address link.
   * Mark as a Key Event in GA4.
   */
  trackEmailClick(source: string = 'contact'): void {
    this.trackEvent('email_click', {
      click_source: source
    });
  }

  /**
   * Fired when the contact/consultation form is successfully submitted.
   * This is the primary conversion event. Mark as a Key Event in GA4.
   */
  trackFormSubmit(projectCategory: string): void {
    this.trackEvent('form_submit', {
      form_name: 'project_consultation',
      project_category: projectCategory
    });
  }

  /**
   * Fired when the visitor's submission falls back to mailto: (Formspree failure).
   * Sent as a separate mailto_fallback event to avoid inflating form_submit conversions.
   */
  trackMailtoFallback(projectCategory: string): void {
    this.trackEvent('mailto_fallback', {
      project_category: projectCategory
    });
  }

  // ─── External Link Events ────────────────────────────────────────────────────

  /**
   * Fired when a visitor clicks an external link (LinkedIn, Facebook, maps, etc.).
   * GA4 Enhanced Measurement may already capture outbound clicks, but this gives
   * you labelled, reliable data without depending on that setting being on.
   */
  trackExternalLinkClick(url: string, label: string): void {
    this.trackEvent('external_link_click', {
      link_url: url,
      link_label: label
    });
  }
}
