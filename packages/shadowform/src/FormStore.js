import { observable, computed, action } from 'mobx'

import FieldStore from './FieldStore'

class FormStore {
	constructor({ fields, initialValues }) {
		this.fields = {}
		this.initialValues = initialValues || {}
		for (const [name, options] of Object.entries(fields)) {
			this.fields[name] = new FieldStore({
				name,
				...options,
				initialValue: this.initialValues[name],
				form: this
			})
		}
	}

	@computed
	get values() {
		const result = {}
		for (const [name, field] of Object.entries(this.fields)) {
			result[name] = field.value
		}
		return result
	}

	@computed
	get normalizedValues() {
		const result = {}
		for (const [name, field] of Object.entries(this.fields)) {
			result[name] = field.normalizedValue
		}
		return result
	}

	@computed
	get isValid() {
		return Object.values(this.fields).every(
			field => field.isDisabled || (!field.isValidating && field.isValid)
		)
	}

	@computed
	get isValidating() {
		return Object.values(this.fields).some(field => field.isValidating)
	}

	@action
	reset() {
		for (const field of Object.values(this.fields)) {
			field.reset()
		}
	}

	@action
	setErrors(errors) {
		for (const [field, error] of Object.entries(errors)) {
			this.fields[field].setError(error)
		}
	}
}

export default FormStore
