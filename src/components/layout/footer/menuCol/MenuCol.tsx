import SkeletonLoader from '@/components/ui/SkeletonLoader'
import { Menu } from '@/types/menu.interface'
import Link from 'next/link'
import { FC } from 'react'
import styles from './MenuCol.module.scss'

interface IMenuCol {
	menuColId: string
	menus: Menu[]
	isLoading: boolean
}

const MenuCol: FC<IMenuCol> = ({ menuColId, menus, isLoading }) => {
	const menu = menus.find(menu => menu.id === +menuColId)

	return (
		<div className={styles.menu}>
			{isLoading ? (
				<SkeletonLoader count={4} width={'100%'} height={15} />
			) : menu ? (
				<ul>
					{menu.fields.map(item => (
						<li key={item.title} className={styles.menuItem}>
							<Link href={item.url}>{item.title}</Link>
						</li>
					))}
				</ul>
			) : null}
		</div>
	)
}

export default MenuCol
