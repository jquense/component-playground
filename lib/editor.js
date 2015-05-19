'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

/* eslint new-cap:0 no-unused-vars:0 */
'use strict';

CodeMirror.defineMode('jsx', function (config) {
  return CodeMirror.multiplexingMode(CodeMirror.getMode(config, 'javascript'), {
    open: '<', close: '>',
    mode: CodeMirror.multiplexingMode(CodeMirror.getMode(config, { name: 'xml', htmlMode: true }), {
      open: '{', close: '}',
      mode: CodeMirror.getMode(config, 'javascript'),
      parseDelimiters: false
    }),
    parseDelimiters: true
  });
});

var Editor = _reactAddons2['default'].createClass({
  displayName: 'Editor',

  componentDidMount: function componentDidMount() {
    this.editor = CodeMirror.fromTextArea(this.refs.editor.getDOMNode(), {
      mode: 'jsx',
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

  componentDidUpdate: function componentDidUpdate() {
    if (this.props.readOnly) {
      this.editor.setValue(this.props.codeText);
    }
  },

  _handleChange: function _handleChange() {
    if (!this.props.readOnly && this.props.onChange) {
      this.props.onChange(this.editor.getValue());
    }
  },

  render: function render() {
    var editor = _reactAddons2['default'].createElement('textarea', { ref: 'editor', defaultValue: this.props.codeText });

    return _reactAddons2['default'].createElement(
      'div',
      { style: this.props.style, className: this.props.className },
      editor
    );
  }
});

exports['default'] = Editor;
module.exports = exports['default'];