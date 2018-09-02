import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import isEqual from 'lodash.isequal'

const SHOW_ERROR_TYPES = [
	'onChange',
	'onChangeTouched',
	'onBlur',
	'onBlurTouched',
	'off'
]

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

const withShowError = Field =>
	@observer
	class WrappedField extends Component {
		static displayName = `withShowError(${Field.displayName || 'Field'})`

		static propTypes = {
			field: PropTypes.object.isRequired,
			// eslint-disable-next-line react/no-unused-prop-types
			showRequiredError: PropTypes.oneOf(SHOW_ERROR_TYPES),
			// eslint-disable-next-line react/no-unused-prop-types
			showValidationErrors: PropTypes.oneOfType([
				PropTypes.oneOf(SHOW_ERROR_TYPES),
				PropTypes.objectOf(PropTypes.oneOf(SHOW_ERROR_TYPES))
			]),
			onBlur: PropTypes.func,
			onFocus: PropTypes.func
		}

		static defaultProps = {
			showRequiredError: 'onChange',
			showValidationErrors: 'onChange'
		}

		static getDerivedStateFromProps(props, state) {
			const { prevShowRequiredError, prevShowValidationErrors } = state
			const { showRequiredError, showValidationErrors } = props
			if (
				prevShowRequiredError !== showRequiredError ||
				!isEqual(prevShowValidationErrors, showValidationErrors)
			) {
				return {
					prevShowRequiredError: showRequiredError,
					prevShowValidationErrors: showValidationErrors,
					showError: shouldShowError(props, state)
				}
			}
			return null
		}

		constructor(props) {
			super()
			const { field } = props
			this.state = {
				isFocused: false,
				isTouched: false
			}
			this.onFocus = this.onFocus.bind(this)
			this.onBlur = this.onBlur.bind(this)
			this.unbindReset = field.on('reset', () => {
				this.setState({ isTouched: false })
				// when validation is synchronous, state will not be
				// updated in validate handler
				this.state.isTouched = false
			})
			this.unbindValidate = field.on('validate', () =>
				this.setState(state => ({
					showError: shouldShowError(this.props, state)
				}))
			)
		}

		componentWillUnmount() {
			this.unbindReset()
			this.unbindValidate()
		}

		onFocus() {
			this.setState({ isFocused: true, isTouched: true })
			this.props.onFocus?.()
		}

		onBlur() {
			this.setState(state => ({
				isFocused: false,
				showError: shouldShowError(this.props, {
					...state,
					isFocused: false
				})
			}))
			this.props.onBlur?.()
		}

		render() {
			const { isFocused, isTouched, showError } = this.state
			return React.createElement(Field, {
				...this.props,
				isFocused,
				isTouched,
				showError,
				onFocus: this.onFocus,
				onBlur: this.onBlur
			})
		}
	}

export default withShowError
