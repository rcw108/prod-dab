import ContactUsPage from '@/components/screens/contact-us/ContactUsPage'
import { contactUsPageUrl } from '@/configs/page.config'
import { IContactUs } from '@/types/contact-us.interface'
import { FC } from 'react'

export const dynamic = 'force-dynamic'

const fetchContactUsData = async () => {
	const response: IContactUs = await fetch(contactUsPageUrl).then(res =>
		res.json()
	)
	return response
}

const ContactUs: FC = async () => {
	const data = await fetchContactUsData()

	return data && <ContactUsPage data={data} />
}

export default ContactUs
