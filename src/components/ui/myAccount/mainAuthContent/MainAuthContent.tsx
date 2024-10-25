'use client'

import { FC } from 'react'
import styles from './MainAuthContent.module.scss'
import Login from './login/Login'
import Register from './register/Register'
const MainAuthContent: FC = () => {
	return (
		<div className={styles.auth}>
			<div className='container'>
				<div className={styles.wrapper}>
					<Login />
					<Register />
				</div>
			</div>
		</div>
	)
}

export default MainAuthContent
