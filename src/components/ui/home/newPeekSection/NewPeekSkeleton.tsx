import { FC } from 'react'
import SkeletonLoader from '../../SkeletonLoader'
import styles from './NewPeekSection.module.scss'

interface INewPeekSkeleton {
	isLoading?: boolean
}

const NewPeekSkeleton: FC<INewPeekSkeleton> = ({ isLoading }) => {
	if (isLoading)
		return (
			<div className={styles.skeletonPeek}>
				<div className='container'>
					<div className={styles.top}>
						<SkeletonLoader count={1} height={50} width={'100%'} />
						<SkeletonLoader
							className='mt-5'
							count={1}
							height={30}
							width={'70%'}
						/>
					</div>
					<div className={styles.grid}>
						{Array(4)
							.fill(0)
							.map((_, index) => (
								<div className={styles.skeletonItem} key={index}>
									<SkeletonLoader height={400} width={'100%'} />
								</div>
							))}
					</div>
					<div className={styles.skeletonBtn}>
						<SkeletonLoader count={1} width={300} height={60} />
					</div>
				</div>
			</div>
		)
	return null
}

export default NewPeekSkeleton
