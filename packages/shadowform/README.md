
## Form

### constructor({ fields, initialValues })

*fields*
Type: `Object`

key is name
value is FieldConfig

*initialValues*
Type: `Object`

## FieldStore

### constructor(options: Object)

Following options:

- **initialValue**
  <br>
  Type: `any`

  Initial value of the field.

- **isEmpty**
  <br>
  Type: `function`
  
  Function to check whether the field is empty.
  By default, field is empty when value is `null`, `undefined` or an empty string.
  
- **isRequired**
  <br>
  Type: `boolean`
  <br>
  Default: `false`

  Field must not be empty.

- **requiredError**
  <br>
  Type: `string | (normalizedValue: any) => string`
  
- **normalize**
  <br>
  Type: `(value: any) => normalizedValue: any`
  <br>
  Function to normalize value.
  
  For example, you can use it to parse dates or numbers:
  
  ```js
  {
  	normalize: value => moment.parse(value, 'mm.dd.yyyy')
  }
  ```
  
- **validations**
  <br>
  Type: `Object`
  
  `(normalizedValue, formNormalizedValues) => boolean`
  
  ```js
  validations: {
      onlyLetters: normalizedValue => normalizedValue.match(/^[a-zA-Z]*$/),
      minLength: normalizedValue => normalizedValue && normalizedValue.length >= 6,
      isUnique: normalizedValue => false
  }
  ```
  
- **validationsErrors**
  <br>
  Type: `Object`
  
  ```
  validationErrors: {
      onlyLetters: 'Only letters',
      minLength: 'Must be at least 6 characters',
      isUnique: normalizedValue => `Name ${normalizedValue} is taken`
  }
  ```

### value

Current value of the field.

### normalizedValue

Current normalized value.

### isEmpty
Type: `Boolean`

Whether the field is empty.

### isValid
Type: `Boolean`

Whether the field is valid.

### error

error

## Field

### props

- **validateOn**
  <br>
  Type: `'change' | 'blur'`
  <br>
  Default: `'change'`

- **showRequiredError**
  <br>
  Type: `boolean`
  <br>
  Default: `true`

  when field isEmpty && isRequired && !isValid

  this allows to not show that field is required
  until form is submitted

- **store**
  <br>
  Type: `FieldStore`

- **render**
  <br>
  Type: `(renderProps: Object) => ReactElement`

- **component**
  <br>
  Type: `Component`

  renderProps:

	- value
	- onChange
	- onFocus
	- onBlur
	- normalizedValue
	- isEmpty
	- isValid
	- error
