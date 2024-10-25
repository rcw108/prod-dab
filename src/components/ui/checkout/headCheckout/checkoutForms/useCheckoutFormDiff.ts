import { Libraries, useLoadScript } from '@react-google-maps/api'
import { useEffect, useRef } from 'react'
import { FieldValues, UseFormSetValue } from 'react-hook-form'

const libraries: Libraries = ['places']
const apiKey = 'AIzaSyBhOWxxPQKHvtJNNT0FDwEkvGKb25nXK3g'

export const useCheckoutFormDiff = (setValue: UseFormSetValue<FieldValues>) => {
	const { isLoaded: isLoadedDiff } = useLoadScript({
		googleMapsApiKey: apiKey,
		libraries,
		language: 'en'
	})

	const autocompleteRefDiff = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (isLoadedDiff && autocompleteRefDiff.current) {
			const autocomplete = new window.google.maps.places.Autocomplete(
				autocompleteRefDiff.current,
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
					'streetAddressDiff',
					`${addressComponents['street_number'] || ''} ${addressComponents['route'] || ''}`
				)
				setValue('cityTownDiff', addressComponents['locality'] || '')
				setValue(
					'stateCountryDiff',
					addressComponents['administrative_area_level_1'] || ''
				)
				setValue('zipCodeDiff', addressComponents['postal_code'] || '')
			})
		}
	}, [isLoadedDiff, setValue])

	return {
		autocompleteRefDiff,
		isLoadedDiff
	}
}
