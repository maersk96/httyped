import { Parameters, Path } from './types'

interface URLOptions<T extends Path> {
	baseUrl: string
	path: T
	params?: Parameters<T>
	query?: object
}

export function createURL<T extends Path>(options: URLOptions<T>): URL {
	const path = options.params
		? replacePathParams(options.path, options.params)
		: options.path
	const url = new URL(path, options.baseUrl)
	url.search = new URLSearchParams(
		Object.entries(options.query || {})
			.filter(([_, value]) => value !== null && value !== undefined)
			.map(([key, value]) => [key, String(value)]),
	).toString()
	return url
}

function replacePathParams<T extends Path>(
	path: T,
	params: Parameters<T>,
): string {
	return Object.entries(params).reduce(
		(p, [key, value]) => p.replace(`{${key}}`, String(value)),
		String(path),
	)
}
