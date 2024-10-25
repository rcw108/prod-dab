import { FC } from 'react'
import styles from './SingleOrderContent.module.scss'

interface IItemOrder {
	value: string
	variant: 'left' | 'right'
}
const ItemOrder: FC<IItemOrder> = ({ value, variant }) => {
	return <div className={styles[variant]}>{value}</div>
}

export default ItemOrder
