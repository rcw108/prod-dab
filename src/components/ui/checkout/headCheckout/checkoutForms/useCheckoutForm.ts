import { Libraries, useLoadScript } from '@react-google-maps/api'
import { useEffect, useRef } from 'react'
import { FieldValues, UseFormSetValue } from 'react-hook-form'

const libraries: Libraries = ['places']
const apiKey = 'AIzaSyBhOWxxPQKHvtJNNT0FDwEkvGKb25nXK3g'

export const useCheckoutForm = (setValue: UseFormSetValue<FieldValues>) => {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: apiKey,
		libraries,
		language: 'en'
	})

	const autocompleteRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (isLoaded && autocompleteRef.current) {
			const autocomplete = new window.google.maps.places.Autocomplete(
				autocompleteRef.current,
				{
					types: ['address'],
					componentRestrictions: { country: 'us' }
				}
			)

			autocomplete.addListener('place_changed', () => {
				const place = autocomplete.getPlace()
				if (!place.address_components) return

				const addressComponents = place.address_components.reduce(
					(acc, component) => {
						const componentType = component.types[0]
						acc[componentType] = component.long_name
						return acc
					},
					{} as Record<string, string>
				)

				// Update form values
				setValue(
					'streetAddress',
					`${addressComponents['street_number'] || ''} ${addressComponents['route'] || ''}`
				)
				setValue('cityTown', addressComponents['locality'] || '')
				setValue(
					'stateCountry',
					addressComponents['administrative_area_level_1'] || ''
				)
				setValue('zipCode', addressComponents['postal_code'] || '')
			})
		}
	}, [isLoaded, setValue])

	return {
		autocompleteRef,
		isLoaded
	}
}
