import FormSection from '@/components/ui/home/formSection/FormSection'
import HeadAccountSection from '@/components/ui/myAccount/headAccountSection/HeadAccountSection'
import TitleAccountSection from '@/components/ui/myAccount/titleAccountSection/TitleAccountSection'
import { myAccountUrl } from '@/configs/page.config'
import { MyAccountLayout as IMyAccount } from '@/types/myAccount.interface'
import { FC, PropsWithChildren } from 'react'

const getMyAccountData = async () => {
	const data: IMyAccount = await fetch(myAccountUrl).then(res => res.json())
	return data
}

const MyAccountLayout: FC<PropsWithChildren> = async ({ children }) => {
	const data = await getMyAccountData()

	return (
		<main>
			<HeadAccountSection contentLines={data.acf.content_line} />
			<TitleAccountSection
				background_image={data.acf.background_image}
				background_image_mobile={data.acf.background_image_mobile}
				title={data.acf.title}
			/>
			{children}
			<FormSection
				background_image_form={data.acf.background_image_form}
				form_description={data.acf.form_description}
				form_title={data.acf.form_title}
			/>
		</main>
	)
}

export default MyAccountLayout
