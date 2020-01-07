export const ROUTE_CHANGE = '@@ROUTE_CHANGE'

export type HISTORY_CHANGE_TYPE = 'PUSH' | 'POP' | 'REPLACE'

export type Query = {
	[key: string]: string
}

export const getQuery = (searchStr: string): Query => {
	const res: Query = {}
	let query = searchStr
	if (query) {
		const arr = query.slice(1).split('&')
		for (let item of arr) {
			res[item.split('=')[0]] = item.split('=')[1]
		}
	}

	return res
}

export type Props = {
	store: {
		dispatch: (params: {
			type: typeof ROUTE_CHANGE
			payload: {
				action: HISTORY_CHANGE_TYPE
				query: Query
				[k: string]: any
			}
		}) => void
	}
}
