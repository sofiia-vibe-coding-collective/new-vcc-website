const revealPlan = {
  block: [
    '.section-head',
    '.partners > .micro-label',
    '.formats-panel',
    '.single-quote',
    '.manifesto',
    '.principles-panel > .section-head',
    '.map-panel',
    '.volunteer-row',
    '.company-return',
    '.photo--wide',
    '.level-panel > div:first-child',
    '.evening > div:first-child',
    '.faq-intro',
    '.footer-art',
    '.footer-links',
    '.footer-bottom',
  ],
  list: [
    '.proof-strip',
    '.partner-logos',
    '.project-grid',
    '.principles',
    '.founders',
    '.team-grid',
    '.impact-stats',
    '.partnership-options',
    '.chapter-grid',
    '.level-list',
    '.schedule',
    '.faq-list',
  ],
} as const

function prepareRevealTargets(doc: Document): HTMLElement[] {
  const targets = new Set<HTMLElement>()

  for (const [kind, selectors] of Object.entries(revealPlan)) {
    for (const selector of selectors) {
      for (const element of doc.querySelectorAll<HTMLElement>(selector)) {
        if (targets.has(element)) continue
        element.dataset.reveal = kind
        targets.add(element)

        if (kind === 'list') {
          for (const [index, child] of Array.from(element.children).entries()) {
            if (child instanceof HTMLElement) {
              child.style.setProperty('--reveal-order', String(index % 4))
            }
          }
        }
      }
    }
  }

  return Array.from(targets)
}

/** Enhances native navigation and adds one-shot, progressively-enhanced reveals. */
export function initInteractions(doc: Document = document): () => void {
  const root = doc.documentElement
  const view = doc.defaultView
  const menu = doc.querySelector<HTMLDetailsElement>('.mobile-menu')
  const trigger = menu?.querySelector<HTMLElement>('summary')
  const revealTargets = prepareRevealTargets(doc)
  const prefersReducedMotion = view?.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  let observer: IntersectionObserver | undefined

  root.classList.add('motion-ready')

  if (prefersReducedMotion || !view?.IntersectionObserver) {
    for (const target of revealTargets) target.classList.add('is-revealed')
  } else {
    observer = new view.IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-revealed')
        observer?.unobserve(entry.target)
      }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 })

    for (const target of revealTargets) observer.observe(target)
  }

  const keydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && menu?.open) {
      menu.open = false
      trigger?.focus()
    }
  }
  const click = (event: MouseEvent) => {
    const target = event.target
    if (!menu || !(target instanceof Element)) return
    if (!menu.contains(target) || target.closest('a')) menu.open = false
  }

  doc.addEventListener('keydown', keydown)
  doc.addEventListener('click', click)

  return () => {
    observer?.disconnect()
    doc.removeEventListener('keydown', keydown)
    doc.removeEventListener('click', click)
    root.classList.remove('motion-ready')
  }
}
