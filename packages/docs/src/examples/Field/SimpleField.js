import React from 'react'
import { observer } from 'mobx-react-lite'

const Field = props => {
	const { field } = props
	const { value, isDisabled, isEmpty, isValidating, isValid, error } = field
	return (
		<div className="field">
			<input
				className={!isValid ? 'input input--invalid' : 'input'}
				value={value || ''}
				disabled={isDisabled}
				onChange={event => field.change(event.target.value)}
			/>
			{isValidating && <div className="spinner" />}
			{!isEmpty &&
				!isValidating && (
					<div className="clear" onClick={() => field.reset('')} />
				)}
			{!isValid && <div className="error">{error.value}</div>}
		</div>
	)
}

export default observer(Field)
