---
imports:
  'MinimalExample': '../examples/MinimalExample'
  'styles': '../examples/styles.css'
---

# Introduction

Shadowform is library for creating forms using React and Mobx.
The purpose of this library is to help create forms with good user experience
 with simple code.

## Features

- Flexible configuration of displaying errors
- Sync and async validations
- External and server-side validation
- Values normalization

## Example

### Creating form

First, you need to create a form store.
Form contains several fields.
Each field can have validations and be required or optional.

```@source
file: '../examples/createForm.js'
tabs: 4
```

### Rendering form

Now you can render this form.
You can access field's value and validation result.
To update value you need to call method `change()`.

```@source
file: '../examples/MinimalExample.js'
tabs: 4
```

### Result

```@render
<MinimalExample />
```

### Field components

Also, you can create custom field components for different types of inputs
and reuse them in your forms.

```@source
file: '../examples/Field/simple.js'
tabs: 4
```

This is minimal example of usage. In next sections you can learn how to
use shadowform in more powerful way for more complex scenarios.

