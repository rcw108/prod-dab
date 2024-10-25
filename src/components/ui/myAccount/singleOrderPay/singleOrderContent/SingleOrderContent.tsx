'use client'

import Description from '@/components/ui/headings/Description'
import SmallHeading from '@/components/ui/headings/SmallHeading'
import { useProducts } from '@/hooks/useProducts'
import { useUser } from '@/hooks/useUser'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { SingleNote, SingleOrder } from '../../customer.interface'
import { getOrderNotesByOrderId } from '../../customersActions'
import ItemOrder from './ItemOrder'
import styles from './SingleOrderContent.module.scss'

const options = {
	weekday: 'long' as 'long', // Убедитесь, что типы указаны правильно
	day: 'numeric' as 'numeric',
	month: 'long' as 'long',
	year: 'numeric' as 'numeric',
	hour: '2-digit' as '2-digit',
	minute: '2-digit' as '2-digit',
	second: '2-digit' as '2-digit',
	hour12: true
}

const SingleOrderContent: FC<{ data: SingleOrder }> = ({ data }) => {
	const [orderNotes, setOrderNotes] = useState<SingleNote[] | []>()
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const user = useUser()
	const { products } = useProducts()

	useEffect(() => {
		const fetchUserOrdersNotes = async (id: number) => {
			setLoading(true)
			const result = await getOrderNotesByOrderId(id)
			if (result.success) {
				setOrderNotes(result.data)
			} else {
				setError(result.error || 'Failed to fetch orders')
			}
			setLoading(false)
		}

		fetchUserOrdersNotes(Number(data.id))
	}, [data])

	console.log(orderNotes)

	const customerNotes = (orderNotes || []).filter(note => note.customer_note)

	return (
		<div className={styles.single}>
			<Description
				title={`Order #${data.id} was placed on ${new Date(
					data.date_created
				).toLocaleDateString('en-US', {
					day: 'numeric',
					month: 'long',
					year: 'numeric'
				})} and is currently ${data.status}`}
				className='text-black'
			/>
			<SmallHeading title='Order updates' className={styles.title} />
			{customerNotes && customerNotes.length > 0 ? (
				customerNotes.map(
					(note, index) =>
						note.customer_note && (
							<div key={note.id} className={styles.note}>
								<span>{index + 1}.</span>
								<div>
									<Description
										title={new Date(note.date_created)
											.toLocaleString('en-US', options)
											.replace(',', '')}
									/>
									<Description title={note.note} className='text-black' />
								</div>
							</div>
						)
				)
			) : (
				<div></div>
			)}
			<div className={styles.orderDetail}>
				<SmallHeading title='Order details' className={styles.title} />
				<div className={styles.box}>
					<div className={styles.item}>
						<ItemOrder value='Product' variant='left' />
						<ItemOrder value='Total' variant='right' />
					</div>
					<div className={styles.item}>
						<div className={styles.left}>
							{data.line_items?.map(item => (
								<>
									<Link
										href={`/products/${products?.find(product => product.id === item.product_id)?.slug}`}
									>
										{item.name}
									</Link>{' '}
									x {item.quantity}
								</>
							))}
						</div>
						<div className={styles.right}>
							{data.line_items?.map(item => (
								<ItemOrder
									key={item.id * 2}
									value={`$${Number(products?.find(product => product.id === item.product_id)?.price) * item.quantity}`}
									variant='right'
								/>
							))}
						</div>
					</div>
					<div className={styles.item}>
						<ItemOrder value='Subtotal:' variant='left' />
						<ItemOrder
							value={`$${data.line_items?.reduce((acc, item) => ((acc += Number(item.subtotal)), acc), 0)}`}
							variant='right'
						/>
					</div>
					<div className={styles.item}>
						<ItemOrder value='Discount:' variant='left' />
						<ItemOrder value={`-$${data.discount_total}`} variant='right' />
					</div>
					<div className={styles.item}>
						<ItemOrder value='Shipping:' variant='left' />
						<ItemOrder
							value={`${data.shipping_lines[0]?.method_title}`}
							variant='right'
						/>
					</div>
					<div className={styles.item}>
						<ItemOrder value='Total:' variant='left' />
						<ItemOrder value={`$${data.total}`} variant='right' />
					</div>
				</div>
			</div>
			<div className={styles.wrap}>
				<div className={styles.address}>
					<SmallHeading title='Billing address' className={styles.title} />
					<Description
						title={`${data.billing?.first_name} ${data.billing?.last_name}`}
						className={styles.descr}
					/>
					<Description title={data.billing?.company} className={styles.descr} />
					<Description
						title={`${data.billing?.address_1}`}
						className={styles.descr}
					/>
					<Description
						title={`${data.billing?.city}, ${data.billing?.state} ${data.billing?.postcode}`}
						className={styles.descr}
					/>
					<Description title={data.billing?.email} className={styles.descr} />
				</div>

				<div className={styles.address}>
					<SmallHeading title='Shipping address' className={styles.title} />
					<Description
						title={`${data.shipping?.first_name} ${data.shipping?.last_name}`}
						className={styles.descr}
					/>
					<Description
						title={data.shipping?.company}
						className={styles.descr}
					/>
					<Description
						title={`${data.shipping?.address_1}`}
						className={styles.descr}
					/>
					<Description
						title={`${data.shipping?.city}, ${data.shipping?.state} ${data.shipping?.postcode}`}
						className={styles.descr}
					/>
				</div>
			</div>
		</div>
	)
}

export default SingleOrderContent
