export interface NotFoundACF {
	background_image_form: string
	form_title: string
	form_description: string
}

export interface NotFoundPage {
	acf: NotFoundACF
	content: {
		rendered: string
	}
}
