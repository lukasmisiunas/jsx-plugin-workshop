# Wix Grow - Babel plugin to parse JSX

Create a babel plugin to convert JSX code to Javascript

- [Intro](#intro)
  - [Babel](#babel)
  - [AST](#ast)
- [Workshop](#workshop)
  - [Task 0](#task-0---warmup)
  - [Task 1](#task-1---jsx)

## How to

`nvm install && nvm use && node -v`

`yarn`

or

`npm intall`

## Intro

### AST and Babel

https://astexplorer.net/
https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md#toc-introduction

## Workshop

### Helper methods

#### Validators

- `types.isJSXIdentifier`
- `types.isJSXAttribute`
- `types.isStringLiteral` - is node a string
- `types.isJSXExpressionContainer` - is node a container for expression, e.g. `<div prop={'I am inside an expression container'} />>`
- `types.isJSXSpreadAttribute` - e.g., `<div { ...spreadProps }` />
- `types.isJSXText` - e.g., `<div>This is JSX text</div>`
- `types.isJSXElement`

#### Builders

- `types.identifier` - creates an identifier node, e.g., object key, variable name, function name etc.
- `types.stringLiteral` - creates a node for a simple string (e.g., `"test"``)
- `types.callExpression` - creates a function call
  in:

  ```
  types.callExpression(
    types.identifier('myFunction'),
    [
      types.stringLiteral('arg-1')
    ]
  )
  ```

  out:

  ```
  myFunction('arg-1')
  ```

- `types.objectExpression` and `types.objectProperty` - create an object literal. `objectExpression` creates a node for an empty object (e.g., `{}`). It accepts an array of `objectProperty` nodes, which represent object keys and values. E.g.,

  in:

  ```
  types.objectExpression(
    types.objectProperty(
      types.identifier('foo'),
      types.stringLiteral('bar')
    ),
    types.objectProperty(
      types.identifier('key'),
      types.stringLiteral('value')
    )
  )
  ```

  out:

  ```
  { foo: 'bar', key: 'value' }
  ```

### Task 0 - Warmup

See [examples](./parse-jsx-plugin/examples.js)

### Task 1 - JSX

Convert a JSX tag to `React.createElement(tagName, {})` call

<detail>
  <summary>Hint 1</summary>
  Babel builders to use:
  - `types.callExpression`
  - `types.memberExpression`
  - `types.stringLiteral`
  - `types.identifier`
  - `types.objectExpression`
</detail>

<detail>
  <summary>Hint 2</summary>
  `types.callExpression` expects two arguments:
  - the name of the function. In this case, the name of the function is `React.createElement`, which is a **member expression**.
  - array of nodes, which represent parameters of the final function. In this task, it will have two items:
    - string literal node of the tag name
    - props object. In this task, this is already provided
</detail>

### Task 2 - Props

Add support for parsing string props (e.g., `<div prop="hi" />`)

### Task 3 - Children

Add support for children

### Task 4 - Non string props

### Task 5 - Spread props
