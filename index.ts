import * as fs from 'fs'
import { Unary, Binary } from 'fpts/data'
import { pipe } from 'fpts/function'
import { filter, map2, eachWithKeys, ofK } from 'fpts/object'
import { AnyNode, parse, serialise } from './lib/xml'
import Frontpage from './fragments/frontpage'
import RSS from './fragments/rss'
import type { Article, Articles } from './lib/types'
import { is_long } from './lib/util'
import { basename } from 'path'
import Post from './fragments/post'
import Page from './fragments/page'

function load_posts(dir: string): Articles {
	return pipe(
		fs.readdirSync(dir),
		ofK(x => pipe(
			fs.readFileSync(`${dir}/${x}`, { encoding: 'utf-8'}),
			parse,
			validate,
		)),
	)
}

function load_pages(dir: string): Record<string, AnyNode> {
	return pipe(
		fs.readdirSync(dir),
		ofK(x => pipe(
			fs.readFileSync(`${dir}/${x}`, { encoding: 'utf-8'}),
			parse,
		)),
	) as any
}

const write: Binary<string, string, void> = path => buffer => {
	fs.writeFileSync(path, buffer)
	console.log('wrote', path)
}

const pub: Unary<string, string> = x => `public/${x}`

function validate(x: unknown): Article {
	if (
		Array.isArray(x)
		&& Array.isArray(x[2])
		&& x[1] instanceof Object
		&& typeof x[1].timestamp === 'string'
		&& typeof x[1].tag === 'string'
	)
		return x as Article
	else {
		console.error(x)
		throw new Error('invalid post')
	}
}

const doctype = (x: string) => '<!DOCTYPE html>' + x

function main() {
	const now = Date.now()
	console.log('beginning build')
	const posts = load_posts('posts')
	const pages = load_pages('pages')

	pipe(
		posts,
		Frontpage,
		serialise,
		doctype,
		write(pub('index.html')),
	)

	pipe(
		posts,
		RSS,
		serialise,
		doctype,
		write(pub('rss.xml')),
	)

	pipe(
		posts,
		filter(is_long),
		map2(x => pub(basename(x)))(x => doctype(serialise(Post(x!)))),
		eachWithKeys(write),
	)

	pipe(
		pages,
		map2(x => pub(basename(x)))(x => doctype(serialise(Page(x)))),
		eachWithKeys(write),
	)

	console.log('finished in', Date.now() - now, 'milliseconds')
}

main()
