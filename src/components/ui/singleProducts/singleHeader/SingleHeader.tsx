import MarqueeItem from '@/components/ui/home/headSection/marqueeItem/MarqueeItem'
import { SimpleSingle } from '@/types/singleTemplates/simpleSingle.interface'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import { FC, PropsWithChildren } from 'react'
import Marquee from 'react-fast-marquee'
import styles from './SingleHeader.module.scss'

interface IHeadSingle extends SimpleSingle {
	product: WooCommerceSingleProduct
}

const SingleHeader: FC<PropsWithChildren<IHeadSingle>> = ({
	children,
	product,
	acf
}) => {
	return (
		<section className={styles.head}>
			<div className='container'>
				<div
					className={styles.box}
					style={{ backgroundImage: `url(${acf.head_section_background})` }}
				>
					<div
						className={styles.headMarquee}
						style={{
							backgroundImage: `url(${acf.move_line_background_image})`
						}}
					>
						{acf.move_line_content && (
							<Marquee speed={50}>
								{[...acf.move_line_content, ...acf.move_line_content].map(
									(item, index) => {
										return (
											<MarqueeItem
												classNameText={styles.marqTextTop}
												key={index}
												{...item}
											/>
										)
									}
								)}
							</Marquee>
						)}
					</div>
					<div className={styles.content}>{children}</div>
					<div
						className={styles.bottomMarquee}
						style={{
							backgroundImage: `url(${acf.bottom_move_line_background})`
						}}
					>
						{acf.bottom_move_line_content && (
							<Marquee speed={50}>
								{[
									...acf.bottom_move_line_content,
									...acf.bottom_move_line_content
								].map((item, index) => {
									return (
										<MarqueeItem
											classNameImage={styles.icon}
											classNameText={styles.marqText}
											className={styles.marqItem}
											key={index}
											{...item}
										/>
									)
								})}
							</Marquee>
						)}
					</div>
				</div>
			</div>
		</section>
	)
}

export default SingleHeader
