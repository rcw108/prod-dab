'use client'

import DifferenceSection from '@/components/ui/home/differenceSection/DifferenceSection'
import FormSection from '@/components/ui/home/formSection/FormSection'
import ReviewsSectionShop from '@/components/ui/shop/reviewSectionShop/ReviewSectionShop'
import QATest from '@/components/ui/singleProducts/singleTemplate/qATest/QATest'
import VariableCard from '@/components/ui/singleProducts/variableCard/VariableCard'
import HowToUse from '@/components/ui/singleProducts/variableTemplate/howToUse/HowToUse'
import Vibe from '@/components/ui/singleProducts/variableTemplate/vibe/Vibe'
import VsSection from '@/components/ui/singleProducts/variableTemplate/vSSection/VsSection'
import { useActions } from '@/hooks/useActions'
import { useGetAllSingleProducts } from '@/hooks/useGetAllSingleProducts'
import { useProducts } from '@/hooks/useProducts'
import { usePushCookieUserCart } from '@/hooks/usePushCookieUserCart'
import { VariableSingle } from '@/types/singleTemplates/variableSingle.interface'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import { FC, useEffect } from 'react'
import VariableHeader from '../../ui/singleProducts/singleHeader/VariableHeader'
import styles from './SingleStyles.module.scss'

interface IVariableSingle {
	data: WooCommerceSingleProduct
	template: VariableSingle
}

const VariableSinglePage: FC<IVariableSingle> = ({ data, template }) => {
	usePushCookieUserCart()

	const { pushAllProducts } = useActions()
	const { products: allProducts } = useProducts()

	const { products } = useGetAllSingleProducts()

	useEffect(() => {
		if (allProducts) return
		pushAllProducts(products)
	}, [products])

	console.log(
		template.acf.button_how,
		template.acf.button_qual,
		template.acf.button_diff
	)

	return (
		<main>
			<VariableHeader acf={template.acf} product={data}>
				<VariableCard
					{...data}
					product={data}
					relax={template.acf.relax}
					star_image={template.acf.star_image}
					text_descr={template.acf.text_descr}
					text_sp={template.acf.text_sp}
					title_descr={template.acf.title_descr}
					title_sp={template.acf.title_sp}
				/>
			</VariableHeader>
			<Vibe
				text_vibe={template.acf.text_vibe}
				title_vibe={template.acf.title_vibe}
				vibe_repeater={template.acf.vibe_repeater}
			/>
			<HowToUse
				button_how={template.acf.button_how}
				how_repeater={template.acf.how_repeater}
				text_how={template.acf.text_how}
				title_how={template.acf.title_how}
			/>
			<VsSection
				text_vs={template.acf.text_vs}
				title_vs={template.acf.title_vs}
				vs_repeater={template.acf.vs_repeater}
				dabpens_logo={template.acf.dabpens_logo}
			/>
			<QATest
				background_image_qual={template.acf.background_image_qual}
				button_qual={template.acf.button_qual}
				content_qual={template.acf.content_qual}
				subtitle_qual={template.acf.subtitle_qual}
				title_qual={template.acf.title_qual}
			/>
			<ReviewsSectionShop
				reviews_repeater={template.acf.review_repeater}
				subtitle_review={template.acf.text_rev}
				title_review={template.acf.title_rev}
			/>
			<DifferenceSection
				blocks_d={template.acf.content_diff}
				link_d={template.acf.button_diff}
				text_d={template.acf.subtitle_diff}
				title_d={template.acf.title_diff}
				classNameWrap={styles.diffVar}
				className={styles.diffBlock}
			/>
			<FormSection
				background_image_form={template.acf.background_image_frm}
				form_description={template.acf.description_frm}
				form_title={template.acf.title_frm}
			/>
		</main>
	)
}

export default VariableSinglePage
