import { useState, useEffect, useRef } from 'react'

const shouldShowError = (props, state) => {
	const { field, showValidationErrors, showRequiredError } = props
	const { isValid, error } = field
	const { isFocused, isTouched } = state

	if (isValid) return false

	const showMode = do {
		if (error.type === 'external') {
			;('onChange')
		} else if (error.type === 'required') {
			showRequiredError
		} else if (typeof showValidationErrors === 'object') {
			error.validation in showValidationErrors
				? showValidationErrors[error.validation]
				: 'onChange'
		} else {
			showValidationErrors
		}
	}

	return do {
		if (showMode === 'onChange') true
		else if (showMode === 'onChangeTouched') isTouched
		else if (showMode === 'onBlur') !isFocused
		else if (showMode === 'onBlurTouched') !isFocused && isTouched
		else if (showMode === 'off') false
	}
}

const useLastValue = (value) => {
	const ref = useRef(value)
	if (ref.current !== value) ref.current = value
	return () => ref.current
}

const useShowError = (props) => {
	const getProps = useLastValue(props)

	const [state, setState] = useState({
		isFocused: false,
		isTouched: false,
		showError: false,
	})

	useEffect(
		() => {
			const unbindReset = props.field.on('reset', () =>
				setState((currentState) => ({
					...currentState,
					isTouched: false,
				}))
			)
			const unbindValidate = props.field.on('validate', () => {
				setState((currentState) => ({
					...currentState,
					showError: shouldShowError(getProps(), currentState),
				}))
			})
			return () => {
				unbindReset()
				unbindValidate()
			}
		},
		[props.field]
	)

	useEffect(() => {
		// update on props change
	})

	const onFocus = () => {
		setState((currentState) => ({
			...currentState,
			isFocused: true,
			isTouched: true,
		}))
	}

	const onBlur = () => {
		setState((currentState) => {
			const nextState = { ...currentState, isFocused: false }
			return {
				...currentState,
				showError: shouldShowError(props, nextState),
			}
		})
	}

	return { ...state, onBlur, onFocus }
}

export default useShowError
