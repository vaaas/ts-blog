import { title, email } from '../lib/common';
import { AnyNode, Node, inner_text } from '../lib/xml';
import { query, type } from '../lib/query'
import Head from './head';

export default function Page(page: AnyNode): Node<'html', { lang: string }, AnyNode[]> {
	const page_title = inner_text(query(type('h1'))(page)!)
	return ['html', { lang: 'en-gb' }, [
		Head(title, [['script', { src: '/script.js', 'defer': ''}, [' ']]]),
		['body', { class: 'post' }, [
			['header', {}, [
				['a', { href: '/' }, [title]]
			]],
			['main', {}, page[2]],
			['footer', {}, [
				'Reply to this post via ',
				['a', { href: `mailto:${email}?subject=${encodeURIComponent(page_title)}`}, ['email']],
				'.',
			]]
		]]
	]]
}
