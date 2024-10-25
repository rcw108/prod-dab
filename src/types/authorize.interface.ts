export interface CreateCustomerPaymentProfileBody {
	customerProfileId: string
	paymentProfile: {
		billTo: {
			firstName?: string
			lastName?: string
			company?: string
			address?: string
			city?: string
			state?: string
			zip?: string
			country?: string
			phoneNumber?: string
		}
		payment: {
			creditCard: {
				cardNumber: string
				expirationDate: string
				cardCode: string
			}
		}
		defaultPaymentProfile: boolean
	}
}

export interface CreateCustomerProfileBody {
	profile: {
		merchantCustomerId?: string
		description?: string
		email: string
		paymentProfiles: {
			customerType: 'individual' | 'business'
			creditCard: {
				cardNumber: string
				expirationDate: string
				cardCode: string
			}
		}
	}
}

export interface UpdateCustomerProfileByIdDataBody {
	profile: {
		merchantCustomerId?: string
		description?: string
		email?: string
	}
}
