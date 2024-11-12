'use client'

import Description from '@/components/ui/headings/Description'
import { useVariableVariantProduct } from '@/components/ui/singleProducts/variableCard/useVariableVariantProduct'
import { useActions } from '@/hooks/useActions'
import { useCartContext } from '@/providers/CartContextProvider'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './SingleProductCard.module.scss'

const SingleProductCard: FC<WooCommerceSingleProduct> = ({
	name,
	price_html,
	images,
	slug,
	regular_price,
	sale_price,
	price,
	variations,
	type,
	id
}) => {
	const [variantPrice, setVariantPrice] = useState<{
		regular_price: number
		sale_price: number
	}>({ regular_price: 0, sale_price: 0 })

	const { isLoading, singleProductVar, error } = useVariableVariantProduct(
		variations[0]
	)
	const [disable, setDisable] = useState(false)

	const { addToCart } = useActions()
	const { openCart, setOpenCart } = useCartContext()

	const handleAddProduct = () => {
		const header = document.querySelector('header')
		console.log(header)
		if (header) {
			;(header as HTMLElement).style.top = '0'
			;(header as HTMLElement).style.transform = 'translateY(0)'
			;(header as HTMLElement).style.overflow = 'auto'
		}
		setOpenCart(true)
		setDisable(true)
		addToCart({
			id: id,
			count: 1,
			price: price,
			paymentType: 'one-time',
			type: 'simple',
			name: name,
			itemImage: images[0].src
		})
		setTimeout(() => {
			setDisable(false)
		}, 400)
	}

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

	return (
		<div className={styles.card}>
			<Link href={`products/${slug}`}>
				{images[0] && (
					<div className={styles.img}>
						<Image
							priority
							src={images[0].src}
							alt={name}
							width={220}
							height={220}
						/>
					</div>
				)}
				<div className={styles.content}>
					<Image
						className='mb-3 block'
						src={'/stars.svg'}
						alt='stars'
						width={88}
						height={16}
					/>
					<Link href={`products/${slug}`} className={styles.title}>
						{ReactHtmlParser(name)}
					</Link>
					<div className={styles.priceSave}>
						<Description
							className={clsx(styles.price, 'priceShop')}
							title={ReactHtmlParser(price_html)}
						/>
						<div className={styles.save}>
							<Description
								title={
									type === 'variable'
										? String(`Save $${saveCount().toFixed(2)}`)
										: String(
												`Save $${(+regular_price - +sale_price).toFixed(2)}`
											)
								}
							/>
						</div>
					</div>
				</div>
			</Link>
			{type === 'simple' ? (
				<button
					disabled={disable}
					onClick={handleAddProduct}
					className={styles.btn}
				>
					Add to cart
				</button>
			) : type === 'variable' ? (
				<Link className={styles.btn} href={`products/${slug}`}>
					<span>Choose your flavor</span>
				</Link>
			) : (
				<Link className={styles.btn} href={`products/${slug}`}>
					<span>Build your bundle</span>
				</Link>
			)}
		</div>
	)
}

export default SingleProductCard
