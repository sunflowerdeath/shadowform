# API / useShowError

`useShowError` is a hook that allows to configure displaying of errors.

## Example

Creating field component using the hook:

```
import { useShowError } from 'shadowform'

const Field = ({
    field,
    showRequiredError = 'onChange',
    showValidationErrors = 'onChange'
}) = {
    const { showError, onFocus, onBlur } = useShowError({
        field, showRequiredError, showValidationErrors
    })

    const error = !field.isValid && showError && <span className="error">{field.error}</span>

    // ...
}
```

Using component:

```
<Field
    field={someform.fields.somefield}
    showRequiredError='onChangeTouched'
    showValidationErrors='onBlur'
/>
```

## Hook options

- **field**
<br/>
Type: `FieldStore`

- **showRequiredError**
  <br/>
  Type: `'onChange'|'onBlur'|'onChangeTouched'|'onBlurTouched'|'off'`
  <br/>
  Default: `'onChange'`
  
  When the field can display required error.
  
  Possible values are:
  
  - `onChange` &mdash; Show error in any state.
  - `onBlur` &mdash; Show error when field is not focused.
  - `onChangeTouched` &mdash; Show error if user has touched the field.
  - `onBlurTouched` &mdash; Show error when field is not focused and user 
    has touched the field.
  - `off` &mdash; Do not show error.

- **showValidationErrors**
  <br/>
  Type: `'onChange'|'onBlur'|'onChangeTouched'|'onBlurTouched'|'off'|Object`
  <br/>
  Default: `'onChange'`
  
  When the field can display validation errors.
  Possible values are same as for `showRequiredError`.
  Also, you can configure display of each error type separately using an object.

## Hook return value

- **showError**
  <br/>
  Type: `boolean`
  
  Whether to show current error according to the options and current state of the field.

- **onFocus**
  <br/>
  Type: `function`
  
  You need to call this function when field gets focus.

- **onBlur**
  <br/>
  Type: `function`
  
  You need to call this function when field loses focus.

- **isFocused**
  <br/>
  Type: `boolean`
  
  Whether the field is currently focused.

- **isTouched**
  <br/>
  Type: `boolean`
  
  Whether the field is touched (was focused once).
