'use client'

import { BundleItem } from '@/store/cart/cart.interface'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import stylesSimpleCard from '../../simpleCard/SimpleCard.module.scss'
import { BundleItemSingle } from '../BundleCard'
import styles from './BundleSingleItem.module.scss'

interface BundleSingleItemProps extends BundleItemSingle {
	handler: (items: BundleItem[]) => void
	items: BundleItem[]
}

const BundleSingleItem: FC<BundleSingleItemProps> = ({
	id,
	image,
	name,
	slug,
	stock_status,
	stock_quantity,
	tags,
	items,
	handler
}) => {
	const [count, setCount] = useState(0)

	useEffect(() => {
		transferData(count)
	}, [count])

	const handlerClick = (variant: 'minus' | 'plus') => {
		setCount(prevCount => {
			const newCount =
				variant === 'minus'
					? Math.max(0, prevCount - 1)
					: Math.min(stock_quantity, prevCount + 1)
			return newCount
		})
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = Math.max(
			0,
			Math.min(stock_quantity, parseInt(e.target.value) || 0)
		)
		setCount(newValue)
	}

	const transferData = (newCount: number) => {
		const itemCounts = items.filter(item => item.id !== id)
		if (newCount > 0) {
			const newItem = {
				id,
				name,
				count: newCount,
				image: image.src,
				stock: stock_status,
				stock_count: stock_quantity
			}
			itemCounts.push(newItem)
		}
		handler(itemCounts)
	}

	return (
		<div className={styles.item}>
			{tags[0] && (
				<div
					className={clsx(styles.tag, {
						[styles.indica]: tags[0].name === 'Indica',
						[styles.sativa]: tags[0].name === 'Sativa',
						[styles.hybrid]: tags[0].name === 'Hybrid'
					})}
				>
					{tags[0].name}
				</div>
			)}
			<div className={styles.wrap}>
				<div className={styles.left}>
					<Image
						src={image.src}
						className={styles.leftImage}
						alt={name}
						width={65}
						height={65}
					/>
				</div>
				<div className={styles.right}>
					<div className={styles.top}>
						<h5>
							{name}{' '}
							<span className={styles.link}>
								<Link href={`/products/${slug}`} target='_blank'>
									<Image
										src='/remote-link.svg'
										width={15}
										height={15}
										alt='link'
									/>
								</Link>
							</span>
						</h5>
					</div>
					<div
						className={clsx(styles.stock, {
							[styles.out]: stock_status !== 'in_stock'
						})}
					>
						{stock_status === 'in_stock' ? 'In Stock' : 'Out of Stock'}
					</div>
					<div className={clsx(stylesSimpleCard.count, styles.countBundle)}>
						<div
							className={clsx(stylesSimpleCard.minus, styles.minusBundle)}
							onClick={() => handlerClick('minus')}
						>
							-
						</div>
						<input
							type='number'
							value={count}
							min={0}
							max={100}
							onChange={handleInputChange}
						/>
						<div
							className={clsx(stylesSimpleCard.plus, styles.plusBundle)}
							onClick={() => handlerClick('plus')}
						>
							+
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default BundleSingleItem
