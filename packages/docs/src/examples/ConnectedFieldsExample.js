import React, { Component } from 'react'
import { observable } from 'mobx-react'
import { FormStore } from 'shadowform'

const createForm = () => {
	const form = new FormStore({
		fields: {
			password: {
				isRequired: true,
				requiredError: 'This field is required'
			},
			confirmation: {
				isRequired: true,
				requiredError: 'This field is required',
				validations: {
					matchPassword: {
						validate: (value, values) => value === values.password,
						error: "Passwords don't match"
					}
				}
			}
		}
	})
	form.fields.password.on('change', () => form.fields.confirmation.validate())
	return form
}

@observer
class ConnectendFieldsExample extends Component {
	constructor() {
		super()
		this.form = createForm()
	}

	render() {
		return (
			<div>
				<label style={{ marginBottom: 5 }}>Email:</label>
				<Field field={form.fields.password} showRequiredError="onBlurTouched" />
				<Field
					field={form.fields.confirmation}
					showRequiredError="onBlurTouched"
					showValidationErrors={{ matchPassword: 'onBlur' }}
				/>
				<button
					className="button"
					disabled={!form.isValid}
					onClick={() => alert(`Submitted:\n${JSON.stringify(form.values)}`)}
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

export default ConnectendFieldsExample
