import clsx from 'clsx'
import { FC, JSXElementConstructor, ReactElement } from 'react'
import styles from './Headings.module.scss'
interface ISubHeading {
	title: string | ReactElement<any, string | JSXElementConstructor<any>>[]
	className?: string
}

const SubHeading: FC<ISubHeading> = ({ title, className }) => {
	if (typeof title === 'string') {
		return <h2 className={className}>{title}</h2>
	} else {
		return <div className={clsx(styles.h2, className)}>{title}</div>
	}
}

export default SubHeading
