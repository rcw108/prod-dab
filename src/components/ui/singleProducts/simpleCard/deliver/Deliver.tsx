import Description from '@/components/ui/headings/Description'
import { FC } from 'react'
import styles from '../SimpleCard.module.scss'

interface IDeliver {
	sale_price: string
	handler: (value: '15%' | '20%' | '25%') => void
}

const Deliver: FC<IDeliver> = ({ sale_price, handler }) => {
	return (
		<div className={styles.deliver}>
			<Description className={styles.delTitle} title='Deliver' />
			<div className={styles.selectBox}>
				<select
					onChange={e => handler(e.target.value as '15%' | '20%' | '25%')}
				>
					<option value={'20%'}>
						Every month for {`$${(+sale_price * 0.8).toFixed(2)}`} (20% off)
					</option>
					<option value={'25%'}>
						Every 2 weeks for {`$${(+sale_price * 0.75).toFixed(2)}`} (25% off)
					</option>
					<option value={'15%'}>
						Every 2 months for {`$${(+sale_price * 0.85).toFixed(2)}`} (15% off)
					</option>
				</select>
			</div>
		</div>
	)
}

export default Deliver
