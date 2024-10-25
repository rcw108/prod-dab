'use client'

import SmallHeading from '@/components/ui/headings/SmallHeading'
import { useGetAuthorizeToken } from '@/hooks/useGetAuthorizeToken'
import { useGlobalUser } from '@/hooks/useGlobalUser'
import { useUser } from '@/hooks/useUser'
import { logout } from '@/store/user/user.slice'
import clsx from 'clsx'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { SingleCustomer } from '../../customer.interface'
import {
	authCustomer,
	changePasswordCustom,
	getCustomerById,
	updateOtherCustomerInfo
} from '../../customersActions'
import styles from './EditAccountContent.module.scss'

interface IEditAccountContent {
	first_name: string
	last_name: string
	display_name: string
	email: string
	current_password?: string
	new_password?: string
	confirm_password?: string
}

const EditAccountContent: FC = () => {
	const user = useUser()

	const [customer, setCustomer] = useState<SingleCustomer | null>(null)
	const [mainInfoError, setMainInfoError] = useState<string | null>(null)
	const [passwordChangeError, setPasswordChangeError] = useState<string | null>(
		null
	)

	const { authorize } = useGlobalUser()
	const { fetchAuthorizeToken } = useGetAuthorizeToken()

	useEffect(() => {
		if (authorize === null) {
			fetchAuthorizeToken(Number(user?.ID))
		}
	})

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

	useEffect(() => {
		if (customer) {
			setValue('first_name', customer.first_name)
			setValue('last_name', customer.last_name)
			setValue('display_name', customer.username)
			setValue('email', customer.email)
		}
	}, [customer])

	const {
		register,
		getValues,
		setValue,
		handleSubmit,
		formState: { errors }
	} = useForm<IEditAccountContent>({
		mode: 'onChange'
	})

	const getUserAuthNetKey = () => {
		if (customer) {
			const res = customer.meta_data.find(
				meta => meta.key === '_authnet_customer_id'
			)
		}
	}

	getUserAuthNetKey()

	const handleForm = async (data: IEditAccountContent) => {
		if (user) {
			const mainUserData = {
				first_name: data.first_name,
				last_name: data.last_name,
				username: data.display_name
			}

			const response = await updateOtherCustomerInfo(
				mainUserData,
				Number(user.ID)
			)

			if (response.success) {
				setValue('first_name', response.data.first_name)
				setValue('last_name', response.data.last_name)
				setValue('display_name', response.data.username)
				setValue('email', response.data.email)
			} else {
				setMainInfoError('An unexpected error occurred. Please try again.')
			}
		}

		if (
			getValues('current_password') !== '' &&
			getValues('new_password') !== '' &&
			getValues('confirm_password') !== ''
		) {
			const currentPassword = getValues('current_password')

			if (currentPassword !== undefined && currentPassword !== '') {
				const data = {
					login: getValues('email'),
					password: getValues('current_password') || ''
				}

				const response = await authCustomer(data)

				if (response.status === false) {
					setPasswordChangeError(response.message)
				}

				if (response.status === true) {
					setPasswordChangeError(null)
					const awaitChangePassword = await changePasswordCustom(
						getValues('new_password') || '',
						Number(customer?.id)
					)

					if (awaitChangePassword.success) {
						setPasswordChangeError(null)
					} else {
						setPasswordChangeError(awaitChangePassword.error)
					}

					logout()
				}
			}
		}
	}

	return (
		<div className={styles.form}>
			<form className={styles.accForm} onSubmit={handleSubmit(handleForm)}>
				<label className={styles.req}>
					<span className={styles.spanTitle}>First name</span>
					<input
						{...register('first_name', {
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
					{errors.first_name?.message && (
						<div className={styles.error}>
							{errors.first_name.message.toString()}
						</div>
					)}
				</label>
				<label className={styles.req}>
					<span className={styles.spanTitle}>Last name</span>
					<input
						{...register('last_name', {
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
								message: 'Last name must be less than 40 characters'
							}
						})}
						type='text'
					/>
					{errors.last_name?.message && (
						<div className={styles.error}>
							{errors.last_name.message.toString()}
						</div>
					)}
				</label>
				<label className={clsx(styles.req, styles.display)}>
					<span className={styles.spanTitle}>Display name</span>
					<input
						{...register('display_name', {
							required: {
								value: true,
								message: 'Display name is required'
							},
							minLength: {
								value: 2,
								message: 'Display name must be at least 2 characters'
							},
							maxLength: {
								value: 40,
								message: 'Display name must be less than 40 characters'
							}
						})}
						type='text'
					/>
					<p className={styles.descl}>
						This will be how your name will be displayed in the account section
						and in reviews
					</p>
					{errors.display_name?.message && (
						<div className={styles.error}>
							{errors.display_name.message.toString()}
						</div>
					)}
				</label>
				<label className={clsx(styles.req, styles.mail)}>
					<span className={styles.spanTitle}>Email address</span>
					<input
						{...register('email', {
							required: {
								value: true,
								message: 'Email address is required'
							},
							minLength: {
								value: 5,
								message: 'Email address must be at least 5 characters'
							},
							maxLength: {
								value: 40,
								message: 'Email address must be less than 40 characters'
							},
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: 'Invalid email address'
							},
							validate: value =>
								value === customer?.email ||
								'If need to change email, enter current password'
						})}
						type='email'
					/>
					{errors.email?.message && (
						<div className={styles.error}>
							{errors.email.message.toString()}
						</div>
					)}
				</label>
				<SmallHeading className={styles.passTitle} title='Password change' />
				<label className={styles.password}>
					<span className={styles.spanTitle}>
						Current password (leave blank to leave unchanged)
					</span>
					<input
						{...register('current_password', {
							minLength: {
								value: 2,
								message: 'Current password must be at least 2 characters'
							},
							maxLength: {
								value: 40,
								message: 'Current password must be less than 40 characters'
							}
						})}
						type='password'
					/>
					{errors.current_password?.message && (
						<div className={styles.error}>
							{errors.current_password.message.toString()}
						</div>
					)}
				</label>
				<label className={styles.password}>
					<span className={styles.spanTitle}>
						New password (leave blank to leave unchanged)
					</span>
					<input
						{...register('new_password', {
							minLength: {
								value: 2,
								message: 'New password must be at least 2 characters'
							},
							maxLength: {
								value: 40,
								message: 'New password must be less than 40 characters'
							},
							validate: value =>
								value !== getValues('current_password') ||
								'New password cannot be the same as current password'
						})}
						type='password'
					/>
					{errors.new_password?.message && (
						<div className={styles.error}>
							{errors.new_password.message.toString()}
						</div>
					)}
				</label>
				<label className={styles.password}>
					<span className={styles.spanTitle}>Confirm new password</span>
					<input
						{...register('confirm_password', {
							minLength: {
								value: 2,
								message: 'Confirm new password must be at least 2 characters'
							},
							maxLength: {
								value: 40,
								message: 'Confirm new password must be less than 40 characters'
							},
							validate: value =>
								value === getValues('new_password') || 'Passwords do not match'
						})}
						type='password'
					/>
					{errors.confirm_password?.message && (
						<div className={styles.error}>
							{errors.confirm_password.message.toString()}
						</div>
					)}
				</label>
				<button className={styles.btn} type='submit'>
					Save changes
				</button>
				{mainInfoError && (
					<div className={styles.formSendError}>{mainInfoError}</div>
				)}
				{passwordChangeError && (
					<div className={styles.formSendError}>{passwordChangeError}</div>
				)}
			</form>
		</div>
	)
}

export default EditAccountContent
