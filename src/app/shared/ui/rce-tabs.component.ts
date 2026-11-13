import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface RceTab {
  /** Stable id — also used as the GA4 suffix when the tab is tracked. */
  id: string;
  label: string;
}

/**
 * Accessible tab set.
 *
 * Implements the WAI-ARIA tabs pattern: one tab in the tab order at a time
 * (roving tabindex), arrow keys move between tabs, Home and End jump to the
 * ends. Panels are projected by the caller, so this component carries no
 * content of its own.
 *
 * Primitive only — it is not the Land Development service explorer. That is a
 * later design decision which can be built on top of this.
 *
 * Usage:
 *   <rce-tabs [tabs]="tabs" (tabChange)="onTab($event)">
 *     <div *rceTabPanel="'grading'">…</div>
 *   </rce-tabs>
 * or, more simply, read `active()` and render the panel yourself.
 */
@Component({
  selector: 'rce-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rce-tabs">
      <div class="rce-tabs__list" role="tablist" [attr.aria-label]="label">
        @for (tab of tabs; track tab.id; let i = $index) {
          <button
            type="button"
            role="tab"
            class="rce-tabs__tab"
            [id]="idBase + '-tab-' + tab.id"
            [attr.aria-selected]="active() === tab.id"
            [attr.aria-controls]="idBase + '-panel-' + tab.id"
            [attr.tabindex]="active() === tab.id ? 0 : -1"
            [attr.data-cta]="ctaPrefix ? ctaPrefix + '_' + tab.id : null"
            (click)="select(tab.id)"
            (keydown)="onKeydown($event, i)">
            {{ tab.label }}
          </button>
        }
      </div>

      <div
        class="rce-tabs__panel"
        role="tabpanel"
        [id]="idBase + '-panel-' + active()"
        [attr.aria-labelledby]="idBase + '-tab-' + active()"
        tabindex="0">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class RceTabsComponent {
  @Input({ required: true }) tabs: RceTab[] = [];
  /** Accessible name for the tab list — required for screen readers. */
  @Input({ required: true }) label = '';
  /** Unique prefix so several tab sets can share a page. */
  @Input() idBase = 'rce-tabs';
  /** When set, each tab carries data-cta="<prefix>_<tabId>" for GA4. */
  @Input() ctaPrefix?: string;

  @Output() tabChange = new EventEmitter<string>();

  readonly active = signal<string>('');

  @Input() set initial(id: string) {
    if (id) this.active.set(id);
  }

  ngOnInit(): void {
    if (!this.active() && this.tabs.length) this.active.set(this.tabs[0].id);
  }

  select(id: string): void {
    if (id === this.active()) return;
    this.active.set(id);
    this.tabChange.emit(id);
  }

  /** Arrow keys move and activate; Home and End jump to the ends. */
  onKeydown(event: KeyboardEvent, index: number): void {
    const last = this.tabs.length - 1;
    let next: number | null = null;

    switch (event.key) {
      case 'ArrowRight': next = index === last ? 0 : index + 1; break;
      case 'ArrowLeft':  next = index === 0 ? last : index - 1; break;
      case 'Home':       next = 0; break;
      case 'End':        next = last; break;
      default: return;
    }

    event.preventDefault();
    const tab = this.tabs[next];
    this.select(tab.id);
    // Move focus with the selection, as the ARIA pattern requires.
    const el = document.getElementById(`${this.idBase}-tab-${tab.id}`);
    el?.focus();
  }
}
