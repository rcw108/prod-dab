'use client'

import { useActions } from '@/hooks/useActions'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'
import styles from './NavSidebar.module.scss'
const NavSidebar: FC = () => {
	const pathname = usePathname()

	const { logout } = useActions()

	console.log(pathname)

	return (
		<div className={styles.navUser}>
			<nav>
				<ul>
					<li>
						<Link
							href='/my-account'
							className={clsx(pathname === '/my-account' ? styles.active : '')}
						>
							Dashboard{' '}
							<Image
								src='/dashboard.svg'
								alt='dashboard'
								width={20}
								height={20}
							/>
						</Link>
					</li>
					<li>
						<Link
							className={clsx(
								pathname === '/my-account/orders' ||
									pathname === '/my-account/view-order/20686'
									? styles.active
									: ''
							)}
							href='/my-account/orders'
						>
							Orders{' '}
							<Image src={'/orders.svg'} alt='orders' width={20} height={20} />
						</Link>
					</li>
					<li>
						<Link
							className={clsx(
								pathname === '/my-account/subscriptions' ? styles.active : ''
							)}
							href='/my-account/subscriptions'
						>
							Subscriptions{' '}
							<Image
								src={'/subscriptions.svg'}
								alt='subscriptions'
								width={20}
								height={20}
							/>{' '}
						</Link>
					</li>
					<li>
						<Link
							className={clsx(
								pathname === '/my-account/edit-address' ||
									pathname === '/my-account/edit-address/billing' ||
									pathname === '/my-account/edit-address/shipping'
									? styles.active
									: ''
							)}
							href='/my-account/edit-address'
						>
							Addresses{' '}
							<Image
								src={'/addresses.svg'}
								alt='addresses'
								width={20}
								height={20}
							/>{' '}
						</Link>
					</li>
					<li>
						<Link
							className={clsx(
								pathname === '/my-account/payment-methods' ? styles.active : ''
							)}
							href='/my-account/payment-methods'
						>
							Payment methods{' '}
							<Image
								src={'/payment-detail.svg'}
								alt='Payment methods'
								width={20}
								height={20}
							/>{' '}
						</Link>
					</li>
					<li>
						<Link
							className={clsx(
								pathname === '/my-account/edit-account' ? styles.active : ''
							)}
							href='/my-account/edit-account'
						>
							Account details{' '}
							<Image
								src={'/account-details.svg'}
								alt='account details'
								width={20}
								height={20}
							/>{' '}
						</Link>
					</li>
					<li>
						<div onClick={() => logout()} className={styles.logout}>
							Log out{' '}
							<Image src={'/logout.svg'} alt='logout' width={20} height={20} />{' '}
						</div>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default NavSidebar
