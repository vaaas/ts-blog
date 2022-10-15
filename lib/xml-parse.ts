import { mapKeys } from 'fpts/object'
import { XMLParser } from 'fast-xml-parser'
import { AnyNode } from './xml'

type FXPTextNode = { '#text': string }

type FXPAttributes = { ':@'?: Record<string, string> }

type FXPNode = Record<string, Array<FXPNode | FXPTextNode>> & FXPAttributes;

function is_text_node(x: FXPNode | FXPTextNode): x is FXPTextNode {
	return '#text' in x
}

function children<X extends FXPNode, K extends keyof X>(x: X, k: K): Array<FXPNode | FXPTextNode> {
	return x[k]!
}

function tagName<X extends FXPNode, K extends keyof X>(x: X): K {
	for (const k in x)
		if (k === '#text') continue
		else if (k === ':@') continue
		else return (k as any as K)
	return '' as K
}

function attributes(x: FXPNode): FXPAttributes {
	if (!(':@' in x)) return {}
	return mapKeys(x => x.slice(2))(x[':@']!)
}

function to_node(x: FXPNode|FXPTextNode): AnyNode | string {
	if (is_text_node(x))
		return x['#text'].replace(/\s(\s+)/, ' ')
	const tag = tagName(x)
	const attrs = attributes(x)
	const cs = children(x, tag)
	return [ tag, attrs, cs.map(to_node) ]
}

const parser = new XMLParser({
	trimValues: false,
	preserveOrder: true,
	ignoreAttributes: false,
	htmlEntities: true,
})

export function parse(x: string): AnyNode | string {
	const result: FXPNode[] = parser.parse(x)
	if (!result[0]) return ''
	return to_node(result[0])
}
