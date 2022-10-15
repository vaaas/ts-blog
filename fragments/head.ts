import { AnyNode, Node } from '../lib/xml'
import { title as ctitle, base, author } from '../lib/common'

function meta(name: string, content: string): Node<'meta', { name: string, content: string }, []> {
	return ['meta', { name, content }, []]
}

export default function Head(title: string, xs: AnyNode[]): Node<'head', {}, any> {
	return ['head', {}, [
		['meta', { charset: 'utf8' }, {}],
		meta('viewport', 'width=device-width, initial-scale=1.0'),
		meta('url', base),
		meta('author', author),
		meta('description', ctitle),
		['link', { rel: 'stylesheet', href: '/style.css'}, {}],
		['link', { rel: 'icon', href: '/favicon.ico' }, {}],
		['link', { rel: 'alternate', href: '/rss.xml', type: 'application/rss+xml' }, {}],
		['title', {}, [title]],
		...xs,
	]]
}
