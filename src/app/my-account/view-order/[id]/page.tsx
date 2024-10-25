import { getSingleOrder } from '@/components/ui/myAccount/customersActions'
import SingleOrder from '@/components/ui/myAccount/singleOrderPay/SingleOrder'
import { FC } from 'react'

interface SingleOrderPayProps {
	params: {
		id: string
	}
}

const SingleOrderPay: FC<SingleOrderPayProps> = async ({ params }) => {
	const { data } = await getSingleOrder(params.id)
	return data && <SingleOrder data={data} />
}

export default SingleOrderPay
