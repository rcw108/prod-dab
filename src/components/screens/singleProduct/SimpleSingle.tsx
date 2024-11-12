'use client'

import DifferenceSection from '@/components/ui/home/differenceSection/DifferenceSection'
import FaqSection from '@/components/ui/home/faqSection/FaqSection'
import FormSection from '@/components/ui/home/formSection/FormSection'
import MarqueeItem from '@/components/ui/home/headSection/marqueeItem/MarqueeItem'
import Steps from '@/components/ui/home/steps/Steps'
import ReviewsContent from '@/components/ui/reviews/reviewsContent/ReviewsContent'
import MarqueeLineSection from '@/components/ui/shop/marqueeLineSection/MarqueeLineSection'
import AlsoLove from '@/components/ui/singleProducts/singleTemplate/alsoLove/AlsoLove'
import Miss from '@/components/ui/singleProducts/singleTemplate/dontMiss/Miss'
import QATest from '@/components/ui/singleProducts/singleTemplate/qATest/QATest'
import { useActions } from '@/hooks/useActions'
import { useGetAllSingleProducts } from '@/hooks/useGetAllSingleProducts'
import { useProducts } from '@/hooks/useProducts'
import { usePushCookieUserCart } from '@/hooks/usePushCookieUserCart'
import { SimpleSingle } from '@/types/singleTemplates/simpleSingle.interface'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import { FC, Suspense, useEffect, useRef } from 'react'
import Marquee from 'react-fast-marquee'
import SimpleCard from '../../ui/singleProducts/simpleCard/SimpleCard'
import SingleHeader from '../../ui/singleProducts/singleHeader/SingleHeader'
import styles from './SingleStyles.module.scss'
interface ISimpleSingle {
	data: WooCommerceSingleProduct
	template: SimpleSingle
}

const SimpleSinglePage: FC<ISimpleSingle> = ({ data, template }) => {
	usePushCookieUserCart()
	const contentBlockRef = useRef<HTMLDivElement>(null)

	const { pushAllProducts } = useActions()
	const { products: allProducts } = useProducts()

	const { products, isLoading } = useGetAllSingleProducts()

	useEffect(() => {
		if (allProducts) return
		pushAllProducts(products)
	}, [products])

	return (
		<main>
			<SingleHeader acf={template.acf} product={data}>
				<SimpleCard
					{...data}
					product={data}
					author={template.acf.author}
					rate_image={template.acf.rate_image}
					rate_text={template.acf.rate_text}
					review_text={template.acf.review_text}
					star_image={template.acf.star_image}
					text_sp={template.acf.text_sp}
					text_subs={template.acf.text_subs}
					title_sp={template.acf.title_sp}
					title_subs={template.acf.title_subs}
					title_descr={template.acf.title_descr}
					text_descr={template.acf.text_descr}
				/>
			</SingleHeader>
			<Steps
				link_st={{ url: '', target: '', title: '' }}
				st_bg=''
				steps_st={template.acf.single_steps}
				text_st={template.acf.subtitle_sin_steps}
				title_st={template.acf.title_sin_steps}
				className={styles.singleSteps}
				classNameTitle={styles.singleStepsTitle}
				classNameDescr={styles.singleStepsDescr}
				classNameStep={styles.singleStepsStep}
			/>
			<QATest
				background_image_qual={template.acf.background_image_qual}
				button_qual={template.acf.button_qual}
				content_qual={template.acf.content_qual}
				subtitle_qual={template.acf.subtitle_qual}
				title_qual={template.acf.title_qual}
			/>
			<DifferenceSection
				blocks_d={template.acf.content_diff}
				link_d={template.acf.button_diff}
				text_d={template.acf.subtitle_diff}
				title_d={template.acf.title_diff}
			/>
			<MarqueeLineSection
				marquee_line_bg={template.acf.move_section_background}
				marquee_line_repeater={template.acf.content_move_s}
			/>
			<div className='archon' ref={contentBlockRef}></div>
			<Suspense fallback={<div>Loading...</div>}>
				<ReviewsContent
					contentBlockRef={contentBlockRef}
					className='bg-black'
					classNameText='text-white'
					classNameTitle={styles.titleContentShop}
					classNamePag={styles.paginationShop}
				/>
			</Suspense>
			<FaqSection
				bg_f={template.acf.backgoround_faq}
				faqs_f={template.acf.tabs_faq}
				text_f={template.acf.subtitle_faq}
				title_f={template.acf.title_faq}
			/>
			<Miss
				button_miss={template.acf.button_miss}
				current_price_miss={template.acf.current_price_miss}
				description_miss={template.acf.description_miss}
				image_gallery_miss={template.acf.image_gallery_miss}
				title_miss={template.acf.title_miss}
				old_price_miss={template.acf.old_price_miss}
				rate_image={template.acf.rate_image}
				rate_text={template.acf.rate_text}
				save_miss={template.acf.save_miss}
				subscribe_text_miss={template.acf.subscribe_text_miss}
				subtitle_miss={template.acf.subtitle_miss}
			/>
			<div
				className={styles.marquee}
				style={{
					backgroundImage: `url(${template.acf.move_line_background_image})`
				}}
			>
				{template.acf.move_line_content && (
					<Marquee speed={50}>
						{[
							...template.acf.move_line_content,
							...template.acf.move_line_content
						].map((item, index) => {
							return <MarqueeItem key={index} {...item} />
						})}
					</Marquee>
				)}
			</div>
			{products && (
				<AlsoLove
					loading={isLoading}
					products={products}
					title={template.acf.title_lv}
					description={template.acf.subtitle_lv}
				/>
			)}
			<FormSection
				background_image_form={template.acf.background_image_frm}
				form_title={template.acf.title_frm}
				form_description={template.acf.description_frm}
			/>
		</main>
	)
}

export default SimpleSinglePage
