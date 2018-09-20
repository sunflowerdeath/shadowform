---
imports:
  'SubmitValidationExample': '../examples/SubmitValidationExample'
  'styles': '../examples/styles.css'
---

# Guides / Submit Validation

This example shows how you can set errors after submitting the form.

When this form is submitted, server checks whether the username exists and 
the password is valid.
Valid usernames are `'tom', 'mike', 'john'` and valid password is `'password'`.

```@render
<SubmitValidationExample />
```

To set errors after submitting form you need to call method `setErrors(errors)`

```@source
file: '../examples/SubmitValidationExample.js'
tabs: 4
from: 7
to: 42
lang: 'jsx'
highlightLines: '37'
```

[View example on github](https://github.com/sunflowerdeath/shadowform/tree/master/packages/docs/src/examples/SubmitValidationExample.js)
