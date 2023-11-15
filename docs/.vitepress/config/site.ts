import type { DefaultTheme } from 'vitepress'

const Guides: DefaultTheme.NavItemWithLink[] = [
  { text: 'Getting Started', link: '/guide/' }
]

const SidebarComponents: DefaultTheme.NavItemWithLink[] = [
  { text: 'Overview', link: '/components/' },
  { text: 'Button', link: '/components/button' },
  { text: 'Space', link: '/components/space' },
  { text: 'Popup', link: '/components/popup' }
]

const SidebarGuide: DefaultTheme.SidebarItem[] = [
  {
    text: 'Guide',
    items: Guides
  },
  {
    text: 'Components',
    items: SidebarComponents
  }
]

const siteConfig: DefaultTheme.Config = {
  logo: '/logo.png',
  nav: [
    { text: 'Guide', link: '/guide/' },
    { text: 'Components', link: '/components/' },
    {
      text: 'Playground',
      link: 'https://kythuen.gitee.io/white-block-playground'
    },
    { text: 'Themes', link: '/themes' }
  ],
  sidebar: {
    '/guide/': SidebarGuide,
    '/components/': SidebarGuide
  },
  socialLinks: [
    {
      icon: 'github',
      link: 'https://github.com/Kythuen/white-block'
    }
  ]
}

export default siteConfig
