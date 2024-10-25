'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

interface CartContextType {
	openCart: boolean
	setOpenCart: (open: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: ReactNode }> = ({
	children
}) => {
	const [openCart, setOpenCart] = useState<boolean>(false)

	return (
		<CartContext.Provider value={{ openCart, setOpenCart }}>
			{children}
		</CartContext.Provider>
	)
}

export const useCartContext = () => {
	const context = useContext(CartContext)
	if (context === undefined) {
		throw new Error('useCartContext must be used within a CartProvider')
	}
	return context
}
