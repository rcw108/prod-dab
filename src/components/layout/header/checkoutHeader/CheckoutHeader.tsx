'use client'

import SmallHeading from '@/components/ui/headings/SmallHeading'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './CheckoutHeader.module.scss'
import { useCheckoutHeader } from './useCheckoutHeader'
const CheckoutHeader: FC = () => {
	const { data, isLoading } = useCheckoutHeader()

	if (isLoading) return <SkeletonLoader count={1} width={'100%'} height={64} />

	return (
		data && (
			<header>
				<div className={styles.topBar}>
					<Image
						src={data.acf.top_bar_icon}
						alt='top bar icon'
						width={28}
						height={28}
					/>
					<SmallHeading
						className={styles.title}
						title={ReactHtmlParser(data.acf.top_bar_text)}
					/>
				</div>
				<div className={styles.logotype}>
					<Link href='/'>
						<Image
							src={data.acf.logotype}
							alt='logotype'
							width={191}
							height={59}
						/>
					</Link>
				</div>
			</header>
		)
	)
}

export default CheckoutHeader
