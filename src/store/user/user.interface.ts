export interface IUser {
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

export interface InitialUser {
	user: IUser | null
	jwt: string
	authorize?: {
		key: string
		id: number
		value: string
	} | null
}
