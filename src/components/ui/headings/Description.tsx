import clsx from 'clsx'
import { FC, JSXElementConstructor, ReactElement } from 'react'
import styles from './Headings.module.scss'

interface IDescription {
	title: string | ReactElement<any, string | JSXElementConstructor<any>>[]
	className?: string
}

const Description: FC<IDescription> = ({ title, className }) => {
	if (typeof title === 'string') {
		return <p className={clsx(styles.p, className)}>{title}</p>
	} else {
		return <div className={clsx(styles.p, className)}>{title}</div>
	}
}

export default Description
