'use client'

import { useActions } from '@/hooks/useActions'
import { useUser } from '@/hooks/useUser'
import Link from 'next/link'
import { FC } from 'react'
import styles from './Dashboard.module.scss'
const Dashboard: FC = () => {
	const user = useUser()
	const { logout } = useActions()

	if (!user) {
		return null
	}

	return (
		<div className='bg-[#0D0D0D] min-h-96'>
			<h6 className={styles.title}>
				Hello <span className={styles.userName}>{user.display_name}</span> (not{' '}
				<span className={styles.userName}>{user.display_name}</span>?{' '}
				<span className={styles.logout} onClick={() => logout()}>
					Log out
				</span>
				)
			</h6>
			<p className={styles.text}>
				From your account dashboard you can view your{' '}
				<Link href='/my-account/orders'>recent orders</Link>, manage your{' '}
				<Link href='/my-account/edit-addresses'>
					shipping and billing addresses
				</Link>
				, and{' '}
				<Link href='/my-account/edit-account'>
					edit your password and account details.
				</Link>
			</p>
		</div>
	)
}

export default Dashboard
