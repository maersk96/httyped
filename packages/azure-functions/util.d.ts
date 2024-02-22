import { Endpoint } from '@httyped/core'

export type RemoveLeadingSlash<T extends string> = T extends `/${infer Rest}`
	? Rest
	: T

export type FunctionResponse<T extends Endpoint> = T['response'] extends object
	? {
			status: number
			jsonBody: T['response']
	  }
	: {
			status: number
			body: T['response']
	  }
