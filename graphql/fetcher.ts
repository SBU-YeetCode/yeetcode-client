export function fetcher<TData, TVariables>(
	query: string,
	variables?: TVariables
) {
	return async (): Promise<TData> => {
		const res = await fetch('https://yeetcode.isaiahg.com/graphql', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true',
				'Access-Control-Allow-Origin': 'http://localhost:3000',
				Connection: 'keep-alive',
			},
			body: JSON.stringify({ query, variables }),
		})

		const json = await res.json()

		if (json.errors) {
			const { message } = json.errors[0]

			throw new Error(message)
		}

		return json.data
	}
}
