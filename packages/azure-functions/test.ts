import { app } from '@azure/functions'

interface User {
	id: number
	name: string
}

interface GetUser {
	method: 'GET'
	path: '/api/users/{userId}'
	response: User
}

interface CreateUser {
	method: 'POST'
	path: '/api/users'
	body: User
	response: { success: boolean }
}

app.http<GetUser>('GetUser', {
	route: 'api/users/{userId}',
	methods: ['GET'],
	handler: async (req) => {
		return {
			status: 200,
			jsonBody: {
				id: Number(req.params.userId),
				name: 'John Doe',
			},
		}
	},
})

app.http<CreateUser>('CreateUser', {
	route: 'api/users',
	methods: ['POST'],
	handler: async (req) => {
		const body = await req.json()

		return {
			status: 200,
			jsonBody: {
				success: body.id === 1,
			},
		}
	},
})

app.http<CreateUser>('CreateUser', {
	// @ts-expect-error
	route: 'api/users/foo',
	// @ts-expect-error
	methods: ['GET'],
	// @ts-expect-error
	handler: async (req) => {
		const body = await req.json()

		return {
			status: 200,
			json: {
				// @ts-expect-error
				success: body.foo === 1,
			},
		}
	},
})

app.get<GetUser>('GetUser', () => {
	return {
		status: 200,
		jsonBody: {
			id: 213,
			name: 'John Doe',
		},
	}
})

// @ts-expect-error
app.get<CreateUser>('CreateUser', () => {
	return {
		status: 200,
		jsonBody: {
			id: 213,
			name: 'John Doe',
		},
	}
})

app.post<CreateUser>('CreateUser', async (req) => {
	const body = await req.json()
	return {
		status: 200,
		jsonBody: {
			success: body.id === 1,
		},
	}
})
