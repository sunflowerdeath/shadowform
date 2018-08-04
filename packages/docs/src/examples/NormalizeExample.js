import React, { Component } from 'react'
import { observable } from 'mobx-react'
import { FormStore } from 'shadowform'
import moment from 'moment'

const createForm = () =>
	new FormStore({
		fields: {
			date: {
				isRequired: true,
				requiredError: 'This field is required',
				normalize: value => moment.parse(value, 'dd/mm/yyyy'),
				validations: {
					format: {
						validate: value => value.isValid(),
						error: 'Invalid date'
					},
					inPast: {
						value: value => value.isBefore(moment.now()),
						error: 'Date in future'
					}
				}
			}
		}
	})

@observer
class NormalizeExample extends Component {
	constructor() {
		super()
		this.form = createForm()
	}

	render() {
		return (
			<div>
				<label style={{ marginBottom: 5 }}>Email:</label>
				<Field
					field={form.fields.date}
					showRequiredError="onBlurTouched"
					showValidationErrors={{ format: 'onBlur', inPast: 'onChange' }}
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

export default NormalizeExample
