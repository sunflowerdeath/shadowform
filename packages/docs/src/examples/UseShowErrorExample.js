import React from 'react'
import { observer, useLocalObservable } from 'mobx-react-lite'

import createForm from './createForm.js'
import Field from './Field'

const UseShowErrorExample = () => {
	const form = useLocalObservable(createForm)

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

export default observer(UseShowErrorExample)
