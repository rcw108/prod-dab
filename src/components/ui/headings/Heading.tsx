import clsx from 'clsx'
import { FC, JSXElementConstructor, ReactElement } from 'react'
import styles from './Headings.module.scss'

interface IHeading {
	title: string | ReactElement<any, string | JSXElementConstructor<any>>[]
	className?: string
}

const Heading: FC<IHeading> = ({ title, className }) => {
	if (typeof title === 'string') {
		return <h1 className={className}>{title}</h1>
	} else {
		return <div className={clsx(styles.h1, className)}>{title}</div>
	}
}

export default Heading
