import { FormStore } from 'shadowform'

const createForm = () =>
	new FormStore({
		fields: {
			email: {
				isRequired: true,
				requiredError: 'This field is required',
				validations: {
					noSpaces: {
						validate: value => !value.match(/\s/),
						error: 'Spaces are not allowed'
					},
					email: {
						validate: value => value.match(/@/),
						error: 'Invalid email address'
					}
				}
			}
		}
	})

export default createForm
