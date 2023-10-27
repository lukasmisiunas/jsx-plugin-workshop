const babel = require('@babel/core');
const plugin = require('./plugin');

describe('parse-jsx-plugin', () => {
  it('Task 1: should transpile empty jsx tag', () => {
    const source = '<div></div>';
    const { code } = babel.transform(source, { plugins: [plugin] }) ?? {};
    expect(code).toMatchSnapshot();
  });

  it.skip('Task 2: should transpile string props', () => {
    const source = '<div foo="bar"></div>';
    const { code } = babel.transform(source, { plugins: [plugin] }) ?? {};
    expect(code).toMatchSnapshot();
  });

  it.skip('Task 3: should transpile expression props', () => {
    const source = '<div prop1={1} prop2={1 + 1}></div>';
    const { code } = babel.transform(source, { plugins: [plugin] }) ?? {};
    expect(code).toMatchSnapshot();
  });

  it.skip('Task 4: should transpile text children', () => {
    const source = '<div>Hello</div>';
    const { code } = babel.transform(source, { plugins: [plugin] }) ?? {};
    expect(code).toMatchSnapshot();
  });

  it.skip('Task 5: should transpile element children', () => {
    const source = '<div><span>Hello</span></div>';
    const { code } = babel.transform(source, { plugins: [plugin] }) ?? {};
    expect(code).toMatchSnapshot();
  });
});
