export interface InfoLine {
	listline_f: string
}

export interface SingleQA {
	question: string
	answer: string
}

export interface SingleFaqFP {
	title: string
	'question_-_answer': SingleQA[]
}

export interface FAQAcf {
	info_line: InfoLine[]
	titlep_f: string
	image_mf: string
	image_mf_mobile: string
	faqs_fp: SingleFaqFP[]
	background_image_form: string
	form_title: string
	form_description: string
	content: string
}

export interface FAQPage {
	acf: FAQAcf
}
