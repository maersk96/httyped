import { Parameters } from './types'

type a = Parameters<'/foo/{bar}'>

export let tests: {
	// @ts-expect-error
	a: a['foo']
	b: a['bar']
}
