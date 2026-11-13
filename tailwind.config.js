/** @type {import('tailwindcss').Config} */

/*
 * Tailwind reads from the design tokens in src/styles/tokens.css rather than
 * holding its own values, so a utility class and a hand-written CSS rule can
 * never drift apart.
 *
 * Existing keys (primary, surface, border, spacing.section) are kept exactly as
 * they were so no current template changes behaviour.
 *
 * Default breakpoints are unchanged (sm 640 / md 768 / lg 1024 / xl 1280) —
 * they already match the documented standard, and altering them would silently
 * reflow every responsive class in the app.
 */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // --- existing keys, unchanged values ---
        primary: '#1E3A8A', // Muted Deep Blue
        surface: '#FAFAFA', // White-on-White Surface
        border: '#E5E7EB',

        // --- token-backed palette ---
        gold: {
          400: 'var(--rce-gold-400)',
          DEFAULT: 'var(--rce-gold-500)',
          500: 'var(--rce-gold-500)',
          600: 'var(--rce-gold-600)',
          700: 'var(--rce-gold-700)', // only gold that passes AA as small text on light
          50:  'var(--rce-gold-50)',
        },
        navy: {
          DEFAULT: 'var(--rce-navy-500)',
          500: 'var(--rce-navy-500)',
          600: 'var(--rce-navy-600)',
          900: 'var(--rce-navy-900)',
          950: 'var(--rce-navy-950)',
        },
        cream: {
          DEFAULT: 'var(--rce-cream)',
          2: 'var(--rce-cream-2)',
        },
        // Per-service accent: set --rce-accent on the page root to retheme.
        accent: {
          DEFAULT: 'var(--rce-accent)',
          dark: 'var(--rce-accent-dark)',
          tint: 'var(--rce-accent-tint)',
        },
        ink: {
          DEFAULT: 'var(--rce-text)',
          muted:  'var(--rce-text-muted)',
          subtle: 'var(--rce-text-subtle)',
        },
      },

      fontFamily: {
        // Preflight points html at `sans`, so body text picks this up globally.
        sans:    ['var(--rce-font-body)'],
        display: ['var(--rce-font-display)'],
        mono:    ['var(--rce-font-mono)'],
      },

      fontSize: {
        'rce-xs':   'var(--rce-text-xs)',
        'rce-sm':   'var(--rce-text-sm)',
        'rce-base': 'var(--rce-text-base)',
        'rce-lead': 'var(--rce-text-lead)',
        'rce-h3':   'var(--rce-text-h3)',
        'rce-h2':   'var(--rce-text-h2)',
        'rce-h1':   'var(--rce-text-h1)',
      },

      spacing: {
        section: '4rem', // 64px — existing key, unchanged
        'rce-1': 'var(--rce-space-1)',
        'rce-2': 'var(--rce-space-2)',
        'rce-3': 'var(--rce-space-3)',
        'rce-4': 'var(--rce-space-4)',
        'rce-5': 'var(--rce-space-5)',
        'rce-6': 'var(--rce-space-6)',
        'rce-7': 'var(--rce-space-7)',
        'rce-8': 'var(--rce-space-8)',
        'rce-section': 'var(--rce-section-pad)',
        gutter: 'var(--rce-gutter)',
      },

      maxWidth: {
        container: 'var(--rce-container)',
        measure: 'var(--rce-measure)',
      },

      borderRadius: {
        'rce-sm': 'var(--rce-radius-sm)',
        rce: 'var(--rce-radius)',
        'rce-lg': 'var(--rce-radius-lg)',
      },

      boxShadow: {
        'rce-sm': 'var(--rce-shadow-sm)',
        'rce-md': 'var(--rce-shadow-md)',
        'rce-lg': 'var(--rce-shadow-lg)',
      },

      transitionTimingFunction: {
        rce: 'var(--rce-ease)',
      },
    },
  },
  plugins: [],
}
