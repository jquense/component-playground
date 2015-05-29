/* eslint new-cap:0 no-unused-vars:0 */
'use strict';

import React from 'react/addons';

// CodeMirror.defineMode('jsx', function(config) {
//   return CodeMirror.multiplexingMode(
//     CodeMirror.getMode(config, 'javascript'),
//     {
//       open: '<', close: '>',
//       mode: CodeMirror.multiplexingMode(
//         CodeMirror.getMode(config, {name: 'xml', htmlMode: true}),
//         {
//           open: '{', close: '}',
//           mode: CodeMirror.getMode(config, 'javascript'),
//           parseDelimiters: false,
//           innerStyle: 'js'
//         }),
//       parseDelimiters: true
//     });
// });

const Editor = React.createClass({
  componentDidMount() {
    this.editor = CodeMirror.fromTextArea(this.refs.editor.getDOMNode(), {
      mode: 'javascript',
      lineNumbers: false,
      lineWrapping: true,
      smartIndent: false,
      matchBrackets: true,
      tabSize: 2,
      theme: this.props.theme,
      readOnly: this.props.readOnly
    });
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