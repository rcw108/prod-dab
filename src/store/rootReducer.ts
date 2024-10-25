import { reducer as cartReducer } from './cart/cart.slice'
import { reducer as productReducer } from './products/product.slice'
import { reducer as userReducer } from './user/user.slice'

export const reducers = {
	products: productReducer,
	cart: cartReducer,
	user: userReducer
}
