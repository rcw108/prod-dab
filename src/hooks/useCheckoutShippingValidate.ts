import { CheckoutService } from '@/services/checkout.service'
import { ICheckoutShippingValidate } from '@/types/checkoutLayout.interface'
import { useQuery } from '@tanstack/react-query'

export const useCheckoutShippingValidate = (
	data: ICheckoutShippingValidate
) => {
	const {
		isLoading,
		error,
		data: shipping
	} = useQuery({
		queryKey: ['checkoutShippingValidate', data],
		queryFn: () => CheckoutService.validateShippingCost(data),
		enabled: !!data,
		select: ({ data }) => data
	})

	return {
		isLoading,
		shipping,
		error
	}
}
