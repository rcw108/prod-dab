'use client'

import Description from '@/components/ui/headings/Description'
import SubHeading from '@/components/ui/headings/SubHeading'
import { useActions } from '@/hooks/useActions'
import { useProducts } from '@/hooks/useProducts'
import { useCartContext } from '@/providers/CartContextProvider'
import { BundleItem } from '@/store/cart/cart.interface'
import {
	Image as IImage,
	Tag,
	WooCommerceSingleProduct
} from '@/types/wooCommerce.interface'
import clsx from 'clsx'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import ReactHtmlParser from 'react-html-parser'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css'
import SmallHeading from '../../headings/SmallHeading'
import ReviewShopCard from '../../shop/reviewSectionShop/reviewShopCard/ReviewShopCard'
import SkeletonLoader from '../../SkeletonLoader'
import ProductSlider from '../productSlider/ProductSlider'
import Deliver from '../simpleCard/deliver/Deliver'
import ProductInfo from '../simpleCard/productInfo/ProductInfo'
import styles from '../simpleCard/SimpleCard.module.scss'
import stylesBun from './BundleCard.module.scss'
import BundleSingleItem from './bundleSingleItem/BundleSingleItem'

export interface BundleItemSingle {
	name: string
	id: number
	slug: string
	stock_status: string
	short_description: string
	tags: Tag[]
	image: IImage
	stock_quantity: number
	quantity_min: number
	max_quantity: number
	default_quantity: number
}

const BundleCard: FC<{
	product: WooCommerceSingleProduct
	loading: boolean
}> = ({ product, loading }) => {
	const { products: allProducts } = useProducts()

	const [paymentType, setPaymentType] = useState<'one-time' | 'subscription'>(
		'one-time'
	)

	const [items, setItems] = useState<BundleItem[] | []>([])

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
				price: product.sale_price,
				type: 'bundle',
				count: 1,
				bundleItems: items.map(item => {
					return {
						id: Number(item.id),
						count: Number(item.count),
						name: String(item.name),
						stock_count: Number(item.stock_count)
					}
				}),
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
				count: 1,
				price: product.sale_price,
				bundleItems: items.map(item => {
					return {
						id: item.id,
						count: item.count,
						name: item.name,
						stock_count: item.stock_count
					}
				}),
				type: 'bundle',
				paymentType,
				itemImage: product.images[0].src
			})
		}
	}

	const bundleItemToRender = () => {
		const items: BundleItemSingle[] = []
		product.bundled_items.map(bundleItem => {
			const itemInAllProducts = allProducts?.find(
				product => product.id === bundleItem.product_id
			)
			if (itemInAllProducts) {
				items.push({
					name: itemInAllProducts.name,
					id: itemInAllProducts.id,
					slug: itemInAllProducts.slug,
					stock_status: bundleItem.stock_status,
					tags: itemInAllProducts.tags,
					short_description: itemInAllProducts.short_description,
					image: itemInAllProducts.images[0],
					stock_quantity: itemInAllProducts.stock_quantity,
					quantity_min: +bundleItem.quantity_min,
					max_quantity: +bundleItem.quantity_max,
					default_quantity: +bundleItem.quantity_default
				})
			}
		})
		return items
	}

	const [validation, setValidation] = useState<{
		message: string
		status: boolean
	}>({
		message: `Please choose ${product.bundle_max_size} items.`,
		status: false
	})

	const totalCountItems = items.reduce((acc, item) => {
		return acc + (item.count || 0)
	}, 0)

	const validationBundle = () => {
		const totalCountItems = items.reduce(
			(acc, item) => acc + (item.count || 0),
			0
		)
		const outOfStockItems = items.filter(item => item.stock !== 'in_stock')
		const insufficientQuantityItems = items.filter(
			item => item.count > item.stock_count && item.stock_count !== null
		)

		let message = ''
		let status = true

		if (outOfStockItems.length > 0) {
			message = `Insufficient stock -> ${outOfStockItems.map(item => item.name).join(', ')}`
			status = false
		} else if (insufficientQuantityItems.length > 0) {
			message = `Insufficient quantity -> ${insufficientQuantityItems.map(item => item.name).join(', ')}`
			status = false
		} else if (
			totalCountItems < product.bundle_min_size ||
			totalCountItems > product.bundle_max_size
		) {
			message = `Please choose ${product.bundle_max_size} items.`
			status = false
		}

		setValidation({ message, status })
	}

	const handlerNewItem = (newItem: BundleItem) => {
		setItems(prevItems => {
			const itemCounts = prevItems.filter(item => item.id !== newItem.id)
			itemCounts.push(newItem)
			console.log(itemCounts)
			return itemCounts
		})
	}

	useEffect(() => {
		validationBundle()
	}, [items])

	if (loading) {
		return (
			<div className={stylesBun.skeleton}>
				<div className={stylesBun.leftSkeleton}>
					<SkeletonLoader count={1} width={'100%'} height={600} />
					<div className={stylesBun.thumb}>
						<SkeletonLoader
							count={2}
							width={'100%'}
							height={120}
							className='mt-5'
						/>
					</div>
					<SkeletonLoader
						count={1}
						width={'100%'}
						height={300}
						className='mt-10'
					/>
				</div>
				<div className={stylesBun.rightSkeleton}>
					<SkeletonLoader count={1} width={'100%'} height={54} />
					<SkeletonLoader
						count={1}
						width={'100%'}
						height={34}
						className='my-5'
					/>
					<div className={stylesBun.items}>
						<SkeletonLoader count={8} width={'48%'} height={120} />
					</div>
					<SkeletonLoader
						count={1}
						width={'100%'}
						height={250}
						className='my-5'
					/>
				</div>
			</div>
		)
	}

	return (
		<div className={clsx(styles.item, stylesBun.itemBun, 'productCard')}>
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
					{product.acf.rate_image && (
						<Image
							src={product.acf.rate_image}
							alt='rate'
							width={88}
							height={16}
						/>
					)}
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
				<div className={stylesBun.descrProduct}>
					{ReactHtmlParser(product.description)}
				</div>

				<div className={stylesBun.bundleChoice}>
					{bundleItemToRender().map(item => (
						<BundleSingleItem
							items={items}
							handler={handlerNewItem}
							key={item.id}
							{...item}
						/>
					))}
				</div>

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
						<div
							className={clsx(stylesBun.bundleInfoStatus, {
								[stylesBun.valid]:
									totalCountItems >= product.bundle_min_size &&
									totalCountItems <= product.bundle_max_size
							})}
						>
							<h5>
								{totalCountItems < product.bundle_min_size ||
								totalCountItems > product.bundle_min_size
									? `Please choose ${product.bundle_min_size} items.`
									: null}
							</h5>
							<h6>
								{totalCountItems === 1
									? `${totalCountItems} item selected`
									: `${totalCountItems} items selected`}
							</h6>
						</div>
						<div className={stylesBun.errorValidation}>
							{validation.message ===
							`Please choose ${product.bundle_max_size} items.`
								? null
								: validation.message}
						</div>
						<div
							className={clsx(styles.btns, {
								[stylesBun.noValid]: validation.status === false
							})}
						>
							<button disabled={!validation.status} onClick={handleClickSimple}>
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

export default BundleCard
