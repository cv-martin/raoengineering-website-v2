/**
 * CTA naming for GA4.
 *
 * Every call to action carries `data-cta`, built to one shape so conversions
 * can be compared across pages. Without a convention, five service pages
 * produce five incompatible event names and the funnel cannot be read.
 *
 *   data-cta="<area>_<page>_<action>_<rank>"
 *
 *   area   where it sits: hero | section | card | nav | footer | drawer | figure
 *   page   the route it is on: home | landdev | water | transport | environmental |
 *          permitting | about | contact | careers | experience
 *   action what it asks for: consult | quote | portfolio | detail | call | email |
 *          download | submit
 *   rank   primary | secondary | tertiary
 *
 * Examples
 *   hero_landdev_consult_primary
 *   section_home_portfolio_secondary
 *   card_water_detail_tertiary
 *
 * Read in GTM from the clicked element's `data-cta` attribute; no per-page
 * tagging work, and the four parts stay comparable as dimensions.
 */

export type RceCtaArea =
  | 'hero' | 'section' | 'card' | 'nav' | 'footer' | 'drawer' | 'figure';

export type RceCtaPage =
  | 'home' | 'landdev' | 'water' | 'transport' | 'environmental'
  | 'permitting' | 'about' | 'contact' | 'careers' | 'experience';

export type RceCtaAction =
  | 'consult' | 'quote' | 'portfolio' | 'detail' | 'call' | 'email'
  | 'download' | 'submit';

export type RceCtaRank = 'primary' | 'secondary' | 'tertiary';

/** Builds the data-cta value. Use this rather than writing the string by hand. */
export function ctaName(
  area: RceCtaArea,
  page: RceCtaPage,
  action: RceCtaAction,
  rank: RceCtaRank = 'primary',
): string {
  return `${area}_${page}_${action}_${rank}`;
}
