---
imports:
  'AsyncValidationExample': '../examples/AsyncValidationExample'
---

# Guides / Async Validation

In this example, validation first checks email format
(for simplicity valid email is anything that has `'@'`),
and then checks whether this email is already used.
If you enter the value `test@test`, you will see an error message
that email is already used.

```@render
<AsyncValidationExample />
```

Async validation need to have flag `isAsync: true`,
and validate function should return Promise.

```@source
file: '../examples/AsyncValidationExample.js'
tabs: 4
from: 7
to: 29
lang: 'jsx'
highlightLines: '22'
```

[View full example code on github](https://github.com/sunflowerdeath/shadowform/tree/master/packages/docs/src/examples/AsyncValidationExample.js)

<br>

[External Validation →](/guides/external-validation)
