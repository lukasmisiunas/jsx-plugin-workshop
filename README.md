# Wix Grow - Babel plugin to parse JSX

Create a babel plugin to convert JSX code to Javascript

- [Intro](#intro)
  - [Babel](#babel)
  - [AST](#ast)
- [Workshop](#workshop)
  - [Task 1](#task-1---jsx)
  - [Task 2](#task-2---props)
  - [Task 3](#task-3---children)
  - [Task 4](#task-4---text-children)
  - [Task 5](#task-5---element-children)

## Intro

### AST and Babel

- https://astexplorer.net/
- https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md#toc-introduction

## Workshop

### Helper methods

#### Builders

- `types.identifier` - creates an identifier node, e.g., object key, variable name, function name etc.
- `types.stringLiteral` - creates a node for a simple string (e.g., `"test"`)
- `types.callExpression` - creates a function call

  in:

  ```ts
  types.callExpression(types.identifier('myFunction'), [
    types.stringLiteral('arg-1'),
  ]);
  ```

  out:

  ```ts
  myFunction('arg-1');
  ```

- `types.objectExpression` and `types.objectProperty` - create an object literal. `objectExpression` creates a node for an empty object (e.g., `{}`). It accepts an array of `objectProperty` nodes, which represent object keys and values. E.g.,

  in:

  ```ts
  types.objectExpression(
    types.objectProperty(types.identifier('foo'), types.stringLiteral('bar')),
    types.objectProperty(types.identifier('key'), types.stringLiteral('value'))
  );
  ```

  out:

  ```ts
  { foo: 'bar', key: 'value' }
  ```

#### Validators

- `types.isJSXIdentifier`
- `types.isJSXAttribute`
- `types.isStringLiteral`
- `types.isJSXExpressionContainer` - is node a container for expression, e.g. `<div prop={'I am inside an expression container'} />>`
- `types.isJSXText` - e.g., `<div>This is JSX text</div>`
- `types.isJSXElement`

### Task 1 - JSX

Convert a JSX tag to `React.createElement` call

<details>
  <summary>Hint</summary>

Visitor should return `types.callExpression`, which expects two arguments:

- the name of the function. In this case, the name of the function is `React.createElement`, which is a **member expression**.
- array of nodes, which represent parameters of the final function. For now, it will have two items:

  - string literal node of the tag name
  - object expression node (for this task, it won't have any properties)
  </details>

### Task 2 - String props

Add support for parsing props, which are defined as string literals (e.g., `<div prop="hi" />`)

### Task 3 - Expression props

Add support for props, which are defined as an expression (`<div prop={ someExpression } />` e.g. `<div prop={1} />` or `<div prop={1 + 1} />`)

### Task 4 - Text children

Add support for text children - `<div>Text</div>`

### Task 5 - Element children

Add support for element children - `<div><span>Text in element</span></div>`
