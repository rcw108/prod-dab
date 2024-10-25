'use client'

import { SpeedInsights } from '@vercel/speed-insights/next'
import { FC, PropsWithChildren } from 'react'
import Footer from './footer/Footer'
import Header from './header/Header'

const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Header />
			{children}
			<SpeedInsights />
			<Footer />
		</>
	)
}

export default Layout
