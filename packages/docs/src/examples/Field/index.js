import React from 'react'
import { observer } from 'mobx-react-lite'
import { useShowError } from 'shadowform'

const Field = ({
	field,
	showRequiredError = 'onChange',
	showValidationErrors = 'onChange'
}) => {
	const { showError, onFocus, onBlur } = useShowError({
		field,
		showRequiredError,
		showValidationErrors
	})
	const { value, isDisabled, isEmpty, isValidating, isValid, error } = field
	return (
		<div className="field">
			<input
				className={!isValid && showError ? 'input input--invalid' : 'input'}
				value={value || ''}
				disabled={isDisabled}
				onChange={event => field.change(event.target.value)}
				onFocus={onFocus}
				onBlur={onBlur}
			/>
			{isValidating && <div className="spinner" />}
			{!isEmpty &&
				!isValidating && (
					<div className="clear" onClick={() => field.reset('')} />
				)}
			{!isValid && showError && <div className="error">{error.value}</div>}
		</div>
	)
}

export default observer(Field)
