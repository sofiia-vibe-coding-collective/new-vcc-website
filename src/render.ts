import { attendanceFAQs, chapters, emailHref, images, navigation, team, testimonials } from './site'
import type { FAQ, ImageMeta, PageId } from './site'

export const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, char =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!)

const arrow = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true"><path d="M4 12h15M12 5l7 7-7 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
const mascot = '<img class="mascot" src="/assets/hero-header/hero-googly-blob.svg" alt="" width="90" height="76" aria-hidden="true">'

function button(href: string, label: string, style = 'dark'): string {
  return `<a class="button button--${style}" href="${escapeHtml(href)}">${escapeHtml(label)}${arrow}</a>`
}
function textLink(href: string, label: string): string {
  return `<a class="text-link" href="${escapeHtml(href)}">${escapeHtml(label)}${arrow}</a>`
}
function img(image: ImageMeta, className = '', eager = false): string {
  return `<img class="${className}" src="${image.src}" alt="${escapeHtml(image.alt)}" width="${image.width}" height="${image.height}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`
}
function figure(image: ImageMeta, className = ''): string {
  return `<figure class="photo ${className}">${img(image)}${image.illustrative ? '<figcaption>Illustrative image</figcaption>' : ''}</figure>`
}
function sectionHead(title: string, body = ''): string {
  return `<div class="section-head"><h2>${title}</h2>${body ? `<p class="section-intro">${body}</p>` : ''}</div>`
}

const formats = [
  ['Workshops', 'Learn by building with a little guidance.'],
  ['Trainings', 'Get to know AI tools and ways of working.'],
  ['Hackathons', 'Work with a team on a shared challenge.'],
  ['Mixers', 'Meet the community over a drink.'],
]
const projects = [
  ['Immersive 3D', 'Build 3D worlds, scenes and characters.', 'immersive-3d', 512, 512],
  ['Motion tracking', 'Experiment with body, face and object tracking.', 'motion-tracking', 300, 301],
  ['Open data', 'Make something with data from NASA, finance or mapping APIs.', 'open-data', 512, 512],
  ['The unexpected', 'Handstand trackers, finger-controlled games, and other odd little inventions.', 'unexpected', 512, 512],
] as const

function header(page: PageId): string {
  const links = navigation.map(item =>
    `<a href="${item.href}"${item.id === page ? ' aria-current="page"' : ''}>${item.label}</a>`
  ).join('')
  return `
    <a class="skip-link" href="#app">Skip to content</a>
    <header class="site-header">
      <div class="nav-wrap">
        <a class="brand" href="/" aria-label="Vibe Coding Collective home">
          <img src="/assets/nav-sticky/logo-nav.svg" alt="Vibe Coding Collective" width="64" height="64">
        </a>
        <nav class="desktop-nav" aria-label="Main navigation">${links}</nav>
        <div class="nav-actions">
          <a class="contact-link" href="${emailHref('Hello VCC')}">Email us ${arrow}</a>
          ${button('/events/', 'Find an event', page === 'companies' ? 'light' : 'dark')}
        </div>
        <details class="mobile-menu">
          <summary aria-label="Menu"><span>Menu</span><span class="menu-lines" aria-hidden="true"></span></summary>
          <nav aria-label="Mobile navigation">${links}${textLink(emailHref('Hello VCC'), 'Email us')}</nav>
        </details>
      </div>
    </header>`
}

