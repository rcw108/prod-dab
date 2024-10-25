'use client'

import dynamic from 'next/dynamic'
import { FC, Suspense } from 'react'

const DynamicResetPassword = dynamic(() => import('./ResetPassword'))

const ResetWeapper: FC = () => {
	return (
		<Suspense>
			<DynamicResetPassword />
		</Suspense>
	)
}

export default ResetWeapper
