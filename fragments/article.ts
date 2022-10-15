import { Article } from '../lib/types'
import { is_long, make_id, ymd } from '../lib/util'
import { query, type } from '../lib/query'
import { Node } from '../lib/xml'
import { Option } from 'fpts/option'

export default function article([name, node]: [string, Article]) {
	if (typeof node === 'string')
		throw new Error('article cannot be string')
	return is_long(node)
		? long_article(name, node)
		: short_article(node)
}

function long_article(name: string, node: Article): Node<'article', { t: string, id: string }, any> {
	const props = node[1]
	const h1 = query(type('h1'))(node) as Option<Node<'h1', {}, any>>
	const p = query(type('p'))(node) as Option<Node<'p', {}, any>>
	if (!h1 || !p)
		throw new Error('article is long but did not find initial h1 or p')
	return ['article', {
		t: props.tag,
		id: make_id(props.timestamp),
	}, [
		['time', {}, [ymd(new Date(parseFloat(props.timestamp!) * 1_000))]],
		['a', { href: name }, [h1]],
		...p[2],
	]]
}

function short_article(node: Article): Node<'article', { t: string, id: string }, any> {
	const props = node[1]
	return ['article', {
		t: props.tag,
		id: make_id(props.timestamp),
	}, [
		['time', {}, [ymd(new Date(parseFloat(props.timestamp!) * 1_000))]],
		...node[2]
	]]
}
