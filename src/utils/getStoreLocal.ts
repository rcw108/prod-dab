export const getStoreLocal = (name: string) => {
	if (typeof localStorage !== 'undefined' && localStorage !== undefined) {
		const ls = localStorage.getItem(name)
		if (ls === null || ls === undefined) return null

		try {
			return JSON.parse(ls)
		} catch (error) {
			console.error('Failed to parse JSON:', error)
			return null
		}
	}

	return null
}
