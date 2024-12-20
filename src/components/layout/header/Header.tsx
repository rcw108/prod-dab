'use client'

import { useCart } from '@/hooks/useCart'
import { useCartContext } from '@/providers/CartContextProvider'
import { Options } from '@/types/options.interface'
import clsx from 'clsx'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, useEffect, useRef, useState } from 'react'
import CheckoutHeader from './checkoutHeader/CheckoutHeader'
import styles from './Header.module.scss'
import Logotype from './logotype/Logotype'
import Menu from './menu/Menu'
import TopBar from './topbar/TopBar'

const DynamicCart = dynamic(() => import('./cart/Cart'), { ssr: false })

const DynamicSearch = dynamic(() => import('./search/Search'), { ssr: false })

interface IHeader {
	data: Options | undefined
	isLoading: boolean
}

const Header: FC<IHeader> = ({ data, isLoading }) => {
	const pathname = usePathname()
	const [isOpen, setIsOpen] = useState(false)
	const [isHidden, setIsHidden] = useState(false)
	const { scrollY } = useScroll()
	const lastYRef = useRef(0)

	useMotionValueEvent(scrollY, 'change', y => {
		const difference = y - lastYRef.current
		if (Math.abs(difference) > 50) {
			setIsHidden(difference > 0)

			lastYRef.current = y
		}
	})

	const [cartCount, setCartCount] = useState(0)
	const { openCart, setOpenCart } = useCartContext()
	const { userCart, itemListCount } = useCart()

	useEffect(() => {
		const totalCart: number = itemListCount.reduce(
			(acc, curr) => acc + curr.count,
			0
		)

		setCartCount(totalCart)
	}, [itemListCount])

	if (pathname === '/checkout') {
		return <CheckoutHeader />
	}

	return (
		<>
			<motion.header
				whileHover='visible'
				animate={isHidden ? 'hidden' : 'visible'}
				variants={{
					hidden: { y: '-100%' },
					visible: {
						y: '0%'
					}
				}}
				transition={{ duration: 0.2 }}
				className={clsx(styles.main)}
			>
				<TopBar data={data} isLoading={isLoading} />
				<div className={clsx('header-line')}>
					<Logotype data={data} isLoading={isLoading} />
					<Menu />
					<div className={styles.details}>
						<div className={clsx('cursor-pointer', styles.search)}>
							<div
								className={styles.overlay}
								onClick={() => setIsOpen(false)}
								style={{ display: isOpen ? 'block' : 'none' }}
							></div>
							<Image
								src='/search.svg'
								alt='search'
								width={26}
								height={26}
								onClick={() => setIsOpen(true)}
							/>
							<DynamicSearch isOpen={isOpen} setIsOpen={setIsOpen} />
						</div>
						<div className={clsx('cursor-pointer', styles.profile)}>
							<Link href={'/my-account'}>
								<Image src='/user.svg' alt='profile' width={26} height={26} />
							</Link>
						</div>
						<div className={styles.cart} onClick={() => setOpenCart(!openCart)}>
							{cartCount > 9 ? '9+' : cartCount}
						</div>
					</div>
				</div>
			</motion.header>
			<DynamicCart />
		</>
	)
}

export default Header
