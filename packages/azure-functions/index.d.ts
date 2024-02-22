import {
	Endpoint,
	Parameters,
	GET,
	PUT,
	POST,
	PATCH,
	DELETE,
} from '@httyped/core'
import type * as AF from '@azure/functions'
import { FunctionResponse, RemoveLeadingSlash } from './util'

declare module '@azure/functions' {
	export namespace app {
		function http<T extends Endpoint>(
			name: string,
			options: httyped.HttpFunctionOptions<T>,
		): void

		function get<T extends Endpoint & { method: GET }>(
			name: string,
			handler: httyped.HttpHandler<T>,
		): void

		function get<T extends Endpoint & { method: GET }>(
			name: string,
			options: httyped.HttpMethodFunctionOptions<T>,
		): void

		function put<T extends Endpoint & { method: PUT }>(
			name: string,
			handler: httyped.HttpHandler<T>,
		): void

		function put<T extends Endpoint & { method: PUT }>(
			name: string,
			options: httyped.HttpMethodFunctionOptions<T>,
		): void

		function post<T extends Endpoint & { method: POST }>(
			name: string,
			handler: httyped.HttpHandler<T>,
		): void

		function post<T extends Endpoint & { method: POST }>(
			name: string,
			options: httyped.HttpMethodFunctionOptions<T>,
		): void

		function patch<T extends Endpoint & { method: PATCH }>(
			name: string,
			handler: httyped.HttpHandler<T>,
		): void

		function patch<T extends Endpoint & { method: PATCH }>(
			name: string,
			options: httyped.HttpMethodFunctionOptions<T>,
		): void

		function deleteRequest<T extends Endpoint & { method: DELETE }>(
			name: string,
			handler: httyped.HttpHandler<T>,
		): void

		function deleteRequest<T extends Endpoint & { method: DELETE }>(
			name: string,
			options: httyped.HttpMethodFunctionOptions<T>,
		): void
	}

	export namespace httyped {
		interface HttpFunctionOptions<T extends Endpoint>
			extends HttpTriggerOptions<T>,
				Partial<AF.FunctionOptions> {
			handler: HttpHandler<T>
		}

		type HttpMethodFunctionOptions<T extends Endpoint> = Omit<
			HttpFunctionOptions<T>,
			'methods'
		>

		interface HttpTriggerOptions<T extends Endpoint>
			extends AF.HttpTriggerOptions {
			/** (_httyped_: Route is required.)  */
			route: RemoveLeadingSlash<T['path']>
			/** (_httyped_: Method is required.)  */
			methods: (AF.HttpMethod & T['method'])[]
		}

		type HttpHandler<T extends Endpoint> = (
			request: HttpRequest<T>,
			context: AF.InvocationContext,
		) => FunctionResult<T>

		type FunctionResult<T extends Endpoint> =
			| FunctionResponse<T>
			| Promise<FunctionResponse<T>>

		class HttpRequest<T extends Endpoint> extends AF.HttpRequest {
			readonly method: T['method']
			readonly params: HttpRequestParams<T>
			readonly json: () => Promise<T['body']>
		}

		type HttpRequestParams<T extends Endpoint> = Parameters<T['path']>
	}
}
