import { useState } from 'react'

export const useCartMenu = () => {
	const [openCart, setOpenCart] = useState(false)

	return {
		openCart,
		setOpenCart
	}
}
