import { ShopACF } from '@/types/shopPage.interface'

export interface IShopHead
	extends Pick<
		ShopACF,
		| 'bg_image_head'
		| 'rate_star_image'
		| 'rate_stars_description'
		| 'title_head'
		| 'description_head'
		| 'marquee_bg_head'
		| 'marquee_head'
	> {}
