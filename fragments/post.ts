import { title, email } from '../lib/common';
import { Article } from '../lib/types';
import { ymd } from '../lib/util';
import { AnyNode, Node, inner_text } from '../lib/xml';
import { query, type } from '../lib/query'
import Head from './head';

export default function Post(article: Article): Node<'html', { lang: string }, AnyNode[]> {
	const h1 = inner_text(query(type('h1'))(article)!)
	return ['html', { lang: 'en-gb' }, [
		Head(`${h1} - ${title}`, [
			['script', { src: '/script.js', 'defer': '' }, [' ']]
		]),
		['body', { class: 'post' }, [
			['header', {}, [
				['a', { href: '/' }, [title]],
				' — ',
				ymd(new Date(parseFloat(article[1].timestamp) * 1000)),
			]],
			['main', {}, article[2]],
			['footer', {}, [
				'Reply to this article via ',
				['a', { href: mailto(email, h1) }, ['email']],
				'.',
			]]
		]]
	]]
}

const mailto = (email: string, title: string) =>
	`mailto:${email}?subject=${encodeURIComponent(title)}`
