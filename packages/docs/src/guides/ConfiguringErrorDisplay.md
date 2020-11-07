---
imports:
  'UseShowErrorExample': '../examples/UseShowErrorExample'
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

## useShowError

`useShowError` is a hook that helps to control diplaying the error state of the field.

It is configured by two options `showRequiredError` and `showValidationError`.
Possible values are:
- `onChange` &mdash; Show error in any state.
- `onBlur` &mdash; Show error when field is not focused.
- `onChangeTouched` &mdash; Show error if user has touched the field.
- `onBlurTouched` &mdash; Show error when field is not focused and user 
  has touched the field.
- `off` &mdash; Do not show error.

Also, you can configure display of each error type separately
by passing an object to `showValidationErrors` prop.

Hook returns an object with the following fields:

- `showError` &mdash; Whether the field should show current error.
- `onFocus`, `onBlur` &mdash; Functions that you should call to update the state.
- `isFocused`, `isTouched` &mdash; Current state of the field.

## Example

In this example, form has one required email field.
Required error should not be shown initially.
Email format error is not shown during the input process,
but only if you leave the field with invalid email.
But if you enter a space, the error will be displayed immediately.

```@render
<UseShowErrorExample />
```

This is how field component uses `useShowError`:

```@source
file: '../examples/Field/index.js'
tabs: 4
lang: 'jsx'
highlightLines: '31'
```

This is how you can configure errors:

```@source
file: '../examples/UseShowErrorExample.js'
tabs: 4
lang: 'jsx'
highlightLines: 15-16
```

<br>

[Async Validation →](/guides/async-validation)
