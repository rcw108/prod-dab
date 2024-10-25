export interface Advantage {
	icon: string
	text: string
}

export interface MoveLineContent extends Advantage {}

export interface Step {
	img: string
	title: string
	text: string
}

export interface PageLink {
	title: string
	url: string
	target: string
}

export interface BlockDifference extends Step {}

export interface RunningText {
	text: string
}

export interface SingleReview {
	text: string
	name: string
}

export interface SingleFaq {
	question: string
	answer: string
}

export interface HomeACF {
	// New
	hero_section_img: string
	hero_section_img_mobile: string
	hero_section_link: PageLink

	hero_section_title: string
	background_image: boolean | string
	start_image: boolean | string
	start_text: string
	advantages: Advantage[] | null
	button_link: PageLink
	right_image: boolean | string
	move_line_background_image: boolean | string
	move_line_content: MoveLineContent[] | null
	title_pr: string
	text_pr: string
	tab1_pr: string
	tab2_pr: string
	st_bg: string | boolean
	title_st: string
	text_st: string
	steps_st: Step[]
	link_st: PageLink
	img_hf: string
	star_img_hf: string
	star_text_: string
	title_hf: string
	text_hf: string
	bg_fl: string | boolean
	img_fl: string
	title_fl: string
	text_fl: string
	link_fl: PageLink
	title_review_fl: string
	text_review_fl: string
	name_review_fl: string
	star_img_fl: string
	title_d: string
	text_d: string
	blocks_d: BlockDifference[]
	link_d: PageLink
	running_bg: string | boolean
	running_text: RunningText[]
	bg_bp: string | boolean
	img_bp: string
	star_img_bp: string
	star_text_bp: string
	title_bp: string
	text_bp: string
	link_bp: PageLink
	title_r: string
	text_r: string
	reviews_r: SingleReview[]
	title_f: string
	bg_f: string | boolean
	text_f: string
	faqs_f: SingleFaq[]
	bg_img_left_sv: string
	bg_img_right_sv: string
	bg_img_mobile: string
	star_img_sv: string
	star_text_sv: string
	sub_title_sv: string
	title_sv: string
	text_sv: string
	background_image_form: string
	form_title: string
	form_description: string
}

export interface BasePageInfo {
	id: number
	date: string
	date_gmt: string
	guid: {
		rendered: string
	}
	modified: string
	modified_gmt: string
	slug: string
	status: string
	type: string
	link: string
	title: {
		rendered: string
	}
	content: {
		rendered: string
		protected: boolean
	}
	excerpt: {
		rendered: string
		protected: boolean
	}
	author: number
	featured_media: number
	parent: number
	menu_order: number
	comment_status: string
	ping_status: string
	template: string
	meta: {
		_acf_changed: boolean
		footnotes: string
	}
}

export interface IHome extends BasePageInfo {
	acf: HomeACF
}
