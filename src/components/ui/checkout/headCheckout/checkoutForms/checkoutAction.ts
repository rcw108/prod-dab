'use server'

import {
	createCustomerSubscribeOrderWo,
	updateSubscribePaymentStatus
} from '@/components/ui/home/products/productActions'
import {
	RegistrationCustomer,
	SingleCustomer
} from '@/components/ui/myAccount/customer.interface'
import {
	createCustomer,
	getCustomerById,
	setCustomerAuthorizeMetaData,
	SetCustomerAuthorizeMetaData,
	validateToken
} from '@/components/ui/myAccount/customersActions'
import { ItemListCount } from '@/store/cart/cart.interface'
import { IUser } from '@/store/user/user.interface'
import {
	AuthSubRequestData,
	CreatePaymentMethod,
	ICheckoutOrder,
	SubscribeCreate
} from '@/types/checkoutLayout.interface'
import {
	createPaymentMethodAuthNet,
	createSubscribeAuthNet,
	createSubscribeAuthNetWithProfile,
	getCustomerProfileById,
	handleCreateOrder
} from './orderAction'

export interface CardData {
	creditCard: {
		cardNumber: string
		expirationDate: string
		cardCode: string
		total: number
	}
}

export interface ShippingData {
	shipping: {
		label: string
		cost: string
	}
}

export interface IAuthorize {
	key: string
	id: number
	value: string
}

