const babel = require('@babel/core');
const plugin = require('./plugin');

describe('jsx-plugin', () => {
  it('should transpile empty jsx tag', () => {
    const source = '<div></div>';
    const { code } = babel.transform(source, { plugins: [plugin] }) ?? {};
    expect(code).toMatchSnapshot();
  });

  it('should transpile string props', () => {
    const source = '<div foo="bar"></div>';
    const { code } = babel.transform(source, { plugins: [plugin] }) ?? {};
    expect(code).toMatchSnapshot();
  });

  it('should transpile children', () => {
    const source = '<div><span>Hello</span></div>';
    const { code } = babel.transform(source, { plugins: [plugin] }) ?? {};
    expect(code).toMatchSnapshot();
  });
});
