'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/* eslint-disable global-require */

var Editor = function (_React$Component) {
  _inherits(Editor, _React$Component);

  function Editor() {
    var _temp, _this, _ret;

    _classCallCheck(this, Editor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleChange = function () {
      var _this$props = _this.props,
          readOnly = _this$props.readOnly,
          onChange = _this$props.onChange;

      var value = _this.editor.getValue();

      if (!readOnly) {
        _this.context.playgroundChange && _this.context.playgroundChange(value);

        onChange && onChange(value);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Editor.prototype.componentDidMount = function componentDidMount() {
    var CodeMirror = require('codemirror');

    require('codemirror/mode/htmlmixed/htmlmixed');
    require('codemirror/mode/css/css');
    require('codemirror/mode/javascript/javascript');
    require('codemirror/mode/jsx/jsx');

    var _props = this.props,
        code = _props.code,
        theme = _props.theme,
        readOnly = _props.readOnly,
        mode = _props.mode,
        editorOptions = _props.editorOptions;


    if (code && this.context.playgroundChange) {
      this.context.playgroundChange && this.context.playgroundChange(code);
    }

    this.editor = CodeMirror.fromTextArea(this.refs.editor, _extends({
      mode: mode,
      readOnly: readOnly,
      theme: theme,
      lineWrapping: true,
      lineNumbers: false,
      matchBrackets: true,
      smartIndent: false,
      tabSize: 2
    }, editorOptions));

    this.editor.on('change', this.handleChange);
  };

  Editor.prototype.getCode = function getCode() {
    return this.props.code || this.context.playgroundCode;
  };

  Editor.prototype.componentDidUpdate = function componentDidUpdate() {
    var readOnly = this.props.readOnly;


    if (readOnly) {
      this.editor.setValue(this.getCode());
    }
  };

  Editor.prototype.refresh = function refresh() {
    this.editor.refresh();
  };

  Editor.prototype.render = function render() {
    var _props2 = this.props,
        style = _props2.style,
        className = _props2.className;
    var playgroundCollapsed = this.context.playgroundCollapsed;


    return _react2.default.createElement(
      'div',
      {
        style: style,
        className: (0, _classnames2.default)(className, 'playground-editor', playgroundCollapsed && 'playground-editor__collapsed')
      },
      _react2.default.createElement('textarea', { ref: 'editor', defaultValue: this.getCode() })
    );
  };

  return Editor;
}(_react2.default.Component);

Editor.propTypes = {
  readOnly: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.string]),
  mode: _propTypes2.default.string.isRequired,
  editorOptions: _propTypes2.default.object,
  onChange: _propTypes2.default.func,
  code: _propTypes2.default.string,
  theme: _propTypes2.default.string
};
Editor.defaultProps = {
  readOnly: false,
  mode: 'jsx',
  theme: 'oceanicnext'
};
Editor.contextTypes = {
  playgroundCode: _propTypes2.default.string,
  playgroundChange: _propTypes2.default.func,
  playgroundCollapsed: _propTypes2.default.bool
};
exports.default = Editor;
module.exports = exports['default'];