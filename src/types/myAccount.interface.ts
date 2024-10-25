export interface MyAccountLayoutACF {
	content_line: {
		icon: string | false
		text: string
	}[]
	title: string
	background_image: string
	background_image_mobile: string
	background_image_form: string
	form_description: string
	form_title: string
}

export interface MyAccountLayout {
	acf: MyAccountLayoutACF
}

export interface ValidUser {
	success: boolean
	jwt: string[]
	user: {
		ID: string
		user_login: string
		user_nicename: string
		user_email: string
		user_url: string
		user_registered: string
		user_activation_key: string
		user_status: string
		display_name: string
	}
	roles: string[]
}
