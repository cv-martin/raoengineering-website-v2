# Shared UI component foundation

**Branch:** `feature/design-system` · **Date:** 13 Nov 2026
**Status:** built locally, awaiting review. Not committed, not pushed, not deployed.

Primitives only. No page was redesigned, no service was migrated, and nothing on the live site
uses any of this yet. Pages adopt these deliberately when each is designed.

**Showcase:** `docs/showcase/index.html` — serve the repo root and open
`/docs/showcase/`. It links the real `tokens.css` and `components.css`, so what renders there is
what the app gets, not a copy.

---

## 1 · Component inventory

### CSS primitives — `src/styles/components.css`

| Component | Classes | Notes |
|---|---|---|
| **Container** | `.rce-container`, `--wide`, `--text` | 1280px; wide (1480px) for drawings; text (760px) for long reading |
| **Section** | `.rce-section`, `--tight`, `--alt`, `--dark` | One rhythm, replacing four competing paddings. Dark sections repair their own text, border, eyebrow and card colours |
| **Section head** | `.rce-section__head`, `__lead`, `.rce-eyebrow` | Capped at the reading measure |
| **Button / CTA** | `.rce-btn` + `--primary`, `--secondary`, `--ghost`, `--quiet`; `--sm`, `--lg`, `--block` | 48px minimum target; disabled and loading states; replaces 8 ad-hoc padding combinations |
| **Card** | `.rce-card`, `--interactive`, `__title` | |
| **Media** | `.rce-media` + `--hero`, `--wide`, `--figure`, `--square`; `__scrim--bottom/left/flat`; `__content` | Aspect ratio reserved, so layout does not shift as images load |
| **Technical figure** | `.rce-figure`, `__frame`, `__status`, `__caption`, `__credit` | |
| **Status badge** | `.rce-badge` + `--conceptual`, `--proposed`, `--approved`, `--completed` | The four approved states |
| **Form field** | `.rce-field`, `__label`, `__required`, `__control`, `__help`, `__error` | Invalid style keyed to `aria-invalid` |
| **Alert** | `.rce-alert` + `--error`, `--success`, `--warning`, `--info` | |
| **Tabs** | `.rce-tabs__list`, `__tab`, `__panel` | |
| **Disclosure** | `.rce-disclosure`, `__trigger`, `__icon`, `__panel` | |
| **Overlay** | `.rce-overlay`, `.rce-drawer`, `.rce-dialog` | Layering and travel only |
| **Utility** | `.rce-sr-only`, `.rce-stack`, `.rce-cluster`, `.rce-measure` | |

### Angular components — `src/app/shared/ui/`

Only the three patterns that genuinely need behaviour. Everything else is CSS.

| Component | File | Why it needs TypeScript |
|---|---|---|
| `<rce-tabs>` | `rce-tabs.component.ts` | Roving tabindex, arrow/Home/End keys, moving focus with selection |
| `<rce-disclosure>` | `rce-disclosure.component.ts` | `aria-expanded` and `hidden` kept in step |
| `<rce-figure>` | `rce-figure.component.ts` | Makes `alt`, `caption` and `status` **required inputs**, so an unlabelled drawing cannot compile |

All three are standalone and Angular 17 compatible. **None is imported by any page**, so they are
tree-shaken out of the bundle — the component foundation adds no JavaScript to the site until a
page adopts it.

### New tokens — `src/styles/tokens.css`

Feedback states (error, success, warning, info, disabled) · form-control tokens · z-index scale
(7 steps) · three motion durations and two easings · three scrims · four aspect ratios.

---

## 2 · CTA naming for GA4

Every call to action carries `data-cta`, built to one shape (`src/app/shared/ui/cta.ts` has the
helper and the types):

```
data-cta="<area>_<page>_<action>_<rank>"

area    hero | section | card | nav | footer | drawer | figure
page    home | landdev | water | transport | environmental | permitting |
        about | contact | careers | experience
action  consult | quote | portfolio | detail | call | email | download | submit
rank    primary | secondary | tertiary
```

