import Faq from '@/components/ui/faq/Faq'
import { faqPageUrl } from '@/configs/page.config'
import { FAQPage } from '@/types/faq.interface'
import { FC } from 'react'

const getFAQData = async () => {
	const data: FAQPage = await fetch(`${faqPageUrl}`).then(res => res.json())
	return data
}

const FAQ: FC = async () => {
	const data = await getFAQData()

	return data && <Faq data={data} />
}

export default FAQ
