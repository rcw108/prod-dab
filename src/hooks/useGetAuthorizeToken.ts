import { getCustomerById } from '@/components/ui/myAccount/customersActions'
import { useActions } from './useActions'

export const useGetAuthorizeToken = () => {
	const { toggleAuthorize } = useActions()

	const fetchAuthorizeToken = async (id: number) => {
		const response = await getCustomerById(id)

		if (response.data) {
			const findAuthorizeToken = response.data.meta_data.find(
				meta => meta.key === '_authnet_customer_id'
			)
			console.log('aut', findAuthorizeToken)

			if (findAuthorizeToken) {
				toggleAuthorize({
					authorize: findAuthorizeToken
				})
			}
		}

		return null
	}

	return {
		fetchAuthorizeToken
	}
}
