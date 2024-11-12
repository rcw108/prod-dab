import Description from '@/components/ui/headings/Description'
import SmallHeading from '@/components/ui/headings/SmallHeading'
import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import { useProducts } from '@/hooks/useProducts'
import { useCartContext } from '@/providers/CartContextProvider'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import Cookies from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import styles from './Cart.module.scss'
import RelatedProduct from './selectUnlock/RelatedProduct'
import SelectUnlock from './selectUnlock/SelectUnlock'
import SingleCartItem from './singleCartItem/SingleCartItem'

const Cart: FC = () => {
	const spring = {
		type: 'spring',

		stiffness: 700,
		damping: 10
	}

	const [cartCount, setCartCount] = useState(0)
	const { openCart, setOpenCart } = useCartContext()

	const { addToCart, toggleCartProduct } = useActions()

	const [isOn, setIsOn] = useState(false)

	const { userCart, itemListCount } = useCart()

	const { products } = useProducts()

	const checkout_timer = '15'

	useEffect(() => {
		if (itemListCount.some(item => item.id === 35134)) {
			setIsOn(true)
		}
	}, [itemListCount])

	useEffect(() => {
		if (itemListCount) {
			setCartCount(itemListCount.length)
		}
	}, [itemListCount])

	const [timeLeft, setTimeLeft] = useState<number | null>(null)

	useEffect(() => {
		if (!openCart) return
		const startTime = Cookies.get('cartTimerStart')
		if (!startTime) {
			const now = new Date().getTime()
			Cookies.set('cartTimerStart', now.toString(), {
				sameSite: 'None',
				secure: true
			})
			setTimeLeft(+checkout_timer * 60)
		} else {
			const elapsed = (new Date().getTime() - parseInt(startTime)) / 1000
			const remaining = Math.max(0, +checkout_timer * 60 - elapsed)
			setTimeLeft(Math.round(remaining))
		}

		const timer = setInterval(() => {
			setTimeLeft(prevTime => {
				if (prevTime === null) return null
				if (prevTime <= 0) {
					clearInterval(timer)
					return 0
				}
				return prevTime - 1
			})
		}, 1000)

		return () => clearInterval(timer)
	}, [checkout_timer, openCart])

	const formatTime = (
		seconds: number
	): { minutes: number; seconds: number } => {
		const minutes = Math.floor(seconds / 60)
		const remainingSeconds = seconds % 60
		return { minutes, seconds: remainingSeconds }
	}

	const totalPrice = (): number => {
		let total: number = 0
		itemListCount.forEach(listItem => {
			if (
				listItem.paymentType === 'subscription' &&
				listItem.subscriptionPrice
			) {
				total += listItem.count * +listItem.subscriptionPrice
			} else if (listItem.id && listItem.paymentType === 'one-time') {
				total += listItem.count * +listItem.price
			}
		})
		return +total.toFixed(2)
	}

	useEffect(() => {
		const totalCart: number = itemListCount.reduce(
			(acc, curr) => acc + curr.count,
			0
		)

		setCartCount(totalCart)
	}, [itemListCount])

	const disposablesProductSimple = products?.filter(product => {
		return product.categories.some(cat => cat.name === 'Disposables')
	})

	const cartridgeProductSimple = products?.filter(product => {
		return product.categories.some(
			cat => cat.name === 'Cartridge' || cat.name === '510 Cartridges'
		)
	})

	const productsToRender = products?.filter(product =>
		itemListCount.some(item => item.id === product.id)
	)

	const savedPrice = productsToRender?.reduce((acc, curr) => {
		const itemList = itemListCount.filter(item => item.id === curr.id)
		if (itemList.length === 0 || itemList[0].id === 35134) return acc
		const count = itemList[0].count

		return acc + (+curr.regular_price || 0 - +curr.price || 0) * count
	}, 0)

	const shippingProtector = products?.find(product => product.id === 35134)

	const toggleSwitch = () => {
		setIsOn(!isOn)
		toggleCartProduct({
			id: 35134,
			count: 1,
			price: String(shippingProtector?.regular_price) || '0',
			itemImage: shippingProtector?.images[0].src || '',
			name: shippingProtector?.name || '',
			paymentType: 'one-time',
			type: 'simple'
		})
	}

	const vibeGummy = products?.find(product => product.id === 34850)

	return (
		<>
			{/* <div className={stylesHeader.cart} onClick={() => setOpenCart(!openCart)}>
				{cartCount > 9 ? '9+' : cartCount}
			</div> */}
			<div
				className={clsx(styles.background, { [styles.openBg]: openCart })}
				onClick={() => setOpenCart(false)}
			></div>
			<div className={clsx(styles.cartBox, openCart && styles.open)}>
				<div className={styles.top}>
					<SmallHeading className={styles.title} title='Your Cart' />
					<div className={styles.close} onClick={() => setOpenCart(false)}>
						<Image src='/close.svg' alt='close cart' width={26} height={26} />
					</div>
				</div>
				<div className={styles.timer}>
					{timeLeft !== null && timeLeft > 0 ? (
						<>
							<div className={styles.time}>
								<p>
									Your cart is reserved for:{' '}
									<span>{formatTime(timeLeft).minutes} :</span>
									<span>{formatTime(timeLeft).seconds}</span>
								</p>
							</div>
						</>
					) : (
						<div className={styles.text}>Time is out!</div>
					)}
				</div>
				{itemListCount.length > 0 ? (
					<>
						<div className={styles.progress}>
							<div className={styles.progressLine}>
								<div
									className={styles.activeLine}
									style={{
										width: `${totalPrice() * 2}%`
									}}
								></div>
							</div>
							{totalPrice() === 0 ? (
								<h6>
									Get free shipping for orders over <span>$50.00</span>
								</h6>
							) : totalPrice() < 50 ? (
								<h6>
									{"You're"}{' '}
									<span className='font-bold'>{`$${(50 - totalPrice()).toFixed(2)}`}</span>{' '}
									away from free shipping.
								</h6>
							) : (
								<h6>
									<Image
										style={{ display: 'inline-block', marginRight: '5px' }}
										src='/check.svg'
										alt='check'
										width={14}
										height={14}
									/>
									Your order qualifies for free shipping!
								</h6>
							)}
						</div>

						<div className={styles.store}>
							<div className={styles.topDivider}></div>
							{itemListCount.map(product => {
								if (product.id === 35134) return

								return (
									<SingleCartItem
										listItemData={product}
										key={`${product.id}-${product.name}`}
									/>
								)
							})}
							<div className={styles.beforeGo}>
								<SmallHeading
									className={styles.unlockTitle}
									title={'Unlock Free Shipping with these:'}
								/>
								{vibeGummy && <RelatedProduct product={vibeGummy} />}
								{disposablesProductSimple && (
									<SelectUnlock products={disposablesProductSimple} />
								)}
								{cartridgeProductSimple && (
									<SelectUnlock products={cartridgeProductSimple} />
								)}
							</div>
						</div>

						<div className={styles.total}>
							<div className={styles.totalTop}>
								<SmallHeading className={styles.subtotal} title='Subtotal: ' />
							</div>
							<div className={styles.totalPrice}>
								{'$'}
								{shippingProtector &&
								itemListCount?.find(product => product.id === 35134)
									? (totalPrice() - +shippingProtector?.regular_price).toFixed(
											2
										)
									: totalPrice().toFixed(2)}
							</div>
						</div>
						<div className={styles.totalShip}>
							<div className={styles.top}>
								<SmallHeading className={styles.regTitle} title={'Total:'} />
								{shippingProtector &&
								savedPrice &&
								totalPrice() <= savedPrice ? (
									<div className={styles.regPrice}>
										<span>${totalPrice().toFixed(2)}</span>
										<span className={styles.saved}>
											${savedPrice.toFixed(2)}
										</span>
									</div>
								) : (
									<div className={styles.regPrice}>
										<span>${totalPrice().toFixed(2)}</span>
									</div>
								)}
							</div>

							{savedPrice &&
								shippingProtector &&
								totalPrice() <= savedPrice && (
									<div className={styles.saving}>
										<Image
											src={'/saving.svg'}
											alt='checkout'
											width={16}
											height={10}
										/>
										<Description
											title={`	You’re saving $${(savedPrice - totalPrice()).toFixed(2)}`}
										/>
									</div>
								)}
							<div className={styles.protector}>
								{shippingProtector && (
									<div className={styles.block}>
										<div className={styles.image}>
											<Image
												src={shippingProtector.images[0].src}
												alt={'protector'}
												width={34}
												height={34}
											/>
										</div>
										<div className={styles.info}>
											<SmallHeading
												className={styles.blockTitle}
												title={'Shipping Protector'}
											/>
											<Description
												className={styles.blockDescr}
												title={
													'Free replacement for lost/damaged packages. Protect your order now!'
												}
											/>
										</div>
										<div className={styles.clicks}>
											<Description
												className={styles.clicksPrice}
												title={`$${Number(shippingProtector.price).toFixed(2)}`}
											/>
											<div
												className={styles.switch}
												data-isOn={isOn}
												onClick={toggleSwitch}
											>
												<motion.div
													className={styles.handle}
													// layout
													transition={spring}
												/>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
						<Link href='/checkout' className={styles.btns}>
							<button>
								<Image src='/lock.svg' alt='checkout' width={14} height={14} />
								<span>Checkout</span>
							</button>
						</Link>
					</>
				) : (
					<div className={styles.emptyCart}>
						<Image
							className='inline mb-5 text-center ml-[-15px]'
							src='/empty-cart.svg'
							alt='empty cart'
							width={70}
							height={70}
						/>
						<h4>No products in the cart.</h4>
					</div>
				)}
			</div>
		</>
	)
}

export default Cart
