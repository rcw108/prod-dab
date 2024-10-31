import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import {
	averageRating,
	bestSelling,
	filterByCategory,
	filterByTag,
	filterByVibe,
	getTotalAvailableProducts,
	highToLow,
	latestCreated,
	lowToHigh,
	sortAvailable
} from '@/utils/sortBy'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export const useShopContent = () => {
	// Pagination States

	const [currentPagination, setCurrentPagination] = useState(0)
	const [progressPagination, setProgressPagination] = useState(12)

	const [loading, setLoading] = useState(true)

	const [products, setProducts] = useState<WooCommerceSingleProduct[]>([])
	const [sortBy, setSortBy] = useState('Default Sorting')
	const [availableTags, setAvailableTags] = useState<
		'In Stock' | 'Out of Stock'
	>('In Stock')
	const [selectCategory, setSelectCategory] = useState('')
	const [selectTag, setSelectTag] = useState('')
	const [sortedProducts, setSortedProducts] =
		useState<WooCommerceSingleProduct[]>(products)
	const [stockStatus, setStockStatus] = useState<{
		stock: number
		outOfStock: number
	}>()
	const [availabilityTab, setAvailabilityTab] = useState(false)
	const [availabilityActive, setAvailabilityActive] = useState<'stock' | 'out'>(
		'stock'
	)
	const [vibeTab, setVibeTab] = useState(false)
	const [vibeActive, setVibeActive] = useState<string>('')
	const [categiriesTab, setCategiriesTab] = useState(false)
	const [categoriesActive, setCategoriesActive] = useState<string>('')
	const [tagTab, setTagTab] = useState(false)
	const [tagActive, setTagActive] = useState<string>('')

	const pathname = usePathname()
	const router = useRouter()
	const searchParams = useSearchParams()

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString())
			if (value) {
				params.set(name, value)
			} else {
				params.delete(name)
			}
			return params.toString()
		},
		[searchParams]
	)

	const sortProducts = useCallback(
		(productsToSort: WooCommerceSingleProduct[], sortType: string) => {
			switch (sortType) {
				case 'Low to High':
					return lowToHigh(productsToSort)
				case 'High to Low':
					return highToLow(productsToSort)
				case 'Best Selling':
					return bestSelling(productsToSort)
				case 'Latest Created':
					return latestCreated(productsToSort)
				case 'Average Rating':
					return averageRating(productsToSort)
				default:
					return productsToSort
			}
		},
		[products]
	)

	const handleSortBy = useCallback(
		(value: string) => {
			setLoading(true)
			setSortBy(value)
			router.push(pathname + '?' + createQueryString('sort', value), {
				scroll: false
			})
			setSortedProducts(prevProducts => sortProducts(prevProducts, value))
			setCurrentPagination(0)
			setProgressPagination(12)
			setLoading(false)
		},
		[pathname, router, createQueryString, sortProducts, products]
	)

	const handleSortAvailability = useCallback(
		(value: 'stock' | 'out') => {
			setLoading(true)
			setAvailabilityActive(value)

			const valueToFilter = value === 'stock' ? 'instock' : 'outofstock'

			router.push(pathname + '?' + createQueryString('availability', value), {
				scroll: false
			})
			setSortedProducts(sortAvailable(sortedProducts, valueToFilter))
			setCurrentPagination(0)
			setProgressPagination(12)
			setLoading(false)
		},
		[pathname, router, createQueryString, products]
	)

	const handleSortCategory = useCallback(
		(value: string) => {
			setLoading(true)
			setSelectCategory(value)
			const updatedQuery = createQueryString('category', value)
			router.push(pathname + '?' + updatedQuery, { scroll: false })
			setSortedProducts(filterByCategory(sortedProducts, value))
			setCurrentPagination(0)
			setProgressPagination(12)
			setLoading(false)
		},
		[pathname, router, createQueryString, sortedProducts]
	)

	const handleSortTag = useCallback(
		(value: string) => {
			setLoading(true)
			setSelectTag(value)
			const updatedQuery = createQueryString('tag', value)
			router.push(pathname + '?' + updatedQuery, { scroll: false })
			setSortedProducts(filterByTag(sortedProducts, value))
			setCurrentPagination(0)
			setProgressPagination(12)
			setLoading(false)
		},
		[pathname, router, createQueryString, sortedProducts]
	)

	const handleSortVibe = useCallback(
		(value: string) => {
			setLoading(true)
			setSelectTag(value)
			const updatedQuery = createQueryString('vibe', value)
			router.push(pathname + '?' + updatedQuery, { scroll: false })
			setSortedProducts(filterByVibe(sortedProducts, value))
			setCurrentPagination(0)
			setProgressPagination(12)
			setLoading(false)
		},
		[pathname, router, createQueryString, sortedProducts]
	)

	useEffect(() => {
		handleSortVibe(vibeActive)
	}, [vibeActive])

	useEffect(() => {
		handleSortAvailability(availabilityActive)
	}, [availabilityActive])

	useEffect(() => {
		handleSortCategory(categoriesActive)
	}, [categoriesActive])

	useEffect(() => {
		handleSortTag(tagActive)
	}, [tagActive])

	useEffect(() => {
		const sort = searchParams.get('sort')
		const availability = searchParams.get('availability') as 'stock' | 'out'
		const valueToFilter = availability === 'stock' ? 'instock' : 'outofstock'
		const category = searchParams.get('category')
		const tags = searchParams.get('tag')
		const vibe = searchParams.get('vibe')

		if (vibe) {
			setVibeActive(vibe)
			setSortedProducts(prevProducts => filterByVibe(prevProducts, vibe))
		}

		if (sort) {
			setSortBy(sort)
			setSortedProducts(prevProducts => sortProducts(prevProducts, sort))
		}

		if (availability) {
			setAvailabilityActive(availability)
			setSortedProducts(prevProducts =>
				sortAvailable(prevProducts, valueToFilter)
			)
		}

		if (category) {
			setCategoriesActive(category)
			setSortedProducts(prevProducts =>
				filterByCategory(prevProducts, category)
			)
		}

		if (tags) {
			setTagActive(tags)
			setSortedProducts(prevProducts => filterByTag(prevProducts, tags))
		}
	}, [searchParams, sortProducts])

	useEffect(() => {
		setSortedProducts(prevProducts => sortProducts(prevProducts, sortBy))
	}, [products, sortProducts, sortBy])

	useEffect(() => {
		setStockStatus(getTotalAvailableProducts(products))
	}, [products])

	const handleReset = () => {
		setLoading(true)
		router.push(pathname, { scroll: false })
		setSortBy('Default Sorting')
		setSelectCategory('')
		setSelectTag('')
		setAvailabilityActive('stock')
		setCategoriesActive('')
		setTagActive('')
		setSortedProducts(products)
		setLoading(false)
	}

	const togglePagination = (index: number) => {
		if (index === currentPagination) return
		if (index !== 0) {
			setCurrentPagination(index * 12)
			setProgressPagination(index * 12 + 12)
		} else {
			setCurrentPagination(index)
			setProgressPagination(index + 12)
		}
	}

	const handleCategories = (category: string) => {
		if (category === categoriesActive) {
			setCategoriesActive('')
		} else {
			setCategoriesActive(category)
		}
	}

	const handleTags = (tag: string) => {
		if (tag === tagActive) {
			setTagActive('')
		} else {
			setTagActive(tag)
		}
	}

	const handleVibe = (vibe: string) => {
		if (vibe === vibeActive) {
			setVibeActive('')
		} else {
			setVibeActive(vibe)
		}
	}

	const totalPagesCount = () => {
		const filteredProducts = sortedProducts.filter(
			product =>
				product.status !== 'private' && product.catalog_visibility !== 'hidden'
		)

		return Math.ceil(filteredProducts.length / 12)
	}

	const bundleProductsFn = sortedProducts.filter(product =>
		product.categories.some(
			category =>
				category.name === 'Bundle' &&
				product.status !== 'private' &&
				product.catalog_visibility !== 'hidden' &&
				product.stock_status === 'instock'
		)
	)

	const cartridgesProductsFn = sortedProducts.filter(product =>
		product.categories.some(
			category =>
				category.name === 'Cartridge' ||
				(category.name === '510 Cartridges' &&
					product.status !== 'private' &&
					product.catalog_visibility !== 'hidden' &&
					product.stock_status === 'instock')
		)
	)

	const gummyProductsFn = sortedProducts.filter(product =>
		product.categories.some(
			category =>
				category.name === 'Edibles' &&
				product.status !== 'private' &&
				product.catalog_visibility !== 'hidden' &&
				product.stock_status === 'instock'
		)
	)

	const disposablesProductsFn = sortedProducts.filter(product =>
		product.categories.some(
			category =>
				category.name === 'Disposables' &&
				product.status !== 'private' &&
				product.catalog_visibility !== 'hidden' &&
				product.stock_status === 'instock'
		)
	)

	const [disposablesProducts, setDisposablesProducts] = useState<
		WooCommerceSingleProduct[]
	>(disposablesProductsFn)

	const [bundleProducts, setBundleProducts] =
		useState<WooCommerceSingleProduct[]>(bundleProductsFn)

	const [cartridgesProducts, setCartridgesProducts] =
		useState<WooCommerceSingleProduct[]>(cartridgesProductsFn)

	const [gummyProducts, setGummyProducts] =
		useState<WooCommerceSingleProduct[]>(gummyProductsFn)

	useEffect(() => {
		setDisposablesProducts(disposablesProductsFn)
		setBundleProducts(bundleProductsFn)
		setCartridgesProducts(cartridgesProductsFn)
		setGummyProducts(gummyProductsFn)
	}, [sortedProducts])

	return {
		handleSortBy,
		handleSortAvailability,
		sortBy,
		availableTags,
		setAvailableTags,
		selectCategory,
		setSelectCategory,
		selectTag,
		setSelectTag,
		sortedProducts,
		setProducts,
		setSortedProducts,
		defaultProducts: products,
		createQueryString,
		stockStatus,
		handleReset,
		availabilityTab,
		setAvailabilityTab,
		availabilityActive,
		setAvailabilityActive,
		categiriesTab,
		setCategiriesTab,
		categoriesActive,
		setCategoriesActive,
		tagTab,
		setTagTab,
		tagActive,
		setTagActive,
		currentPagination,
		setCurrentPagination,
		progressPagination,
		setProgressPagination,
		loading,
		togglePagination,
		handleCategories,
		handleTags,
		totalPagesCount,
		setLoading,
		disposablesProducts,
		bundleProducts,
		cartridgesProducts,
		gummyProducts,
		handleVibe,
		vibeTab,
		setVibeTab,
		vibeActive
	}
}
