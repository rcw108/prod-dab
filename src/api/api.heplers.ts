export const getContentType = () => ({
	'Content-Type': 'application/json'
})

export const errorCatch = (error: any): string =>
	error.success && error.data
		? typeof error.data.message === 'object'
			? error.data.message[0]
			: error.data.message
		: error.message
