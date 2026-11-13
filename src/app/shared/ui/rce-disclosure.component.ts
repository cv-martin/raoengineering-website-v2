import { Component, Input, Output, EventEmitter, signal } from '@angular/core';

/**
 * Accessible disclosure (accordion row).
 *
 * A button carrying aria-expanded controls a region it names with
 * aria-controls. The panel is removed with `hidden` when closed, so its content
 * is out of the accessibility tree and out of the tab order.
 *
 * This is what keeps a technical page short: detail stays available without
 * being on screen until it is asked for.
 *
 * Several of these stacked make an accordion. There is deliberately no
 * "only one open at a time" mode — that is a page decision, and the caller can
 * bind [open] if it wants one.
 */
@Component({
  selector: 'rce-disclosure',
  standalone: true,
  template: `
    <div class="rce-disclosure">
      <h3 style="margin:0">
        <button
          type="button"
          class="rce-disclosure__trigger"
          [id]="idBase + '-trigger'"
          [attr.aria-expanded]="isOpen()"
          [attr.aria-controls]="idBase + '-panel'"
          [attr.data-cta]="ctaName || null"
          (click)="toggle()">
          <span>{{ heading }}</span>
          <span class="rce-disclosure__icon" aria-hidden="true"></span>
        </button>
      </h3>

      <div
        class="rce-disclosure__panel"
        role="region"
        [id]="idBase + '-panel'"
        [attr.aria-labelledby]="idBase + '-trigger'"
        [hidden]="!isOpen()">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class RceDisclosureComponent {
  @Input({ required: true }) heading = '';
  /** Unique prefix so several disclosures can share a page. */
  @Input({ required: true }) idBase = '';
  /** Optional GA4 name, e.g. "landdev_detail_drainage". */
  @Input() ctaName?: string;

  @Output() openedChange = new EventEmitter<boolean>();

  readonly isOpen = signal(false);

  @Input() set open(value: boolean) {
    this.isOpen.set(value);
  }

  toggle(): void {
    this.isOpen.update(v => !v);
    this.openedChange.emit(this.isOpen());
  }
}
