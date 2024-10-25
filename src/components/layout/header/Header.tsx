'use client'

import clsx from 'clsx'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, useState } from 'react'
import CheckoutHeader from './checkoutHeader/CheckoutHeader'
import styles from './Header.module.scss'
import Logotype from './logotype/Logotype'
import Menu from './menu/Menu'
import TopBar from './topbar/TopBar'

const DynamicCart = dynamic(() => import('./cart/Cart'), { ssr: false })

const DynamicSearch = dynamic(() => import('./search/Search'), { ssr: false })

const Header: FC = () => {
	const pathname = usePathname()
	const [isOpen, setIsOpen] = useState(false)

	if (pathname === '/checkout') {
		return <CheckoutHeader />
	}

	return (
		<header>
			<TopBar />
			<div className={clsx('header-line', styles.main)}>
				<Logotype />
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
					<DynamicCart />
				</div>
			</div>
		</header>
	)
}

export default Header
