'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _codemirror = require('codemirror');

var _codemirror2 = _interopRequireDefault(_codemirror);

require('codemirror/mode/htmlmixed/htmlmixed');

require('codemirror/mode/css/css');

require('codemirror/mode/javascript/javascript');

require('codemirror/mode/jsx/jsx');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Editor = function (_React$Component) {
  _inherits(Editor, _React$Component);

  function Editor() {
    var _temp, _this, _ret;

    _classCallCheck(this, Editor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleChange = function () {
      var _this$props = _this.props;
      var readOnly = _this$props.readOnly;
      var onChange = _this$props.onChange;

      var value = _this.editor.getValue();

      if (!readOnly) {
        _this.context.playgroundChange && _this.context.playgroundChange(value);

        onChange && onChange(value);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Editor.prototype.componentDidMount = function componentDidMount() {
    var _props = this.props;
    var code = _props.code;
    var theme = _props.theme;
    var readOnly = _props.readOnly;
    var mode = _props.mode;
    var editorOptions = _props.editorOptions;


    if (code && this.context.playgroundChange) {
      this.context.playgroundChange && this.context.playgroundChange(code);
    }

    this.editor = _codemirror2.default.fromTextArea(this.refs.editor, _extends({
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
    var _props2 = this.props;
    var style = _props2.style;
    var className = _props2.className;
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
  readOnly: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.bool, _react2.default.PropTypes.string]),
  mode: _react2.default.PropTypes.string.isRequired,
  editorOptions: _react2.default.PropTypes.object,
  onChange: _react2.default.PropTypes.func,
  code: _react2.default.PropTypes.string,
  theme: _react2.default.PropTypes.string
};
Editor.defaultProps = {
  readOnly: false,
  mode: 'jsx',
  theme: 'oceanicnext'
};
Editor.contextTypes = {
  playgroundCode: _react2.default.PropTypes.string,
  playgroundChange: _react2.default.PropTypes.func,
  playgroundCollapsed: _react2.default.PropTypes.bool
};
exports.default = Editor;
module.exports = exports['default'];