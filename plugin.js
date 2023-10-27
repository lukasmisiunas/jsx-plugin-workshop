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

        const propsObjectProperties = path.node.openingElement.attributes
          .map((attribute) => {
            if (types.isJSXAttribute(attribute)) {
              // Ignore namespaced props, e.g. <svg xmlns:xlink="..." />
              if (types.isJSXNamespacedName(attribute.name)) {
                return;
              }

              if (types.isStringLiteral(attribute.value)) {
                return types.objectProperty(
                  types.identifier(attribute.name.name),
                  attribute.value
                );
              }

              if (types.isJSXExpressionContainer(attribute.value)) {
                if (types.isExpression(attribute.value.expression)) {
                  return types.objectProperty(
                    types.identifier(attribute.name.name),
                    attribute.value.expression
                  );
                }
              }
            }

            return null;
          })
          .filter(isTruthy);

        const children = path.node.children
          .map((child) => {
            // Check if it is jsx text
            if (types.isJSXText(child)) {
              return types.stringLiteral(child.value);
            }

            if (types.isJSXElement(child)) {
              return child;
            }
          })
          .filter(isTruthy);

        path.replaceWith(
          types.callExpression(
            types.memberExpression(
              types.identifier('React'),
              types.identifier('createElement')
            ),
            [
              types.stringLiteral(path.node.openingElement.name.name),
              types.objectExpression(propsObjectProperties),
              ...children,
            ]
          )
        );
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
