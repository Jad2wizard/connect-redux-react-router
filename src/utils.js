export const ACTION_TYPE = '@@ROUTE_CHANGE'

export const getQuery = searchStr => {
	let query = searchStr
	if (query) {
		const arr = query.slice(1).split('&')
		query = {}
		for (let item of arr) {
			query[item.split('=')[0]] = item.split('=')[1]
		}
	}

	return query
}
