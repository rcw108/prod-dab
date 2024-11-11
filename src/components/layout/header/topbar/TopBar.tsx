import SkeletonLoader from '@/components/ui/SkeletonLoader'
import { Options } from '@/types/options.interface'
import Image from 'next/image'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './TopBar.module.scss'

interface ITopBar {
	data: Options | undefined
	isLoading: boolean
}

const TopBar: FC<ITopBar> = ({ data, isLoading }) => {
	return (
		<div className={styles.topbar}>
			{isLoading ? (
				<SkeletonLoader count={1} width={400} height={28} />
			) : data ? (
				<div className='flex gap-2'>
					<Image
						src={data.icon_topbar}
						alt={data.text_topbar}
						width={28}
						height={28}
					/>
					<h6>{ReactHtmlParser(data.text_topbar)}</h6>
				</div>
			) : null}
		</div>
	)
}

export default TopBar
