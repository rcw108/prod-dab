export const getStoreLocal = (name: string) => {
	if (typeof localStorage !== 'undefined') {
		const ls = localStorage.getItem(name)
		return ls !== null && ls !== undefined ? JSON.parse(ls) : null
	}

	return null
}
