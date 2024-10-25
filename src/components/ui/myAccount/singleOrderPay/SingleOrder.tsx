'use client'

import { useUser } from '@/hooks/useUser'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import stylesBoard from '../AccountPage.module.scss'
import { SingleOrder as ISingleOrder } from '../customer.interface'
import SingleOrderContent from './singleOrderContent/SingleOrderContent'

const DynamicNavSidebar = dynamic(() => import('../navSidebar/NavSidebar'), {
	ssr: false
})

const SingleOrder: FC<{ data: ISingleOrder }> = ({ data }) => {
	const user = useUser()

	const router = useRouter()

	if (!user) {
		router.push('/my-account')
	}

	return (
		<div className={stylesBoard.wrap}>
			<div className={stylesBoard.profileWrapper}>
				<DynamicNavSidebar />
				<SingleOrderContent data={data} />
			</div>
		</div>
	)
}

export default SingleOrder
