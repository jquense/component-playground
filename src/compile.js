import { transform } from 'babel-standalone';



export function execute({ code, scope, ...rest }) {
  let scopeValues = Object.keys(scope).map(k => scope[k]);

  return eval(compile({ code, scope, ...rest })).apply(null, scopeValues)
}

export function compile({ code, scope, babelConfig, noRender }) {
  let scopeKeys = Object.keys(scope).join(', ');
  if (noRender) {
    code = `
      return class extends React.Component {
        state = {}
        render() {
          return (${code})
        };
      };`;
  }

  code = `
    ;(function(${scopeKeys}) {
      ${code}
    });`

  return transform(code, babelConfig).code;
}
