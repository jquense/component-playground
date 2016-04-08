'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _codemirror = require('codemirror');

var _codemirror2 = _interopRequireDefault(_codemirror);

require('codemirror/mode/htmlmixed/htmlmixed');

require('codemirror/mode/css/css');

require('codemirror/mode/javascript/javascript');

require('codemirror/mode/jsx/jsx');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Editor = _react2.default.createClass({
  displayName: 'Editor',
  getDefaultProps: function getDefaultProps() {
    return {
      readOnly: false,
      mode: 'jsx',
      lineWrapping: true,
      lineNumbers: false,
      matchBrackets: true,
      smartIndent: false,
      tabSize: 2
    };
  },
  componentDidMount: function componentDidMount() {
    var _props = this.props;
    var codeText = _props.codeText;
    var onChange = _props.onChange;
    var className = _props.className;
    var style = _props.style;

    var props = _objectWithoutProperties(_props, ['codeText', 'onChange', 'className', 'style']);

    this.editor = _codemirror2.default.fromTextArea(this.refs.editor, props);

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
  refresh: function refresh() {
    this.editor.refresh();
  },
  render: function render() {
    var editor = _react2.default.createElement('textarea', { ref: 'editor', defaultValue: this.props.codeText });

    return _react2.default.createElement(
      'div',
      { style: this.props.style, className: this.props.className },
      editor
    );
  }
});

exports.default = Editor;
module.exports = exports['default'];