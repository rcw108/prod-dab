import Reviews from '@/components/screens/reviews/Reviews'
import { reviewsPageUrl } from '@/configs/page.config'
import { Reviews as IReviews } from '@/types/reviews.interface'
import { FC } from 'react'

export const dynamic = 'force-dynamic'

const fetchReviewsLayout = async () => {
	const response: IReviews = await fetch(reviewsPageUrl).then(res => res.json())

	return response
}

const ReviewPage: FC = async () => {
	const layout = await fetchReviewsLayout()

	return layout && <Reviews layout={layout} />
}

export default ReviewPage
