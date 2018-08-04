import React, { Component } from 'react'
import { observer } from 'mobx-react'

import createForm from './createForm'

@observer
class MinimalExample extends Component {
	constructor() {
		super()
		this.form = createForm()
	}

	render() {
		const { form } = this
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
					className='button'
					disabled={!form.isValid}
					onClick={() => alert(`Submitted:\n${JSON.stringify(form.values)}`)}
				>
					Submit
				</button>
			</div>
		)
	}
}

export default MinimalExample
