'use client'

import Layout from '@/components/layout/Layout'
import { store } from '@/store/store'
import { FC, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { CartProvider } from './CartContextProvider'
import HeadProvider from './HeadProvider'
import ReactQueryProvider from './ReactQueryProvider'

const MainProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<HeadProvider>
			<Provider store={store}>
				<CartProvider>
					<ReactQueryProvider>
						<Layout>{children}</Layout>
					</ReactQueryProvider>
				</CartProvider>
			</Provider>
		</HeadProvider>
	)
}

export default MainProvider
