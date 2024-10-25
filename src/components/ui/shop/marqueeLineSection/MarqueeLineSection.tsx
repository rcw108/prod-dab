import { ShopACF } from '@/types/shopPage.interface'
import { FC } from 'react'
import Marquee from 'react-fast-marquee'
import styles from './MarqueeLineSection.module.scss'
import SingleMarquee from './singleMarquee/SingleMarquee'

interface IMarqueeLineSection
	extends Pick<ShopACF, 'marquee_line_bg' | 'marquee_line_repeater'> {}

const MarqueeLineSection: FC<IMarqueeLineSection> = ({
	marquee_line_bg,
	marquee_line_repeater
}) => {
	return (
		<section
			className={styles.marqueeBlock}
			style={{ backgroundImage: `url(${marquee_line_bg})` }}
		>
			<Marquee speed={50}>
				{[...marquee_line_repeater, ...marquee_line_repeater].map(
					(item, index) => (
						<SingleMarquee {...item} key={index} />
					)
				)}
			</Marquee>
		</section>
	)
}

export default MarqueeLineSection
