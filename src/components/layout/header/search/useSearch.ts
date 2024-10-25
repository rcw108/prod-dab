import { getAllProductsSearch } from '@/components/ui/home/products/productActions'
import { useDebounce } from '@/hooks/useDebounce'
import { useQuery } from '@tanstack/react-query'
import { ChangeEvent, useState } from 'react'

export const useSearch = () => {
	const [searchTerm, setSearchTerm] = useState('')

	const debouncedSearch = useDebounce(searchTerm, 500)

	const { isSuccess, data, error, isLoading } = useQuery({
		queryKey: ['search debounce key', debouncedSearch],
		queryFn: async () => await getAllProductsSearch(debouncedSearch),
		select: data => {
			return data
		},
		enabled: !!debouncedSearch
	})

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	return { isSuccess, handleSearch, data, searchTerm, error, isLoading }
}
