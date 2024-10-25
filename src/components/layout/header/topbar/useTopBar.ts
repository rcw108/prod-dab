import { OptionService } from '@/services/options.service'
import { useQuery } from '@tanstack/react-query'

export const useTopBar = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['topbar'],
		queryFn: () => OptionService.getOptions()
	})

	return {
		data,
		isLoading
	}
}
