const types = require('@babel/types');
const jsxSyntaxPlugin = require('@babel/plugin-syntax-jsx').default;

/**
 * @returns {import('@babel/core').PluginObj} Plugin
 */
module.exports = () => {
  return {
    // Enable JSX traversal
    inherits: jsxSyntaxPlugin,
    visitor: {
      JSXElement(path) {
        // Ignore member experssions (e.g., <Composite.Label>) and namespaced tags (e.g. <svg:text>)
        if (!types.isJSXIdentifier(path.node.openingElement.name)) {
          return;
        }
      },
    },
  };
};

/**
 * A helper function to pass to .filter method to remove
 * falsy values from an array and assert correct types
 * @template {unknown} T
 * @param {T} value
 * @returns {value is Exclude<T, undefined | null | false | 0>}
 */
function isTruthy(value) {
  return !!value;
}
