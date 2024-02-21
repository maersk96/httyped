import { createClient } from './createClient'

interface Resource<T> {
	data: T
	support: {
		url: string
		text: string
	}
}

interface PaginatedResource<T> extends Resource<T[]> {
	page: number
	per_page: number
	total: number
	total_pages: number
}

interface User {
	id: number
	email: string
	first_name: string
	last_name: string
	avatar: string
}

interface GetUser {
	method: 'GET'
	path: '/api/users/{userId}'
	response: Resource<User>
}

interface GetUsers {
	method: 'GET'
	path: '/api/users'
	query?: {
		page?: number
	}
	response: PaginatedResource<User>
}

interface GetUsers2 {
	method: 'POST'
	path: '/api/users'
	response: PaginatedResource<User>
}

type ReqresEndpoints = GetUser | GetUsers | GetUsers2

const BASE_URL = 'https://reqres.in'

const ReqresClient = createClient<ReqresEndpoints>({ baseUrl: BASE_URL })

async function runExample() {
	const response1 = await ReqresClient.get('/api/users', {
		query: {
			page: 1,
		},
	})

	const response2 = await ReqresClient.get('/api/users/{userId}', {
		params: {
			userId: String(response1.data[0].id),
		},
	})

	ReqresClient.request('GET', '/api/users', {})
	ReqresClient.get('/api/users', {})

	ReqresClient.get('/api/users', {})

	console.log('First name:', response2.data.first_name)
}

runExample()
