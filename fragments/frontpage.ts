import { by, sort } from 'fpts/iter'
import { map } from 'fpts/array'
import { entries } from 'fpts/object'
import { pipe } from 'fpts/function'
import { AnyNode, Node } from '../lib/xml'
import { title } from '../lib/common'
import { Articles } from '../lib/types'
import nav from './nav'
import header from './header'
import article from './article'
import Head from './head'

export default function Frontpage(articles: Articles): Node<'html', { lang: string }, AnyNode[]> {
	return ['html', { lang: 'en-gb' }, [
		Head(title, [['script', { src: '/script.js', 'defer': ''}, [' ']]]),
		['body', {}, [
			header,
			nav(articles),
			[
				'main',
				{},
				pipe(
					articles,
					entries,
					sort(by(x => parseFloat(x[1][1].timestamp))),
					x => x.reverse(),
					map(article)
				)
			],
		]]
	]]
}
