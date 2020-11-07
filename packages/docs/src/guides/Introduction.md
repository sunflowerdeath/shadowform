---
imports:
  'MinimalExample': '../examples/MinimalExample'
---

# Introduction

Shadowform is library for creating forms using React and 
[MobX](https://mobx.js.org/README.html).
The purpose of this library is to help create forms with good user experience and
with simple code.

## Features

- It allows you to configure when fields should display error, 
  now when to perform the validation.
  In Shadowform validation state always corresponds to the current values,
  but sometimes you may want to not display error.
  For example, empty required field is not valid, but you can configure it to 
  not show error message initally, only if user has missed this field.

- It uses [MobX](https://mobx.js.org/README.html) library, so it has very simple
  and convenient API.
  Also, this allows you to decide whether you want to put form's state into the store. 
  If you don't &ndash; just use `useLocalObserver()` hook.

- Supports sync and async validations

- Supports external and server-side validation

- Supports values normalization

## Example

### Creating form

First, you need to create a form store.
Form contains several fields.
Each field can have validations and be required or optional.

```@source
file: '../examples/createForm.js'
tabs: 4
lang: 'jsx'
```

### Rendering form

Now you can render this form.
You can access field's value and validation result.
To update value you need to call method `change()`.

```@source
file: '../examples/MinimalExample.js'
tabs: 4
lang: 'jsx'
```

### Result

```@render
<MinimalExample />
```

### Field components

You can create custom field components for different types of inputs
and reuse them in different forms.

```@source
file: '../examples/Field/SimpleField.js'
tabs: 4
lang: 'jsx'
```

This is minimal example of usage. In next sections you can learn how to
use Shadowform in more powerful way for more complex scenarios.

<br>

[Configuring error display →](/guides/configuring-error-display)

