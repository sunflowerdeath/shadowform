# Cross-validation

Validation of the field can depend on another field's value.
For example, password confirmation should match the password.

```js
const form = new FormStore({
    fields: {
        password: {
            isRequired: true,
            requiredError: 'This field is required',
        },
        confirmation: {
            isRequired: true,
            requiredError: 'This field is required',
            validations: {
                matchPassword: (value, formValues) => {
                    return value === formValues.password
                }
            },
            validationErrors: {
                matchPassword: "Passwords don't match"
            }
        }
    }
})

form.fields.password.on('change', () => form.fields.confirmation.validate())
```
