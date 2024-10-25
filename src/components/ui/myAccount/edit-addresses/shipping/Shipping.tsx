'use client'

import { useUser } from '@/hooks/useUser'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import stylesBoard from '../../AccountPage.module.scss'
import ShippingContent from './shippingContent/ShippingContent'

const DynamicNavSidebar = dynamic(() => import('../../navSidebar/NavSidebar'), {
	ssr: false
})

const Shipping: FC = () => {
	const user = useUser()

	const router = useRouter()

	if (!user) {
		router.push('/my-account')
	}

	return (
		<div className={stylesBoard.wrap}>
			<div className={stylesBoard.profileWrapper}>
				<DynamicNavSidebar />
				<ShippingContent />
			</div>
		</div>
	)
}

export default Shipping
