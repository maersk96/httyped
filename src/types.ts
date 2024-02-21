export const GET = 'GET'
export const POST = 'POST'

export type GET = typeof GET
export type POST = typeof POST

export type Path = `/${string}`
export type Method = Uppercase<string>
type Headers = Record<string, string>

export type Parameters<T extends string> =
	T extends `${infer _}{${infer Param}}${infer Rest}`
		? (Param extends `${infer ParamName}?`
				? { [K in ParamName]?: string }
				: { [K in Param]: string }) &
				Parameters<Rest>
		: {}

export type Endpoint = {
	path: `/${string}`
	method: Uppercase<string>
	query?: object
	body?: object
	response?: object
}

type IsIdentical<T, U> = [T] extends [U]
	? [U] extends [T]
		? true
		: false
	: false

type WithOptionalParameters<T extends string> = IsIdentical<
	Parameters<T>,
	{}
> extends true
	? { params?: Parameters<T> }
	: { params: Parameters<T> }

export type FilteredPaths<T extends Endpoint, M extends Method> = Extract<
	T,
	{ method: M }
>['path']

export type FilteredEndpoints<
	T extends Endpoint,
	M extends Method,
	P extends Path,
> = Extract<T, { method: M; path: P }>

export type RequestConfig<T extends Endpoint> = Omit<
	T,
	'path' | 'method' | 'response'
> &
	WithOptionalParameters<T['path']>

interface RequestHandlerInit<T extends Endpoint> {
	baseUrl: string
	method: T['method']
	path: T['path']
	headers?: Headers
	requestConfig: RequestConfig<T>
}

export interface RequestHandler {
	<T extends Endpoint>(init: RequestHandlerInit<T>): Promise<T['response']>
}

export type ClientConfig = {
	baseUrl: string
	headers?: () => Headers
	requestHandler?: RequestHandler
}
