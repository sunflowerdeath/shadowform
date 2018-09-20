---
imports:
  'ConnectedFieldsExample': '../examples/ConnectedFieldsExample'
  'styles': '../examples/styles.css'
---

# Guides / Connected Fields

Validation of one field can depend on another field's value.
For example, password confirmation should match the password.

```@render
<ConnectedFieldsExample />
```

To achieve such behaviour, you need to trigger validation of the confirmation field
on change password. Validation function recieves values of all form fields as second argument.

```@source
file: '../examples/ConnectedFieldsExample.js'
tabs: 4
from: 7
to: 29
lang: 'jsx'
highlightLines: '19, 26'
```

[View example on github](https://github.com/sunflowerdeath/shadowform/tree/master/packages/docs/src/examples/ConnectedFieldsExample.js)
