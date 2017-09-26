import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';
import { format } from 'util';

import Preview from './Preview';

function wrapInConsole(code) {
  return (`
    class Console extends React.Component {
      constructor(...args) {
        super(...args)
        this.state = { log: [] }
        this.console = {
          log: (...args) => this.setState(state => ({
            log: [...state.log, format(...args)]
          }))
        }
      }

      componentWillMount(){
        this.runCode()
      }

      componentWillReceiveProps() {
        this.runCode()
      }

      runCode() {
        (function(console) {
          ${code}
        })(this.console)
      }

      render() {
        return (
          <div style={{padding: 15}}>
            {this.state.log.map((x, idx) => {
              return (
                <div key={idx}
                  style={{
                    borderBottom: "1px solid #ccc",
                    padding: "4px 0",
                  }}>
                  <pre style={{ margin: 0 }}>{x}</pre>
                </div>
              );
            })}
          </div>
        )
      }
    }

    ReactDOM.render(<Console />, mountNode);
    `
  )
}

export default function ConsolePreview(
  { className, code, scope, ...props },
  context
) {
  return (
    <Preview
      {...props}
      noRender={false}
      className={cn(className, 'playground-console')}
      scope={{ React, ReactDOM, format, ...scope }}
      code={wrapInConsole(code || context.playgroundCode)}
    />
  )
}

ConsolePreview.propTypes = {
  code: PropTypes.string,
  scope: PropTypes.object,
}

ConsolePreview.contextTypes = {
  playgroundCode: PropTypes.string,
}
