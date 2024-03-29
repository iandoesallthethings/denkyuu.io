import * as S3 from '$db/S3'

export const prerender = true

export async function GET({ params, fetch }) {
	const slug = params.url

	return S3.getCache(slug, fetch)
}
