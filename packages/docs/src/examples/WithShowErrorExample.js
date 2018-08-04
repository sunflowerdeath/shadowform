import React, { Component } from 'react'
import { observer } from 'mobx-react'

import createForm from './createForm.js'
import Field from './Field'

@observer
class WithShowErrorExample extends Component {
	constructor() {
		super()
		this.form = createForm()
	}

	render() {
		const form = this.form
		return (
			<div>
				<label style={{ marginBottom: 5 }}>Email:</label>
				<Field
					field={form.fields.email}
					showRequiredError="onBlurTouched"
					showValidationErrors={{ noSpaces: 'onChange', email: 'onBlur' }}
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

export default WithShowErrorExample
