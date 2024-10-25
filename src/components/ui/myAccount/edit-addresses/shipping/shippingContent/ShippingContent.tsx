'use client'

import { states } from '@/components/ui/checkout/headCheckout/checkoutForms/statesData'
import Description from '@/components/ui/headings/Description'
import SubHeading from '@/components/ui/headings/SubHeading'
import { useGetAuthorizeToken } from '@/hooks/useGetAuthorizeToken'
import { useGlobalUser } from '@/hooks/useGlobalUser'
import { useUser } from '@/hooks/useUser'
import clsx from 'clsx'
import { FC, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import { SingleCustomer } from '../../../customer.interface'
import {
	getCustomerById,
	updateCustomerBillingAddress
} from '../../../customersActions'
import styles from '../../billing/billingContent/BillingContent.module.scss'

export interface IShippingContent {
	firstName: string
	lastName: string
	companyName: string
	streetAddress: string
	cityTown: string
	zipCode: string
	stateCountry: { value: string; label: string } | null | string
}

const ShippingContent: FC = () => {
	const {
		watch,
		getValues,
		control,
		setValue,
		handleSubmit,
		register,
		formState: { errors }
	} = useForm<IShippingContent>({
		mode: 'onChange'
	})

	const user = useUser()
	const [customer, setCustomer] = useState<SingleCustomer | null>(null)

	const onSubmit = async (data: IShippingContent) => {
		const shippingData = {
			first_name: data.firstName,
			last_name: data.lastName,
			company: data.companyName,
			address_1: data.streetAddress,
			city: data.cityTown,
			postcode: data.zipCode,
			state:
				typeof data.stateCountry === 'string'
					? data.stateCountry
					: data.stateCountry?.value,
			country: 'US'
		}

		const response = await updateCustomerBillingAddress(
			{ shipping: shippingData },
			Number(user!.ID)
		)
	}

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

	const { authorize } = useGlobalUser()
	const { fetchAuthorizeToken } = useGetAuthorizeToken()

	useEffect(() => {
		if (authorize === null) {
			fetchAuthorizeToken(Number(user?.ID))
		}
	})

	useEffect(() => {
		if (customer) {
			setValue('firstName', customer.shipping.first_name)
			setValue('lastName', customer.shipping.last_name)
			setValue('companyName', customer.shipping.company)
			setValue('streetAddress', customer.shipping.address_1)
			setValue('cityTown', customer.shipping.city)
			setValue('zipCode', customer.shipping.postcode)

			const selectedState = states.find(
				state => state.value === customer.shipping.state
			)
			if (selectedState) {
				setValue('stateCountry', selectedState.value)
			}
		}
	}, [customer, setValue])

	return (
		<section className={styles.formBilling}>
			<SubHeading className={styles.subtitle} title='Shipping address' />
			<form className={styles.billing} onSubmit={handleSubmit(onSubmit)}>
				<label className={styles.req}>
					<span className={styles.spanTitle}>First name</span>
					<input
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
								message: 'First name must be less than 20 characters'
							}
						})}
						type='text'
					/>
					{errors.firstName?.message && (
						<div className={styles.error}>
							{errors.firstName.message.toString()}
						</div>
					)}
				</label>
				<label className={styles.req}>
					<span className={styles.spanTitle}>Last name</span>
					<input
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
								message: 'Last name must be less than 20 characters'
							}
						})}
						type='text'
					/>
					{errors.lastName?.message && (
						<div className={styles.error}>
							{errors.lastName.message.toString()}
						</div>
					)}
				</label>
				<label className={styles.company}>
					<span>Company name (optional)</span>
					<input
						{...register('companyName', {
							minLength: {
								value: 1,
								message: 'Company name must be at least 1 characters'
							},
							maxLength: {
								value: 40,
								message: 'Company name must be less than 20 characters'
							}
						})}
						type='text'
					/>
					{errors.companyName?.message && (
						<div className={styles.error}>
							{errors.companyName.message.toString()}
						</div>
					)}
				</label>
				<label className={styles.req}>
					<span className={styles.spanTitle}>Country / Region</span>
					<Description className={styles.us} title='United States (US)' />
				</label>
				<label className={styles.req}>
					<span className={styles.spanTitle}>State / County</span>
					<Controller
						name='stateCountry'
						control={control}
						defaultValue={
							states.find(
								option => option.value === customer?.billing?.state
							) || undefined
						}
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
								value={
									states.find(option => option.value === field.value) || null
								}
							/>
						)}
					/>
					{errors.stateCountry?.message && (
						<div className={styles.error}>
							{errors.stateCountry.message.toString()}
						</div>
					)}
				</label>
				<label className={clsx(styles.req, styles.street)}>
					<span className={styles.spanTitle}>Street address</span>
					<input
						{...register('streetAddress', {
							required: {
								value: true,
								message: 'Street address is required'
							},
							minLength: {
								value: 5,
								message: 'Street address must be at least 5 characters'
							},
							maxLength: {
								value: 80,
								message: 'Street address must be less than 80 characters'
							}
						})}
						type='text'
					/>
					{errors.streetAddress?.message && (
						<div className={styles.error}>
							{errors.streetAddress.message.toString()}
						</div>
					)}
				</label>
				<label className={styles.req}>
					<span className={styles.spanTitle}>City / Town</span>
					<input
						{...register('cityTown', {
							required: {
								value: true,
								message: 'City / Town is required'
							},
							minLength: {
								value: 2,
								message: 'City / Town must be at least 5 characters'
							},
							maxLength: {
								value: 80,
								message: 'City / Town must be less than 80 characters'
							}
						})}
						type='text'
					/>
					{errors.cityTown?.message && (
						<div className={styles.error}>
							{errors.cityTown.message.toString()}
						</div>
					)}
				</label>
				<label className={styles.req}>
					<span className={styles.spanTitle}>Zip code</span>
					<input
						{...register('zipCode', {
							required: {
								value: true,
								message: 'Zip code is required'
							},
							minLength: {
								value: 2,
								message: 'Zip code must be at least 5 characters'
							},
							maxLength: {
								value: 10,
								message: 'Zip code must be less than 10 characters'
							}
						})}
						type='number'
					/>
					{errors.zipCode?.message && (
						<div className={styles.error}>
							{errors.zipCode.message.toString()}
						</div>
					)}
				</label>
				<button type='submit' className={styles.btn}>
					Save address
				</button>
			</form>
		</section>
	)
}

export default ShippingContent
