import { title, base } from '../lib/common'
import { rfc } from '../lib/util'
import { Articles } from '../lib/types'
import { Node } from '../lib/xml'
import rssitem from './rssitem'
import { entries } from 'fpts/object'

export default function RSS(articles: Articles): Node<'rss', Record<string, string>, Node<any, any, any>[]> {
	return ['rss', {
		version: '2.0',
		'xmlns:atom': 'http://www.w3.org/2005/Atom',
	}, [
		['channel', {}, [
			['title', {}, [title]],
			['link', {}, [base]],
			['atom:link', {
				href: base + '/rss.xml',
				rel: 'self',
				type: 'application/rss+xml',
			}, {}],
			['description', {}, [title]],
			['pubDate', {}, [ rfc(new Date()) ]],
			['language', {}, ['en-gb']],
			['ttl', {}, ['1140']],
			...entries(articles).map(rssitem)
		]]
	]]
}
