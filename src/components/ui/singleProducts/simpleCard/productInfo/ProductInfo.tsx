import {
	AttributesVar,
	WooCommerceSingleProduct
} from '@/types/wooCommerce.interface'
import { FC } from 'react'
import AdditionalInfo from './addintionalInfo/AdditionalInfo'
import styles from './ProductInfo.module.scss'
import ProductInfoItem from './productInfoItem/ProductInfoItem'

interface IProductInfo
	extends Pick<WooCommerceSingleProduct, 'weight' | 'dimensions'> {
	attributes?: AttributesVar[]
	title_de: string
	text_de: string
	title_subs?: string
	text_subs?: string
	text_sp: string
	title_sp: string
}

const ProductInfo: FC<IProductInfo> = ({
	weight,
	dimensions,
	attributes,
	title_de,
	text_de,
	title_subs,
	text_subs,
	text_sp,
	title_sp
}) => {
	return (
		<div className={styles.info}>
			{title_de && text_de && (
				<ProductInfoItem text={text_de} title={title_de} />
			)}
			{title_subs && text_subs && (
				<ProductInfoItem text={text_subs} title={title_subs} />
			)}
			{weight ||
			(dimensions.length !== '' &&
				dimensions.width !== '' &&
				dimensions.height !== '') ? (
				<ProductInfoItem
					title='Additional Information'
					text='Additional Information'
				>
					{weight && <AdditionalInfo text={`${weight} g`} title='Weight' />}
					{dimensions &&
						dimensions.length !== '' &&
						dimensions.width !== '' &&
						dimensions.height !== '' && (
							<AdditionalInfo
								text={`${dimensions.length} × ${dimensions.width} × ${dimensions.height} in`}
								title='Dimensions'
							/>
						)}
				</ProductInfoItem>
			) : attributes && attributes[0].name && attributes[0].options ? (
				<ProductInfoItem
					title='Additional Information'
					text='Additional Information'
				>
					{attributes[0].name && (
						<AdditionalInfo
							text={attributes[0].options.join(', ')}
							title={attributes[0].name}
						/>
					)}
				</ProductInfoItem>
			) : null}
			{text_sp && title_sp && (
				<ProductInfoItem text={text_sp} title={title_sp} />
			)}
		</div>
	)
}

export default ProductInfo
