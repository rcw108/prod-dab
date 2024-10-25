'use client'
import Description from '@/components/ui/headings/Description'
import SmallHeading from '@/components/ui/headings/SmallHeading'
import { SingleCustomer } from '@/components/ui/myAccount/customer.interface'
import {
	getCustomerById,
	SetCustomerAuthorizeMetaData
} from '@/components/ui/myAccount/customersActions'
import { useCart } from '@/hooks/useCart'
import { useGlobalUser } from '@/hooks/useGlobalUser'
import { useProducts } from '@/hooks/useProducts'
import { useUser } from '@/hooks/useUser'
import { CheckoutService } from '@/services/checkout.service'
import { setUser } from '@/store/user/user.slice'
import {
	AuthSubRequestData,
	Discount,
	ICheckoutOrder,
	ICheckoutShippingValidate,
	ICheckoutShippingValidateResponse,
	Order,
	SubscribeCreate
} from '@/types/checkoutLayout.interface'
import clsx from 'clsx'
import creditCardType from 'credit-card-type'
import { CreditCardType } from 'credit-card-type/dist/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import ReactHtmlParser from 'react-html-parser'
import Select from 'react-select'
import CartSummary from './cartSummary/CartSummary'
import { handleCheckout } from './checkoutAction'
import styles from './CheckoutForms.module.scss'
import CheckScreen from './CheckScreen'
import { getDiscountCode } from './orderAction'
import { states } from './statesData'
import { useCheckoutForm } from './useCheckoutForm'
import { useCheckoutFormDiff } from './useCheckoutFormDiff'

interface AddressValues {
	stateCountry: string
	zipCode: string
	cityTown: string
	stateCountryDiff: string
	zipCodeDiff: string
	cityTownDiff: string
}

