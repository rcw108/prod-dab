'use client'

import { useUser } from '@/hooks/useUser'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import stylesBoard from '../AccountPage.module.scss'
import EditAddressesContent from './editAddressesContent/EditAddressesContent'

const DynamicNavSidebar = dynamic(() => import('../navSidebar/NavSidebar'), {
	ssr: false
})

const EditAddresses: FC = () => {
	const user = useUser()

	const router = useRouter()

	if (!user) {
		router.push('/my-account')
	}

	return (
		<div className={stylesBoard.wrap}>
			<div className={stylesBoard.profileWrapper}>
				<DynamicNavSidebar />
				<EditAddressesContent />
			</div>
		</div>
	)
}

export default EditAddresses
