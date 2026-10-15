# Four-page architecture

The previous eleven-section single-page reconstruction is retained in src/sections and its old per-section styles as reference. It is not included in the new bundle.

Four HTML entry points declare shared:header, page:body, and shared:footer include markers. The vcc-html-includes Vite plugin resolves these at dev/build time using src/render.ts. Route identity determines active navigation and the page body. Each output contains complete semantic HTML, independent of client-side rendering.

src/site.ts holds typed shared navigation, chapter links, metadata, image metadata, roster, and testimonials. src/render.ts holds curated page copy and reusable rendering helpers, safely escaping source content. Five curated attendance answers in src/site.ts are rendered as native disclosures on Events. Local Markdown copies remain reference material for the edited prose.

src/main.ts loads the self-hosted font and site stylesheet, then enhances the native mobile details menu. Navigation and FAQ interaction do not depend on JavaScript.

The new stylesheet is the sole active layout layer, with 1100, 800, and 420 pixel adaptations and a reduced-motion fallback. Four HTML inputs are configured explicitly in vite.config.ts. The build output is deployable as ordinary static directory-index pages, without an SPA fallback.

Tests protect the consolidated FAQ placement, testimonial attribution, team roster, page landmarks, asset availability, active navigation, organiser links, encoded enquiry subjects, and keyboard/outside-click menu behaviour.
