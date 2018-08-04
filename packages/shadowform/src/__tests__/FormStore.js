import assert from 'assert'

import FormStore from '../FormStore'

describe('FormStore', () => {
	it('values', () => {
		const VALUE_A = 'value_a'
		const VALUE_A_NORM = 'value_a_norm'
		const VALUE_B = 'value_b'
		const form = new FormStore({
			fields: {
				a: { normalize: () => VALUE_A_NORM },
				b: {}
			},
			initialValues: {
				a: VALUE_A,
				b: VALUE_B
			}
		})

		assert.strictEqual(form.fields.a.value, VALUE_A)
		assert.strictEqual(form.fields.b.value, VALUE_B)
		assert.deepEqual(form.values, { a: VALUE_A, b: VALUE_B })
		assert.deepEqual(form.normalizedValues, { a: VALUE_A_NORM, b: VALUE_B })
	})

	it('isValid', () => {
		const VALID_VALUE = 'valid'
		const INVALID_VALUE = 'invalid'
		const VALIDATE = value => value !== INVALID_VALUE
		const form = new FormStore({
			fields: {
				a: {
					validations: {
						test: {
							validate: VALIDATE,
							error: 'error'
						}
					}
				},
				b: {
					validations: {
						test: {
							validate: VALIDATE,
							error: 'error'
						}
					}
				}
			},
			initialValues: {
				a: VALID_VALUE,
				b: VALID_VALUE
			}
		})

		assert(form.isValid, 'valid')

		form.fields.b.change(INVALID_VALUE)
		assert(!form.isValid, 'not valid')

		form.fields.b.disable()
		assert(form.isValid, 'valid when field with error is disabled')

		form.fields.a.setValidating(true)
		assert(!form.isValid, 'not valid when field is validating')
	})
})