const CheckoutForms: FC<{
	credit_card_image: { card_image: string }[]
	order_advantages: Order[]
}> = ({ credit_card_image, order_advantages }) => {
	const [paymentCheck, setPaymentCheck] = useState(false)
	const [paymentDetails, setPaymentDetails] = useState<any>()
	const [sendPayment, setSendPayment] = useState(false)
	const [sendError, setSendError] = useState(false)
	const [sendErrorMessage, setSendErrorMessage] = useState<any>()
	const user = useUser()
	const { authorize } = useGlobalUser()
	const [customer, setCustomer] = useState<SingleCustomer | null>(null)

	useEffect(() => {
		const fetch = async () => {
			if (user) {
				const customer = await getCustomerById(Number(user.ID))
				if (customer.data) {
					setCustomer(customer.data)
				}
			}
		}
		fetch()
	}, [user])

	const {
		register,
		setValue,
		getValues,
		watch,
		handleSubmit,
		control,
		formState: { errors }
	} = useForm({
		mode: 'onChange'
	})

	const router = useRouter()

	const { itemListCount } = useCart()

	const { products } = useProducts()

	const watchedFields = watch([
		'stateCountry',
		'zipCode',
		'cityTown, zipCodeDiff, cityTownDiff, stateCountryDiff'
	])

	const [account, setAccount] = useState(false)
	const [news, setNews] = useState(false)
	const [diffAddress, setDiffAddress] = useState(false)

	const [selectShipping, setSelectShipping] = useState<string>('')

	const [shipping, setShipping] = useState<
		ICheckoutShippingValidateResponse[] | null
	>(null)
	const [isRequesting, setIsRequesting] = useState(false)

	const [discountValue, setDiscountValue] = useState<Discount | null | string>(
		null
	)

	const [cardType, setCardType] = useState<CreditCardType[] | null>(null)

	const { autocompleteRef, isLoaded } = useCheckoutForm(setValue)
	const { autocompleteRefDiff, isLoadedDiff } = useCheckoutFormDiff(setValue)

	const totalPrice = itemListCount.reduce((acc, item) => {
		return acc + +item.price * +item.count
	}, 0)

	useEffect(() => {
		if (itemListCount.some(item => item.paymentType === 'subscription')) {
			setAccount(false)
		}
	}, [user, account, itemListCount])

	useEffect(() => {
		if (totalPrice > 50) {
			setSelectShipping('Free shipping')
		} else {
			setSelectShipping('USPS Ground (2-4 Days)')
		}
	}, [totalPrice])

	const prevValuesRef = useRef({
		stateCountry: '',
		zipCode: '',
		cityTown: '',
		stateCountryDiff: '',
		zipCodeDiff: '',
		cityTownDiff: ''
	})

	const formatExpiryDate = (expiry: string): string => {
		const match = expiry.match(/^(0[1-9]|1[0-2])\/(\d{2})$/)
		if (match) {
			const month = match[1]
			const year = `20${match[2]}` // Добавляем "20" перед двумя цифрами года
			return `${year}-${month}`
		}
		return expiry
	}

	useEffect(() => {
		if (!isLoaded || isRequesting) return

		const currentValues: AddressValues = {
			stateCountry: getValues('stateCountry'),
			zipCode: getValues('zipCode'),
			cityTown: getValues('cityTown'),
			stateCountryDiff: getValues('stateCountryDiff'),
			zipCodeDiff: getValues('zipCodeDiff'),
			cityTownDiff: getValues('cityTownDiff')
		}

		const prevValues = prevValuesRef.current

		const hasChanged = (
			Object.keys(currentValues) as Array<keyof AddressValues>
		).some(key => currentValues[key] !== prevValues[key])

		if (!hasChanged) return

		prevValuesRef.current = { ...currentValues }

		setIsRequesting(true)

		const createShippingRequest = (
			state: string,
			zip: string
		): ICheckoutShippingValidate => ({
			destination_country: 'US',
			destination_state: state,
			destination_zip: zip,
			products: itemListCount.map(item => {
				const product = products?.find(p => p.id === item.id)
				const weight = product ? Number(product.weight) : 0.12

				return {
					product_id: +item.id,
					quantity: +item.count || 0,
					weight: weight
				}
			})
		})

		const shippingRequest = diffAddress
			? createShippingRequest(
					currentValues.stateCountryDiff,
					currentValues.zipCodeDiff
				)
			: createShippingRequest(currentValues.stateCountry, currentValues.zipCode)

		const fetchShippingCost = async () => {
			try {
				const response =
					await CheckoutService.validateShippingCost(shippingRequest)
				const responseData = response.data
				if (responseData !== null) {
					setShipping(responseData)
				}
			} catch (e) {
				console.error('Error fetching shipping cost:', e)
			} finally {
				setIsRequesting(false)
			}
		}

		fetchShippingCost()
	}, [
		watchedFields,
		isLoaded,
		isRequesting,
		diffAddress,
		itemListCount,
		products
	])

	const productsToRender = products?.filter(product =>
		itemListCount.some(item => item.id === product.id)
	)

	const [auth, setAuth] = useState(false)

	const validateBtn = (): boolean => {
		const firstName = getValues('firstName')
		const lastName = getValues('lastName')
		const cityTown = getValues('cityTown')
		const stateCountry = getValues('stateCountry')
		const zipCode = getValues('zipCode')
		const email = getValues('email')
		const card = getValues('cardNumber')

		if (
			firstName &&
			lastName &&
			cityTown &&
			stateCountry &&
			zipCode &&
			email &&
			autocompleteRef.current &&
			autocompleteRef.current.value &&
			card
		) {
			return true
		}
		return false
	}

	const handleDiscount = async () => {
		const discountCode = getValues('discountCode')
		if (!discountCode) return

		const res: Discount[] = await getDiscountCode(discountCode)

		if (res === null) {
			setDiscountValue('Coupon not valid')
		}

		if (typeof res === 'string') {
			setDiscountValue('Coupon not valid')
		}

		setDiscountValue(res[0])
	}

	const resetDiscount = () => {
		setDiscountValue(null)
		setValue('discountCode', '')
	}

	const formatDate = (date: Date) => {
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const day = String(date.getDate()).padStart(2, '0')
		const hours = String(date.getHours()).padStart(2, '0')
		const minutes = String(date.getMinutes()).padStart(2, '0')
		const seconds = String(date.getSeconds()).padStart(2, '0')

		return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
	}

	const calculateNextRenewal = (
		period: 'every month' | 'every 2 weeks' | 'every 2 months'
	) => {
		const currentDate = new Date()
		if (period === 'every 2 months') {
			currentDate.setMonth(currentDate.getMonth() + 2)
		} else if (period === 'every 2 weeks') {
			currentDate.setDate(currentDate.getDate() + 14)
		} else if (period === 'every month') {
			currentDate.setMonth(currentDate.getMonth() + 1)
		}
		return currentDate.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	}

	const formatDateTime = (date: Date) => {
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const day = String(date.getDate()).padStart(2, '0')
		const hours = String(date.getHours()).padStart(2, '0')
		const minutes = String(date.getMinutes()).padStart(2, '0')
		const seconds = String(date.getSeconds()).padStart(2, '0')

		return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
	}

	const addTimeToDate = (date: Date, period: string) => {
		const newDate = new Date(date)

		if (period === 'every 2 months') {
			newDate.setMonth(newDate.getMonth() + 2)
		} else if (period === 'every month') {
			newDate.setMonth(newDate.getMonth() + 1)
		} else if (period === 'every 2 weeks') {
			newDate.setDate(newDate.getDate() + 14)
		}

		return formatDateTime(newDate)
	}

	const handleBtn = async () => {
		if (!validateBtn()) return

		setSendPayment(true)
		const selectedShippingMethod = shipping?.find(
			item => item.label === selectShipping
		)

		const haveSubscribeItems = itemListCount.filter(
			item => item.paymentType === 'subscription'
		)

		const orderData: ICheckoutOrder = {
			payment_method: 'credit card',
			payment_method_title: 'Bank Transfer',
			set_paid: false,
			billing: {
				first_name: getValues('firstName'),
				last_name: getValues('lastName'),
				address_1: autocompleteRef.current ? autocompleteRef.current.value : '',
				address_2: '',
				city: getValues('cityTown'),
				state: getValues('stateCountry'),
				postcode: getValues('zipCode'),
				country: 'US',
				email: getValues('email'),
				phone: getValues('phone') || ''
			},
			coupon_lines: discountValue
				? [
						{
							code: getValues('discountCode')
						}
					]
				: [
						{
							code: ''
						}
					],
			shipping: {
				first_name:
					getValues('firstNameDiff') === ''
						? getValues('firstName')
						: getValues('firstNameDiff'),
				last_name:
					getValues('lastNameDiff') === ''
						? getValues('lastName')
						: getValues('lastNameDiff'),
				address_1:
					diffAddress === true && autocompleteRefDiff.current
						? autocompleteRefDiff.current.value
						: autocompleteRef.current
							? autocompleteRef.current.value
							: '',
				address_2: '',
				city:
					getValues('cityTownDiff') === ''
						? getValues('cityTown')
						: getValues('cityTownDiff'),
				state:
					getValues('stateCountryDiff') === ''
						? getValues('stateCountry')
						: getValues('stateCountryDiff'),
				postcode:
					getValues('zipCodeDiff') === ''
						? getValues('zipCode')
						: getValues('zipCodeDiff'),
				country: 'US'
			},
			line_items: itemListCount.map(item => ({
				product_id: +item.id,
				quantity: +item.count,
				price: +item.price
			})),
			shipping_lines: [
				{
					method_id:
						shipping?.find(item => item.label === selectShipping)?.id || '',
					method_title:
						shipping?.find(item => item.label === selectShipping)?.label || '',
					total:
						shipping?.find(item => item.label === selectShipping)?.cost || ''
				}
			]
		}

		const cardData = {
			creditCard: {
				cardNumber: getValues('cardNumber'),
				expirationDate: formatExpiryDate(getValues('expiry')),
				cardCode: getValues('cardCode'),
				total: +discountTotal()
			}
		}

		const shippingData = {
			shipping:
				selectShipping === 'Free shipping'
					? { id: 'free', label: 'Free shipping', cost: '0.00' }
					: shipping?.find(item => item.label === selectShipping) || {
							label: '',
							cost: '0.00'
						}
		}

		const subscribeData: SubscribeCreate = {
			status: 'pending',
			billing_period:
				haveSubscribeItems[0].subscriptionPeriod === 'every 2 months' ||
				haveSubscribeItems[0].subscriptionPeriod === 'every month'
					? 'month'
					: 'week',
			billing_interval:
				haveSubscribeItems[0].subscriptionPeriod === 'every 2 months'
					? 2
					: haveSubscribeItems[0].subscriptionPeriod === 'every month'
						? 1
						: 2,
			start_date: formatDate(new Date()),
			next_payment_date: addTimeToDate(
				new Date(),
				haveSubscribeItems[0].subscriptionPeriod || 'every month'
			),
			payment_method: 'authnet',
			payment_method_title: 'Credit Card',
			billing: {
				first_name: getValues('firstName'),
				last_name: getValues('lastName'),
				address_1: autocompleteRef.current ? autocompleteRef.current.value : '',
				address_2: '',
				city: getValues('cityTown'),
				state: getValues('stateCountry'),
				postcode: getValues('zipCode'),
				country: 'US',
				email: getValues('email'),
				phone: getValues('phone') || ''
			},
			shipping: {
				first_name:
					getValues('firstNameDiff') === ''
						? getValues('firstName')
						: getValues('firstNameDiff'),
				last_name:
					getValues('lastNameDiff') === ''
						? getValues('lastName')
						: getValues('lastNameDiff'),
				address_1:
					diffAddress === true && autocompleteRefDiff.current
						? autocompleteRefDiff.current.value
						: autocompleteRef.current
							? autocompleteRef.current.value
							: '',
				address_2: '',
				city:
					getValues('cityTownDiff') === ''
						? getValues('cityTown')
						: getValues('cityTownDiff'),
				state:
					getValues('stateCountryDiff') === ''
						? getValues('stateCountry')
						: getValues('stateCountryDiff'),
				postcode:
					getValues('zipCodeDiff') === ''
						? getValues('zipCode')
						: getValues('zipCodeDiff'),
				country: 'US'
			},
			line_items: haveSubscribeItems.map(item => ({
				product_id: +item.id,
				quantity: +item.count
			})),
			shipping_lines: [
				{
					method_id:
						selectShipping === 'Free shipping'
							? 'free'
							: selectedShippingMethod?.id || '',
					method_title:
						selectShipping === 'Free shipping'
							? 'Free shipping'
							: selectedShippingMethod?.label || '',
					total:
						selectShipping === 'Free shipping'
							? '0.00'
							: selectedShippingMethod?.cost || '0.00'
				}
			]
		}

		let requestSaveMetaDataBody: SetCustomerAuthorizeMetaData | undefined

		if (customer) {
			requestSaveMetaDataBody = {
				meta_data: [
					...customer.meta_data,
					{ id: 513990, key: '_authnet_customer_id' }
				]
			}
		}
		const requestData: AuthSubRequestData = {
			amount: String(
				itemListCount.reduce((acc, item) => {
					if (item.paymentType === 'subscription') {
						return acc + +item.price * +item.count
					}
					return acc // всегда возвращаем аккумулятор
				}, 0)
			),
			cardNumber: getValues('cardNumber'),
			expirationDate: formatExpiryDate(getValues('expiry')),
			cardCode: getValues('cardCode'),
			firstName: getValues('firstName'),
			lastName: getValues('lastName'),
			startDate: new Date().toISOString().slice(0, 10),
			interval:
				haveSubscribeItems[0].subscriptionPeriod === 'every 2 months'
					? '2'
					: haveSubscribeItems[0].subscriptionPeriod === 'every month'
						? '1'
						: '14',
			unit:
				haveSubscribeItems[0].subscriptionPeriod === 'every 2 months'
					? 'months'
					: haveSubscribeItems[0].subscriptionPeriod === 'every month'
						? 'months'
						: 'days'
		}

		const registerUserData = {
			email: getValues('email'),
			username: getValues('accountLogin'),
			password: getValues('accountPassword')
		}

		const fetchAsyncFn = async () => {
			const res = await handleCheckout(
				orderData,
				cardData,
				shippingData,
				haveSubscribeItems,
				user,
				subscribeData,
				authorize,
				customer,
				requestData,
				requestSaveMetaDataBody,
				registerUserData
			)

			return res
		}

		const response = await fetchAsyncFn()

		if (response?.success) {
			setSendPayment(false)
			setPaymentCheck(true)
			setPaymentDetails(response.order)
			if (response.newUser.user && response.jwt) {
				setUser({
					user: response.newUser.user,
					jwt: response.jwt
				})
			}
		}
		if (response?.error) {
			setSendPayment(false)
			setSendError(true)
			setSendErrorMessage(response.error)
		}
	}

	const discountTotal = () => {
		// Вычисляем общую стоимость товаров
		const totalItemPrice = itemListCount.reduce(
			(acc, item) => acc + +item.price * +item.count,
			0
		)

		// Находим стоимость выбранной доставки, если таковая имеется
		const shippingCost =
			shipping?.find(item => item.label === selectShipping)?.cost ?? 0

		// Вычисляем общую стоимость с учетом доставки
		const totalBeforeDiscount = totalItemPrice + Number(shippingCost)

		// Вычисляем скидку, если она есть
		const discountAmount =
			typeof discountValue === 'object' && typeof discountValue !== null
				? discountValue?.amount
					? +discountValue.amount / 100
					: 0
				: 0

		// Применяем скидку
		const totalAfterDiscount = totalBeforeDiscount * (1 - discountAmount)

		// Форматируем итоговую сумму до двух знаков после запятой
		return totalAfterDiscount.toFixed(2)
	}

	const watchCard = watch('cardNumber')

	const cardTypeCheck = () => {
		const cardNumber = getValues('cardNumber')
		const cardChecked = creditCardType(cardNumber)
		setCardType(cardChecked)
	}

	useEffect(() => {
		cardTypeCheck()
	}, [watchCard])

	const subscribeTotal = () => {
		let total = 0
		itemListCount.forEach(item => {
			if (item.paymentType === 'subscription') {
				total += +item.price
			}
		})
		shipping?.forEach(item => {
			if (item.label === selectShipping) {
				total += Number(item.cost)
			}
		})

		return total
	}

	if (!isLoaded) return <div>Loading...</div>

	if (paymentCheck) {
		return <CheckScreen data={paymentDetails} />
	}

	return (
		<>
			{sendError && sendErrorMessage && (
				<div className={styles.payError}>
					<Description
						title={`${sendErrorMessage[0].errorText} Check your card details`}
					/>
				</div>
			)}
			<form className={styles.wrap} onSubmit={handleSubmit(handleBtn)}>
				<div className={styles.left}>
					<SmallHeading className='mb-5' title={'Billing details'} />
					<div className={styles.billing}>
						<label className={styles.req}>
							<Description title={'First name'} />
							<input
								type='text'
								{...register('firstName', {
									required: {
										value: true,
										message: 'First name is required'
									},
									minLength: {
										value: 2,
										message: 'First name must be at least 2 characters'
									},
									maxLength: {
										value: 20,
										message: 'First name must be at most 20 characters'
									}
								})}
							/>
							{errors.firstName?.message && (
								<div className={styles.error}>
									{errors.firstName.message.toString()}
								</div>
							)}
						</label>
						<label className={styles.req}>
							<Description title={'Last name'} />
							<input
								type='text'
								{...register('lastName', {
									required: {
										value: true,
										message: 'Last name is required'
									},
									minLength: {
										value: 2,
										message: 'Last name must be at least 2 characters'
									},
									maxLength: {
										value: 40,
										message: 'Last name must be at most 40 characters'
									}
								})}
							/>
							{errors.lastName?.message && (
								<div className={styles.error}>
									{errors.lastName.message.toString()}
								</div>
							)}
						</label>
						<label className={styles.company}>
							<Description title={'Company name (optional)'} />
							<input type='text' {...register('companyName')} />
							{errors.companyName?.message && (
								<div className={styles.error}>
									{errors.companyName.message.toString()}
								</div>
							)}
						</label>
						<label className={styles.req}>
							<Description title={'Country / Region'} />
							<Description
								className={styles.countryBlock}
								title={'United States (US)'}
							/>
						</label>
						<label className={styles.req}>
							<Description title={'State / County'} />
							<Controller
								name='stateCountry'
								control={control}
								defaultValue=''
								rules={{ required: true }}
								render={({ field }) => (
									<Select
										{...field}
										options={states}
										required
										placeholder='Select a state'
										className='select'
										classNamePrefix='select'
										onChange={selectedOption =>
											field.onChange(selectedOption ? selectedOption.value : '')
										}
										value={states.find(option => option.label === field.value)}
									/>
								)}
							/>
						</label>
						<label className={clsx(styles.street, styles.req)}>
							<Description title={'Street address'} />
							<input
								required
								type='text'
								ref={autocompleteRef}
								placeholder='House number and street name'
							/>
						</label>
						<label className={styles.req}>
							<Description title={'City / Town'} />
							<input
								type='text'
								{...register('cityTown', {
									required: {
										value: true,
										message: 'City / Town is required'
									},
									minLength: {
										value: 2,
										message: 'City / Town must be at least 2 characters'
									},
									maxLength: {
										value: 40,
										message: 'City / Town must be at most 40 characters'
									}
								})}
							/>
							{errors.cityTown?.message && (
								<div className={styles.error}>
									{errors.cityTown.message.toString()}
								</div>
							)}
						</label>
						<label className={styles.req}>
							<Description title={'Zip code'} />
							<input
								type='number'
								{...register('zipCode', {
									required: {
										value: true,
										message: 'Zip code is required'
									},
									minLength: {
										value: 2,
										message: 'Zip code must be at least 2 characters'
									},
									maxLength: {
										value: 10,
										message: 'Zip code must be at most 10 characters'
									},
									pattern: {
										value: /^[0-9]+$/,
										message: 'Zip code must be numbers'
									}
								})}
							/>
							{errors.zipCode?.message && (
								<div className={styles.error}>
									{errors.zipCode.message.toString()}
								</div>
							)}
						</label>
						<label className={styles.req}>
							<Description title={'Email address'} />
							<input
								type='email'
								{...register('email', {
									required: {
										value: true,
										message: 'Email is required'
									},
									minLength: {
										value: 6,
										message: 'Email must be at least 6 characters'
									},
									maxLength: {
										value: 40,
										message: 'Email must be at most 40 characters'
									},
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: 'Invalid email address'
									}
								})}
							/>
							{errors.email?.message && (
								<div className={styles.error}>
									{errors.email.message.toString()}
								</div>
							)}
						</label>
						<label className={styles.phone}>
							<Description title={'Phone number (optional)'} />
							<input type='tel' {...register('phone')} />
							{errors.phone?.message && (
								<div className={styles.error}>
									{errors.phone.message.toString()}
								</div>
							)}
						</label>
					</div>
					<div className={styles.checkouts}>
						<h3 className={styles.h3} onClick={() => setNews(!news)}>
							<div
								className={clsx(styles.check, {
									[styles.checked]: news === true
								})}
							></div>
							Sign me up to receive email updates and news (optional)
						</h3>
						<h3 className={styles.h3} onClick={() => setAccount(!account)}>
							<div
								className={clsx(styles.check, {
									[styles.checked]: account === true
								})}
							></div>
							Create an account?
						</h3>
						{account && (
							<div className={styles.createAccount}>
								<label className={clsx(styles.req, styles.acUser)}>
									<Description title={'Account username'} />
									<input
										type='text'
										{...register('accountLogin', {
											required: {
												value: account,
												message: 'Account username is required'
											},
											minLength: {
												value: 6,
												message:
													'Account username must be at least 6 characters'
											},
											maxLength: {
												value: 40,
												message:
													'Account username must be at most 40 characters'
											}
										})}
									/>
								</label>
								<label className={clsx(styles.req, styles.acPass)}>
									<Description title={'Account password'} />
									<input
										type='text'
										{...register('accountPassword', {
											required: {
												value: account,
												message: 'Account password is required'
											},
											minLength: {
												value: 6,
												message:
													'Account password must be at least 6 characters'
											},
											maxLength: {
												value: 40,
												message:
													'Account password must be at most 40 characters'
											}
										})}
									/>
								</label>
							</div>
						)}
						<h3
							className={styles.h3}
							onClick={() => setDiffAddress(!diffAddress)}
						>
							<div
								className={clsx(styles.check, {
									[styles.checked]: diffAddress === true
								})}
							></div>
							Ship to a different address?
						</h3>
					</div>
					<div
						className={clsx(styles.shipDiff, { [styles.show]: diffAddress })}
					>
						<div className={styles.billing}>
							<label className={styles.req}>
								<Description title={'First name'} />
								<input
									type='text'
									{...register('firstNameDiff', {
										required: {
											value: diffAddress,
											message: 'First name is required'
										},
										minLength: {
											value: 2,
											message: 'First name must be at least 2 characters'
										},
										maxLength: {
											value: 20,
											message: 'First name must be at most 20 characters'
										}
									})}
								/>
								{errors.firstNameDiff?.message && (
									<div className={styles.error}>
										{errors.firstNameDiff.message.toString()}
									</div>
								)}
							</label>
							<label className={styles.req}>
								<Description title={'Last name'} />
								<input
									type='text'
									{...register('lastNameDiff', {
										required: {
											value: diffAddress,
											message: 'Last name is required'
										},
										minLength: {
											value: 2,
											message: 'Last name must be at least 2 characters'
										},
										maxLength: {
											value: 40,
											message: 'Last name must be at most 40 characters'
										}
									})}
								/>
								{errors.lastNameDiff?.message && (
									<div className={styles.error}>
										{errors.lastNameDiff.message.toString()}
									</div>
								)}
							</label>
							<label className={styles.company}>
								<Description title={'Company name (optional)'} />
								<input type='text' {...register('companyNameDiff')} />
								{errors.companyNameDiff?.message && (
									<div className={styles.error}>
										{errors.companyNameDiff.message.toString()}
									</div>
								)}
							</label>
							<label className={styles.req}>
								<Description title={'Country / Region'} />
								<Description
									className={styles.countryBlock}
									title={'United States (US)'}
								/>
							</label>
							<label className={styles.req}>
								<Description title={'State / County'} />
								<Controller
									name='stateCountryDiff'
									control={control}
									defaultValue=''
									rules={{ required: diffAddress }}
									render={({ field }) => (
										<Select
											{...field}
											required={diffAddress}
											options={states}
											placeholder='Select a state'
											className='select'
											classNamePrefix='select'
											onChange={selectedOption =>
												field.onChange(
													selectedOption ? selectedOption.value : ''
												)
											}
											value={states.find(
												option => option.label === field.value
											)}
										/>
									)}
								/>
							</label>
							<label className={clsx(styles.street, styles.req)}>
								<Description title={'Street address'} />
								<input
									required={diffAddress}
									type='text'
									ref={autocompleteRefDiff}
									placeholder='House number and street name'
								/>
							</label>
							<label className={styles.req}>
								<Description title={'City / Town'} />
								<input
									type='text'
									{...register('cityTownDiff', {
										required: {
											value: diffAddress,
											message: 'City / Town is required'
										},
										minLength: {
											value: 2,
											message: 'City / Town must be at least 2 characters'
										},
										maxLength: {
											value: 40,
											message: 'City / Town must be at most 40 characters'
										}
									})}
								/>
								{errors.cityTownDiff?.message && (
									<div className={styles.error}>
										{errors.cityTownDiff.message.toString()}
									</div>
								)}
							</label>
							<label className={styles.req}>
								<Description title={'Zip code'} />
								<input
									type='number'
									{...register('zipCodeDiff', {
										required: {
											value: diffAddress,
											message: 'Zip code is required'
										},
										minLength: {
											value: 2,
											message: 'Zip code must be at least 2 characters'
										},
										maxLength: {
											value: 10,
											message: 'Zip code must be at most 10 characters'
										},
										pattern: {
											value: /^[0-9]+$/,
											message: 'Zip code must be numbers'
										}
									})}
								/>
								{errors.zipCodeDiff?.message && (
									<div className={styles.error}>
										{errors.zipCodeDiff.message.toString()}
									</div>
								)}
							</label>
						</div>
					</div>
					<div
						className={clsx(styles.shipping, {
							[styles.none]: shipping === null
						})}
					>
						<SmallHeading className={styles.shipText} title={'Shipping'} />
						<div className={styles.boxes}>
							{itemListCount &&
								itemListCount.reduce((acc, item) => acc + +item.price, 0) >
									50 && (
									<div
										onClick={() => setSelectShipping('Free shipping')}
										className={clsx(styles.box, {
											[styles.select]: selectShipping === 'Free shipping'
										})}
									>
										<div className={styles.itemShip}>
											<div
												className={clsx(styles.checkbox, {
													[styles.selectCheck]:
														selectShipping === 'Free shipping'
												})}
											></div>
											<p className='text-black'>Free shipping</p>
										</div>
									</div>
								)}
							{shipping &&
								shipping
									.sort((a, b) => +a.cost - +b.cost)
									.map((item, index) => (
										<div
											className={clsx(styles.box, {
												[styles.select]: selectShipping === item.label
											})}
											onClick={() => setSelectShipping(item.label)}
											key={item.id}
										>
											<div className={styles.itemShip}>
												<div
													className={clsx(styles.checkbox, {
														[styles.selectCheck]: selectShipping === item.label
													})}
												></div>
												<p className='text-black'>{item.label}</p>
											</div>
											<p className='text-black'>${item.cost}</p>
										</div>
									))}
						</div>
					</div>
					<div className={styles.payment}>
						<SmallHeading
							className={styles.payText}
							title={'Payment details'}
						/>
						<div className={styles.paymentBox}>
							<div className={styles.paymentTop}>
								<h3 className={styles.h3}>
									<div className={styles.checked}></div>
									Credit Card
								</h3>
								<Description
									className={styles.payDescr}
									title='Pay securely using your credit card.'
								/>
								<div className={styles.cards}>
									{credit_card_image &&
										credit_card_image.map((card, index) => (
											<Image
												key={`${card}-${index}`}
												src={card.card_image}
												alt='credit card'
												width={30}
												height={30}
												className={styles.cardType}
											/>
										))}
								</div>
							</div>
							<div className={styles.paymentForm}>
								<div className={styles.pay}>
									<label className={styles.card}>
										<div className={styles.cardType}>
											{cardType &&
												cardType[0] &&
												getValues('cardNumber') !== '' && (
													<Image src={`/${cardType[0].type}.svg`} alt='' fill />
												)}
										</div>
										<Description title={'Card Number'} />
										<input
											type='number'
											placeholder='•••• •••• •••• ••••'
											{...register('cardNumber', {
												required: {
													value: true,
													message: 'Card number is required'
												},
												maxLength: {
													value: 20,
													message: 'Card number must be at most 20 characters'
												},
												minLength: {
													value: 16,
													message: 'Card number must be at least 16 characters'
												},
												pattern: {
													value: /^[0-9]+$/,
													message: 'Card number must be numbers'
												}
											})}
										/>
										{errors.cardNumber?.message && (
											<div className={styles.error}>
												{errors.cardNumber.message.toString()}
											</div>
										)}
									</label>
									<label>
										<Description title={'Expiry (MM/YY)'} />
										<input
											type='tel'
											{...register('expiry', {
												required: {
													value: true,
													message: 'Expiry is required'
												},
												maxLength: {
													value: 5,
													message: 'Expiry must be at most 5 characters'
												},
												minLength: {
													value: 5,
													message: 'Expiry must be at least 5 characters'
												},
												pattern: {
													value: /^(0[1-9]|1[0-2])\/\d{2}$/,
													message: 'Expiry must be in format MM / YY'
												}
											})}
											placeholder='MM / YY'
										/>
										{errors.expiry?.message && (
											<div className={styles.error}>
												{errors.expiry.message.toString()}
											</div>
										)}
									</label>
									<label>
										<Description title='Card code' />
										<input
											type='tel'
											{...register('cardCode', {
												required: {
													value: true,
													message: 'CVC is required'
												},
												maxLength: {
													value: 4,
													message: 'CVC must be at most 4 characters'
												},
												minLength: {
													value: 3,
													message: 'CVC must be at least 3 characters'
												}
											})}
											placeholder='CVC'
											maxLength={4}
										/>
										{errors.cardCode?.message && (
											<div className={styles.error}>
												{errors.cardCode.message.toString()}
											</div>
										)}
									</label>
								</div>
							</div>
						</div>
						<div className={styles.mobileBtn}>
							{itemListCount && (
								<div className={styles.btns}>
									<button
										className={clsx(styles.btn, {
											[styles.disabledBtn]: sendPayment
										})}
									>
										PLACE ORDER
									</button>
								</div>
							)}
						</div>
					</div>
					<div className={clsx(styles.orderAdv, styles.orderAdvMobile)}>
						{order_advantages.map((item, index) => (
							<div key={item.text} className='flex gap-2'>
								<Image src={item.icon} alt={item.text} width={24} height={24} />
								<Description
									className={styles.textAd}
									title={ReactHtmlParser(item.text)}
								/>
							</div>
						))}
					</div>
				</div>
				<div className={styles.right}>
					<CartSummary />
					<div className={styles.discount}>
						<SmallHeading
							className={styles.titleDisc}
							title={'Enter your discount code'}
						/>
						<label>
							<input type='text' {...register('discountCode')} />
							<span className={styles.couponError}>
								{(typeof discountValue === 'string' ||
									typeof discountValue === null ||
									discountValue === undefined) &&
									'Coupon not found'}
							</span>
							<div className={styles.discBtn} onClick={handleDiscount}>
								ACTIVATE
							</div>
						</label>
					</div>
					<div className={styles.divider}></div>
					<div className={styles.subtotal}>
						<SmallHeading className={styles.subTotalTitle} title={'Subtotal'} />
						<div className={styles.subPrice}>
							<p className={styles.bdi}>
								$
								{productsToRender &&
									productsToRender
										.reduce((acc, item) => acc + +item.regular_price, 0)
										.toFixed(2)}
							</p>
							<p className={styles.ins}>
								$
								{itemListCount &&
									itemListCount
										.reduce((acc, item) => acc + +item.price, 0)
										.toFixed(2)}
							</p>
						</div>
					</div>
					{discountValue &&
						typeof discountValue === 'object' &&
						discountValue.code &&
						discountValue.amount && (
							<div className={styles.countAndRemove}>
								<Description
									className={styles.countAndRemoveText}
									title={`Coupon: ${discountValue.code}`}
								/>
								<div className={styles.countAndRemoveText}>
									-$
									{itemListCount &&
										(
											(itemListCount.reduce(
												(acc, item) => acc + +item.price * +item.count,
												0
											) +
												// Добавляем стоимость доставки, если она выбрана
												(shipping &&
												shipping.find(item => item.label === selectShipping)
													?.cost
													? Number(
															shipping.find(
																item => item.label === selectShipping
															)?.cost
														)
													: 0)) *
											// Применяем скидку
											(discountValue && discountValue.amount
												? +discountValue.amount / 100
												: 0)
										).toFixed(2)}
									<button onClick={resetDiscount}>[Remove]</button>
								</div>
							</div>
						)}
					<div className={styles.divider}></div>
					<div className={styles.total}>
						<SmallHeading className={styles.totalTitle} title={'Total'} />
						<div className={styles.totalPrice}>
							<p className={styles.bdi}>
								$
								{productsToRender &&
									(
										productsToRender.reduce(
											(acc, item) => acc + +item.regular_price,
											0
										) +
										(shipping &&
										shipping.find(item => item.label === selectShipping)?.cost
											? Number(
													shipping.find(item => item.label === selectShipping)
														?.cost
												) || 0
											: 0)
									).toFixed(2)}
							</p>
							<p className={styles.ins}>${discountTotal()}</p>
							<div className={styles.save}>
								{`You're saved $${
									productsToRender &&
									productsToRender
										.reduce((acc, item) => {
											const regularPrice = Number(item.regular_price) || 0
											const price = Number(item.price) || 0
											return acc + (regularPrice - price)
										}, 0)
										.toFixed(2)
								}`}
							</div>
						</div>
					</div>
					{itemListCount.some(item => item.paymentType === 'subscription') && (
						<div>
							{itemListCount.map(item => {
								if (item.paymentType === 'subscription') {
									return (
										<SmallHeading
											className={styles.recurring}
											key={item.id + 1000}
											title={`Recurring totals Subtotal $${Number(item.price).toFixed(2)} / ${item.subscriptionPeriod} Shipping`}
										/>
									)
								}
							})}
						</div>
					)}

					<SmallHeading
						className={styles.recurring}
						title={`Recurring total $${subscribeTotal().toFixed(2)} / month`}
					/>
					<Description
						className={styles.recurring}
						title={`First renewal: ${calculateNextRenewal(itemListCount?.find(item => item.paymentType === 'subscription')?.subscriptionPeriod as 'every month' | 'every 2 weeks' | 'every 2 months')}`}
					/>

					<div className={styles.deskBtn}>
						{itemListCount && (
							<div className={styles.btns}>
								<button
									className={clsx(styles.btn, {
										[styles.disabledBtn]: sendPayment
									})}
								>
									PLACE ORDER
								</button>
							</div>
						)}
					</div>
					<div className={styles.orderAdv}>
						{order_advantages.map((item, index) => (
							<div key={item.text} className='flex gap-2'>
								<Image src={item.icon} alt={item.text} width={24} height={24} />
								<Description
									className={styles.textAd}
									title={ReactHtmlParser(item.text)}
								/>
							</div>
						))}
					</div>
				</div>
			</form>
		</>
	)
}

export default CheckoutForms
