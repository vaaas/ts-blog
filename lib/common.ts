import { parse, Node } from './xml'

export const title = 'Your title'

export const description = parse(`<p>A blurb</p>`)[2]

export const links: Array<Node<'a', { href: string }, [string]>> =  [
	['a', { href: '/onelink.html' }, ['One Link']],
	['a', { href: '/twolink.html' }, ['Two Link']]
]

export const base = 'https://yoursite.neocities.org'

export const author = 'Your name'

export const email = 'your.email@example.com'
