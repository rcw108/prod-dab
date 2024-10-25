'use client'

import Description from '@/components/ui/headings/Description'
import SmallHeading from '@/components/ui/headings/SmallHeading'
import { useCart } from '@/hooks/useCart'
import { useProducts } from '@/hooks/useProducts'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './SummaryCard.module.scss'
const SummaryCard: FC<{
	product: WooCommerceSingleProduct
}> = ({ product }) => {
	const { products } = useProducts()
	const { itemListCount } = useCart()

	const bundleItems = itemListCount.find(
		item => item.id === product.id
	)?.bundleItems

	const bundleProduct = bundleItems?.map(item =>
		products?.find(product => product.id === item.id)
	)

	const getBundleItemCount = (productId: number, bundleItemId: number) => {
		const item = itemListCount.find(item => item.id === productId)

		return item?.bundleItems?.find(item => item.id === bundleItemId)?.count
	}

	return (
		<div className={clsx(styles.item, 'sumCard')}>
			<div className={styles.wrap}>
				<div className={styles.left}>
					<Image
						src={product.images[0].src}
						alt={product.name}
						width={40}
						height={40}
					/>
					<SmallHeading title={product.name} className={styles.name} />
				</div>
				<div className={styles.right}>
					<Description title={ReactHtmlParser(product.price_html)} />
					<div className={styles.save}>
						<Description
							title={`You're saving ${(+product.regular_price - +product.sale_price).toFixed(2)}`}
						/>
					</div>
				</div>
			</div>
			<div className={styles.bundles}>
				{bundleProduct &&
					bundleProduct.map(
						bundleProduct =>
							bundleProduct && (
								<div className={styles.bundleItem} key={bundleProduct.id}>
									<Image
										src={bundleProduct.images[0].src}
										alt={bundleProduct.name}
										width={60}
										height={60}
									/>
									<div className={styles.bundleTextWrap}>
										<Description
											className={styles.bundleText}
											title={`${bundleProduct.name} x ${getBundleItemCount(product.id, bundleProduct.id)}`}
										/>
									</div>
								</div>
							)
					)}
			</div>
		</div>
	)
}

export default SummaryCard
