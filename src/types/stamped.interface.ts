export interface Review {
	id: number
	reviewState: number
	reviewCensored: null
	rating: number
	title: string
	author: string
	email: string
	location: string
	countryISO: string
	imagesFileName: null | string
	imagesFileNamePublished: string
	videosFileName: null | string
	videosFileNamePublished: null | string
	body: string
	reply: string
	productId: number
	productHandle: string
	productTitle: string
	productUrl: string
	productImageUrl: string
	productImageCroppedUrl: null | string
	productImageThumbnailUrl: null | string
	sentimentScore: null
	sentimentMagnitude: null
	source: number
	reviewSource: string
	ipAddress: string
	ipAddressSource: string
	userReference: null | string
	isPublishedShopify: boolean
	isConvertedImage: null | string
	isPublicReply: boolean
	isFeatured: boolean
	isRead: boolean
	isPublishedFeed: boolean
	isRecommend: null | string
	queueReviewEmailID: number
	personId: null | number
	customerId: number
	shopProductId: number
	reviewSourceAppId: null | number
	reviewSourceAppEntityId: null | number
	shop_ID: number
	verifiedType: number
	dateCreated: string
	dateReplied: null
	dateAdded: string
	dateUpdated: string
	// mediaList: []
	// optionsList: []
	votesList: null
	socialSharesList: null
	// tagsList: []
	// sentimentAnalysisReviewList: []
	isIncentivized: boolean
	autoPublishAfter: null
	metaObjectHandle: null
	metaObjectId: null
}

export interface Customer {
	id: number
	name: string
	firstName: string
	lastName: string
	email: string
	customerEmail: string
	externalId: string
	uuid: string
	profileImageUrl: string
	notes: null | string
	tags: string
	country: string
	ipAddress: null | string
	ipAddressSource: string
	isSubscribed: boolean
	sentimentScore: number
	sentiment: null | string
	points: number
	totalSpent: null | number
	isConfirmed: boolean
	vipTierId: null | number
	dateCreated: string
	dateUpdated: string
	dateTierUpdated: null
	dateTierEligibilityCheck: null
	dateTierEligibilityUntil: null
	dateLastLogin: string
	dateLastActivityRewards: string
	dateBirthday: string
	shopId: number
	vipTier: null
	referralCode: string
	referralUrl: null
	attentiveLastSyncDate: null
}

export interface Results {
	review: Review
	customer: Customer
	orderId: string
	variant: null
	voteUp: number
	voteDown: number
	countSocialShare: number
	tags: []
	topics: null
}

export interface Stamped {
	results: Results[]
	total: number
	page: number
	totalPages: number
	summary: {
		unread: number
		published: number
		unpublished: number
		archived: number
		flagged: number
		spam: number
		pending: number
	}
}
