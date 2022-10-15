import { Articles } from '../lib/types'
import { Node } from '../lib/xml'
import { links } from '../lib/common'
import { pipe } from 'fpts/function'
import { values } from 'fpts/object'
import { map } from 'fpts/iter'
import { alphabetically } from 'fpts/iter'
import { unique } from 'fpts/array'

export default (xs: Articles): Node<'nav', {}, any> => [
	'nav',
	{},
	[
		...links,
		['a', { class: 'active', href: '#' }, ['all']],
		...pipe(
			xs,
			values,
			map(x => x[1]['tag']),
			unique,
			alphabetically,
			map(x => ['a', { href: '#'+x }, [x]]),
		)
	]
]
