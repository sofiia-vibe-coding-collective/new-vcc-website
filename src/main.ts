import './styles/fonts.css'
import './styles/site.css'
import './styles/interactions.css'
import { initInteractions } from './interactions'
export function getAppRoot(): HTMLElement | null {
  return document.querySelector<HTMLElement>('#app')
}
if (import.meta.env.MODE !== 'test') initInteractions()
