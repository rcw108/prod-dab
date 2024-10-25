import { checkoutShippingUrl, checkoutUrl } from '@/configs/layout.config'
import {
	ICheckoutLayout,
	ICheckoutShippingValidate,
	ICheckoutShippingValidateResponse
} from '@/types/checkoutLayout.interface'
import axios from 'axios'

export const CheckoutService = {
	getLayout: async () => {
		return await axios.get<ICheckoutLayout>(checkoutUrl).then(res => res.data)
	},

	validateShippingCost: async (data: ICheckoutShippingValidate) => {
		return await axios.post<ICheckoutShippingValidateResponse[]>(
			checkoutShippingUrl,
			data
		)
	}
}
