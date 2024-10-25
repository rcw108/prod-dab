'use client'

import Description from '@/components/ui/headings/Description'
import SubHeading from '@/components/ui/headings/SubHeading'
import { useActions } from '@/hooks/useActions'
import { ValidUser } from '@/types/myAccount.interface'
import clsx from 'clsx'
import Link from 'next/link'
import { FC, FormEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthCustomer } from '../../customer.interface'
import { authCustomer, validateToken } from '../../customersActions'
import styles from '../MainAuthContent.module.scss'
const Login: FC = () => {
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
		getValues
	} = useForm<AuthCustomer>({
		mode: 'onChange'
	})

	const [show, setShow] = useState(false)

	const [remember, setRemember] = useState(false)

	const [errorLogin, setErrorLogin] = useState<string>()

	const { setUser } = useActions()

	const handleFormSubmit = async (e: FormEvent) => {
		e.preventDefault()
		const data = {
			login: getValues('login'),
			password: getValues('password')
		}
		try {
			const response = await authCustomer(data)
			if (response.status === false) {
				setErrorLogin('An error occurred. Please check login and password')
			}
			const userData: ValidUser = await validateToken(response.data.jwt)

			if (userData.user) {
				const data = {
					user: userData.user,
					jwt: userData.jwt[0]
				}
				setUser(data)
			} else {
				setErrorLogin('An error occurred. Please check login and password')
			}
		} catch (error: any) {
			setErrorLogin('An error occurred. Please check login and password')
		}
	}

	return (
		<div className={styles.login}>
			<SubHeading className={styles.title} title={'Login'} />
			<form className={styles.form}>
				<div>
					<label className={clsx(styles.authInput, styles.password)}>
						<Description
							className={styles.title}
							title={'Username or email address'}
						/>
						<div className={styles.box}>
							<input
								type='text'
								{...register('login', {
									required: true,
									minLength: {
										value: 2,
										message: 'Minimum length is 2 characters'
									},
									maxLength: {
										value: 40,
										message: 'Maximum length is 40 characters'
									}
								})}
							/>
						</div>
					</label>
					{errors.login && (
						<span className={styles.error}>{errors.login.message}</span>
					)}
				</div>

				<div>
					<label className={clsx(styles.authInput, styles.password)}>
						<Description className={styles.title} title={'Password'} />

						<div className={styles.box}>
							<div className={styles.show} onClick={() => setShow(!show)}></div>
							<input
								type={show ? 'text' : 'password'}
								{...register('password', {
									required: true,
									minLength: 5,
									maxLength: 20
								})}
							/>
						</div>
					</label>
					{errors.password && (
						<span className={styles.error}>{errors.password.message}</span>
					)}
				</div>
				<label className={styles.checkbox}>
					<input
						type='checkbox'
						checked={remember}
						onChange={() => setRemember(!remember)}
					/>
					<span>Remember me</span>
				</label>
				<button className={styles.submit} onClick={handleFormSubmit}>
					Log in
				</button>
			</form>
			<Link href='/my-account/lost-password' className={styles.forgot}>
				Lost your password?
			</Link>
			{errorLogin && <p className={styles.error}>{errorLogin}</p>}
		</div>
	)
}

export default Login
