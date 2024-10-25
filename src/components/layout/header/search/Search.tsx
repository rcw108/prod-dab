'use client'

import SmallHeading from '@/components/ui/headings/SmallHeading'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import { useProducts } from '@/hooks/useProducts'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import Image from 'next/image'
import { FC } from 'react'
import styles from './Search.module.scss'
import SearchItem from './searchItem/SearchItem'
import SearchRecent from './searchRecent/SearchRecent'
import { useSearch } from './useSearch'

interface ISearch {
	isOpen: boolean
	setIsOpen: (value: boolean) => void
}

const Search: FC<ISearch> = ({ isOpen, setIsOpen }) => {
	const { data, handleSearch, isLoading, searchTerm, error } = useSearch()

	const { products } = useProducts()

	const recentlyAddedProducts = [...(products || [])]
		.sort((a, b) => {
			return (
				new Date(b.date_created).getTime() - new Date(a.date_created).getTime()
			)
		})
		.slice(0, 3)

	return (
		<div
			className={styles.search}
			style={{ display: isOpen ? 'block' : 'none' }}
		>
			<div className={styles.close} onClick={() => setIsOpen(false)}>
				<Image src={'/close-search.svg'} alt='close' width={26} height={26} />
			</div>
			<div className={styles.input}>
				<label>
					<Image
						src={'/search-input.svg'}
						alt='search'
						width={18}
						height={18}
						className={styles.searchIcon}
					/>
					<input type='text' value={searchTerm} onChange={handleSearch} />
				</label>

				{isLoading ? (
					<div className={styles.results}>
						<SkeletonLoader count={3} width={'100%'} height={83} />
					</div>
				) : data && data.length > 0 ? (
					<div className={styles.results}>
						{data.map((item: WooCommerceSingleProduct) => (
							<SearchItem key={item.id + 10} item={item} />
						))}
					</div>
				) : (
					data && <div className={styles.noResults}>Not Found</div>
				)}
			</div>

			<div className={styles.close}></div>
			<div className={styles.recent}>
				<SmallHeading
					className={styles.recentlyTitle}
					title={'Recently added'}
				/>
				<div className={styles.box}>
					{recentlyAddedProducts
						? recentlyAddedProducts.map(item => (
								<SearchRecent key={item.id * Math.random()} product={item} />
							))
						: null}
				</div>
			</div>
		</div>
	)
}

export default Search
