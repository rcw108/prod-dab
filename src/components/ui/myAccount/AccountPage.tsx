'use client'

import { useUser } from '@/hooks/useUser'
import { MyAccountLayout } from '@/types/myAccount.interface'
import dynamic from 'next/dynamic'
import { FC, useEffect, useState } from 'react'
import styles from './AccountPage.module.scss'
const DynamicMainAuthContent = dynamic(
	() => import('./mainAuthContent/MainAuthContent'),
	{ ssr: false }
)
const DynamicDashboard = dynamic(() => import('./dashboard/Dashboard'), {
	ssr: false
})

const DynamicNavSidebar = dynamic(() => import('./navSidebar/NavSidebar'), {
	ssr: false
})

const AccountPage: FC<{ data: MyAccountLayout }> = ({ data }) => {
	const user = useUser()

	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)
	}, [])

	if (!isClient) {
		return <div className={styles.wrap}>Loading...</div>
	}

	return (
		<>
			<div className={styles.wrap}>
				{user !== null ? (
					<div className={styles.profileWrapper}>
						<DynamicNavSidebar />
						<DynamicDashboard />
					</div>
				) : (
					<DynamicMainAuthContent />
				)}
			</div>
		</>
	)
}

export default AccountPage
