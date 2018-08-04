import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { FormStore } from 'shadowform'

import Field from './Field'

const createForm = () =>
	new FormStore({
		fields: {
			username: {
				isRequired: true,
				requiredError: 'This field is required'
			},
			password: {
				isRequired: true,
				requiredError: 'This field is required'
			}
		}
	})

// simulate request to server
const sleep = time => new Promise(resolve => setTimeout(resolve, time))
const sendForm = async values => {
	await sleep(750)
	if (!['john', 'mike', 'tom'].includes(values.username)) {
		throw { username: 'No such user' }
	}
	if (values.password !== 'password') {
		throw { password: 'Invalid password' }
	}
}

const submit = async form => {
	try {
		await sendForm(form.values)
	} catch (errors) {
		form.setErrors(errors)
		alert('Fix submit errors!')
		return
	}
	alert(`Submitted:\n${JSON.stringify(form.values)}`)
}

@observer
class SubmitValidationExample extends Component {
	constructor() {
		super()
		this.form = createForm()
	}

	render() {
		const form = this.form
		return (
			<div>
				<label style={{ marginBottom: 5 }}>Username:</label>
				<Field
					field={form.fields.username}
					showRequiredError="onBlurTouched"
				/>
				<label style={{ marginBottom: 5 }}>Password:</label>
				<Field
					field={form.fields.password}
					showRequiredError="onBlurTouched"
				/>
				<button
					className="button"
					disabled={!form.isValid}
					onClick={() => submit(this.form)}
				>
					Submit
				</button>
				<button className="button" onClick={() => form.reset()}>
					Reset
				</button>
			</div>
		)
	}
}

export default SubmitValidationExample
