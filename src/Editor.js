import PropTypes from 'prop-types';
/* eslint-disable global-require */

import React from 'react';
import cn from 'classnames';

class Editor extends React.Component {
  static propTypes = {
    readOnly: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string
    ]),
    mode: PropTypes.string.isRequired,
    editorOptions: PropTypes.object,
    onChange: PropTypes.func,
    code: PropTypes.string,
    theme: PropTypes.string,
  }

  static defaultProps = {
    readOnly: false,
    mode: 'jsx',
    theme: 'oceanicnext'
  }

  static contextTypes = {
    playgroundCode: PropTypes.string,
    playgroundChange: PropTypes.func,
    playgroundCollapsed: PropTypes.bool,
  }

  componentDidMount() {
    const CodeMirror = require('codemirror');

    require('codemirror/mode/htmlmixed/htmlmixed');
    require('codemirror/mode/css/css');
    require('codemirror/mode/javascript/javascript');
    require('codemirror/mode/jsx/jsx');

    let { code, theme, readOnly, mode, editorOptions } = this.props;

    if (code && this.context.playgroundChange) {
      this.context.playgroundChange &&
        this.context.playgroundChange(code)
    }

    this.editor = CodeMirror.fromTextArea(this.refs.editor, {
      mode,
      readOnly,
      theme,
      lineWrapping: true,
      lineNumbers: false,
      matchBrackets: true,
      smartIndent: false,
      tabSize: 2,
      ...editorOptions
    });

    this.editor.on('change', this.handleChange);
  }

  getCode() {
    return this.props.code || this.context.playgroundCode;
  }

  componentDidUpdate() {
    let { readOnly } = this.props;

    if (readOnly) {
      this.editor.setValue(this.getCode());
    }
  }

  handleChange = () => {
    let { readOnly, onChange } = this.props;
    let value = this.editor.getValue();

    if (!readOnly) {
      this.context.playgroundChange &&
        this.context.playgroundChange(value)

      onChange && onChange(value)
    }
  }

  refresh() {
    this.editor.refresh()
  }

  render() {
    let { style, className, } = this.props;
    let { playgroundCollapsed } = this.context;

    return (
      <div
        style={style}
        className={cn(
          className,
          'playground-editor',
          playgroundCollapsed && 'playground-editor__collapsed'
        )}
      >
        <textarea ref="editor" defaultValue={this.getCode()} />
      </div>
    );
  }
}

export default Editor;
