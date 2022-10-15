import { description, title } from '../lib/common'
import { Node } from '../lib/xml'

export default ['header', {}, [
	['div', { class: 'imgtxt' }, [
		['img', {
			src: '/pics/banner.jpg',
			alt: 'Gokou Ruri from Oreimo looking smug',
			width: '640',
			height: '256',
		}, []],
		['h1', {}, [title]],
	]],
	['p', {}, description],
]] as Node<'header', {}, any>
