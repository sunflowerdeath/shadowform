# API / FormStore

Mobx store that stores multiple fields.

**Table of contents:**

```@toc
```

## constructor({ fields, initialValues })

**fields**
<br>
Type: `Object`

Options for form fields.
List of options is same as for
[FieldStore constructor](/api/field-store#constructoroptions-object).

**initialValues**
<br>
Type: `Object`

Initial values for fields.

## fields

Type: `Object<string, FieldStore>`

Field instances.

## values

Type: `Object`

Current values of form fields.

## normalizedValues

Type: `Object`

Current normalized values.

## isValid

Type: `boolean`

Whether all *not disabled* fields of the form are valid and not currently validating.

## isValidating

Type: `boolean`

Whether some of the fields are currently validating.

## setErrors(errors: Object)

Sets external errors to multiple fields.

## reset()

Resets all fields to initial values.
