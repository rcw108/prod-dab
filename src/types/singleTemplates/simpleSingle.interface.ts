import {
	BlockDifference,
	PageLink,
	SingleFaq,
	Step
} from '../homepage.interface'

export interface MoveLine {
	icon: string
	text: string
}

export interface ContentQuality {
	position: 'left' | 'right'
	title: string
	text: string
	image: string
	review_author: string
	review_stars: string
	review_text: string
}

export interface SimpleSingleACF {
	move_line_background_image: string
	move_line_content: MoveLine[]
	head_section_background: string
	bottom_move_line_background: string
	bottom_move_line_content: MoveLine[]
	title_sin_steps: string
	subtitle_sin_steps: string
	single_steps: Step[]
	background_image_qual: string
	title_qual: string
	subtitle_qual: string
	content_qual: ContentQuality[]
	button_qual: PageLink
	title_diff: string
	subtitle_diff: string
	content_diff: BlockDifference[]
	button_diff: PageLink
	move_section_background: string
	content_move_s: MoveLine[]
	title_o_rev: string
	subtitle_o_rev: string
	title_faq: string
	subtitle_faq: string
	tabs_faq: SingleFaq[]
	backgoround_faq: string
	rate_image: string
	rate_text: string
	subtitle_miss: string
	title_miss: string
	old_price_miss: string
	current_price_miss: string
	subscribe_text_miss: string
	save_miss: string
	description_miss: string
	button_miss: PageLink
	image_gallery_miss: string[]
	marquee_line_repeater_miss: MoveLine[]
	marquee_line_background_miss: string
	title_lv: string
	subtitle_lv: string
	title_frm: string
	description_frm: string
	background_image_frm: string
}

export interface SimpleSingle {
	acf: SimpleSingleACF
}