export async function handleCheckout(
	orderData: ICheckoutOrder,
	cardData: CardData,
	shippingData: ShippingData,
	haveSubscribeItems: ItemListCount[],
	user: IUser | null,
	subscribeData: SubscribeCreate,
	authorize: IAuthorize | null | undefined,
	customer: SingleCustomer | null,
	requestData: AuthSubRequestData,
	requestSaveMetaDataBody: SetCustomerAuthorizeMetaData | undefined,
	registerUserData?: RegistrationCustomer
) {
	'use server'
	try {
		;('use server')
		const order = await handleCreateOrder(orderData, cardData, shippingData)
		console.log('order', order)

		if (
			order &&
			order.transactionResponse.transactionResponse &&
			!order.transactionResponse.transactionResponse.errors
		) {
			if (haveSubscribeItems.length > 0 && user && requestSaveMetaDataBody) {
				subscribeData.customer_id = Number(user.ID)
				try {
					;('use server')
					const resCreateWoOrderSubscribe =
						await createCustomerSubscribeOrderWo(subscribeData)
					console.log('resCreateWoOrderSubscribe', resCreateWoOrderSubscribe)
					console.log('auth123', authorize, customer)
					if (
						!authorize ||
						!customer?.meta_data?.find(
							meta => meta.key === '_authnet_customer_id'
						)
					) {
						try {
							;('use server')
							const responseAuthNetSubscribeAndProfileRequest =
								await createSubscribeAuthNet(requestData)
							console.log(
								'responseAuthNetSubscribeAndProfileRequest',
								responseAuthNetSubscribeAndProfileRequest.messages.message
							)
							if (
								responseAuthNetSubscribeAndProfileRequest.messages
									.resultCode === 'Ok'
							) {
								console.log(
									'responseAuthNetSubscribeAndProfileRequest1234',
									responseAuthNetSubscribeAndProfileRequest,
									'pay1234',
									responseAuthNetSubscribeAndProfileRequest.profile
								)

								try {
									;('use server')
									requestSaveMetaDataBody.meta_data.find(item => {
										if (item.key === '_authnet_customer_id') {
											item.value =
												responseAuthNetSubscribeAndProfileRequest.profile.customerProfileId
										}
									})

									const saveCustomerAuthNetToken =
										await setCustomerAuthorizeMetaData(
											requestSaveMetaDataBody,
											Number(user.ID)
										)
									console.log(
										'saveCustomerAuthNetToken',
										saveCustomerAuthNetToken
									)
									if (saveCustomerAuthNetToken.success) {
										try {
											;('use server')
											const responseUpdateSubscribeWo =
												await updateSubscribePaymentStatus(
													resCreateWoOrderSubscribe.data.id,
													'active'
												)
											console.log(
												'responseUpdateSubscribeWo123123',
												responseUpdateSubscribeWo
											)
											return {
												success: true,
												responseUpdateSubscribeWo:
													responseUpdateSubscribeWo.data,
												saveCustomerAuthNetToken: saveCustomerAuthNetToken.data,
												responseAuthNetSubscribeAndProfileRequest:
													responseAuthNetSubscribeAndProfileRequest.data,
												resCreateWoOrderSubscribe:
													resCreateWoOrderSubscribe.data,
												order
											}
										} catch (error) {
											console.error('updateSubscribePaymentStatus', error)
											return {
												success: false,
												error: 'Error Update Subscribe Payment Status'
											}
										}
									} else {
										return {
											success: false,
											error: 'Failed to save customer AuthNet token'
										}
									}
								} catch (error) {
									console.error('setCustomerAuthorizeMetaData', error)
									return {
										success: false,
										error: 'Error Set Customer Meta Data'
									}
								}
							} else {
								return {
									success: false,
									error: 'AuthNet Subscribe and Profile Request failed'
								}
							}
						} catch (error) {
							console.error('createSubscribeAuthNet', error)
							return {
								success: false,
								error: 'Error Create customer subscribe authorize'
							}
						}
					} else {
						try {
							const token =
								authorize.value ||
								customer.meta_data.find(
									item => item.key === '_authnet_customer_id'
								)?.value
							const responseGetCustomerProfileAuthById =
								await getCustomerProfileById(Number(token))
							console.log(32323233232, responseGetCustomerProfileAuthById)
							if (
								responseGetCustomerProfileAuthById.messages.resultCode === 'Ok'
							) {
								try {
									const findPaymentProfile =
										responseGetCustomerProfileAuthById.profile.paymentProfiles.find(
											(item: any) => {
												const savedCardLast4Digits =
													item.payment.creditCard.cardNumber.slice(-4)
												const inputCardLast4Digits =
													cardData.creditCard.cardNumber.slice(-4)
												return savedCardLast4Digits === inputCardLast4Digits
											}
										)

									console.log('find Payment Profile', findPaymentProfile)

									if (!findPaymentProfile) {
										try {
											const dataCreateMethod: CreatePaymentMethod = {
												customerProfileId: authorize.value,
												cardNumber: cardData.creditCard.cardNumber,
												expirationDate: cardData.creditCard.expirationDate,
												cardCode: cardData.creditCard.cardCode,
												billTo: {
													firstName: orderData.billing.first_name,
													lastName: orderData.billing.last_name,
													address: orderData.billing.address_1,
													city: orderData.billing.city,
													state: orderData.billing.state,
													zip: orderData.billing.postcode,
													country: orderData.billing.country,
													phoneNumber: orderData.billing.phone || ''
												}
											}

											const awaitCreatePaymentMethodAuthNet =
												await createPaymentMethodAuthNet(dataCreateMethod)

											console.log(
												'await create payment method',
												awaitCreatePaymentMethodAuthNet
											)

											if (
												awaitCreatePaymentMethodAuthNet.messages.resultCode ===
												'Ok'
											) {
												const profile = {
													profileId:
														responseGetCustomerProfileAuthById.profile
															.customerProfileId,
													paymentProfileId:
														awaitCreatePaymentMethodAuthNet.customerPaymentProfileId
												}

												const createSubscribeAuthNetWithUser =
													await createSubscribeAuthNetWithProfile(
														requestData,
														profile
													)

												console.log(
													123453453453,
													createSubscribeAuthNetWithUser.messages.message
												)
												console.log('sadsad123', profile)
												if (
													createSubscribeAuthNetWithUser.messages.resultCode ===
													'Ok'
												) {
													try {
														;('use server')
														const responseUpdateSubscribeWo =
															await updateSubscribePaymentStatus(
																resCreateWoOrderSubscribe.data.id,
																'active'
															)
														console.log(
															'responseUpdateSubscribeWo123123',
															responseUpdateSubscribeWo
														)
														return {
															success: true,
															responseUpdateSubscribeWo:
																responseUpdateSubscribeWo.data,
															createSubscribeAuthNetWithUser:
																createSubscribeAuthNetWithUser.data,
															resCreateWoOrderSubscribe:
																resCreateWoOrderSubscribe.data,
															responseGetCustomerProfileAuthById:
																responseGetCustomerProfileAuthById.data,
															order
														}
													} catch (error) {
														console.error('updateSubscribePaymentStatus', error)
														return {
															success: false,
															error: 'Error Update Subscribe Payment Status'
														}
													}
												}
											}
										} catch (error) {
											console.error('createPaymentMethodAuthNet', error)
										}
									} else {
										try {
											const profile = {
												profileId:
													responseGetCustomerProfileAuthById.profile
														.customerProfileId,
												paymentProfileId:
													findPaymentProfile.customerPaymentProfileId
											}

											const createSubscribeAuthNetWithUser =
												await createSubscribeAuthNetWithProfile(
													requestData,
													profile
												)

											console.log(
												123453453453,
												createSubscribeAuthNetWithUser.messages.message
											)
											console.log('sadsad', profile)
											if (
												createSubscribeAuthNetWithUser.messages.resultCode ===
												'Ok'
											) {
												try {
													;('use server')
													const responseUpdateSubscribeWo =
														await updateSubscribePaymentStatus(
															resCreateWoOrderSubscribe.data.id,
															'active'
														)
													console.log(
														'responseUpdateSubscribeWo123123',
														responseUpdateSubscribeWo
													)
													return {
														success: true,
														responseUpdateSubscribeWo:
															responseUpdateSubscribeWo.data,
														createSubscribeAuthNetWithUser:
															createSubscribeAuthNetWithUser.data,
														resCreateWoOrderSubscribe:
															resCreateWoOrderSubscribe.data,
														responseGetCustomerProfileAuthById:
															responseGetCustomerProfileAuthById.data,
														order
													}
												} catch (error) {
													console.error('updateSubscribePaymentStatus', error)
													return {
														success: false,
														error: 'Error Update Subscribe Payment Status'
													}
												}
											}
										} catch (error) {
											console.log('createSubscribeAuthNetWithUser', error)
											return {
												success: false,
												error: 'Error Create customer subscribe order'
											}
										}
									}
								} catch (error) {
									console.error('createSubscribeAuthNetWithUser', error)
									return {
										success: false,
										error: 'Error Create customer subscribe order'
									}
								}
							}
						} catch (error) {
							console.log('getCustomerProfileById', error)
							return {
								success: false,
								error: 'Error Get customer profile'
							}
						}
					}
				} catch (error) {
					console.error('createCustomerSubscribeOrderWo', error)
					return {
						success: false,
						error: 'Error Create customer subscribe order'
					}
				}
			} else if (haveSubscribeItems.length > 0 && !user && registerUserData) {
				console.log('TO DO')
				try {
					const createUser = await createCustomer(registerUserData)

					if (createUser.success) {
						try {
							const validateUserTokenResponse = await validateToken(
								createUser.data.jwt
							)

							// TODO Return user and setUser to redux
							if (validateUserTokenResponse.data.user) {
								subscribeData.customer_id = Number(
									validateUserTokenResponse.data.user.ID
								)
								try {
									const resCreateWoOrderSubscribe =
										await createCustomerSubscribeOrderWo(subscribeData)

									if (
										!authorize ||
										!customer?.meta_data?.find(
											meta => meta.key === '_authnet_customer_id'
										)
									) {
										try {
											;('use server')
											const responseAuthNetSubscribeAndProfileRequest =
												await createSubscribeAuthNet(requestData)
											console.log(
												'responseAuthNetSubscribeAndProfileRequest',
												responseAuthNetSubscribeAndProfileRequest.messages
													.message
											)
											if (
												responseAuthNetSubscribeAndProfileRequest.messages
													.resultCode === 'Ok'
											) {
												console.log(
													'responseAuthNetSubscribeAndProfileRequest1234',
													responseAuthNetSubscribeAndProfileRequest,
													'pay1234',
													responseAuthNetSubscribeAndProfileRequest.profile
												)

												try {
													const newUser = await getCustomerById(
														Number(validateUserTokenResponse.data.user.ID)
													)
													if (newUser.data) {
														try {
															;('use server')
															const newUserRequestSaveMetaDataBody = {
																meta_data: [
																	...newUser.data.meta_data,
																	{ id: 513990, key: '_authnet_customer_id' }
																]
															}
															newUser.data.meta_data.find(item => {
																if (item.key === '_authnet_customer_id') {
																	item.value =
																		responseAuthNetSubscribeAndProfileRequest.profile.customerProfileId
																}
															})

															const saveCustomerAuthNetToken =
																await setCustomerAuthorizeMetaData(
																	newUserRequestSaveMetaDataBody,
																	Number(validateUserTokenResponse.ID)
																)
															console.log(
																'saveCustomerAuthNetToken',
																saveCustomerAuthNetToken
															)
															if (saveCustomerAuthNetToken.success) {
																try {
																	;('use server')
																	const responseUpdateSubscribeWo =
																		await updateSubscribePaymentStatus(
																			resCreateWoOrderSubscribe.data.id,
																			'active'
																		)
																	console.log(
																		'responseUpdateSubscribeWo123123',
																		responseUpdateSubscribeWo
																	)
																	return {
																		success: true,
																		responseUpdateSubscribeWo:
																			responseUpdateSubscribeWo.data,
																		saveCustomerAuthNetToken:
																			saveCustomerAuthNetToken.data,
																		responseAuthNetSubscribeAndProfileRequest:
																			responseAuthNetSubscribeAndProfileRequest.data,
																		resCreateWoOrderSubscribe:
																			resCreateWoOrderSubscribe.data,
																		order,
																		newUser: validateUserTokenResponse.data,
																		jwt: createUser.data.jwt
																	}
																} catch (error) {
																	console.error(
																		'updateSubscribePaymentStatus',
																		error
																	)
																	return {
																		success: false,
																		error:
																			'Error Update Subscribe Payment Status'
																	}
																}
															} else {
																return {
																	success: false,
																	error: 'Failed to save customer AuthNet token'
																}
															}
														} catch (error) {
															console.error(
																'setCustomerAuthorizeMetaData',
																error
															)
															return {
																success: false,
																error: 'Error Set Customer Meta Data'
															}
														}
													}
												} catch (error) {
													console.log('error get customer after reg', error)
												}
											} else {
												return {
													success: false,
													error: 'AuthNet Subscribe and Profile Request failed'
												}
											}
										} catch (error) {
											console.error('createSubscribeAuthNet', error)
											return {
												success: false,
												error: 'Error Create customer subscribe authorize'
											}
										}
									} else {
										try {
											const token =
												authorize.value ||
												customer.meta_data.find(
													item => item.key === '_authnet_customer_id'
												)?.value
											const responseGetCustomerProfileAuthById =
												await getCustomerProfileById(Number(token))
											console.log(
												32323233232,
												responseGetCustomerProfileAuthById
											)
											if (
												responseGetCustomerProfileAuthById.messages
													.resultCode === 'Ok'
											) {
												try {
													const findPaymentProfile =
														responseGetCustomerProfileAuthById.profile.paymentProfiles.find(
															(item: any) => {
																const savedCardLast4Digits =
																	item.payment.creditCard.cardNumber.slice(-4)
																const inputCardLast4Digits =
																	cardData.creditCard.cardNumber.slice(-4)
																return (
																	savedCardLast4Digits === inputCardLast4Digits
																)
															}
														)

													console.log(
														'find Payment Profile',
														findPaymentProfile
													)

													if (!findPaymentProfile) {
														try {
															const dataCreateMethod: CreatePaymentMethod = {
																customerProfileId: authorize.value,
																cardNumber: cardData.creditCard.cardNumber,
																expirationDate:
																	cardData.creditCard.expirationDate,
																cardCode: cardData.creditCard.cardCode,
																billTo: {
																	firstName: orderData.billing.first_name,
																	lastName: orderData.billing.last_name,
																	address: orderData.billing.address_1,
																	city: orderData.billing.city,
																	state: orderData.billing.state,
																	zip: orderData.billing.postcode,
																	country: orderData.billing.country,
																	phoneNumber: orderData.billing.phone || ''
																}
															}

															const awaitCreatePaymentMethodAuthNet =
																await createPaymentMethodAuthNet(
																	dataCreateMethod
																)

															console.log(
																'await create payment method',
																awaitCreatePaymentMethodAuthNet
															)

															if (
																awaitCreatePaymentMethodAuthNet.messages
																	.resultCode === 'Ok'
															) {
																const profile = {
																	profileId:
																		responseGetCustomerProfileAuthById.profile
																			.customerProfileId,
																	paymentProfileId:
																		awaitCreatePaymentMethodAuthNet.customerPaymentProfileId
																}

																const createSubscribeAuthNetWithUser =
																	await createSubscribeAuthNetWithProfile(
																		requestData,
																		profile
																	)

																console.log(
																	123453453453,
																	createSubscribeAuthNetWithUser.messages
																		.message
																)
																console.log('sadsad123', profile)
																if (
																	createSubscribeAuthNetWithUser.messages
																		.resultCode === 'Ok'
																) {
																	try {
																		;('use server')
																		const responseUpdateSubscribeWo =
																			await updateSubscribePaymentStatus(
																				resCreateWoOrderSubscribe.data.id,
																				'active'
																			)
																		console.log(
																			'responseUpdateSubscribeWo123123',
																			responseUpdateSubscribeWo
																		)
																		return {
																			success: true,
																			responseUpdateSubscribeWo:
																				responseUpdateSubscribeWo.data,
																			createSubscribeAuthNetWithUser:
																				createSubscribeAuthNetWithUser.data,
																			resCreateWoOrderSubscribe:
																				resCreateWoOrderSubscribe.data,
																			responseGetCustomerProfileAuthById:
																				responseGetCustomerProfileAuthById.data,
																			order
																		}
																	} catch (error) {
																		console.error(
																			'updateSubscribePaymentStatus',
																			error
																		)
																		return {
																			success: false,
																			error:
																				'Error Update Subscribe Payment Status'
																		}
																	}
																}
															}
														} catch (error) {
															console.error('createPaymentMethodAuthNet', error)
														}
													} else {
														try {
															const profile = {
																profileId:
																	responseGetCustomerProfileAuthById.profile
																		.customerProfileId,
																paymentProfileId:
																	findPaymentProfile.customerPaymentProfileId
															}

															const createSubscribeAuthNetWithUser =
																await createSubscribeAuthNetWithProfile(
																	requestData,
																	profile
																)

															console.log(
																123453453453,
																createSubscribeAuthNetWithUser.messages.message
															)
															console.log('sadsad', profile)
															if (
																createSubscribeAuthNetWithUser.messages
																	.resultCode === 'Ok'
															) {
																try {
																	;('use server')
																	const responseUpdateSubscribeWo =
																		await updateSubscribePaymentStatus(
																			resCreateWoOrderSubscribe.data.id,
																			'active'
																		)
																	console.log(
																		'responseUpdateSubscribeWo123123',
																		responseUpdateSubscribeWo
																	)
																	return {
																		success: true,
																		responseUpdateSubscribeWo:
																			responseUpdateSubscribeWo.data,
																		createSubscribeAuthNetWithUser:
																			createSubscribeAuthNetWithUser.data,
																		resCreateWoOrderSubscribe:
																			resCreateWoOrderSubscribe.data,
																		responseGetCustomerProfileAuthById:
																			responseGetCustomerProfileAuthById.data,
																		order
																	}
																} catch (error) {
																	console.error(
																		'updateSubscribePaymentStatus',
																		error
																	)
																	return {
																		success: false,
																		error:
																			'Error Update Subscribe Payment Status'
																	}
																}
															}
														} catch (error) {
															console.log(
																'createSubscribeAuthNetWithUser',
																error
															)
															return {
																success: false,
																error: 'Error Create customer subscribe order'
															}
														}
													}
												} catch (error) {
													console.error('createSubscribeAuthNetWithUser', error)
													return {
														success: false,
														error: 'Error Create customer subscribe order'
													}
												}
											}
										} catch (error) {
											console.log('getCustomerProfileById', error)
											return {
												success: false,
												error: 'Error Get customer profile'
											}
										}
									}
								} catch (error) {
									console.log(
										'error createCustomerSubscribeOrderWo after reg',
										error
									)
								}
							}
						} catch (error) {
							console.log('error validate user token', error)
						}
					}
				} catch (error) {
					console.log('error create user', error)
				}
			}
		} else {
			return {
				success: false,
				error:
					order?.transactionResponse.transactionResponse.errors ||
					'Transaction error'
			}
		}
	} catch (error) {
		console.error('handleCreateOrder', error)
		return {
			success: false,
			error: 'Unhandled error in handleCheckout'
		}
	}
}
