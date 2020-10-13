import React, { useState } from 'react'
import { observer, useLocalObservable } from 'mobx-react-lite'

import createForm from './createForm'
import Field from '../Field'

const SubmitButtonExample = () => {
	const form = useLocalObservable(createForm)
	const [isSubmitted, setIsSubmitted] = useState(false)

	const onSubmit = () => {
		setIsSubmitted(true)
		if (!form.isValid) {
			alert('Fix errors!')
		} else {
			alert('Submitted!\n' + JSON.stringify(form.values))
		}
	}

	const onReset = () => {
		form.reset()
		setIsSubmitted(false)
	}

	return (
		<div>
			<label style={{ marginBottom: 5 }}>Email:</label>
			<Field
				field={form.fields.email}
				showRequiredError={isSubmitted ? 'onBlur' : 'off'}
				showValidationErrors={{ noSpaces: 'onChange', email: 'onBlur' }}
			/>
			<button className="button" onClick={onSubmit}>
				Submit
			</button>
			<button className="button" onClick={onReset}>
				Reset
			</button>
		</div>
	)
}

export default observer(SubmitButtonExample)
