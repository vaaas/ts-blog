import type { Node } from './xml'
export type Maybe<T> = null | undefined | T
export type Article = Node<
	'article',
	{ timestamp: string, tag: string },
	Array<string | Node<any, any, any>>
>
export type Articles = Record<string, Article>
