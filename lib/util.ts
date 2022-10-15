import { query, type } from './query'
import { AnyNode } from './xml'

export const ymd = (x: Date): string => {
	return [
		x.getFullYear() + '',
		(x.getMonth() + 1 + '').padStart(2, '0'),
		(x.getDate() + '').padStart(2, '0')
	].join('-')
}

export const rfc = (x: Date): string => {
	return x.toUTCString()
}

export const is_long = (x: AnyNode) => Boolean(query(type('h1'))(x))

const digits = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_'
function to_base(n: number, base: number): string {
	if (n === 0) return '0'
	const neg = n < 0
	let x = Math.abs(n)
	const xs = []
	for (let x = Math.abs(n); x > 0; x = Math.floor(x/base))
		xs.push(digits[x % base])
	return (neg ? '-1' : '') + xs.reverse().join('')
}

const int_div = (a: number, b: number) => Math.floor(a / b)

export const make_id = (x: string): string =>
	to_base(int_div(parseFloat(x) - 1483228800, 60), 64)
