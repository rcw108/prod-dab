import { homePageForm } from '@/configs/klaviyo.config'
import axios from 'axios'
import { useState } from 'react'

export const useFormSection = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)
	const [success, setSuccess] = useState(false)

	const onSubmit = async (id: string, email: string) => {
		setIsLoading(true)
		setIsError(false)

		const data = {
			data: {
				type: 'subscription',
				attributes: {
					profile: {
						data: {
							type: 'profile',
							attributes: {
								email: email
							}
						}
					}
				},
				relationships: {
					list: {
						data: {
							type: 'list',
							id: id
						}
					}
				}
			}
		}

		// const currentDate = new Date().toISOString().split('T')[0]

		const response = await axios.post(homePageForm, JSON.stringify(data), {
			headers: {
				'Content-Type': 'application/json',
				revision: new Date().toISOString().split('T')[0]
			}
		})

		console.log(response)

		if (response.status === 202) {
			setIsLoading(false)
			return { success: true }
		} else {
			setIsLoading(false)
			setIsError(true)
			throw new Error('Something went wrong. Please try again.')
		}
	}

	return {
		isLoading,
		isError,
		onSubmit,
		setIsError,
		setSuccess,
		success
	}
}
