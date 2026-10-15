# Validation

Interface review implementation — 2026-10-14. TypeScript and ESLint passed. Vitest: 24 tests across 3 files passed, including community-list content, the Companies hero enquiry and secondary header action, and distinct event-link labels with unchanged destinations. The production build passed. The final `npm run verify` gate is run with the documented temporary asset/build cache to avoid macOS cloud-offload delays; its exit status is captured directly.

Browser checks covered all four routes at widths 320, 375, 800, and 1280: no horizontal overflow and no failed loaded images. Image disclosures and team roles compute to 13px at the normal default font size; About principles and the Home quotation compute to 1.4 line-height. The mobile menu opens without animation, closes on Escape with focus restoration, and closes on a click in the page gutter without navigating. The Events laptop FAQ opens with Enter and displays “A laptop.”

A disposable local proxy fixture doubled the root font size to 32px and scaled rem media thresholds to emulate a 32px browser default. Body text computed to 34px. All four routes passed overflow/bounds checks at 320, 800, and 1280px. A 640×400 CSS viewport also passed reflow checks for all routes, equivalent to the available layout area of a 1280×800 viewport at 200% zoom. Native browser zoom is not exposed by this browser integration: its zoom shortcut had no effect, so native 200% zoom remains unverified. The fixture is not part of production source.

Computed focus colors were measured against the rendered solid backgrounds: blue on cream 6.21:1, paper on green 4.98:1, and paper on ink 16.33:1. Each exceeds the required 3:1. The paper footer focus ring was also inspected while keyboard-focused.

Static output audit: all four documents have one H1, complete local image references, valid internal route and fragment links, and contextual email subjects. No unresolved include markers, document-only links, or removed decorative slogans appear in the rendered output. Five attendance FAQs appear only on Events; the community map is on About; Home includes one complete attributed quote. Original Markdown and all supplied testimonials remain preserved as reference content.

The content, readable community list, and native disclosures are present in delivered HTML, independent of JavaScript. Reduced motion remains covered by the explicit stylesheet fallback, which disables transitions and animations and removes button/link movement. Native OS reduced-motion emulation and screen-reader speech are not exposed by this browser integration and remain unverified. Generated image disclosures remain visible.

The existing production preview is http://127.0.0.1:5181/ and the reviewed live-source preview is http://127.0.0.1:5182/. The latest verified production output is saved in the documented temporary runtime cache. No deployment or GitHub push was made.
