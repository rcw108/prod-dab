import { FC } from 'react'
import SkeletonLoader from '../../SkeletonLoader'
import styles from './ShopContentSkeletonLoader.module.scss'
const ShopContentSkeletonLoader: FC = () => {
	return (
		<section>
			<div className='container'>
				<div className={styles.top}>
					<SkeletonLoader count={1} width={'100%'} height={60} />
					<SkeletonLoader count={1} width={'100%'} height={60} />
					<SkeletonLoader count={1} width={'100%'} height={60} />
				</div>
				<div className={styles.content}>
					<div className={styles.block}>
						{[...Array(8)].map((_, i) => (
							<SkeletonLoader width={300} height={441} key={`qedam${i}`} />
						))}
					</div>
					<div className={styles.block}>
						{[...Array(8)].map((_, i) => (
							<SkeletonLoader width={300} height={441} key={`qedam${i}`} />
						))}
					</div>
					<div className={styles.block}>
						{[...Array(8)].map((_, i) => (
							<SkeletonLoader width={300} height={441} key={`qedam${i}`} />
						))}
					</div>
					<div className={styles.block}>
						{[...Array(8)].map((_, i) => (
							<SkeletonLoader width={300} height={441} key={`qedam${i}`} />
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default ShopContentSkeletonLoader
