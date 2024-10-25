import { ProductService } from '@/services/product.service'
import { useQuery } from '@tanstack/react-query'

export const useGetAllSingleProducts = () => {
	const { isLoading, data, error } = useQuery({
		queryKey: ['all products'],
		queryFn: ProductService.getAllProducts,
		select: ({ data }) => data
	})

	return {
		isLoading,
		products: data,
		error
	}
}
