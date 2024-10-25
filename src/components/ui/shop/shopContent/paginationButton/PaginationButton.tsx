import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'

import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import styles from '../ShopContent.module.scss'

interface IPaginationButton {
	variant: 'prev' | 'next'
	togglePagination: (value: number) => void
	currentPagination: number
	filteredProducts: () => WooCommerceSingleProduct[]
	progressPagination: number
}

const PaginationButton: FC<IPaginationButton> = ({
	currentPagination,
	togglePagination,
	variant,
	progressPagination,
	filteredProducts
}) => {
	const prevHandler = () => togglePagination(currentPagination / 12 - 1)

	const nextHandler = () => togglePagination(currentPagination / 12 + 1)

	if (variant === 'prev') {
		return (
			<div className={styles.prev}>
				<button
					className={clsx(styles.prevBtn, {
						[styles.disabled]: currentPagination === 0
					})}
					onClick={() => {
						togglePagination(currentPagination / 12 - 1)
					}}
				>
					<Image
						style={{ transform: 'rotate(180deg)' }}
						src={'/arrow.svg'}
						alt='arrow'
						width={15}
						height={15}
					/>
				</button>
			</div>
		)
	}

	if (variant === 'next') {
		return (
			<div className={styles.next}>
				<button
					className={clsx(styles.nextBtn, {
						[styles.disabled]:
							progressPagination === filteredProducts().length ||
							progressPagination >= filteredProducts().length
					})}
					onClick={() => togglePagination(currentPagination / 12 + 1)}
				>
					<Image src={'/arrow.svg'} alt='arrow' width={15} height={15} />
				</button>
			</div>
		)
	}
}

export default PaginationButton
