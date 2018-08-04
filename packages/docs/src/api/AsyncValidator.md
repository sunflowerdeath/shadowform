# AsyncValidator

Helper for async validation.

## Example:

```js
// Your validation function that returns a promise 
const validate = value => { /* ... */ }
const validator = new AsyncValidator()
const field = new FieldStore({
    validations: {
        something: () => validator.isChecking || validator.validationResult
    },
    // ...
})
validator.observe({ field, validate })
```

## observe(options)

Starts observing field's value.

- **field**
  <br>
  Type: `FieldStore`

- **validate**
  <br>
  Type: `(value: any) => Promise` 

  Validate function that is called when field's value is changed.
  It should return promise that will resolve to the validation result.

- **delay**
  <br>
  Type: `number`
  <br>
  Default: `100`

  Delay between calls of the validate function, in ms.
  It helps to prevent sending too many requests.

## dispose()

Disposes observers.

## isChecking
_observable_
<br>
Type: `boolean`

Whether the validator is currently performing validation.

## validationResult
_observable_
<br>
Type: `any`

Result of the last validation.
