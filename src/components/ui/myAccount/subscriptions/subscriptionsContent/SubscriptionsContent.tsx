'use client'

import { useGetAuthorizeToken } from '@/hooks/useGetAuthorizeToken'
import { useGlobalUser } from '@/hooks/useGlobalUser'
import { useUser } from '@/hooks/useUser'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { SingleSubscribe } from '../../customer.interface'
import { getCustomerSubscribes } from '../../customersActions'
import styles from './SubscriptionsContent.module.scss'
const SubscriptionsContent: FC = () => {
	const [userSubs, setUserSubs] = useState<SingleSubscribe[] | []>()
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const user = useUser()

	useEffect(() => {
		const fetchUserOrders = async (id: number) => {
			setLoading(true)
			const result = await getCustomerSubscribes(id)
			if (result.success) {
				setUserSubs(result.data)
			} else {
				setError(result.error?.message || 'Failed to fetch orders')
			}
			setLoading(false)
		}

		if (user) fetchUserOrders(Number(user.ID))
	}, [user])

	const { authorize } = useGlobalUser()
	const { fetchAuthorizeToken } = useGetAuthorizeToken()

	useEffect(() => {
		if (authorize === null) {
			fetchAuthorizeToken(Number(user?.ID))
		}
	})

	if (loading) return <div>Loading...</div>
	if (error) return <div>Error</div>

	return (
		<div className={styles.subs}>
			{userSubs && userSubs?.length > 0 ? (
				<>
					<div className={styles.subHead}>
						<h6 className={styles.order}>Subscribe</h6>
						<h6 className={styles.date}>Date</h6>
						<h6 className={styles.status}>Status</h6>
						<h6 className={styles.total}>Total</h6>
						<h6 className={styles.action}>Actions</h6>
					</div>

					{userSubs?.map(sub => (
						<div className={styles.subBody} key={sub.id}>
							<Link
								href={`/my-account/view-subscription/${sub.id}`}
								className={styles.order}
							>
								#{sub.id}
							</Link>
							<h6 className={styles.date}>
								{new Date(sub.date_created).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})}
							</h6>
							<h6 className={styles.status}>{sub.status}</h6>
							<h6 className={styles.total}>${sub.total}</h6>
							<div className={styles.action}>
								<Link
									href={`/my-account/view-subscription/${sub.id}`}
									className={styles.view}
								>
									View
								</Link>
								<Link
									href={`/my-account/view-subscription/${sub.id}`}
									className={styles.view}
								>
									Hold
								</Link>
								<Link
									href={`/my-account/view-subscription/${sub.id}`}
									className={styles.view}
								>
									Cancel
								</Link>
							</div>
						</div>
					))}
				</>
			) : (
				<div className={styles.noSub}>
					<span>You have no active subscriptions. </span>
					<Link href={'/shop'}>Browse products</Link>
				</div>
			)}
		</div>
	)
}

export default SubscriptionsContent