function footer(): string {
  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-art">
          <img class="footer-mascots" src="/assets/footer/logo-footer-wordmark.svg" alt="" aria-hidden="true" width="708" height="202" loading="lazy">
        </div>
        <div class="footer-links">
          <a href="/" class="footer-brand"><img src="/assets/footer/logo-footer-mark.svg" alt="Vibe Coding Collective" width="72" height="68" loading="lazy"></a>
          <nav aria-label="Footer navigation">${navigation.map(item => `<a href="${item.href}">${item.label}</a>`).join('')}</nav>
          <div class="social-links">
            <a href="https://www.instagram.com/vibecoding.collective/" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
            <a href="https://www.linkedin.com/company/vibe-coding-collective/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a href="https://www.youtube.com/@VibeCodingCollective" target="_blank" rel="noopener noreferrer">YouTube ↗</a>
            <a href="https://www.meetup.com/vibe-coding-collective/" target="_blank" rel="noopener noreferrer">Meetup ↗</a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© Vibe Coding Collective CIC 2026</p>
          <a href="${emailHref('Hello VCC')}">partnership@vibecoders.global</a>
        </div>
      </div>
    </footer>`
}

function partners(): string {
  return `
    <div class="partners">
      <p class="micro-label">Supported by</p>
      <div class="partner-logos">
        <img src="/assets/stats/logo-lovable.png" alt="Lovable" width="400" height="160" loading="lazy">
        <img src="/assets/stats/logo-elevenlabs.png" alt="ElevenLabs" width="498" height="160" loading="lazy">
        <span class="wordmark wordmark-replit">replit</span>
        <span class="wordmark wordmark-vercel"><svg width="23" height="22" viewBox="0 0 23 22" aria-hidden="true"><path d="M11.5 1L23 21H0z" fill="currentColor"/></svg>Vercel</span>
        <img src="/assets/stats/logo-softr.png" alt="Softr" width="366" height="160" loading="lazy">
      </div>
    </div>`
}

function faqs(items: FAQ[]): string {
  return `
    <section class="section faq-section container">
      <div class="faq-intro">
        <h2>Before you come</h2>
        <p>Questions about an event or your city?</p>
        ${textLink(emailHref('A question about VCC events'), 'Email us')}
      </div>
      <div class="faq-list">
        ${items.map(item => `
          <details class="faq">
            <summary>${escapeHtml(item.question)}<span class="faq-plus" aria-hidden="true">+</span></summary>
            <div class="faq-answer"><p>${escapeHtml(item.answer)}</p></div>
          </details>`).join('')}
      </div>
    </section>`
}

function testimonial(): string {
  const item = testimonials[0]
  return `
    <section class="section container testimonial-section" aria-label="Participant testimonial">
      <figure class="single-quote">
        <blockquote>“${escapeHtml(item.quote)}”</blockquote>
        <figcaption>
          <img src="/assets/reviews/reviewer-${item.image}.svg" alt="" width="48" height="48" loading="lazy">
          <div><strong>${item.name}</strong><span>${item.role} · ${item.place}</span></div>
        </figcaption>
      </figure>
    </section>`
}

function mapSection(): string {
  return `
    <section class="section container map-section">
      ${sectionHead('Our communities')}
      <div class="map-panel">
        ${img(images.map)}
        <div class="community-list">
          <p>Communities include</p>
          <ul aria-label="Some VCC communities">
            ${['London', 'Berlin', 'Delft', 'Kyiv', 'Osaka', 'Lisbon', 'New York'].map(city => `<li>${city}</li>`).join('')}
          </ul>
        </div>
        <div class="map-caption">${textLink('/events/', 'Find an event')}</div>
      </div>
    </section>`
}

function home(): string {
  return `
    <section class="container hero home-hero">
      <div class="hero-copy">
        <h1>Handing the<br>tools of making<br>to <span class="green-text">everyone.</span></h1>
        <p class="hero-lead">We meet in pubs, studios and community spaces to build software with AI. No coding experience needed.</p>
        <div class="hero-actions">${button('/events/', 'Find an event')}</div>
      </div>
      <div class="hero-collage">
        <div class="collage-photo collage-photo--one">${img(images.heroOne, '', true)}</div>
        <div class="collage-photo collage-photo--two">${img(images.heroTwo, '', true)}</div>
        <div class="collage-photo collage-photo--three">${img(images.heroThree, '', true)}</div>
        ${mascot}
      </div>
    </section>
    <section class="container proof-strip" aria-label="Community at a glance">
      <div><strong>5,000<span>+</span></strong><span>people</span></div>
      <div><strong>10<span>+</span></strong><span>countries</span></div>
      ${textLink('/companies/', 'Partner with VCC')}
    </section>
    <div class="container">${partners()}</div>
    <section class="section container project-section">
      ${sectionHead('Things people make', 'There’s no “right” thing to build. Bring your interests, your problems, or your weird ideas.')}
      <div class="project-grid">
        ${projects.map(([title, body, file, width, height]) => `
          <article class="project">
            <div class="project-art"><img src="/assets/project-showcase/project-${file}.png" alt="${escapeHtml(title + ' project demonstrated by community members')}" width="${width}" height="${height}" loading="lazy"></div>
            <div><h3>${title}</h3><p>${body}</p></div>
          </article>`).join('')}
      </div>
    </section>
    <section class="section container">
      <div class="formats-panel">
        <div class="formats-copy">
          <h2>Workshops,<br>hackathons<br>and more</h2>
          ${figure(images.cafe, 'format-photo')}
        </div>
        <div class="format-list">
          ${formats.map(([title, body]) => `<article><div><h3>${title}</h3><p>${body}</p></div></article>`).join('')}
          ${button('/events/', 'Find an event', 'cream')}
        </div>
      </div>
    </section>
    ${testimonial()}`
}

function about(): string {
  const principles = [
    'You don’t need to know how to code.',
    'Your ideas matter more than your credentials.',
    'Start small. Get better by making.',
    'Ask questions. Help each other.',
  ]
  return `
    <section class="container hero inner-hero about-hero">
      <div>
        <h1>About the<br><span class="green-text">collective</span></h1>
        <p class="hero-lead">We bring people together to make software with AI. Our events give people from any background a place to experiment and learn from each other.</p>
      </div>
      <div class="about-image">${figure(images.overhead, 'photo--portrait')}</div>
    </section>
    <section class="section container manifesto">
      <div><h2>Folk software</h2></div>
      <div>
        <p class="large-copy">Small, strange, useful, useless, beautiful things.</p>
        <p>Vibe coding means making software with AI: describe what you want, try it, and keep refining it. We want people to make the tools they use, and learn by making them together.</p>
      </div>
    </section>
    <section class="section container">
      <div class="principles-panel">
        ${sectionHead('What we believe')}
        <div class="principles">${principles.map(title => `<article><h3>${title}</h3></article>`).join('')}</div>
      </div>
    </section>
    ${mapSection()}
    <section class="section container team-section">
      ${sectionHead('The team')}
      <div class="founders">
        <article class="founder">
          <div class="founder-photo"><img src="/assets/for-city-leaders/team-dan-porder.webp" alt="Dan Porder" width="248" height="360" loading="lazy"></div>
          <div><span class="micro-label">Founder</span><h3>Dan Porder</h3>${textLink('https://www.linkedin.com/in/danporder/', 'LinkedIn')}</div>
        </article>
        <article class="founder">
          <div class="founder-photo"><img src="/assets/for-city-leaders/team-sofiia-matsiutsia.webp" alt="Sofia Matsiutsia" width="353" height="360" loading="lazy"></div>
          <div>
            <span class="micro-label">Founder</span><h3>Sofia Matsiutsia</h3>
            <p>Senior HCI and product designer with 8 years of experience. Speaker, design teacher, and tech community leader.</p>
            ${textLink('https://www.linkedin.com/in/smatsiutsia/', 'LinkedIn')}
          </div>
        </article>
      </div>
      <div class="team-grid">
        ${team.map(member => `
          <article class="team-member">
            <div class="team-photo"><img src="/assets/for-city-leaders/team-${member.image}.webp" alt="${escapeHtml(member.name)}" width="360" height="360" loading="lazy"></div>
            <h3>${escapeHtml(member.name)}</h3><p>${escapeHtml(member.role)}</p>
          </article>`).join('')}
      </div>
      <div class="volunteer-row">
        <div><h3>Volunteer</h3><p>Help run events or bring VCC to your city.</p></div>
        ${button(emailHref('Volunteering with VCC'), 'Volunteer with VCC', 'light')}
      </div>
    </section>`
}

function companies(): string {
  const options = [
    ['Host an event', 'Open your office, studio or lab for a VCC session.'],
    ['Share your tools', 'Offer credits, APIs, software, hardware or access to your product.'],
    ['Bring a challenge', 'Run a workshop or hackathon around a challenge.'],
    ['Fund events and chapters', 'Support local chapters, equipment and the people who keep events running.'],
  ]
  return `
    <section class="container hero inner-hero company-hero">
      <div>
        <h1>Partner with<br><span class="green-text">VCC</span></h1>
        <p class="hero-lead">Host an event, give people access to your tools, or fund a local chapter.</p>
        ${button(emailHref('Partnering with VCC'), 'Discuss a partnership')}
      </div>
      <div class="company-art">
        <img src="/assets/for-companies/companies-team-building.webp" alt="Participants collaborating over a laptop at a VCC workshop" width="500" height="512" loading="eager">
        ${mascot}
      </div>
    </section>
    <section class="container company-facts" aria-label="Community facts">
      <div class="impact-stats">
        <div><strong>5,000+</strong><span>people in the collective</span></div>
        <div><strong>10+</strong><span>countries</span></div>
        <div><strong>70%+</strong><span>without traditional coding experience</span></div>
      </div>
    </section>
    <div class="container">${partners()}</div>
    <section class="section container">
      ${sectionHead('Ways to contribute')}
      <div class="partnership-options">
        ${options.map(([title, body]) => `<article><div><h3>${title}</h3><p>${body}</p></div></article>`).join('')}
      </div>
    </section>
    <section class="section container company-return">
      <h2>What you get</h2>
      <div>
        <ul class="benefits">
          <li>Hear directly from people trying your tools.</li>
          <li>See what people make with them.</li>
          <li>Meet potential users and collaborators.</li>
        </ul>
        ${button(emailHref('Partnering with VCC'), 'Discuss a partnership')}
      </div>
    </section>`
}

function events(): string {
  const schedule = [
    ['19:00', 'Round 1: Build'],
    ['19:45', 'Break'],
    ['20:00', 'Round 2: Keep building'],
    ['20:30', 'Optional demos'],
    ['20:50', 'Hang out'],
  ]
  return `
    <section class="container hero events-hero">
      <div>
        <h1>Find an <span class="green-text">event</span></h1>
        <p class="hero-lead">Check the organiser’s listings for the latest dates and availability.</p>
      </div>
      <div class="events-mascot" aria-hidden="true">${mascot}</div>
    </section>
    <section class="container chapter-section" id="communities" aria-label="Local event listings">
      <div class="chapter-grid">
        ${chapters.map((chapter, index) => `
          <article class="chapter chapter--${index}">
            <div class="chapter-top"><span class="micro-label">${escapeHtml(chapter.country)}</span><span class="platform">${chapter.platform}</span></div>
            <h2>${escapeHtml(chapter.city)}</h2>
            ${button(chapter.href, index === 0 ? 'View London events' : 'View European events', 'light')}
          </article>`).join('')}
      </div>
    </section>
    <section class="section container">${figure(images.social, 'photo--wide')}</section>
    <section class="section container">
      <div class="level-panel">
        <div><h2>Choose your level</h2><p>Check the level on your event listing. You’re welcome to join at any level.</p></div>
        <div class="level-list">
          <article><span class="level-dot level-dot--one" aria-hidden="true"></span><div><h3>Beginner</h3><p>No previous vibe coding experience needed.</p></div></article>
          <article><span class="level-dot level-dot--two" aria-hidden="true"></span><div><h3>Intermediate</h3><p>Some experience experimenting with AI.</p></div></article>
          <article><span class="level-dot level-dot--three" aria-hidden="true"></span><div><h3>Advanced</h3><p>For people with a coding background.</p></div></article>
        </div>
      </div>
    </section>
    <section class="section container evening">
      <div><h2>A typical evening</h2><p class="small-copy">This is an example schedule. Check your event listing for its exact timings.</p></div>
      <ol class="schedule">
        ${schedule.map(([time, title]) => `<li><span class="schedule-time">${time}</span><div><h3>${title}</h3></div></li>`).join('')}
      </ol>
    </section>
    ${faqs(attendanceFAQs)}`
}

export function renderInclude(name: string, page: PageId): string {
  if (name === 'shared:header') return header(page)
  if (name === 'shared:footer') return footer()
  if (name === 'page:body') {
    return page === 'home' ? home() : page === 'about' ? about() : page === 'companies' ? companies() : events()
  }
  throw new Error('Unknown HTML include: ' + name)
}
