'use client'

import HeadCheckout from '@/components/ui/checkout/headCheckout/HeadCheckout'
import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import { useGetAllSingleProducts } from '@/hooks/useGetAllSingleProducts'
import { useProducts } from '@/hooks/useProducts'
import { usePushCookieUserCart } from '@/hooks/usePushCookieUserCart'
import { ICheckoutLayout } from '@/types/checkoutLayout.interface'
import { useRouter } from 'next/navigation'
import { FC, useEffect } from 'react'

const CheckoutPage: FC<{ data: ICheckoutLayout }> = ({ data }) => {
	usePushCookieUserCart()

	const { pushAllProducts } = useActions()
	const { products: allProducts } = useProducts()

	const { products, isLoading } = useGetAllSingleProducts()

	const { itemListCount, userCart } = useCart()

	const router = useRouter()

	if (itemListCount.length === 0) {
		router.push('/shop')
	}

	useEffect(() => {
		if (allProducts) return
		pushAllProducts(products)
	}, [products])

	return (
		<main>
			<HeadCheckout
				checkout_after_timer_text={data.acf.checkout_after_timer_text}
				checkout_timer={data.acf.checkout_timer}
				marquee_line_repeater={data.acf.marquee_line_repeater}
				rating_image={data.acf.rating_image}
				rating_text={data.acf.rating_text}
				credit_card_image={data.acf.credit_card_image}
				order_advantages={data.acf.order_advantages}
			/>
		</main>
	)
}

export default CheckoutPage
