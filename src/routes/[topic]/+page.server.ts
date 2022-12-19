import { env } from '$env/dynamic/private';

const TOPIC_ALIASES = {
	'nature': '6sMVjTLSkeQ'
}

export async function load ({ params, setHeaders }) {
	let url = `https://api.unsplash.com/photos/random?client_id=${env.UNSPLASH_ACCESS_KEY}`;
	url += '&count=30';

	url += `&topics=${TOPIC_ALIASES[params.topic] || params.topic}`;
	const res = await fetch(url)

	setHeaders({
    'cache-control': `max-age=${24*60*60}`
  });

	return {
		images: await res.json()
	}
}
