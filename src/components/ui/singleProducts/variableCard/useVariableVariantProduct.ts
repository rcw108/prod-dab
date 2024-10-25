import { ProductService } from '@/services/product.service'
import { useQuery } from '@tanstack/react-query'

export const useVariableVariantProduct = (id: number) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['singleVariableProduct', id],
		queryFn: () => ProductService.getProductById(id),
		enabled: !!id,
		select: ({ data }) => data
	})

	return {
		singleProductVar: data,
		isLoading,
		error
	}
}
