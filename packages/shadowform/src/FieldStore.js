import NanoEvents from 'nanoevents'
import { makeAutoObservable, untracked } from 'mobx'
import debounce from 'lodash.debounce'

import cancellable, { CancelError } from './utils/cancellable'

const defaultIsEmpty = value => value === null || value === undefined || value === ''

class FieldStore {
	isDisabled = false
	value = undefined
	isEmpty = false
	normalizedValue = undefined
	isValidating = false
	isValid = false
	error = undefined

	constructor({
		initialValue,
		isEmpty,
		normalize,
		isRequired,
		requiredError,
		validations,
		asyncValidations,
		asyncValidationDelay,
		validationErrors,
		form
	}) {
		makeAutoObservable(this)
		this.form = form
		this.initialValue = initialValue
		this.config = {
			isEmpty,
			normalize,
			isRequired,
			requiredError,
			validations,
			asyncValidations,
			validationErrors
		}
		this.emitter = new NanoEvents()
		this.debouncedAsyncValidate = debounce(
			this.asyncValidate.bind(this),
			asyncValidationDelay === undefined ? 100 : asyncValidationDelay
		)
		this.change(initialValue)
	}

	on(...args) {
		return this.emitter.on(...args)
	}

	getError(type, validation) {
		const { config, normalizedValue } = this
		const error =
			type === 'required'
				? config.requiredError
				: config.validations[validation].error
		return typeof error === 'function' ? error(normalizedValue) : error
	}

	change(value) {
		this.setValue(value)
		this.emitter.emit('change')
		this.validate()
	}

	reset() {
		this.setValue(this.initialValue)
		this.emitter.emit('reset')
		this.validate()
	}

	setValue(value) {
		const { config } = this
		this.value = value
		this.isEmpty = config.isEmpty ? config.isEmpty(value) : defaultIsEmpty(value)
		this.normalizedValue = config.normalize ? config.normalize(value) : value
	}

	cancelValidation() {
		if (this.isValidating) {
			this.debouncedAsyncValidate.cancel()
			if (this.currentValidation) this.currentValidation.cancel()
			this.isValidating = false
		}
	}

	validate() {
		const { config, normalizedValue, isEmpty, form } = this

		this.cancelValidation()

		if (isEmpty) {
			if (config.isRequired) {
				this.isValid = false
				this.error = { type: 'required', value: this.getError('required') }
			} else {
				this.isValid = true
				this.error = undefined
			}
			this.emitter.emit('validate')
			return
		}

		if (config.validations) {
			const syncValidations = Object.entries(config.validations).filter(
				([_, validation]) => !validation.isAsync
			)
			for (const [name, validation] of syncValidations) {
				const isValid = validation.validate(
					normalizedValue,
					form && untracked(() => form.normalizedValues)
				)
				if (!isValid) {
					this.isValid = false
					this.error = {
						type: 'validation',
						validation: name,
						value: this.getError('validation', name)
					}
					this.emitter.emit('validate')
					return
				}
			}

			if (
				Object.values(config.validations).some(
					validation => validation.isAsync
				)
			) {
				this.isValidating = true
				this.debouncedAsyncValidate()
				return
			}
		}

		this.isValid = true
		this.error = undefined
		this.emitter.emit('validate')
	}

	async asyncValidate() {
		const { config, normalizedValue, form } = this
		const asyncValidations = Object.entries(config.validations).filter(
			([name, validation]) => validation.isAsync
		)
		for (const [name, validation] of asyncValidations) {
			this.currentValidation = cancellable(
				validation.validate(normalizedValue, form && form.normalizedValues)
			)
			let isValid
			try {
				// eslint-disable-next-line no-await-in-loop
				isValid = await this.currentValidation
			} catch (error) {
				if (error instanceof CancelError) return
				// TODO handle errors
				console.log(error)
				return
			}
			this.currentValidation = undefined
			if (!isValid) {
				this.isValidating = false
				this.isValid = false
				this.error = {
					type: 'validation',
					validation: name,
					value: this.getError('validation', name)
				}
				this.emitter.emit('validate')
				return
			}
		}

		this.isValidating = false
		this.isValid = true
		this.error = undefined
		this.emitter.emit('validate')
	}

	setError(error) {
		this.isValid = false
		this.error = { type: 'external', value: error }
		this.emitter.emit('validate')
	}

	removeError() {
		this.isValid = true
		this.error = undefined
	}

	setValidating(validating) {
		this.isValidating = validating
	}

	disable() {
		this.isDisabled = true
	}

	enable() {
		this.isDisabled = false
	}
}

export default FieldStore
