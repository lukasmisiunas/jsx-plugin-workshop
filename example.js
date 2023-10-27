const types = require('@babel/types');
const babel = require('@babel/core');

/** @typedef {() => babel.PluginObj} CustomPlugin */

const fooToBarSource = `
  const foo = 1;
  if (foo) {
    console.log(foo);
  }
`;
/** @type {CustomPlugin} */
function fooToBarPlugin() {
  return {
    visitor: {
      Identifier(path) {
        if (path.node.name === 'foo') {
          // Without helpers
          // path.node.name = 'bar';

          // With helpers
          path.replaceWith(types.identifier('bar'));
        }
      },
    },
  };
}

/** @type {CustomPlugin} */
function stringToObjectPlugin() {
  return {
    visitor: {
      StringLiteral(path) {
        if (path.node.value === 'I should be in an object') {
          // Without helpers
          // path.replaceWith({
          //   type: 'ObjectExpression',
          //   properties: [
          //     {
          //       type: 'ObjectProperty',
          //       key: { type: 'Identifier', name: 'bar' },
          //       value: { type: 'StringLiteral', value: 'I am in an object' },
          //       computed: false,
          //       shorthand: false,
          //     },
          //   ],
          // });

          // With helpers
          path.replaceWith(
            types.objectExpression([
              types.objectProperty(
                types.identifier('bar'),
                types.stringLiteral('I am in an object')
              ),
            ])
          );
        }
      },
      ReferencedIdentifier(path) {
        if (
          path.node.name === 'foo' &&
          !types.isMemberExpression(path.parent)
        ) {
          path.replaceWith(
            types.memberExpression(
              types.identifier('foo'),
              types.identifier('bar')
            )
          );
        }
      },
    },
  };
}
const stringToObjectSource = `
  const foo = 'I should be in an object';
  console.log(foo);
`;

const { code } =
  babel.transform(fooToBarSource, { plugins: [fooToBarPlugin] }) ?? {};

console.log(code);
