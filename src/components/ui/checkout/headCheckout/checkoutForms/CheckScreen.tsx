import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import styles from './CheckoutForms.module.scss'
const CheckScreen: FC<{ data: any }> = ({ data }) => {
	return (
		<div>
			<div className='container'>
				<div className={styles.checkAfterPay}>
					<h6>
						Your order: <span>#{data.order.id}</span> successfully placed
					</h6>
					<h6>Total: ${data.order.total}</h6>
					<h6>Discount: ${data.order.discount_total}</h6>
					<div className={styles.items}>
						Items:
						{data.order.line_items.map((item: any) => (
							<div className={styles.item} key={item.id}>
								<div className={styles.img}>
									<Image
										src={item.image.src}
										alt={item.name}
										width={50}
										height={50}
									/>
								</div>
								<div className={styles.info}>
									<p className={styles.name}>{item.name}</p>
									<p>${item.price}</p>
									<p>x{item.quantity}</p>
								</div>
							</div>
						))}
					</div>
					<Link className='underline' href={'/shop'}>
						Go to Shop
					</Link>
				</div>
			</div>
		</div>
	)
}

export default CheckScreen
