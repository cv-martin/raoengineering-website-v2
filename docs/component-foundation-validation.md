# Component foundation — validation summary

**Branch:** `feature/design-system` · **Date:** 13 Nov 2026
**Status:** validated. Not committed, not pushed, not deployed.

One item needs your decision before this phase closes: **section 5**.

---

## 1 · Fonts are now self-hosted

All four faces are served from this origin. **Verified in a real browser on the showcase: zero
third-party requests.**

| Family | Weights shipped | Licence |
|---|---|---|
| Inter | 400, 500, 600, 700 | SIL OFL 1.1 |
| Inter Tight | 600, 700 | SIL OFL 1.1 |
| Source Serif 4 | 600, 700 | SIL OFL 1.1 |
| JetBrains Mono | 500 | SIL OFL 1.1 |

Latin and latin-ext subsets only. 18 files, 1,012 kB on disk — but a page fetches only the
weights it renders: measured on the showcase, **six files, latin only**, because `unicode-range`
and weight matching leave the rest idle.

**Weights dropped as unused:** Inter Tight 500 and Source Serif 4 400. Headings take 600 from the
framework or 700 from the templates, so neither was ever requested. That removed 222 kB.

Licence compliance: `src/assets/fonts/OFL.txt` carries each family's own copyright line plus the
shared OFL 1.1 body.

`index.html` preloads `inter-400-latin.woff2` and `inter-tight-700-latin.woff2`, the two faces
above the fold. Everything else uses `font-display: swap`.

**Build verification:** 0 references to `fonts.googleapis.com` or `fonts.gstatic.com` anywhere in
the built output. 18 font files emitted, 18 `@font-face` rules, 2 preloads.

---

## 2 · Keyboard, focus and ARIA — 20 of 21 passed first time

Run against the live showcase by dispatching real keyboard events and reading the resulting DOM
state, not by inspection.

| Check | Result |
|---|---|
| Tabs: exactly one tab in the tab order | PASS |
| Tabs: each panel bound by `aria-labelledby` | PASS |
| Tabs: ArrowRight selects the next tab | PASS |
| Tabs: ArrowRight moves focus with the selection | PASS |
| Tabs: the deselected panel becomes hidden | PASS |
| Tabs: End jumps to the last tab | PASS |
| Tabs: wrapping past the end returns to the first | PASS |
| Tabs: Home jumps to the first | PASS |
| Disclosure: starts collapsed, panel hidden | PASS |
| Disclosure: expands, `aria-expanded` follows | PASS |
| Disclosure: panel is a region named by its trigger | PASS |
| Disclosure: collapsing removes it from the tab order | PASS |
| Field: invalid state announced via `aria-describedby` | PASS |
| Field: the error message carries real text | PASS |
| Alert: errors use `role="alert"` | PASS |
| Alert: success uses `role="status"` | PASS |
| Loading: `aria-busy` set | PASS |
| Loading: label kept in the accessibility tree ("Submitting") | PASS |
| Loading: pointer events off, so it cannot double-submit | PASS |
| `:focus-visible` rule present | PASS |
| Reduced-motion blocks present | PASS (2 blocks) |
| **Touch targets ≥44px** | **FAILED — now fixed** |

**The failure:** `.rce-btn--sm` was 40px high, under the 44px target. Now 44px, re-measured —
every visible control passes. Worth noting it was found by measuring, not by reading the CSS.

**Figure labelling, asserted:** every figure has a caption, a status badge, alt text and a
credit, and **none is badged Completed**.

**Not done:** no screen-reader pass with a real assistive technology and no automated axe run.
Both belong in the Stage 6 accessibility review.

---

## 3 · Illustrative images must not imply completed RCE work

Your instruction 4 caught a real problem in my own showcase. I had a stock photograph badged
**"Completed"** captioned "Example of a completed subdivision". On a civil engineering site that
reads as a finished RCE project.

Corrected: both figures are now badged **Conceptual**, and the credit reads
"Stock illustration · not RCE work product".

The component already made this hard to get wrong at the code level — `alt`, `caption` and
`status` are required inputs on `RceFigureComponent` — but nothing stops a human choosing the
wrong status. The showcase now demonstrates the honest labelling rather than the convenient one.

---

## 4 · Production build

- `ng build --configuration production --base-href /` — **exit 0**, 34.8 s
- **11 static routes prerendered**, verified on disk — deploy count check still passes
- Stylesheet **84.60 kB raw / 11.40 kB transferred** (the `@font-face` block costs ~0.4 kB gzipped)
- Initial total 487.60 kB raw / 119.18 kB transferred
- **No JavaScript added** — `RceTabsComponent` and `rce-disclosure` appear in zero bundles,
  because no page imports them
- No route, canonical, schema or sitemap change

The four pre-existing `window is not defined` prerender errors are unchanged — they come from the
four unmigrated service pages, as documented in `component-foundation.md`. Not from this phase.

---

## 5 · Existing pages: one real visual change, and it needs your call

Pixel-compared every existing page against captures taken before this phase.

| Page | Before | After | Differing pixels | Verdict |
|---|---|---|---|---|
| Land Development desktop | 7481px | 7481px | **0** | identical |
| Land Development mobile | 12927px | 12927px | **0** | identical |
| Home desktop | 5155px | 5155px | 17,156 (0.23%) | changed |
| Home mobile | 7133px | 7133px | 56,526 (2.03%) | changed |
| About desktop | 4767px | **4839px** | height +72px | changed |
| About mobile | 6712px | **6748px** | height +36px | changed |

**The cause is not CSS. It is a font weight that was never being loaded.**

The old Google Fonts request was:

```
Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400
```

That asked for **400 and 600 only — no 700**. The editorial headings in the markup carry
`font-bold`, which is 700. With no 700 available, the browser fell back to 600.

The self-hosted set ships a real 700, so `font-bold` now renders as true bold. Serif bold is
wider, so headings wrap differently and About grew 72px.

**Land Development is pixel-identical because it has no editorial serif headings** — which is
exactly what Option C intends, and a useful confirmation that nothing else moved.

See `previews/serif_weight_change.png` for the two renderings side by side.

**This is arguably a correction, not a regression:** the markup asks for bold and now gets bold.
But it is a visible change to pages you told me not to redesign, so it is your call:

- **Keep it.** Editorial headings render at true 700. About is 72px taller. Honest to the markup.
- **Revert it.** Drop the self-hosted Source Serif 700 and the previous rendering returns exactly;
  `font-bold` resolves to 600 as before. One file removed, one stylesheet regenerated.
- **Decide it properly at homepage design.** My own view is that 600 reads more refined than 700
  at display sizes for a serif, so the pre-existing rendering may have been the better one by
  accident. That is a typography decision rather than a build fix.

**I have changed nothing on the existing pages.** No page CSS, markup or layout was touched.

---

## 6 · Files changed in this validation step

| File | Change |
|---|---|
| `src/assets/fonts/` | **New.** 18 woff2 files + `OFL.txt` |
| `src/styles/fonts.css` | **New.** 18 self-hosted `@font-face` rules |
| `src/styles.css` | Imports `fonts.css` ahead of the tokens |
| `src/index.html` | Google Fonts links replaced by two local preloads |
| `src/styles/components.css` | `.rce-btn--sm` raised 40px → 44px |
| `docs/showcase/index.html` | Self-hosted fonts; figure labelling corrected |
| `docs/showcase/fonts-preview.css` | **New, generated.** Relative-path copy so the showcase works when served from the repo root |

No page component, route, SEO setting or prerender configuration was touched.
