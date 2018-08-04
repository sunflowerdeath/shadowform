import React, { Component } from 'react'
import { observer } from 'mobx-react'

import createFrom from './createForm'
import Field from '../Field'

@observer
class SubmitButtonExample extends Component {
	constructor() {
		super()
		this.form = createForm()
	}

	state = {
		isSubmitted: false
	}

	onSubmit() {
		this.setState({ isSubmitted: true })
		if (!this.props.form.isValid) {
			alert('Fix errors!')
		} else {
			alert('Submitted!\n' + JSON.stringify(form.values))
		}
	}

	onReset() {
		this.form.reset()
		this.setState({ isSubmitted: false })
	}

	render() {
		const { form } = this.form
		return (
			<div>
				<label style={{ marginBottom: 5 }}>Email:</label>
				<Field
					field={form.fields.email}
					showRequiredError={this.state.isSubmitted ? 'onBlur' : 'off'}
					showValidationErrors={{ noSpaces: 'onChange', email: 'onBlur' }}
				/>
				<button className="button" onClick={this.onSubmit.bind(this)}>
					Submit
				</button>
				<button className="button" onClick={this.onReset.bind(this)}>
					Reset
				</button>
			</div>
		)
	}
}

export default SubmitButtonExample
