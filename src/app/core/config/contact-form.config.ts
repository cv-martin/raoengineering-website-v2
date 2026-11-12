/**
 * Where the contact form sends project inquiries.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ACTION REQUIRED — the form cannot deliver anything until this is filled in.
 * ─────────────────────────────────────────────────────────────────────────────
 * The previous value, 'https://formspree.io/f/xoqyzrvv', was never a real form.
 * Formspree returns:
 *
 *   404  {"error":"Form not found",
 *         "detail":"No form exists with ID \"xoqyzrvv\". Formspree form IDs are
 *                   issued when a form is created, not chosen by you."}
 *
 * Every inquiry submitted through the website therefore failed, and the old
 * code still displayed "Message Received" to the visitor. That is fixed in
 * contact.component.ts: the form now reports an honest failure instead.
 *
 * To switch delivery on:
 *   1. Create a form at https://formspree.io (or use another endpoint that
 *      accepts a JSON POST and returns 2xx on success).
 *   2. Set the e-mail address that should receive inquiries.
 *   3. Paste the endpoint URL below and redeploy.
 *   4. Submit a real test inquiry and confirm it arrives.
 *
 * Leave it as an empty string if there is no endpoint yet: the form will then
 * tell visitors to e-mail or call instead of silently losing their message.
 */
export const CONTACT_FORM_ENDPOINT =
  'https://formsubmit.co/ajax/rao@raosengineering.com';

/**
 * Zoho Forms (free plan) — the intended replacement for the dead Formspree ID.
 *
 * The free plan covers 3 forms and 500 submissions/month, which is far above
 * RCE's current inbound volume, and it stores every submission in Zoho. That
 * matters: an inquiry is then recorded even if the notification e-mail fails,
 * which a pure e-mail relay cannot guarantee.
 *
 * Zoho Forms does NOT accept an anonymous JSON POST from our own form on the
 * free plan, so delivery works one of two supported ways:
 *
 *   EMBED  — paste the form's iframe URL below. The Zoho form renders inside
 *            the contact page and Zoho handles delivery and storage.
 *   LINK   — leave this empty and send visitors to the permalink instead.
 *
 * To fill this in: open the form builder, click the Share tab, and copy either
 * the "Form Permalink (URL)" or the URL inside the "Embed iframe" snippet. It
 * looks like:
 *   https://forms.zoho.com/raosconsultingengineers1/form/RCEProjectConsultation/formperma/XXXXXXXX
 *
 * The builder URL (…/builder) is NOT the public link — it requires a login.
 */
export const ZOHO_FORM_URL = '';

/**
 * The Zoho form stays live and free at this permalink. It is not embedded,
 * because Zoho's free plan refuses notification recipients ("Please upgrade
 * your plan to add recipients"), so nobody would be told an inquiry arrived.
 * Useful as a direct link to send people; set ZOHO_FORM_URL to it to embed.
 */
export const ZOHO_FORM_PERMALINK =
  'https://forms.zohopublic.com/raosconsultingengineers1/form/RCEProjectConsultation' +
  '/formperma/JtPsxHbSbiDNcqUI2N9Bmk3QNE2c5-LNiMBOVLuJFLY';

/** True once a Zoho form URL is configured above. */
export function isZohoFormConfigured(): boolean {
  return ZOHO_FORM_URL.trim().length > 0;
}

/** Inbox shown to visitors when online submission is unavailable. */
export const CONTACT_FALLBACK_EMAIL = 'rao@raosengineering.com';

/** Phone numbers shown alongside the fallback e-mail address. */
export const CONTACT_FALLBACK_PHONES = ['210-549-7557', '512-856-4595'];

/** True once a delivery endpoint has actually been configured above. */
export function isContactFormConfigured(): boolean {
  return CONTACT_FORM_ENDPOINT.trim().length > 0;
}
