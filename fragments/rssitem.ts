import { author, base } from '../lib/common'
import { Article } from '../lib/types'
import { is_long, make_id, rfc } from '../lib/util'
import { query, type } from '../lib/query'
import { Node, serialise, escape, inner_text } from '../lib/xml'
import { pipe } from 'fpts/function'

export default function make_item([name, node]: [string, Article]): Node<'item', {}, any> {
	if (typeof node === 'string')
		throw new Error('articles cannot be strings');
	const props = node[1]
	const timestamp = props.timestamp
	const guid = is_long(node)
		? make_id(timestamp)
		: base + '/' + name
	const h1 = query(type('h1'))(node)
	const title = h1
		? inner_text(h1)
		: `New post by ${author} (${guid})`
	const description = pipe(
		(function(): Node<'p', {}, any> {
			if (is_long(node)) {
				const p = query(type('p'))(node)
				if (!p || !p[2] || !h1 || !h1[2] || typeof p === 'string' || typeof h1 === 'string')
					throw new Error('Invalid post ' + name)
				return ['p', {}, [
					['h1', {}, [
						['a', { href: guid }, h1[2]]
					]],
					...p[2],
				]]
			} else
				return ['p', {}, node[2]];
		})(),
		serialise,
		x => x.slice('<p>'.length, x.length - '</p>'.length),
		escape,
	)
	return ['item', {}, [
		['title', {}, [ title ]],
		['guid', {}, [ base + '/' + guid ]],
		['pubDate', {}, [ rfc(new Date(parseFloat(timestamp) * 1_000)) ]],
		['link', {}, [ base + '/' + guid ]],
		['description', {}, [ description ]],
	]]
}
