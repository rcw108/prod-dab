'use client'

import FormSection from '@/components/ui/home/formSection/FormSection'
import HeadAccountSection from '@/components/ui/myAccount/headAccountSection/HeadAccountSection'
import TitleAccountSection from '@/components/ui/myAccount/titleAccountSection/TitleAccountSection'
import ReviewsContent from '@/components/ui/reviews/reviewsContent/ReviewsContent'
import { Reviews as IReviews } from '@/types/reviews.interface'
import { FC } from 'react'
import styles from './Reviews.module.scss'

const Reviews: FC<{ layout: IReviews }> = ({ layout }) => {
	return (
		<main>
			<HeadAccountSection
				contentLines={layout.acf.list_rp.map(item => {
					return {
						icon: false,
						text: item.list
					}
				})}
			/>
			<TitleAccountSection
				background_image={layout.acf.banner_rp}
				background_image_mobile={layout.acf.banner_rp_mobile}
				title={layout.acf.title_rp}
				content={layout.content.rendered}
				className={styles.title}
			/>

			<ReviewsContent />

			<HeadAccountSection
				contentLines={layout.acf.list_rp.map(item => {
					return {
						icon: false,
						text: item.list
					}
				})}
			/>
			<FormSection
				background_image_form={layout.acf.form_bg}
				form_description={layout.acf.form_description}
				form_title={layout.acf.form_title}
				className='pt-10'
			/>
		</main>
	)
}

export default Reviews
