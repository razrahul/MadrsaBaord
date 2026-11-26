import { createElement, type ComponentType, type SVGProps } from 'react'

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>

function makeSocialIcon(paths: string[]): IconComponent {
  return function SocialIcon({
    size = 14,
    ...props
  }: SVGProps<SVGSVGElement> & { size?: number | string }) {
    return createElement(
      'svg',
      {
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        'aria-hidden': true,
        ...props,
      },
      ...paths.map((d, i) => createElement('path', { key: i, d }))
    )
  }
}

const FacebookIcon = makeSocialIcon([
  'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
])

const TwitterIcon = makeSocialIcon([
  'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z',
])

const YoutubeIcon = makeSocialIcon([
  'M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17',
  'm10 15 5-3-5-3v6Z',
])

export interface SocialLink {
  id: string
  label: string
  icon: IconComponent
  href: string
}

export const siteContact = {
  emails: ['bsmebpatna1@gmail.com', 'help.bsemb@gmail.com'],
  phone: '+91-0612-2257860',
  phoneHref: 'tel:+9106122257860',
  hours: 'Mon–Fri: 9:30 am – 6:00 pm',
  address: '5, Vidyapati Marg, Patna, Bihar — 800001',
  socials: [
    { id: 'facebook', label: 'Facebook', icon: FacebookIcon, href: '#' },
    { id: 'twitter', label: 'Twitter', icon: TwitterIcon, href: '#' },
    { id: 'youtube', label: 'YouTube', icon: YoutubeIcon, href: '#' },
  ] satisfies SocialLink[],
} as const
