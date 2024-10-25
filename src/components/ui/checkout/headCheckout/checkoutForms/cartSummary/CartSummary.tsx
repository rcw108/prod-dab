'use client'

import SmallHeading from '@/components/ui/headings/SmallHeading'
import { useCart } from '@/hooks/useCart'
import { useProducts } from '@/hooks/useProducts'
import { FC } from 'react'
import styles from './CartSummary.module.scss'
import SummaryCard from './summaryCard/SummaryCard'
const CartSummary: FC = () => {
	const { itemListCount } = useCart()
	const { products } = useProducts()

	const productsToRender = products?.filter(product =>
		itemListCount.some(item => item.id === product.id)
	)

	return (
		<div className={styles.summary}>
			<SmallHeading className={styles.title} title='Your order' />
			<div className={styles.divider}></div>
			<div className={styles.cartItems}>
				{productsToRender &&
					productsToRender.map(product => (
						<SummaryCard key={product.id} product={product} />
					))}
			</div>
			<div className={styles.divider}></div>
		</div>
	)
}

export default CartSummary