Examples: `hero_landdev_consult_primary`, `section_home_portfolio_secondary`.

GTM reads the attribute from the clicked element — no per-page tagging, and the four parts stay
comparable as dimensions across all five service pages. Without this, five pages produce five
incompatible event names and the funnel cannot be read.

---

## 3 · Accessibility checks

**Measured contrast** — new state colours, WCAG 2.1 AA:

| Pair | Ratio | Needs | Result |
|---|---|---|---|
| Error text on error panel | 7.97:1 | 4.5 | PASS |
| Error text on white | 8.66:1 | 4.5 | PASS |
| Success text on success panel | 7.26:1 | 4.5 | PASS |
| Success text on white | 7.66:1 | 4.5 | PASS |
| Warning text on warning panel | 7.21:1 | 4.5 | PASS |
| Warning text on white | 7.52:1 | 4.5 | PASS |
| Error border / icon on white | 6.57:1 | 3.0 | PASS |
| Success border / icon on white | 5.69:1 | 3.0 | PASS |
| Quiet button text on white | 6.37:1 | 4.5 | PASS |
| Placeholder on white | 4.76:1 | 4.5 | PASS |
| Disabled label on disabled field | 6.92:1 | 4.5 | PASS |

**10 of 11 passed on the first measurement.** Disabled text was the exception: slate-500 on the
disabled surface measured **4.34:1**. WCAG exempts disabled controls, so it would have
"conformed", but a disabled field's value is still meant to be read. It is now slate-600 at
6.92:1, and the disabled signal comes from the surface, the cursor and `aria-disabled` rather
than from faint text.

**Structural checks**

