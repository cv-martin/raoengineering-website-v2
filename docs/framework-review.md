# Design framework review — six perspectives

**Branch:** `feature/design-system` · **Date:** 13 Nov 2026
**Scope:** the design framework, not the page content and not the current visual design.

Reviewed as a civil engineer, a retail developer, a repeat client, an end customer, a UI/UX
designer and a business analyst. The question in each case is the same: **does the framework
give Stage 3 and Stage 4 what they will need?**

Approving Option C locks the typography. It does not approve how the site currently looks —
the homepage hierarchy, the Land Development experience and the About presentation are separate
decisions, and nothing here pre-empts them.

---

## Where the framework stands

82 tokens covering colour, typography, spacing, containers, radius, shadow and motion, plus a
base layer with font application, focus rings and three opt-in layout helpers.

**What it does well:** one source of truth for colour and type; per-service theming from a single
`--rce-accent`; a 7-step type scale replacing 17 ad-hoc sizes; restored focus rings; measured
AA contrast.

**What it is:** a *styling* foundation. It is not yet an *interface* foundation — and Stages 3
and 4 need the second one.

---

## The gaps, by who feels them

### 1. Civil engineer reviewing a peer firm

| Gap | Why it matters |
|---|---|
| **No figure / caption / credit pattern** | Register §7 requires every engineering visual to be labelled and conceptual work clearly distinguished from completed work. That is a *framework* obligation: a figure component with a mandatory caption, a source line and a "conceptual — not to scale" marker. Today nothing enforces it, so the first drawing published will be an unlabelled `<img>`. |
| **No table or spec-list pattern** | Engineers read specifications, criteria lists and comparisons. There is no table styling at all. `font-variant-numeric: tabular-nums` is set, which is the right instinct and the only piece present. |
| **No print styles** | Engineers print and PDF reference pages. Printing today produces the navigation, the hero photo and a broken layout. A print stylesheet is a small, high-credibility addition. |
| **Single container width** | Drawings and exhibits need a wider frame than body text. One 1280px container forces every exhibit into text width or out of the grid entirely. |

### 2. Retail / C-store developer evaluating RCE for a site

| Gap | Why it matters |
|---|---|
| **No disclosure pattern** (tabs, accordion, show-more) | This reader wants to scan to "can you get my driveway permit approved" without reading a 7,000px page. Stage 4's explorer depends entirely on progressive disclosure, and the framework has no pattern for it. |
| **No comparison or criteria layout** | They compare jurisdictions, timelines and project types. Everything currently renders as prose or identical cards. |
| **No status or badge vocabulary** | "Conceptual", "Completed", "Permitted", "In construction" — needed to make a portfolio honest. Nothing exists. |

### 3. Repeat client

| Gap | Why it matters |
|---|---|
| **No form-control tokens** | Field height, border, placeholder, invalid and valid states are undefined. The inquiry form is the primary conversion point and it is the least systematised part of the UI. |
| **No error / success / warning tokens** | Register §6 is explicit: the form must never show success unless delivery is confirmed. The *logic* already honours this; the *design system* has no error or success colour to render either state consistently. A contextual inquiry form appearing on several pages will need both. |
| **No loading or disabled state** | A submit button with no disabled state invites double submissions. |

### 4. End customer / first-time visitor

| Gap | Why it matters |
|---|---|
| **No scrim token for text over photography** | Visible in the Home mobile capture: the gold "Engineering" and white sub-head sit on a pale steel photo with no overlay. It is hard to read, and it will get worse with real site photography, which is brighter and busier than illustration. This is a framework fix — one overlay token — not a per-page fix. |
| **No image aspect-ratio tokens** | Hero and card images have no consistent framing, so layout shifts as images load. |
| **Tap targets not systematised** | Eight different `px-_ py-_` combinations across templates. Some resolve under the 44px minimum. |

### 5. UI/UX designer

| Gap | Why it matters |
|---|---|
| **No component layer at all** | The framework defines values but no button, card, field, nav or section component. Eight button padding variants already exist in the templates; every new page reinvents them. This is the single biggest gap before Stage 3. |
| **No z-index scale** | Stage 4's inquiry drawer, the mobile menu and any modal will collide. Needed before the first overlay is built. |
| **Breakpoints are documentation, not tokens** | CSS cannot read a variable inside `@media`, so the values are written in a comment. Without a shared mixin or a documented convention they will drift again. |
| **One motion duration, one easing** | Enough for fades, not for a drawer, an accordion or a view transition. |
| **No empty, skeleton or error-page states** | Every real interface needs them; none is defined. |
| **No dark-section pairing rule** | `--rce-surface-dark` exists but no paired text/border/accent set, so each dark section will be hand-tuned. Gold 400 vs 500 on dark is already a live question. |

### 6. Business analyst

| Gap | Why it matters |
|---|---|
| **No measurement hooks** | GA4 and GTM are installed, but nothing in the framework standardises how a CTA identifies itself. Without a convention, conversion reporting across five service pages will be inconsistent and the funnel cannot be compared. |
| **One CTA style for every intent** | "Request a feasibility review", "Talk to an engineer" and "View portfolio" are different commitments rendered identically. Hierarchy is a framework decision with direct commercial effect. |
| **No contextual-inquiry pattern** | §6 wants one reusable form carrying service and project type. That is a component contract — fields, payload, states — and it should be defined in the framework before Stage 4 builds against it. |
| **Image weight unaddressed** | 69 MB of assets, deferred by decision and correctly so. Flagged here only because it is a conversion and ranking issue, not just a technical one. |

---

## What I recommend adding before Stage 3

In order:

1. **Component layer** — button (3 variants, one size scale), card, section, field, figure. This
   is the prerequisite for the homepage work.
2. **State tokens** — hover, active, disabled, error, success, warning, plus focus which exists.
3. **Form-control tokens** and the contextual-inquiry component contract.
4. **Scrim/overlay token** for text over photography, and image aspect-ratio tokens.
5. **z-index scale** and a second and third motion duration, before any drawer or modal.
6. **Figure/caption/credit component** with a required caption and a conceptual-vs-completed
   marker, so §7 is enforced by the system rather than by memory.
7. **Disclosure pattern** (tabs / accordion), which Stage 4 depends on.
8. **Print stylesheet** and **table/spec-list styling**.
9. **CTA naming convention** for analytics.

Items 1–5 are needed for the homepage. Items 6–7 are needed for Land Development. Items 8–9 can
follow.

---

## What I am not saying

This is not a criticism of the current visual design, which is a separate decision you have
already reserved. It is a list of what the framework must provide so that the homepage and Land
Development work can be built once rather than improvised per page — which is exactly how the
four service pages ended up with 2,700 lines of near-duplicate CSS.
