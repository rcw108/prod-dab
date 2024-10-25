import { BasePageInfo } from './homepage.interface'

export interface MarqueeHead {
	icon: string
	text: string
}

export interface ReviewRepeater {
	start_image: string
	text: string
	author: string
}

export interface ShopACF {
	bg_image_head: string
	rate_star_image: string
	rate_stars_description: string
	title_head: string
	description_head: string
	marquee_bg_head: string
	marquee_head: MarqueeHead[]
	marquee_line_bg: string
	marquee_line_repeater: MarqueeHead[]
	title_review: string
	subtitle_review: string
	reviews_repeater: ReviewRepeater[]
	form_title: string
	form_bg: string
	form_description: string

	// new

	image_new_head: string
	image_new_head_mobile: string
	bundle_section_image: string
	gummy_section_image: string
	cartridges_section_image: string
	disposables_section_image: string
}

export interface IShopPage extends BasePageInfo {
	acf: ShopACF
}
