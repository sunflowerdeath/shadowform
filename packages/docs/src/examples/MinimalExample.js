import React, { Component } from 'react'
import { observer, useLocalObservable } from 'mobx-react-lite'

import createForm from './createForm'

const MinimalExample = () => {
	const form = useLocalObservable(createForm)
	const email = form.fields.email
	return (
		<div>
			Email:
			<br />
			<input
				value={email.normalizedValue || ''}
				onChange={event => email.change(event.target.value)}
				className={email.isValid ? 'input' : 'input input_invalid'}
			/>
			{!email.isValid && <div className="error">{email.error.value}</div>}
			<button
				className="button"
				disabled={!form.isValid}
				onClick={() => alert(`Submitted:\n${JSON.stringify(form.values)}`)}
			>
				Submit
			</button>
		</div>
	)
}

export default observer(MinimalExample)
