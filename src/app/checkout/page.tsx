import CheckoutPage from '@/components/screens/checkoutPage/CheckoutPage'
import { checkoutUrl } from '@/configs/layout.config'
import { ICheckoutLayout } from '@/types/checkoutLayout.interface'
import { FC } from 'react'

const getCheckoutData = async () => {
	const data: ICheckoutLayout = await fetch(checkoutUrl).then(res => res.json())
	return data
}

const Checkout: FC = async () => {
	const data = await getCheckoutData()

	return data && <CheckoutPage data={data} />
}

export default Checkout
