export type PageId = 'home' | 'about' | 'companies' | 'events'
export interface NavItem { id: PageId; label: string; href: string }
export const navigation: NavItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'about', label: 'About', href: '/about/' },
  { id: 'companies', label: 'Companies', href: '/companies/' },
  { id: 'events', label: 'Events', href: '/events/' },
]
export const pageMeta: Record<PageId, { title: string; description: string }> = {
  home: { title: 'Vibe Coding Collective — Make software together', description: 'Meet people in pubs, studios and community spaces to build software with AI. No coding experience needed.' },
  about: { title: 'About — Vibe Coding Collective', description: 'Our purpose, folk software, and the people organising Vibe Coding Collective.' },
  companies: { title: 'Companies — Vibe Coding Collective', description: 'Host VCC events, share your tools or fund local chapters. Find out how to partner with the collective.' },
  events: { title: 'Events — Vibe Coding Collective', description: 'Find VCC events, choose your level, and learn what to bring and what happens at a typical session.' },
}
export function emailHref(subject: string): string {
  return 'mailto:partnership@vibecoders.global?subject=' + encodeURIComponent(subject)
}
export interface ChapterLink { city: string; country: string; href: string; platform: string; description: string }
export const chapters: ChapterLink[] = [
  { city: 'London', country: 'United Kingdom', href: 'https://www.meetup.com/vibe-coding-collective/', platform: 'Meetup', description: 'Where it all started. Find the next gathering and meet the local community.' },
  { city: 'Berlin & Europe', country: 'Germany · Netherlands', href: 'https://www.meetup.com/vibe-coding-collective-eu/', platform: 'Meetup', description: 'Explore community gatherings in Berlin, Delft, Amsterdam, and beyond.' },
]
export interface ImageMeta { src: string; alt: string; width: number; height: number; illustrative?: boolean }
export const images = {
  heroOne: { src: '/assets/hero-header/hero-collage-1.webp', alt: 'A VCC participant sharing a project on his laptop', width: 760, height: 778 },
  heroTwo: { src: '/assets/hero-header/hero-collage-2.webp', alt: 'VCC community members building together', width: 760, height: 760 },
  heroThree: { src: '/assets/hero-header/hero-collage-3.webp', alt: 'A creative moment at a VCC community event', width: 760, height: 778 },
  cafe: { src: '/assets/community/cafe-builders.webp', alt: 'Illustration of friends collaborating on laptops in a warmly lit café', width: 1536, height: 1024, illustrative: true },
  overhead: { src: '/assets/community/overhead-builders.webp', alt: 'Illustration of a group making something together, photographed from above', width: 1024, height: 1280, illustrative: true },
  social: { src: '/assets/community/after-workshop.webp', alt: 'Illustration of friends laughing together after a creative workshop', width: 1536, height: 1024, illustrative: true },
  map: { src: '/assets/for-city-leaders/city-leaders-map.webp', alt: 'World map showing VCC communities including London, Berlin, Delft, Kyiv, Osaka, Lisbon, and New York', width: 1600, height: 500 },
} satisfies Record<string, ImageMeta>
export interface Testimonial { quote: string; name: string; role: string; place: string; image: string }
export const testimonials: Testimonial[] = [
  { quote: 'Thank you for giving me an experience that changed my attitude toward tech!', name: 'Tomoki', role: 'Photographer', place: 'Osaka Pop-up', image: 'tomoki' },
  { quote: "My partner was raving about the vibe coding collective so I popped along last month - it was so inspiring! Turns out I'd been vibe coding for work for aaaages, just didn't know it was a thing 🫣", name: 'Heeezil', role: '3D Artist', place: 'London chapter', image: 'heeezil' },
  { quote: "Coding has always puzzled me, but now it's a lot more accessible, and this community is great for both improving my own skills as well as seeing cool stuff other are doing.", name: 'Christian', role: 'Developer', place: 'London chapter', image: 'christian' },
]
export interface TeamMember { name: string; role: string; image: string }
export const team: TeamMember[] = [
  { name: 'Abhinav', role: 'AI Engineer / Mumbai Lead', image: 'abhinav' },
  { name: 'Erika Tsai', role: 'Product Manager', image: 'erika-tsai' },
  { name: 'Liberatus Fusi', role: 'AI Engineer', image: 'liberatus-fusi' },
  { name: 'Cavan Jude', role: 'Creative Technologist', image: 'cavan-judge' },
  { name: 'Joseph Wan', role: 'Creative Technologist', image: 'joseph-wan' },
  { name: 'Maitri Bhat', role: 'Marketing Strategist', image: 'maitri-bhat' },
  { name: 'Cherry Yeng', role: 'Social Media Expansion', image: 'cherry-feng' },
  { name: 'Eric Lonercan', role: 'Berlin Lead', image: 'eric-lonergan' },
  { name: 'Uvin Withana', role: 'Berlin Lead', image: 'uvin-withana' },
  { name: 'Poppy Astrin', role: 'Delft Lead', image: 'poppy-astrini' },
  { name: 'Luisa von Funcke', role: 'Community Lead', image: 'luisa-von-funcke' },
  { name: 'Elien Groeneveld', role: 'Amsterdam Lead', image: 'flien-groeneveld' },
]
export interface FAQ { question: string; answer: string }

/** Consolidated attendance answers, edited from the supplied Home and Events copy. */
export const attendanceFAQs: FAQ[] = [
  { question: 'Do I need coding experience?', answer: 'No. Beginner sessions are open to people who have never coded. Check the event listing for its level.' },
  { question: 'What should I bring?', answer: 'A laptop.' },
  { question: 'Can I come on my own?', answer: 'Yes. You don’t need to know anyone before you arrive.' },
  { question: 'Is there a cost?', answer: 'Events are generally free. Check the individual listing for any cost.' },
  { question: 'What if I get stuck or don’t finish?', answer: 'Ask someone nearby. There’s no pressure to finish, and you can keep working on your project afterwards.' },
]
