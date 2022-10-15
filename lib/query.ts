import { AnyNode, flatten } from './xml'
import type { Unary } from 'fpts/data'
import { Maybe } from './types'
import { find, filter } from 'fpts/iter'
import { pipe } from 'fpts/function'

export function query(f: Unary<AnyNode, boolean>): (x: AnyNode | string) => Maybe<AnyNode> {
	return function(x) {
		if (typeof x === 'string')
			return undefined;
		return pipe(
			x,
			flatten,
			filter((x): x is AnyNode => typeof x !== 'string'),
			find(f),
		)
	}
}

export function type(x: string): Unary<AnyNode | string, boolean> {
	return function (y) {
		return Array.isArray(y) && y[0] === x
	}
}
