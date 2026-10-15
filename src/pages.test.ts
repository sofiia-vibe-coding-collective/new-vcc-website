import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { renderInclude } from './render'
import { attendanceFAQs, chapters, emailHref, navigation, pageMeta, team, testimonials } from './site'

describe('four page static rendering', () => {
  it.each(navigation)('renders $label with one H1, complete assets, and no draft links', (item) => {
    const body = renderInclude('page:body', item.id)
    document.body.innerHTML = body
    expect(document.querySelectorAll('h1')).toHaveLength(1)
    expect(document.querySelectorAll('.faq')).toHaveLength(item.id === 'events' ? 5 : 0)
    expect(body).not.toMatch(/\?tab=|Insert 2-3|\[X\]|xyz events|data:image/)
    for (const image of document.querySelectorAll('img')) {
      expect(existsSync(resolve('public', image.getAttribute('src')!.slice(1)))).toBe(true)
      expect(image.hasAttribute('alt')).toBe(true)
      expect(image.hasAttribute('width')).toBe(true)
      expect(image.hasAttribute('height')).toBe(true)
    }
    for (const figure of document.querySelectorAll('figure.photo')) {
      expect(figure.querySelector('figcaption')?.textContent).toBe('Illustrative image')
    }
    expect(pageMeta[item.id].title).toContain('Vibe Coding Collective')
    expect(document.querySelector('.eyebrow,.collage-note,.image-sticker,.photo-sticker,.option-number,.format-number')).toBeNull()
  })
  it.each(navigation)('marks the correct active link on $label', (item) => {
    document.body.innerHTML = renderInclude('shared:header', item.id)
    const current = document.querySelectorAll('[aria-current="page"]')
    expect(current).toHaveLength(2)
    for (const link of current) expect(link.getAttribute('href')).toBe(item.href)
    expect(document.querySelector('.mobile-menu')?.tagName).toBe('DETAILS')
  })
  it('consolidates the five practical attendance questions on Events', () => {
    document.body.innerHTML = renderInclude('page:body', 'events')
    const questions = Array.from(document.querySelectorAll('.faq summary'), el => el.textContent?.replace('+', '').trim())
    expect(questions).toEqual(attendanceFAQs.map(faq => faq.question))
    expect(attendanceFAQs).toHaveLength(5)
    expect(attendanceFAQs.find(faq => faq.question === 'What should I bring?')?.answer).toBe('A laptop.')
    expect(attendanceFAQs.find(faq => faq.question === 'Is there a cost?')?.answer).toContain('Check the individual listing')
    expect(document.querySelectorAll('.faq-list details')).toHaveLength(5)
  })
  it('keeps one complete attributed testimonial on Home and the map on About', () => {
    const home = renderInclude('page:body', 'home')
    document.body.innerHTML = home
    expect(document.querySelectorAll('blockquote')).toHaveLength(1)
    expect(document.querySelector('blockquote')?.textContent).toContain(testimonials[0].quote)
    expect(document.querySelector('.single-quote figcaption')?.textContent).toContain(testimonials[0].name)
    expect(home).not.toContain('city-leaders-map')
    expect(renderInclude('page:body', 'about')).toContain('city-leaders-map')
    expect(renderInclude('page:body', 'companies')).not.toContain('<blockquote>')
  })
  it('retains the team and a single volunteer action', () => {
    document.body.innerHTML = renderInclude('page:body', 'about')
    expect(document.querySelectorAll('.team-member')).toHaveLength(team.length)
    expect(document.querySelectorAll('.founder')).toHaveLength(2)
    expect(document.querySelectorAll('a[href*="Volunteering%20with%20VCC"]')).toHaveLength(1)
  })
  it('uses organiser destinations and qualifies the timetable as an example', () => {
    const html = renderInclude('page:body', 'events')
    for (const chapter of chapters) expect(html).toContain(chapter.href)
    expect(html).not.toContain('luma.com/bhfumnou')
    expect(html).toContain('example schedule')
    expect(html).toContain('Check the organiser')
  })
  it('creates correctly encoded contextual email links', () => {
    expect(emailHref('Tools & space')).toBe('mailto:partnership@vibecoders.global?subject=Tools%20%26%20space')
  })
  it('provides readable community names alongside the map', () => {
    document.body.innerHTML = renderInclude('page:body', 'about')
    expect(document.querySelector('.community-list > p')?.textContent).toBe('Communities include')
    expect(Array.from(document.querySelectorAll('.community-list li'), item => item.textContent)).toEqual([
      'London', 'Berlin', 'Delft', 'Kyiv', 'Osaka', 'Lisbon', 'New York',
    ])
    expect(document.querySelector('.map-panel img')).not.toBeNull()
  })
  it('prioritises partnership enquiries on Companies', () => {
    document.body.innerHTML = renderInclude('shared:header', 'companies') + renderInclude('page:body', 'companies')
    const heroAction = document.querySelector<HTMLAnchorElement>('.company-hero .button')
    expect(heroAction?.textContent).toBe('Discuss a partnership')
    expect(heroAction?.getAttribute('href')).toBe(emailHref('Partnering with VCC'))
    expect(heroAction?.classList.contains('button--dark')).toBe(true)
    expect(document.querySelector('.nav-actions .button')?.classList.contains('button--light')).toBe(true)
    expect(document.querySelector('.company-return .button')?.getAttribute('href')).toBe(heroAction?.getAttribute('href'))
    document.body.innerHTML = renderInclude('shared:header', 'home')
    expect(document.querySelector('.nav-actions .button')?.classList.contains('button--dark')).toBe(true)
  })
  it('distinguishes organiser links while preserving their destinations', () => {
    document.body.innerHTML = renderInclude('page:body', 'events')
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.chapter .button'))
    expect(links.map(link => link.textContent)).toEqual(['View London events', 'View European events'])
    expect(links.map(link => link.getAttribute('href'))).toEqual(chapters.map(chapter => chapter.href))
  })
  it('rejects missing include markers', () => {
    expect(() => renderInclude('missing', 'home')).toThrow('Unknown HTML include')
  })
})
