'use client'

import SkeletonLoader from '@/components/ui/SkeletonLoader'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, useState } from 'react'
import styles from './Menu.module.scss'
import { useMenu } from './useMenu'
const Menu: FC = () => {
	const { data, isLoading } = useMenu()

	const pathname = usePathname()

	const headerMenu = data?.filter(item => item.name === 'Primary Menu')

	console.log(headerMenu, data)

	const [openMenu, setOpenMenu] = useState(false)

	const isActive = (url: string) => {
		// Для главной страницы
		if (url === '/' && pathname === '/') return true
		// Для остальных страниц
		if (url !== '/' && pathname.startsWith(url)) return true
		return false
	}

	return (
		<>
			<nav className={styles.menu}>
				<ul className='flex gap-6'>
					{isLoading ? (
						<SkeletonLoader count={6} width={60} height={28} />
					) : headerMenu ? (
						headerMenu[0].fields.map(item => (
							<li
								className={clsx(styles.menuItem, {
									[styles.selected]: isActive(item.url)
								})}
								key={item.title}
							>
								<Link href={item.url}>{item.title}</Link>
							</li>
						))
					) : null}
				</ul>
			</nav>
			<nav className={styles.menuMobile}>
				<div className={styles.icon} onClick={() => setOpenMenu(!openMenu)}>
					<span></span>
					<span></span>
					<span></span>
				</div>
				<ul
					className={clsx(styles.mobileWrapper, { [styles.active]: openMenu })}
				>
					<div className={styles.close}>
						<Image
							src={'/close-menu.svg'}
							alt='close'
							width={40}
							height={40}
							onClick={() => setOpenMenu(false)}
							className={'cursor-pointer'}
						/>
					</div>
					<div className={styles.items}>
						{isLoading ? (
							<SkeletonLoader count={6} width={60} height={28} />
						) : headerMenu ? (
							headerMenu[0].fields.map(item => (
								<li
									className={clsx(styles.menuItem, {
										[styles.selected]: isActive(item.url)
									})}
									onClick={() => setOpenMenu(false)}
									key={item.title}
								>
									<Link href={item.url}>{item.title}</Link>
								</li>
							))
						) : null}
					</div>
				</ul>
			</nav>
		</>
	)
}

export default Menu
