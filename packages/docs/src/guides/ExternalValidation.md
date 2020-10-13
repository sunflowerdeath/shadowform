---
imports:
  'ExternalValidationExample': '../examples/ExternalValidationExample'
  'styles': '../examples/styles.css'
---

# Guides / External Validation

This example shows how you can perform external validation after submitting the form.

When this form is submitted, server checks whether the username exists and 
the password is valid.
Valid usernames are `'tom', 'mike', 'john'` and valid password is `'password'`.

```@render
<ExternalValidationExample />
```

To set errors after submitting form you need to call method `setErrors(errors)`

```@source
file: '../examples/ExternalValidationExample.js'
tabs: 4
from: 7
to: 42
lang: 'jsx'
highlightLines: '37'
```

[View full example code on github](https://github.com/sunflowerdeath/shadowform/tree/master/packages/docs/src/examples/SubmitValidationExample.js)

<br>

[Values normalization →](/guides/value-normalization)
