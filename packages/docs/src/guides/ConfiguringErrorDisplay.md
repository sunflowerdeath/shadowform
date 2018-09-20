---
imports:
  'WithShowErrorExample': '../examples/WithShowErrorExample'
  'styles': '../examples/styles.css'
---

# Guides / Configuring Error Display

## Logical and displayed state

Shadowform uses separation of form's state into logical and displayed parts.
Logical state is stored in Mobx and always corresponds to the current values.
Displayed state exists in component and allows to control displaying 
error messages.

For example, empty required field should not show error initally,
only if user has missed this field.

Another example is fields with format, like email or phone number.
Value is not valid until user enters the full value,
but field should not show the error during the input process,
only if the user left the value in the field incomplete.

## withShowError

`withShowError` is a decorator that wraps field component 
and allows to configure displaying of errors
using props `showRequiredError` and `showValidationErrors`

Possible values are:
- `onChange` &mdash; Show error in any state.
- `onBlur` &mdash; Show error when field is not focused.
- `onChangeTouched` &mdash; Show error if user has touched the field.
- `onBlurTouched` &mdash; Show error when field is not focused and user 
  has touched the field.
- `off` &mdash; Do not show error.

Also, you can configure display of each error type separately
by passing an object to `showValidationErrors` prop.

Wrapped field component recieves following props:

- `showError` &mdash; Whether the field should show current error.
- `onFocus`, `onBlur` &mdash; Field should call these functions to update the state.

## Example

In this example, form has one required email field.
Required error should not be shown initially.
Email format error is not shown during the input process,
but only if you leave the field with invalid email.
But if you enter a space, the error will be displayed immediately.

```@render
<WithShowErrorExample />
```

This is how field component uses `withShowError`:

```@source
file: '../examples/Field/index.js'
tabs: 4
lang: 'jsx'
highlightLines: '23'
```

This is how you can configure errors:

```@source
file: '../examples/WithShowErrorExample.js'
tabs: 4
lang: 'jsx'
highlightLines: 21-22
```

