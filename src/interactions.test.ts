import { beforeEach, describe, expect, it } from 'vitest'
import { initInteractions } from './interactions'
beforeEach(() => {
  document.body.innerHTML = '<details class="mobile-menu"><summary>Menu</summary><nav><a href="/about/">About</a></nav></details><button id="outside">Elsewhere</button>'
})
describe('mobile disclosure navigation', () => {
  it('closes on Escape and returns focus to the trigger', () => {
    const dispose = initInteractions()
    const menu = document.querySelector('details')!
    menu.open = true
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(menu.open).toBe(false)
    expect(document.activeElement).toBe(menu.querySelector('summary'))
    dispose()
  })
  it('closes when a navigation link or outside element is clicked', () => {
    const dispose = initInteractions()
    const menu = document.querySelector('details')!
    menu.open = true
    menu.querySelector('a')!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(menu.open).toBe(false)
    menu.open = true
    document.getElementById('outside')!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(menu.open).toBe(false)
    dispose()
  })
  it('removes listeners during cleanup', () => {
    const dispose = initInteractions()
    dispose()
    const menu = document.querySelector('details')!
    menu.open = true
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(menu.open).toBe(true)
  })
  it('is safe on pages without the menu', () => {
    document.body.innerHTML = ''
    expect(() => initInteractions()()).not.toThrow()
  })

  it('progressively enhances content groups and removes its root state on cleanup', () => {
    document.body.innerHTML = '<section class="project-grid"><article>One</article><article>Two</article></section>'
    const dispose = initInteractions()
    const grid = document.querySelector<HTMLElement>('.project-grid')!

    expect(document.documentElement.classList.contains('motion-ready')).toBe(true)
    expect(grid.dataset.reveal).toBe('list')
    expect(grid.firstElementChild?.getAttribute('style')).toContain('--reveal-order: 0')

    dispose()
    expect(document.documentElement.classList.contains('motion-ready')).toBe(false)
  })
})
