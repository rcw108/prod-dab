import SkeletonLoader from '@/components/ui/SkeletonLoader'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { useTopBar } from '../topbar/useTopBar'
import styles from './Logotype.module.scss'

const Logotype: FC = () => {
	const { data, isLoading } = useTopBar()

	return (
		<>
			{isLoading ? (
				<SkeletonLoader count={1} width={200} height={35} />
			) : data ? (
				<div className='logo'>
					<Link href='/'>
						<Image
							className={styles.logo}
							src={data.header_logo}
							alt='logo'
							width={224}
							height={35}
						/>
					</Link>
				</div>
			) : null}
		</>
	)
}

export default Logotype
