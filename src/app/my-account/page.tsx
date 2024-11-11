import AccountPage from '@/components/ui/myAccount/AccountPage'
import { myAccountUrl } from '@/configs/page.config'
import { MyAccountLayout } from '@/types/myAccount.interface'
import { FC } from 'react'

export const dynamic = 'force-dynamic'

const getMyAccountData = async () => {
	const data: MyAccountLayout = await fetch(myAccountUrl).then(res =>
		res.json()
	)
	return data
}

const MyAccount: FC = async () => {
	const data = await getMyAccountData()

	return data && <AccountPage data={data} />
}

export default MyAccount
