import { API_URL } from '@/configs/api.config'
import { useQuery } from '@tanstack/react-query'

interface IResultProducts {
	id: number
	name: string
	slug: string
	price_html: string
	regular_price: string
	price: string
	images: string[]
}

export const useNewPeek = (ids: string) => {
	const { data, isLoading } = useQuery({
		queryKey: ['newPeek', ids],
		queryFn: async () => {
			const res: IResultProducts[] = await fetch(
				`${API_URL}/wp-json/custom-api/v1/products?relation_ids=${ids}`
			).then(res => res.json())
			return res
		}
	})

	return { data, isLoading }
}
