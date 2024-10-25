import Description from '@/components/ui/headings/Description'
import SubHeading from '@/components/ui/headings/SubHeading'
import { useActions } from '@/hooks/useActions'
import { ValidUser } from '@/types/user.interface'
import clsx from 'clsx'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { RegistrationCustomer } from '../../customer.interface'
import {
	authCustomer,
	createCustomer,
	validateToken
} from '../../customersActions'
import styles from '../MainAuthContent.module.scss'

const Register: FC = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors }
	} = useForm<RegistrationCustomer>({
		mode: 'onChange'
	})

	const [show, setShow] = useState(false)

	const { setUser } = useActions()

	const [errorRegister, setErrorRegister] = useState<string>('')

	const handleFormSubmit: SubmitHandler<RegistrationCustomer> = async data => {
		const response = await createCustomer(data)

		if (!response.success) {
			// Обработка ошибки
			setErrorRegister(response?.error?.code)
		} else {
			// Успешное создание клиента
			reset()
			const loginUser = await authCustomer({
				login: data.email,
				password: data.password
			})
			if (loginUser.success) {
				const userData: ValidUser = await validateToken(loginUser.data.jwt)
				if (userData.user) {
					const userDataWithJwt = {
						user: userData.user,
						jwt: loginUser.data.jwt
					}
					setUser(userDataWithJwt)
				} else {
					setErrorRegister('Failed to validate user token')
				}
			} else {
				setErrorRegister('Login after registration failed')
			}
		}
	}

	return (
		<div className={styles.register}>
			<SubHeading title={'Register'} className={styles.title} />
			<form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
				<div>
					<label className={clsx(styles.authInput, styles.password)}>
						<Description className={styles.title} title={'Username'} />
						<div className={styles.box}>
							<input
								type='text'
								{...register('username', {
									required: 'Username is required',
									minLength: {
										value: 2,
										message: 'Minimum length is 5 characters'
									},
									maxLength: {
										value: 20,
										message: 'Maximum length is 20 characters'
									}
								})}
							/>
						</div>
					</label>
					{errors.username && (
						<span className={styles.error}>{errors.username.message}</span>
					)}
				</div>
				<div>
					<label className={clsx(styles.authInput, styles.password)}>
						<Description className={styles.title} title={'Email address'} />
						<div className={styles.box}>
							<input
								type='email'
								{...register('email', {
									required: 'Email is required',
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: 'Invalid email address'
									}
								})}
							/>
						</div>
					</label>
					{errors.email && (
						<span className={styles.error}>{errors.email.message}</span>
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
				<p className={styles.policy}>
					Your personal data will be used to support your experience throughout
					this website, to manage access to your account, and for other purposes
					described in our{' '}
					<a
						target='_blank'
						href='https://dabpens.com/privacy-policy'
						rel='noopener noreferrer'
					>
						privacy policy
					</a>
					.
				</p>
				<button type='submit' className={styles.submit}>
					Register
				</button>
			</form>
		</div>
	)
}

export default Register
