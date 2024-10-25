import CertificateContent from '@/components/ui/certificate-of-analysis/certificateContent/CertificateContent'
import Description from '@/components/ui/headings/Description'
import FormSection from '@/components/ui/home/formSection/FormSection'
import HeadAccountSection from '@/components/ui/myAccount/headAccountSection/HeadAccountSection'
import TitleAccountSection from '@/components/ui/myAccount/titleAccountSection/TitleAccountSection'
import { ICertificateOfAnalysis } from '@/types/certificate-of-analysis.interface'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './CertificateOfAnalysisPage.module.scss'
const CertificateOfAnalysisPage: FC<{ data: ICertificateOfAnalysis }> = ({
	data
}) => {
	return (
		<main className='bg-white'>
			<HeadAccountSection
				contentLines={data.acf.info_line_sp.map(item => {
					return {
						icon: false,
						text: item.list
					}
				})}
			/>
			<TitleAccountSection
				background_image={data.acf.banner_image_sp}
				title={data.acf.m_title_ser_p}
				background_image_mobile={data.acf.banner_image_sp_mobile}
				className={styles.title}
			/>
			<div className={styles.textContent}>
				<Description
					className={styles.text}
					title={ReactHtmlParser(data.content.rendered)}
				/>
			</div>
			<CertificateContent certifications_sp={data.acf.certifications_sp} />
			<HeadAccountSection
				contentLines={data.acf.info_line_sp.map(item => {
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

export default CertificateOfAnalysisPage
