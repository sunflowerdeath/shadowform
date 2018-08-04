# API / FieldStore

Mobx store that stores field value and performs validations.

**Table of contents:**

```@toc
```

## constructor(options: Object)

Constructor takes object with the following options:

- **initialValue**
  <br>
  Type: `any`

  Initial value of the field.

- **isEmpty**
  <br>
  Type: `(value: any) => boolean`
  
  Function to check whether the field is empty.
  By default, field is empty when value is `null`, `undefined` or an empty string.
  
- **isRequired**
  <br>
  Type: `boolean`
  <br>
  Default: `false`

  Required fields must not be empty.

- **requiredError**
  <br>
  Type: `string | (normalizedValue: any) => string`

  If field is required and empty it will have this error.
  
- **normalize**
  <br>
  Type: `(value: any) => normalizedValue: any`

  Function to normalize value.
  For example, you can use it to parse dates or numbers:
  
  ```js
  {
      normalize: value => moment.parse(value, 'mm.dd.yyyy')
  }
  ```
  
- **validations**
  <br>
  Type: `Object<string, object>`

  Validation configuration is an object with following keys:
  - validate `(value: any, formValues: any) => boolean|Promise<boolean>`
    &nbsp;&mdash;
	Function that takes current value and returns `true` if the value is valid.
	Async validation function returns promise that resolves to validation result.
  - isAsync `boolean` &mdash; Whether the validation function is asynchronous.
  - error &mdash; Error message or a function that takes current value and returns error.

  Example: 
  ```js
  validations: {
      onlyLetters: {
          validate: normalizedValue => normalizedValue.match(/^[a-zA-Z]*$/),
          error: 'Use only letters',
      },
      minLength: {
          validate: normalizedValue => normalizedValue && normalizedValue.length >= 6,
          error: 'Must be at least 6 characters'
      },
      isUnique: {
          isAsync: true,
          validate: checkLogin,
          value => `Login ${value} is already taken.`
      }
  }
  ```
  
- **asyncValidationDelay**
  <br>
  Type: `number`
  <br>
  Default: `100`

  Delay before the async validation after change value of the field.
  It helps to reduce number of requests.

## value
Type: `any`

Current value of the field.

## normalizedValue
Type: `any`

Current normalized value.

## isEmpty
Type: `boolean`

Whether the field is empty.

## isValid
Type: `boolean`

Whether the field is valid.

## error
Type: `object | undefined`

Error is an object with following fields:

- **type** `'required' | 'validation' | 'external'` &ndash; Type of the error
- **value** `any` &ndash; Error message
- **validation** `string` &ndash; Name of the failed validation.

## isValidating
Type: `boolean`

Whether the field is currently performing validation.

## isDisabled
Type: `boolean`

Whether the field is disabled.

## change(value: any)

Updates field value.

## reset()

Resets field to the initial value.

## setValidating(validating: boolean)

Manually set `isValidating` value.

## setError(error: any)

Manually set error. Error will have type `external`.

## disable()

Disables field.

## enable()

Enables field.
