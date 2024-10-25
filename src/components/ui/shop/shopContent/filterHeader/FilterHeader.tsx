import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'

interface IFilterHeader {
	handler: (value: boolean) => void
	handlerValue: boolean
	className: string
	title: string
}

const FilterHeader: FC<IFilterHeader> = ({
	className,
	handler,
	handlerValue,
	title
}) => {
	return (
		<div className={className} onClick={() => handler(!handlerValue)}>
			<h4>{title}</h4>
			<Image
				className={clsx({ ['rotate-180']: handlerValue })}
				src='/select.svg'
				alt='select'
				width={18}
				height={18}
			/>
		</div>
	)
}

export default FilterHeader
