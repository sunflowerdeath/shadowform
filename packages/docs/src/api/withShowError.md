# API / withShowError

`withShowError` is a decorator that wraps field component 
and allows to configure displaying of errors.

## Example

Creating field component:

```
import { withShowError } from 'shadowform'

const Field = ({ field, showError, onFocus, onBlur }) = {
    // ...
}

const FieldWithShowError = withShowError(Field)
```

Using component:

```
<FieldWithShowError
    field={someform.fields.somefield}
    showRequiredError='onChangeTouched'
    showValidationErrors='onBlur'
/>
```

## Component props

These props you can set on decorated component to configure how to show errors.

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

## Passed props

These props are passed to the inner component.

- **showError**
  <br/>
  Type: `boolean`
  
  Whether the component should show current error according to the configuration.

- **onFocus**
  <br/>
  Type: `function`
  
  Call this function when field ?? focus.

- **onBlur**
  <br/>
  Type: `function`
  
  Call this function when field ?? focus.

- **isFocused**
  <br/>
  Type: `boolean`
  
  Whether the field is currently focused.

- **isTouched**
  <br/>
  Type: `boolean`
  
  Whether the field is touched (was focused once).
