import { RequestHandler } from './types'
import { createURL } from './util'

export const defaultRequestHandler: RequestHandler = async ({
	baseUrl,
	method,
	path,
	headers,
	requestConfig,
}) => {
	const url = createURL({
		baseUrl,
		path,
		params: requestConfig.params,
		query: requestConfig.query,
	})

	const body = requestConfig.body && JSON.stringify(requestConfig.body)

	const response = await fetch(url, {
		headers,
		method,
		body,
	})

	const content = await response.json()

	if (response.ok) {
		return content
	}

	return content
}
