import { CheckoutService } from '@/services/checkout.service'
import { useQuery } from '@tanstack/react-query'

export const useCheckoutHeader = () => {
	const { isLoading, data } = useQuery({
		queryKey: ['checkoutHeader'],
		queryFn: () => CheckoutService.getLayout()
	})

	return {
		data,
		isLoading
	}
}
