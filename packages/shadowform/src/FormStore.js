import { makeAutoObservable } from 'mobx'

import FieldStore from './FieldStore'

class FormStore {
	fields = {}
	initialValues = {}

	constructor({ fields, initialValues }) {
		makeAutoObservable(this)
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

	get values() {
		const result = {}
		for (const [name, field] of Object.entries(this.fields)) {
			result[name] = field.value
		}
		return result
	}

	get normalizedValues() {
		const result = {}
		for (const [name, field] of Object.entries(this.fields)) {
			result[name] = field.normalizedValue
		}
		return result
	}

	get isValid() {
		return Object.values(this.fields).every(
			field => field.isDisabled || (!field.isValidating && field.isValid)
		)
	}

	get isValidating() {
		return Object.values(this.fields).some(field => field.isValidating)
	}

	reset() {
		for (const field of Object.values(this.fields)) {
			field.reset()
		}
	}

	setErrors(errors) {
		for (const [field, error] of Object.entries(errors)) {
			this.fields[field].setError(error)
		}
	}
}

export default FormStore
