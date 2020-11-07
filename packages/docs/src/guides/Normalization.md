---
imports:
  'NormalizationExample': '../examples/NormalizationExample'
---

# Guildes / Values normalization

Field can perform normalization of the value before validation.
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
to: 28
lang: 'jsx'
highlightLines: '14'
```

[View full example code on github](https://github.com/sunflowerdeath/shadowform/tree/master/packages/docs/src/examples/NormalizationExample.js)

<br>

[Connected Fields →](/guides/connected-fields)
