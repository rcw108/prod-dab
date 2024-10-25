'use client'

import Description from '@/components/ui/headings/Description'
import SubHeading from '@/components/ui/headings/SubHeading'
import { useActions } from '@/hooks/useActions'
import { useProducts } from '@/hooks/useProducts'
import { useCartContext } from '@/providers/CartContextProvider'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import clsx from 'clsx'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import ReactHtmlParser from 'react-html-parser'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css'
import SmallHeading from '../../headings/SmallHeading'
import ReviewShopCard from '../../shop/reviewSectionShop/reviewShopCard/ReviewShopCard'
import ProductSlider from '../productSlider/ProductSlider'
import Deliver from '../simpleCard/deliver/Deliver'
import ProductInfo from '../simpleCard/productInfo/ProductInfo'
import styles from '../simpleCard/SimpleCard.module.scss'
import { useVariableVariantProduct } from './useVariableVariantProduct'
import stylesVar from './VariableCard.module.scss'

const VariableCard: FC<{ product: WooCommerceSingleProduct }> = ({
	product
}) => {
	const [paymentType, setPaymentType] = useState<'one-time' | 'subscription'>(
		'one-time'
	)

	const [count, setCount] = useState(1)

	const [deliver, setDeliver] = useState<false | '15%' | '20%' | '25%'>(false)

	const [variant, setVariant] = useState<string>(
		product.attributes[0].options[0]
	)

	const [variantPrice, setVariantPrice] = useState<{
		regular_price: number
		sale_price: number
	}>({ regular_price: 0, sale_price: 0 })

	const { products } = useProducts()

	const { isLoading, singleProductVar, error } = useVariableVariantProduct(
		product.variations[0]
	)

	const variantPriceFn = (): { regular_price: number; sale_price: number } => {
		if (singleProductVar) {
			return {
				sale_price: +singleProductVar.sale_price || 0,
				regular_price: +singleProductVar.regular_price || 0
			}
		} else {
			return {
				regular_price: 0,
				sale_price: 0
			}
		}
	}

	useEffect(() => {
		setVariantPrice(variantPriceFn())
	}, [singleProductVar])

	const saveCount = () =>
		variantPrice.regular_price - +variantPriceFn().sale_price

	const { addToCart } = useActions()

	const indexedVariables = () => {
		const result: { name: string; id: number }[] = []

		product.attributes[0].options.forEach((option, index) => {
			result.push({ name: option, id: product.variations[index] })
		})

		return result
	}

	const { openCart, setOpenCart } = useCartContext()

	const handleClickVariable = () => {
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
				price: String(variantPriceFn().sale_price),
				type: 'variable',
				variableItems: {
					id: indexedVariables().find(item => item.name === variant)?.id || 0,
					name: variant
				},
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
				price: String(variantPrice.sale_price),
				count,
				type: 'variable',
				paymentType,
				itemImage: product.images[0].src,
				variableItems: {
					id: indexedVariables().find(item => item.name === variant)?.id || 0,
					name: variant
				}
			})
		}
	}

	useEffect(() => {
		if (count < 0) {
			setCount(1)
		}
	}, [count])

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
					{typeof product.acf.chart_image === 'string' && (
						<Image
							className='mt-10'
							src={product.acf.chart_image}
							alt='chart'
							width={637}
							height={357}
						/>
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
						title={`You save $${String(saveCount().toFixed(2))}`}
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
				<Description title={ReactHtmlParser(product.description)} />
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
						<div className={stylesVar.variableCount}>
							<div className={stylesVar.variables}>
								<Description
									title={`Choose ${product.attributes[0].name}`}
									className={stylesVar.titles}
								/>
								<div className={stylesVar.choice}>
									{product.attributes[0].options.map(item => (
										<div
											className={clsx(stylesVar.blockChoice, {
												[stylesVar.activeVariant]: variant === item
											})}
											onClick={() => setVariant(item)}
											key={item}
										>
											<Description title={item} />
										</div>
									))}
								</div>
							</div>
							<div className={stylesVar.num}>
								<Description
									title='Choose Quantity'
									className={stylesVar.titles}
								/>
								<div className={clsx(styles.count, stylesVar.countVar)}>
									<div
										className={styles.minus}
										onClick={() => {
											if (count > 1) {
												setCount(count - 1)
											}
										}}
									>
										-
									</div>
									<input
										type='number'
										value={count}
										onChange={e => setCount(+e.target.value)}
									/>
									<div
										className={styles.plus}
										onClick={() => setCount(count + 1)}
									>
										+
									</div>
								</div>
							</div>
						</div>
						<div className={styles.btns}>
							<button onClick={handleClickVariable}>
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
					attributes={product.attributes}
					acf={product.acf}
					weight={product.weight}
					dimensions={product.dimensions}
				/>
			</div>
		</div>
	)
}

export default VariableCard
