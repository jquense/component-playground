import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';

import Editor from './Editor';
import Preview from './Preview';
import Console from './ConsolePreview';
import Toggle from './Toggle';

class Playground extends React.Component {
  static propTypes = {
    code: PropTypes.string,
    scope: PropTypes.object,
    collapsible: PropTypes.bool,
    noRender: PropTypes.bool,
    babelConfig: PropTypes.object,
    editorOptions: PropTypes.object,

    readOnly: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string
    ]),
    mode: PropTypes.string,
  }

  static childContextTypes = {
    playgroundToggle: PropTypes.func,
    playgroundCollapsed: PropTypes.bool,
    playgroundCode: PropTypes.string,
    playgroundChange: PropTypes.func,
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
