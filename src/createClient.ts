import { defaultRequestHandler } from './defaultRequestHandler'
import {
	ClientConfig,
	Endpoint as TEndpoint,
	FilteredEndpoints,
	GET,
	POST,
	RequestConfig,
	FilteredPaths,
} from './types'

export function createClient<T extends TEndpoint = TEndpoint>(
	config: ClientConfig,
) {
	const { baseUrl, requestHandler = defaultRequestHandler } = config

	return {
		request: <
			Method extends T['method'],
			Path extends FilteredPaths<T, Method>,
			Endpoint extends FilteredEndpoints<T, Method, Path>,
		>(
			method: Method,
			path: Path,
			requestConfig: RequestConfig<Endpoint>,
		) =>
			requestHandler<Endpoint>({
				method,
				path,
				baseUrl,
				headers: config.headers?.(),
				requestConfig,
			}),

		get: <
			Path extends FilteredPaths<T, GET>,
			Endpoint extends FilteredEndpoints<T, GET, Path>,
		>(
			path: Path,
			requestConfig: RequestConfig<Endpoint>,
		) =>
			requestHandler<Endpoint>({
				method: GET,
				path,
				baseUrl,
				headers: config.headers?.(),
				requestConfig,
			}),

		post: <
			Path extends FilteredPaths<T, POST>,
			Endpoint extends FilteredEndpoints<T, POST, Path>,
		>(
			path: Path,
			requestConfig: RequestConfig<Endpoint>,
		) =>
			requestHandler<Endpoint>({
				method: POST,
				path,
				baseUrl,
				headers: config.headers?.(),
				requestConfig,
			}),
	}
}
