'use client'

import { SpeedInsights } from '@vercel/speed-insights/next'
import { FC, PropsWithChildren } from 'react'
import Footer from './footer/Footer'
import Header from './header/Header'
import { useTopBar } from './header/topbar/useTopBar'

const Layout: FC<PropsWithChildren> = ({ children }) => {
	const { data, isLoading } = useTopBar()
	return (
		<>
			<Header data={data} isLoading={isLoading} />
			{children}
			<SpeedInsights />
			<Footer options={data} />
		</>
	)
}

export default Layout
