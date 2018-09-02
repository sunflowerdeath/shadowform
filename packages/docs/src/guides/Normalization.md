---
imports:
  'NormalizationExample': '../examples/NormalizationExample'
  'styles': '../examples/styles.css'
---

# Guildes / Values normalization

Field can perform normalizated of the value before validation .
It can be useful for example for dates and numbers.

In this example the field first checks that the date corresponds to the format,
and then that it is in the past.
Validation functions recieve normalized value instead of original.

```@render
<NormalizationExample />
```

```@source
file: '../examples/NormalizationExample.js'
tabs: 4
from: 8
to: 30
```

[View example on github](https://github.com/sunflowerdeath/shadowform/tree/master/packages/docs/src/examples/NormalizationExample.js)
