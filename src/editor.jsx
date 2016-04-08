import React from 'react';
import CodeMirror from 'codemirror';

import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';

const Editor = React.createClass({

  getDefaultProps() {
    return {
      readOnly: false,
      mode: 'jsx',
      lineWrapping: true,
      lineNumbers: false,
      matchBrackets: true,
      smartIndent: false,
      tabSize: 2
    }
  },

  componentDidMount() {
    var { codeText, onChange, className, style, ...props } = this.props;

    this.editor = CodeMirror.fromTextArea(
      this.refs.editor, props);

    this.editor.on('change', this._handleChange);
  },

  componentDidUpdate() {
    if (this.props.readOnly) {
      this.editor.setValue(this.props.codeText);
    }
  },

  _handleChange() {
    if (!this.props.readOnly && this.props.onChange) {
      this.props.onChange(this.editor.getValue());
    }
  },

  refresh() {
    this.editor.refresh()
  },

  render() {
    var editor = <textarea ref="editor" defaultValue={this.props.codeText} />;

    return (
      <div style={this.props.style} className={this.props.className}>
        {editor}
      </div>
    );
  }
});

export default Editor;
