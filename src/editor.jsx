/* eslint new-cap:0 no-unused-vars:0 */
'use strict';

import React from 'react/addons';


const Editor = React.createClass({

  getDefaultProps(){
    return {
      readOnly: false,
      mode: 'javascript',
      lineWrapping: true,
      lineNumbers: false,
      matchBrackets: true,
      smartIndent: false,
      tabSize: 2,
    }
  },

  componentDidMount() {
    var { codeText, onChange, className, style, ...props } = this.props;

    this.editor = CodeMirror.fromTextArea(
      this.refs.editor.getDOMNode(), props);

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