import {
	AttributesVar,
	WooCommerceSingleProduct
} from '@/types/wooCommerce.interface'
import { FC } from 'react'
import AdditionalInfo from './addintionalInfo/AdditionalInfo'
import styles from './ProductInfo.module.scss'
import ProductInfoItem from './productInfoItem/ProductInfoItem'

interface IProductInfo
	extends Pick<WooCommerceSingleProduct, 'acf' | 'weight' | 'dimensions'> {
	attributes?: AttributesVar[]
}

const ProductInfo: FC<IProductInfo> = ({
	acf,
	weight,
	dimensions,
	attributes
}) => {
	return (
		<div className={styles.info}>
			{acf.title_de && acf.text_de && (
				<ProductInfoItem text={acf.text_de} title={acf.title_de} />
			)}
			{acf.title_subs && acf.text_subs && (
				<ProductInfoItem text={acf.text_subs} title={acf.title_subs} />
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
			{acf.text_sp && acf.title_sp && (
				<ProductInfoItem text={acf.text_sp} title={acf.title_sp} />
			)}
		</div>
	)
}

export default ProductInfo
