import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { FormStore } from 'shadowform'
import moment from 'moment'

import Field from './Field'

const createForm = () =>
	new FormStore({
		fields: {
			date: {
				isRequired: true,
				requiredError: 'This field is required',
				normalize: value => moment(value, 'DD.MM.YYYY', true),
				validations: {
					format: {
						validate: value => value.isValid(),
						error: 'Invalid date'
					},
					inPast: {
						validate: value => value.isBefore(moment.now()),
						error: 'Date should not be in future'
					}
				}
			}
		}
	})

@observer
class NormalizationExample extends Component {
	constructor() {
		super()
		this.form = createForm()
	}

	render() {
		const { form } = this

		return (
			<div>
				<label style={{ marginBottom: 5 }}>Date in format DD.MM.YYYY:</label>
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

export default NormalizationExample
