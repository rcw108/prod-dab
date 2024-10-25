import Link from 'next/link'
import { FC } from 'react'
import styles from './PaymentContent.module.scss'

const PaymentContent: FC = () => {
	return (
		<>
			<div className={styles.noSub}>
				<span>No saved methods found. </span>
			</div>
			<Link href={'/my-account/add-payment-method'} className={styles.add}>
				Add payment method
			</Link>
		</>
	)
}

export default PaymentContent
