import { MenuService } from '@/services/menu.service'
import { useQuery } from '@tanstack/react-query'

export const useMenu = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['menu'],
		queryFn: () => MenuService.getMenu()
	})

	return {
		data,
		isLoading
	}
}
