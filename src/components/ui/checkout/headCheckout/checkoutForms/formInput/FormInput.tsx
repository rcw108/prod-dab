import Description from '@/components/ui/headings/Description'
import { FC } from 'react'
import {
	FieldValues,
	RegisterOptions,
	UseFormRegisterReturn
} from 'react-hook-form'
import styles from '../CheckoutForms.module.scss'

interface IFormInput {
	register: (
		name: string,
		options?: RegisterOptions<FieldValues, string> | undefined
	) => UseFormRegisterReturn<string>
	require?: boolean
	type?: string
	className?: string
	title: string
	name: string
}

const FormInput: FC<IFormInput> = ({
	register,
	title,
	className = styles.req,
	require = true,
	type = 'text',
	name
}) => {
	return (
		<label className={className}>
			<Description title={title} />
			<input type={type} required={require} {...register} />
		</label>
	)
}

export default FormInput
