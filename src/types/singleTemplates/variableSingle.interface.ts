import { BlockDifference, PageLink } from '../homepage.interface'
import { ReviewRepeater } from '../shopPage.interface'
import { ContentQuality, MoveLine } from './simpleSingle.interface'

export interface HowRepeater {
	icon: string
	title: string
	text: string
}

export interface VSRepeater {
	title: string
	dabpens: string
	other: string
}

export interface VariableSingleACF {
	move_line_background_image: string
	move_line_content: MoveLine[]
	head_section_background: string
	bottom_move_line_background: string
	bottom_move_line_content: MoveLine[]
	background_image_qual: string
	title_qual: string
	subtitle_qual: string
	content_qual: ContentQuality[]
	button_qual: PageLink
	title_diff: string
	subtitle_diff: string
	content_diff: BlockDifference[]
	button_diff: PageLink
	title_frm: string
	description_frm: string
	background_image_frm: string
	title_vibe: string
	text_vibe: string
	vibe_repeater: MoveLine[]
	title_how: string
	text_how: string
	how_repeater: HowRepeater[]
	button_how: PageLink
	title_vs: string
	text_vs: string
	vs_repeater: VSRepeater[]
	title_rev: string
	text_rev: string
	review_repeater: ReviewRepeater[]
	dabpens_logo: string
	title_descr: string
	text_descr: string
	star_image: string
	title_sp: string
	text_sp: string
	relax: string
}

export interface VariableSingle {
	acf: VariableSingleACF
}
