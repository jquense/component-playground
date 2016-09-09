import React from 'react';
import cn from 'classnames';

import Editor from './Editor';
import Preview from './Preview';
import Console from './ConsolePreview';
import Toggle from './Toggle';

class Playground extends React.Component {
  static propTypes = {
    code: React.PropTypes.string,
    scope: React.PropTypes.object,
    collapsible: React.PropTypes.bool,
    noRender: React.PropTypes.bool,
    babelConfig: React.PropTypes.object,
    editorOptions: React.PropTypes.object,

    readOnly: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.string
    ]),
    mode: React.PropTypes.string,
  }

  static childContextTypes = {
    playgroundToggle: React.PropTypes.func,
    playgroundCollapsed: React.PropTypes.bool,
    playgroundCode: React.PropTypes.string,
    playgroundChange: React.PropTypes.func,
  };

  constructor(...args) {
    super(...args);

    this.state = {
      code: this.props.code,
      collapsed: this.props.collapsible === true,
    }
  }

  getChildContext() {
    let { collapsed, code } = this.state;

    if (!this.props.children) {
      return {}
    }

    return {
      playgroundCode: code,
      playgroundCollapsed: collapsed,
      playgroundChange: code => {
        this.setState({ code })
      },
      playgroundToggle: (e) => {
        e.preventDefault()
        this.setState({ collapsed: !collapsed });
      },
    }
  }

  _toggleCode

  render() {
    let { children, collapsible, ...props } = this.props;

    if (children) {
      delete props.code;

      return (
        <div
          {...props}
          className={cn(
            'playground',
            collapsible && 'playground-collapsible'
          )}
        >
          {children}
        </div>
      )
    }

    let {
      scope = {}, noRender, babelConfig, readOnly, mode, editorOptions
    } = this.props;

    return (
      <Playground
        code={this.state.code}
        collapsible={collapsible}
      >
        <Preview
          scope={scope}
          noRender={noRender}
        />
        <Editor
          ref='editor'
          mode={mode}
          readOnly={readOnly}
          babelConfig={babelConfig}
          editorOptions={editorOptions}
        />
        {collapsible &&
          <Toggle />
        }
      </Playground>
    )
  }
}

export { Console, Preview, Editor, Toggle };

Playground.Toggle = Toggle;
Playground.Console = Console;
Playground.Preview = Preview;
Playground.Editor = Editor;

export default Playground;
