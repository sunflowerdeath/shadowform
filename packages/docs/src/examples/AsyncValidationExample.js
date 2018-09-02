import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { FormStore } from 'shadowform'

import Field from './Field'

const sleep = time => new Promise(resolve => setTimeout(resolve, time))
const checkEmail = email => sleep(750).then(() => email !== 'test@test')

const createForm = () =>
	new FormStore({
		fields: {
			email: {
				isRequired: true,
				requiredError: 'This field is required',
				validations: {
					email: {
						validate: value => value.match(/@/),
						error: 'Invalid email address'
					},
					unique: {
						isAsync: true,
						validate: checkEmail,
						error: 'This email is already used'
					}
				}
			}
		}
	})

@observer
class AsyncValidationExample extends Component {
	constructor() {
		super()
		this.form = createForm()
	}

	render() {
		const { form } = this
		return (
			<div>
				<label style={{ marginBottom: 5 }}>Email:</label>
				<Field
					field={form.fields.email}
					showRequiredError="onBlurTouched"
					showValidationErrors={{ email: 'onBlur', unique: 'onChange' }}
				/>
				<button
					className="button"
					disabled={!form.isValid}
					onClick={() =>
						alert(`Submitted:\n${JSON.stringify(form.values)}`)
					}
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

export default AsyncValidationExample
