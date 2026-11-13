import { Component, Input } from '@angular/core';

/** The four approved states for engineering work shown on the site. */
export type RceFigureStatus = 'conceptual' | 'proposed' | 'approved' | 'completed';

const STATUS_LABEL: Record<RceFigureStatus, string> = {
  conceptual: 'Conceptual',
  proposed: 'Proposed',
  approved: 'Approved',
  completed: 'Completed',
};

/**
 * Technical figure — a drawing, exhibit, map or project photograph.
 *
 * Master plan §7 requires every engineering visual to be labelled, sourced, and
 * for conceptual work to be clearly distinguishable from completed work. That
 * is enforced here rather than left to memory: `alt`, `caption` and `status`
 * are all required inputs, so a figure cannot be published without them.
 *
 * `credit` is optional but strongly expected — it carries the source and any
 * permission note. Nothing publishes a drawing whose provenance is unknown.
 */
@Component({
  selector: 'rce-figure',
  standalone: true,
  template: `
    <figure class="rce-figure">
      <div class="rce-figure__frame" [class]="'rce-media rce-media--' + ratio">
        <img [src]="src" [alt]="alt" [attr.loading]="eager ? 'eager' : 'lazy'" decoding="async">
        <span class="rce-figure__status rce-badge" [class]="'rce-badge rce-badge--' + status">
          {{ statusLabel }}
        </span>
      </div>
      <figcaption class="rce-figure__caption">
        {{ caption }}
        @if (credit) {
          <span class="rce-figure__credit">{{ credit }}</span>
        }
      </figcaption>
    </figure>
  `,
})
export class RceFigureComponent {
  @Input({ required: true }) src = '';
  /** Required: a figure with no alt text fails WCAG 1.1.1. */
  @Input({ required: true }) alt = '';
  /** Required: what the visual shows, in plain words. */
  @Input({ required: true }) caption = '';
  /** Required: conceptual work must never be mistaken for completed work. */
  @Input({ required: true }) status: RceFigureStatus = 'conceptual';
  /** Source and permission note, e.g. "RCE project records · used with permission". */
  @Input() credit?: string;
  @Input() ratio: 'figure' | 'wide' | 'square' = 'figure';
  /** Above the fold only. */
  @Input() eager = false;

  get statusLabel(): string {
    return STATUS_LABEL[this.status];
  }
}
