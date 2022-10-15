import { Unary } from 'fpts/data'
import { filter, map, join } from 'fpts/iter'
import { compose } from 'fpts/function'
import * as array from 'fpts/array'
import { len, foldlWithKeys } from 'fpts/object'

export type Node<
	A extends string,
	B extends Record<string, string>,
	C extends Array<string | AnyNode>,
> = [ A, B, C ]

export type AnyNode = Node<any, any, any>

export { parse } from './xml-parse'

export function serialise(x: AnyNode): string {
	if (typeof x === 'string')
		return escape(x)
	const parts = ['<', x[0]]
	if (len(x[1]) > 0)
		parts.push(foldlWithKeys(a => k => v => a += ` ${k}="${v}"`, '')(x[1]))
	if (x[2].length > 0) {
		parts.push('>')
		parts.push(...x[2].map(serialise))
		parts.push('</', x[0], '>')
	} else
		parts.push('/>')

	return parts.join('')
}

export function* walk(x: AnyNode): Iterable<AnyNode | string> {
	for (const c of x[2]) {
		yield c;
		if (typeof c === 'object')
			yield* walk(c);
	}
}

export const inner_text: Unary<AnyNode, string> = compose(
	walk,
	filter(x => typeof x === 'string'),
	array.of,
	x => x.join(' '),
)

export const escape: Unary<string, string> = compose(
	map(x => {
		switch (x) {
			case '<': return '&lt;'
			case '>': return '&gt;'
			case '&': return '&amp;'
			default: return x;
		}
	}),
	join,
)

export function* flatten(x: AnyNode|string): Iterable<AnyNode|string> {
	yield x
	if (typeof x === 'string') return
	for (const c of x[2])
		yield* flatten(c)
}
