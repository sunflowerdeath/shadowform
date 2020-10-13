import React from 'react'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { FormStore } from 'shadowform'

import Field from './Field'

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

const ConnectedFieldsExample = () => {
	const form = useLocalObservable(createForm)
	return (
		<div>
			<label style={{ marginBottom: 5 }}>Password:</label>
			<Field field={form.fields.password} showRequiredError="onBlurTouched" />

			<label style={{ marginBottom: 5 }}>Password confirmation:</label>
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

export default observer(ConnectedFieldsExample)
