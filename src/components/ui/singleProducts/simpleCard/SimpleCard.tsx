'use client'

import Description from '@/components/ui/headings/Description'
import SubHeading from '@/components/ui/headings/SubHeading'
import { useActions } from '@/hooks/useActions'
import { useCartContext } from '@/providers/CartContextProvider'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import clsx from 'clsx'
import Image from 'next/image'
import { FC, useState } from 'react'
import ReactHtmlParser from 'react-html-parser'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css'
import SmallHeading from '../../headings/SmallHeading'
import ReviewShopCard from '../../shop/reviewSectionShop/reviewShopCard/ReviewShopCard'
import ProductSlider from '../productSlider/ProductSlider'
import styles from './SimpleCard.module.scss'
import Deliver from './deliver/Deliver'
import ProductInfo from './productInfo/ProductInfo'

const SimpleCard: FC<{ product: WooCommerceSingleProduct }> = ({ product }) => {
	const [paymentType, setPaymentType] = useState<'one-time' | 'subscription'>(
		'one-time'
	)

	const [count, setCount] = useState(1)

	const [deliver, setDeliver] = useState<false | '15%' | '20%' | '25%'>(false)

	const saveCount = () =>
		(+product.regular_price - +product.sale_price).toFixed(2)

	const { addToCart } = useActions()
	const { openCart, setOpenCart } = useCartContext()

	const handleClickSimple = () => {
		setOpenCart(true)

		const period =
			deliver === '15%'
				? 'every 2 month'
				: deliver === '20%'
					? 'every 1 month'
					: 'every 2 weeks'
		if (paymentType === 'subscription') {
			addToCart({
				id: product.id,
				name: product.name,
				count,
				price: product.sale_price,
				type: 'simple',
				paymentType,
				subscriptionPeriod: period,
				subscriptionPrice:
					deliver === '15%'
						? Number((+product.sale_price * 0.85).toFixed(2))
						: deliver === '20%'
							? Number((+product.sale_price * 0.8).toFixed(2))
							: Number((+product.sale_price * 0.75).toFixed(2)),
				itemImage: product.images[0].src
			})
		} else {
			addToCart({
				name: product.name,
				id: product.id,
				price: product.sale_price,
				count,
				type: 'simple',
				paymentType,
				itemImage: product.images[0].src
			})
		}
	}

	return (
		<div className={clsx(styles.item, 'productCard')}>
			<div className={styles.left}>
				<div className={styles.wrap}>
					<ProductSlider images={product.images} />
					{product.acf.author &&
						product.acf.review_text &&
						product.acf.star_image && (
							<div className={styles.review}>
								<ReviewShopCard
									author={product.acf.author}
									start_image={product.acf.star_image}
									text={product.acf.review_text}
								/>
							</div>
						)}
				</div>
			</div>
			<div className={styles.right}>
				<div className={styles.rate}>
					<Image
						src={product.acf.rate_image}
						alt='rate'
						width={88}
						height={16}
					/>
					<Description title={ReactHtmlParser(product.acf.rate_text)} />
				</div>
				<SubHeading
					className={styles.title}
					title={ReactHtmlParser(product.name)}
				/>
				<Description
					className={styles.priceDescr}
					title={ReactHtmlParser(product.price_html)}
				/>
				<div className={styles.status}>
					<Description
						className={styles.save}
						title={`You save $${String(saveCount())}`}
					/>
					<div className={styles.stock}>
						{product.stock_status === 'outofstock' ? (
							<div className={styles.outStock}>
								<div className={styles.circle}>
									<div className={styles.dot}></div>
								</div>
								<h5 className={styles.outStockTitle}>Out of stock</h5>
							</div>
						) : (
							<div className={styles.inStock}>
								<div className={styles.circle}>
									<div className={styles.dot}></div>
								</div>
								<h5 className={styles.stockTitle}>In stock</h5>
							</div>
						)}
					</div>
				</div>
				<Description
					className={styles.descrProd}
					title={ReactHtmlParser(product.description)}
				/>
				{product.stock_status === 'instock' ? (
					<div className={styles.buy}>
						<div className={styles.paymentType}>
							<SmallHeading
								className={styles.paymentTitle}
								title='Subscribe & save!'
							/>
							<div
								className={clsx(styles.oneTime, {
									[styles.checked]: paymentType === 'one-time'
								})}
								onClick={() => setPaymentType('one-time')}
							>
								<Description className={styles.payTitle} title='One-time' />
							</div>
							<div
								className={clsx(styles.subscribe, {
									[styles.checked]: paymentType === 'subscription'
								})}
								onClick={() => setPaymentType('subscription')}
							>
								<Description
									className={styles.payTitle}
									title='Subscribe and save up to 25%'
								/>
								{paymentType === 'subscription' ? (
									<Deliver
										handler={setDeliver}
										sale_price={product.sale_price}
									/>
								) : null}
							</div>
						</div>
						<div className={styles.count}>
							<div className={styles.minus} onClick={() => setCount(count - 1)}>
								-
							</div>
							<input
								type='number'
								value={count}
								onChange={e => setCount(+e.target.value)}
							/>
							<div className={styles.plus} onClick={() => setCount(count + 1)}>
								+
							</div>
						</div>
						<div className={styles.btns}>
							<button onClick={handleClickSimple}>
								{paymentType === 'one-time' ? (
									<span className={styles.addToCart}>
										Add to cart
										<Image
											src='/add-cart.svg'
											alt='cart'
											width={28}
											height={28}
										/>
									</span>
								) : (
									'Subscribe & save'
								)}
							</button>
						</div>
					</div>
				) : null}
				<ProductInfo
					acf={product.acf}
					weight={product.weight}
					dimensions={product.dimensions}
				/>
			</div>
		</div>
	)
}

export default SimpleCard
