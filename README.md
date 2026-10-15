# Vibe Coding Collective — four-page website

A local, static rebuild of VCC with Home, About, Companies, and Events pages. Built on the original repository's Vite / TypeScript / HTML / CSS stack.

## Run locally

Use Node 20.19+ or 22.12+.

```sh
npm ci
npm run dev -- --host 127.0.0.1
```

Visit the URL printed by Vite. The current preview uses http://127.0.0.1:5181/.

For this workspace, macOS had offloaded dependency files in the Desktop folder. The ignored node_modules entry therefore points to a local dependency cache at /private/tmp/vcc-website-runtime-01a13777/node_modules. The current preview serves the verified production build from the same cache. If that temporary cache is removed later, run npm ci to reinstall dependencies. Optional VCC_PUBLIC_DIR and VCC_BUILD_DIR environment variables let this local session serve assets and build output outside the cloud-synced folder; both default to normal project directories.

Current session preview command:

```sh
VCC_BUILD_DIR=/private/tmp/vcc-website-runtime-01a13777/dist npm run preview -- --host 127.0.0.1 --port 5181
```

For live source editing while the local cache exists:

```sh
VCC_PUBLIC_DIR=/private/tmp/vcc-website-runtime-01a13777/public npm run dev -- --host 127.0.0.1
```

Page routes: /, /about/, /companies/, /events/.

```sh
npm run typecheck
npm test
npm run build
npm run preview -- --host 127.0.0.1
```

The build writes four standalone documents into dist. A static host should serve the index.html within each page directory. No backend, account, or API credentials are required.

## Content maintenance

- The four files in content/ are copies of the supplied Markdown documents, with embedded reference-image data omitted. The originals in the parent workspace are untouched.
- Five practical attendance FAQs, consolidated from the supplied Home and Events copy, live in src/site.ts and appear only on Events. Unanswered source questions remain omitted.
- Curated section copy and reusable rendering components live in src/render.ts. Updating a section's prose requires updating its curated rendering copy. The raw Markdown is reference material for those sections.
- Navigation, metadata, chapter destinations, team roster, testimonials, and image metadata live in src/site.ts.
- Visual styles live in src/styles/site.css. Original reconstruction sections and styles are retained as historical reference, but are not bundled.
- The extended Vite include plugin renders the shared header/footer and page body into HTML before delivery. Main content and native disclosures work without JavaScript.

## Images and links

Original VCC assets and Golos Text remain self-hosted under public/. Three supplementary fictional community photographs were created using the built-in ImageGen tool and optimised as WebP under public/assets/community/. Each rendered photograph has an “Illustrative image” caption. Prompts are documented in docs/IMAGE_PROMPTS.md.

The Events page links to verified London and EU Meetup organiser pages. There is no live feed and no fabricated future event schedule. The evening timeline is clearly an example. Enquiry CTAs open an email to partnership@vibecoders.global with a contextual subject.

## Content intentionally omitted

Dan's unfinished biography; unanswered About and Companies FAQs; unfinished event count; missing PR snippets and company-specific endorsements; company registration details and the unavailable privacy policy. The Individual involvement section marked “added later” is not on Home; About includes the requested volunteer invitation. Team spelling follows the supplied Markdown, with existing portrait filenames mapped explicitly.

## Editorial structure

Home introduces VCC through community figures, supporters, projects, event formats, and one complete participant quote. About explains folk software and the principles, then shows the community map with a readable example city list, team, and one volunteer invitation. Companies presents the partnership offer, figures, contribution options, benefits, and partnership enquiry actions in its hero and closing section. Events leads with distinctly named organiser links, levels, an example timetable, and five practical FAQs. Decorative eyebrow labels, repeated slogans, numbering, and promotional footer copy have been removed; functional labels and image disclosures remain.

## Design

Cream, ink, green, orange, yellow, teal, and VCC mascots preserve the original identity. The layouts introduce more candid imagery, asymmetric collage, open typographic sections, and restrained CSS feedback. Mobile navigation and FAQs use native details elements. Enhanced mobile navigation closes on Escape and outside click, with focus restored on Escape. Reduced motion disables decorative movement.

Interface review improvements use rem-based text sizes and breakpoints, shrinkable grid tracks, and wrapping controls for enlarged browser fonts. Principle statements and the testimonial use 1.4 line-height; image disclosures and team roles start at 13px. Focus uses blue on light surfaces and paper on dark panels. The Companies header event action is secondary, and the mobile menu opens without an entrance animation.

## GitHub Pages

The `Publish site` workflow checks, builds, and deploys the site whenever `main` is pushed. The build uses the repository name as its base path so navigation and assets work on GitHub Pages. In the repository's Pages settings, choose **GitHub Actions** as the build source.
