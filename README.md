# 🌐 httyped: Typed APIs

`httyped` is a lightweight, type-safe HTTP client designed for TypeScript applications. It simplifies making HTTP requests and processing responses with a focus on developer experience and type safety.

## Features

- **Light Weight**: Lightweight with zero dependencies. Ship your APIs endpoint types and a lightweight client. Nothing more.
- **Type Safety**: Leverages the power of TypeScript for compile-time checks and IntelliSense for autocompletion.
- **Simplicity**: Easy-to-use API for making HTTP requests.
- **Extensible**: At its core `httyped` encourages a standardized `Endpoint` interface. What is built around it is up to you.

## Installation

Install `httyped` using npm:

```bash
npm install @maersk96/httyped
```

## Get started

httyped is built around a standardized `Endpoint` interface: 

```typescript
interface Endpoint {
  path: `/${string}`
  method: Uppercase<string>
  query?: object
  body?: object
  response?: object
}
```

### Defining the Endpoints
Conforming to the `Endpoint` interface you can create your own endpoints in seconds:

```typescript
interface GetUser {
  method: 'GET'
  path: '/api/users/{userId}'
  response: User
}

type MyEndpoints = GetUser
```

### Creating the Client
Once your typed endpoints are in place, create your HTTP client to go with it:
```typescript
import { createClient } from '@maersk96/httyped'

const baseUrl = 'https://api.example.com'

const client = createClient<MyEndpoints>({ baseURL })
```

### Using the Client
Consuming the `client` is a charm. IntelliSense will help you out. 

```typescript
// Path, params and response are now strongly typed. Mistakes not welcome!
const user = await client.get('/api/users/{userId}', {
  params: {
    userId: String(123)
  }
})
```

#### Custom Methods
Methods not supported by default can be supported using the more general `request` function.
```typescript
const user = await client.request('CUSTOM_METHOD','/api/my/path', {})
```

## Examples

### Authentication header
Pass additional headers like `Authorization`. These headers are evaluated at and added to each request.

```typescript
const authorizedClient = createClient<MyEndpoints>({
  headers: () => ({
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  })
})
```

# Extensions

## Azure Functions (v4 programming model)
This type extension brings your `Endpoint`s to Azure Function's. Install it using npm:

```bash
npm install @httyped/azure-functions --save-dev
```

To use it simply add the generic `Endpoint` to your request function:

```typescript
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
```
