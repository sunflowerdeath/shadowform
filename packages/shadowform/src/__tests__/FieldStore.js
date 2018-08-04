import assert from 'assert'
import { spy, useFakeTimers } from 'sinon'

import FieldStore from '../FieldStore'

describe('FieldStore', () => {
	const VALID_VALUE = 'VALID_VALUE'
	const INVALID_VALUE = 'INVALID_VALUE'
	const VALIDATE = value => value !== 'INVALID_VALUE'
	const VALIDATION_ERROR = 'VALIDATION_ERROR'
	const REQUIRED_ERROR = 'REQUIRED_ERROR'

	it('initial value', () => {
		const field = new FieldStore({
			initialValue: INVALID_VALUE
		})
		assert(field.value, INVALID_VALUE)
	})

	it('valid field', () => {
		const field = new FieldStore({
			initialValue: VALID_VALUE,
			validations: {
				validation: {
					validate: VALIDATE,
					error: VALIDATION_ERROR
				}
			}
		})
		assert.strictEqual(field.value, VALID_VALUE)
		assert(!field.isEmpty, 'not empty')
		assert(field.isValid, 'valid')
		assert.strictEqual(field.error, undefined)
	})


	it('empty field', () => {
		const validate = spy(VALIDATE)
		const field = new FieldStore({
			validations: {
				validation: {
					validate,
					error: VALIDATION_ERROR
				}
			}
		})
		assert(field.isEmpty, 'empty')
		assert(field.isValid, 'valid')
		assert(validate.notCalled, 'does not run validation')
		assert.strictEqual(field.error, undefined, 'no error')
	})

	it('required error', () => {
		const field = new FieldStore({
			isRequired: true,
			requiredError: REQUIRED_ERROR,
			validations: {
				validation: {
					validate: VALIDATE,
					error: VALIDATION_ERROR
				}
			}
		})
		assert(field.isEmpty, 'empty')
		assert(!field.isValid, 'invalid')
		assert.deepEqual(field.error, {
			type: 'required',
			value: REQUIRED_ERROR
		})
	})

	it('validation error', () => {
		const field = new FieldStore({
			initialValue: INVALID_VALUE,
			validations: {
				validation: {
					validate: VALIDATE,
					error: VALIDATION_ERROR
				}
			}
		})
		assert.strictEqual(field.value, INVALID_VALUE)
		assert(!field.isEmpty, 'not empty')
		assert(!field.isValid, 'invalid')
		assert.deepEqual(field.error, {
			type: 'validation',
			validation: 'validation',
			value: VALIDATION_ERROR
		})
	})


	it('normalize', () => {
		const validate = spy(VALIDATE)
		const field = new FieldStore({
			initialValue: '  value  ',
			normalize: value => value.trim(),
			validations: {
				validation: {
					validate,
					error: VALIDATION_ERROR
				}
			}
		})

		assert.strictEqual(field.normalizedValue, 'value')
		assert(validate.calledOnce)
		assert(validate.calledWith('value'))
	})

	it('error function', () => {
		const field = new FieldStore({
			initialValue: INVALID_VALUE,
			validations: {
				validation: {
					validate: VALIDATE,
					error: () => 'ERROR FUNCTION'
				}
			}
		})

		assert.equal(field.error.value, 'ERROR FUNCTION')
	})

	it('revalidate on change', () => {
		const field = new FieldStore({
			initialValue: VALID_VALUE,
			validations: {
				validation: {
					validate: VALIDATE,
					error: VALIDATION_ERROR
				}
			}
		})

		assert(field.isValid, 'should be valid')
		field.change(INVALID_VALUE)
		assert(!field.isValid, 'should become invalid')
	})

	describe('Async validation', () => {
		const DELAY = 100
		const DURATION = 1000
		const ASYNC_VALIDATE = value =>
			new Promise(resolve =>
				setTimeout(() => resolve(value !== INVALID_VALUE), DURATION)
			)

		let clock
		beforeEach(() => {
			clock = useFakeTimers()
		})
		afterEach(() => {
			clock.restore()
		})

		it('async validation', done => {
			const ERROR = 'ERROR'
			const validate = spy(ASYNC_VALIDATE)
			const field = new FieldStore({
				initialValue: INVALID_VALUE,
				validations: {
					test: {
						isAsync: true,
						validate,
						error: ERROR
					}
				}
			})

			assert(field.isValidating, 'Field is validating')
			assert(!validate.called, 'Validate is not called until delay')

			// await when validate is called
			clock.tick(DELAY)
			assert(validate.called, 'Validate is called')
			assert(
				validate.calledWith(INVALID_VALUE),
				"Validate is called with field's value"
			)

			clock.tick(DURATION)
			process.nextTick(() => {
				assert(!field.isValidating, 'Validator stops validating')
				assert(!field.isValid, 'Field becomes invalid')
				assert.deepEqual(field.error, {
					type: 'validation',
					validation: 'test',
					value: ERROR
				})
				done()
			})
		})
	})
})
