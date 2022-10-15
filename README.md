# ts-blog

## Dependencies

- `ts-node`
- `npm`
- `node.js`

## installation

Run `npm i`

## Usage

Put posts in `posts`. Posts are short notes (like tweets) or longform articles.

Put pages in `pages`. Pages are like notes, but they aren't listed in the main index.

Put rendering templates in `fragments`. The important ones are:

- `post.ts` for rendering standalone posts
- `page.ts` for rendering standalone pages
- `rss.ts` for rendering your rss feed
- `frontpage.ts` for rendering your frontpage