| Check | How it is handled |
|---|---|
| Touch targets | Buttons and fields are 48px minimum; tabs 48px; disclosure triggers 56px |
| Focus visible | 3px gold outline with 2px offset on every interactive element (Tailwind's reset had removed it) |
| Tabs keyboard | Arrow keys move and activate, Home/End jump to the ends, one tab in the tab order |
| Disclosure | `aria-expanded` on the trigger, `aria-controls` naming the region; closed panels use `hidden`, so they leave both the tab order and the accessibility tree |
| Form errors | Driven by `aria-invalid`, with the message tied by `aria-describedby`, so the visual and announced states cannot disagree |
| Status messages | Success uses `role="status"`, errors use `role="alert"` |
| Loading button | Label stays in the accessibility tree, `aria-busy` set, pointer events off — only the visual label is replaced |
| Overlays | Escape closes, focus returns to the opener, background scroll locked |
| Reduced motion | Every transition and animation disabled under `prefers-reduced-motion: reduce` |
| Figures | `alt`, `caption` and `status` are required inputs — an unlabelled figure fails to compile |

**Not yet done:** no screen-reader pass with a real assistive technology, and no automated axe
run. Both belong in the Stage 6 accessibility review. What is claimed above is what I verified by
construction and measurement.

---

## 4 · Modified files

**New**

| File | Purpose |
|---|---|
| `src/styles/components.css` | The component layer |
| `src/app/shared/ui/rce-tabs.component.ts` | Accessible tabs |
| `src/app/shared/ui/rce-disclosure.component.ts` | Accessible disclosure |
| `src/app/shared/ui/rce-figure.component.ts` | Technical figure with required labelling |
| `src/app/shared/ui/cta.ts` | CTA naming convention and helper |
| `docs/showcase/index.html` | The showcase |
| `docs/component-foundation.md` | This file |

**Changed**

| File | Change |
|---|---|
| `src/styles/tokens.css` | Added sections 9–13: states, form controls, z-index, motion, media |
| `src/styles/base.css` | Layout helpers moved out to the component layer; base keeps element defaults, focus and typography |
| `angular.json` | Registers `components.css` after `base.css` in `build` and `test` |

**Untouched, as instructed:** every page component, every route, the five service pages, the
portfolio, project cards, case studies, the contact form and its backend, SEO, prerendering, and
the approved typography and branding.

The showcase lives in `docs/`, which is not in the Angular assets list, so it is not part of the
deployed site and adds no route.

---

## 5 · Build results

- `ng build --configuration production --base-href /` — **exit 0**, 91.3 s
- **11 static routes prerendered** — unchanged, so the deploy workflow's count check still passes
- Global stylesheet: **78.69 kB raw / 11.01 kB transferred** (was 65.58 / 8.74 before the
  component layer — **+13.1 kB raw, +2.3 kB over the wire**)
- Initial total: 481.69 kB raw / 118.79 kB transferred
- No route, redirect, canonical, schema or sitemap change
- **No JavaScript added.** Verified: `RceTabsComponent` and `rce-disclosure` appear in zero
  bundles, because no page imports them yet

### A pre-existing prerender error, found while verifying

The build log carries four of these:

```
Core Error: ReferenceError: window is not defined
    at c.initializeAnimations (…/chunk-TKR2LGIV.mjs)
```

**It is not from this phase.** The same error appears in the very first tokens-only build, before
any component existed. Earlier build logs looked clean only because I was filtering them to the
last few lines, which cut the error off — worth recording, because it nearly went unnoticed.

The cause: components that touch `window` during prerender without an `isPlatformBrowser` guard.

| Component | `isPlatformBrowser` guard |
|---|---|
| `permitting.component.ts` | **none** |
| `transportation.component.ts` | **none** |
| `water-resources.component.ts` | **none** |
| `environmental.component.ts` | **none** |
| `home/components/services.component.ts` | **none** |
| `service-navigator.component.ts` | **none** |
| `navbar.component.ts` | **none** |
| `service-page.component.ts` (Land Development) | present |
| `scroll-reveal.directive.ts`, `service-hud`, `experience-page`, `project-detail` | present |

**Four errors, four unmigrated service pages.** Land Development no longer throws, because the
shared `service-page` component guards properly — the migration fixed its instance.

Why it matters: when a component throws during prerender, whatever it was going to render may be
missing from the static HTML that Google reads. This is the same class of problem as the grey-hero
render in Search Console.

**Not fixed here**, because your restrictions exclude migrating the other four services and
changing prerendering. It belongs either with each service migration (Stage 5) or as a small
standalone fix if you want it sooner. Flagging, not acting.

---

## 6 · Fonts are NOT self-hosted yet

**Verified: still loaded from Google's CDN.** `src/index.html` links
`fonts.googleapis.com`, and the showcase does the same.

Under the locked Option C, **all four faces are in use** — Inter (body, navigation, forms,
buttons), Inter Tight (hero and technical headings), Source Serif 4 (editorial headings),
JetBrains Mono (small technical labels). None can simply be dropped.

To self-host I need to download the four font files and add an `@font-face` block with
`font-display: swap`, preloading the two weights used above the fold. **Downloading those files
needs your go-ahead**, so I have not done it. This must be finished before any deployment, both
for the third-party-request reason and because a CDN dependency is a single point of failure on a
credibility page.

---

## 7 · What was deliberately not built

Per your restrictions: no homepage redesign, no Land Development redesign, no migration of the
other four services, no service explorer, no drawing viewer, no CAD-versus-3D comparison, no
consultation form backend, no portfolio or case-study changes, and no route, SEO or prerendering
change.

Also deliberately absent, because no use case is defined yet: pagination, breadcrumbs, tooltips,
toasts, data tables, and a "one open at a time" accordion mode. The `--rce-z-toast` token exists
because the scale would be wrong without it, but no toast component was built.

The overlay, drawer and dialog are layering and travel only. The first real drawer — most likely
the contextual inquiry form — is a Stage 4 design decision.
