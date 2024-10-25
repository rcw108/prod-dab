'use client'

import ContactUsContent from '@/components/ui/contact-us/contactUsContent/ContactUsContent'
import FormSection from '@/components/ui/home/formSection/FormSection'
import HeadAccountSection from '@/components/ui/myAccount/headAccountSection/HeadAccountSection'
import TitleAccountSection from '@/components/ui/myAccount/titleAccountSection/TitleAccountSection'
import { IContactUs } from '@/types/contact-us.interface'
import { FC } from 'react'
import styles from './ContactUsPage.module.scss'
const ContactUsPage: FC<{ data: IContactUs }> = ({ data }) => {
	return (
		<main>
			<HeadAccountSection
				contentLines={data.acf.list_cp.map(item => {
					return {
						icon: false,
						text: item.list
					}
				})}
			/>
			<TitleAccountSection
				background_image={data.acf.banner_cp}
				title={data.acf.title_cp}
				className={styles.title}
				background_image_mobile={data.acf.banner_cp_mobile}
			/>

			<ContactUsContent content={data.content} />

			<HeadAccountSection
				contentLines={data.acf.list_cp.map(item => {
					return {
						icon: false,
						text: item.list
					}
				})}
			/>
			<FormSection
				background_image_form={data.acf.form_bg}
				form_description={data.acf.form_description}
				form_title={data.acf.form_title}
				className='bg-black py-10'
			/>
		</main>
	)
}

export default ContactUsPage
