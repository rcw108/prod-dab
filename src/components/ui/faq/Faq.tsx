import { FAQPage } from '@/types/faq.interface'
import clsx from 'clsx'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import Description from '../headings/Description'
import FormSection from '../home/formSection/FormSection'
import HeadAccountSection from '../myAccount/headAccountSection/HeadAccountSection'
import TitleAccountSection from '../myAccount/titleAccountSection/TitleAccountSection'
import styles from './Faq.module.scss'
import FaqInfoSection from './faqInfoSection/FaqInfoSection'

const Faq: FC<{ data: FAQPage }> = ({ data }) => {
	return (
		<main>
			<HeadAccountSection
				contentLines={data.acf.info_line.map(item => {
					return {
						icon: false,
						text: item.listline_f
					}
				})}
			/>
			<TitleAccountSection
				background_image={data.acf.image_mf}
				background_image_mobile={data.acf.image_mf_mobile}
				title={data.acf.titlep_f}
			/>
			<FaqInfoSection faqs_fp={data.acf.faqs_fp} />
			<div className='bg-white'>
				<div className={clsx('container', styles.policy)}>
					<Description
						className={styles.title}
						title={ReactHtmlParser(data.acf.content)}
					/>
				</div>
			</div>
			<HeadAccountSection
				contentLines={data.acf.info_line.map(item => {
					return {
						icon: false,
						text: item.listline_f
					}
				})}
			/>
			<FormSection
				background_image_form={data.acf.background_image_form}
				form_description={data.acf.form_description}
				form_title={data.acf.form_title}
				className='mt-10'
			/>
		</main>
	)
}

export default Faq
