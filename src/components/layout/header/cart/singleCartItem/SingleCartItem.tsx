import { useActions } from '@/hooks/useActions'
import { ItemListCount } from '@/store/cart/cart.interface'
import Image from 'next/image'
import { FC } from 'react'
import styles from './SingleCartItem.module.scss'
const SingleCartItem: FC<{
	// product: UserSingleProductCartWithCount
	listItemData: ItemListCount
}> = ({ listItemData }) => {
	const { toggleCartProduct } = useActions()

	const itemCount = listItemData.count

	return (
		<div className={styles.item}>
			<div
				className={styles.remove}
				onClick={() => toggleCartProduct(listItemData)}
			>
				<Image src='/trash.svg' alt='remove' width={14} height={14} />
			</div>
			<div className={styles.info}>
				<div className={styles.top}>
					<h6>
						{listItemData.type === 'variable'
							? `${listItemData.name} - ${listItemData.variableItems?.name}`
							: listItemData.name}
					</h6>
				</div>
				{listItemData.type === 'bundle' && listItemData.bundleItems ? (
					<div className={styles.bundleInclude}>
						<div className={styles.bundleItemsList}>
							<p>Includes:</p>
							{listItemData.bundleItems.map(item => (
								<p key={item.id} className={styles.bundleItem}>
									{item.name} × {item.count}
								</p>
							))}
						</div>
					</div>
				) : null}
				<div className={styles.bottom}>
					{listItemData &&
						(listItemData.paymentType === 'subscription'
							? `${itemCount} × ${listItemData.subscriptionPrice} ${listItemData.subscriptionPeriod}`
							: `${itemCount} × ${listItemData.price}`)}
				</div>
			</div>
			<div className={styles.image}>
				<Image
					src={listItemData.itemImage}
					alt={listItemData.name}
					width={55}
					height={55}
				/>
			</div>
		</div>
	)
}

export default SingleCartItem
