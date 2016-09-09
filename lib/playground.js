'use strict';

exports.__esModule = true;
exports.Toggle = exports.Editor = exports.Preview = exports.Console = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Editor = require('./Editor');

var _Editor2 = _interopRequireDefault(_Editor);

var _Preview = require('./Preview');

var _Preview2 = _interopRequireDefault(_Preview);

var _ConsolePreview = require('./ConsolePreview');

var _ConsolePreview2 = _interopRequireDefault(_ConsolePreview);

var _Toggle = require('./Toggle');

var _Toggle2 = _interopRequireDefault(_Toggle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Playground = function (_React$Component) {
  _inherits(Playground, _React$Component);

  function Playground() {
    _classCallCheck(this, Playground);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args)));

    _this.state = {
      code: _this.props.code,
      collapsed: _this.props.collapsible === true
    };
    return _this;
  }

  Playground.prototype.getChildContext = function getChildContext() {
    var _this2 = this;

    var _state = this.state;
    var collapsed = _state.collapsed;
    var code = _state.code;


    if (!this.props.children) {
      return {};
    }

    return {
      playgroundCode: code,
      playgroundCollapsed: collapsed,
      playgroundChange: function playgroundChange(code) {
        _this2.setState({ code: code });
      },
      playgroundToggle: function playgroundToggle(e) {
        e.preventDefault();
        _this2.setState({ collapsed: !collapsed });
      }
    };
  };

  Playground.prototype.render = function render() {
    var _props = this.props;
    var children = _props.children;
    var collapsible = _props.collapsible;

    var props = _objectWithoutProperties(_props, ['children', 'collapsible']);

    if (children) {
      delete props.code;

      return _react2.default.createElement(
        'div',
        _extends({}, props, {
          className: (0, _classnames2.default)('playground', collapsible && 'playground-collapsible')
        }),
        children
      );
    }

    var _props2 = this.props;
    var _props2$scope = _props2.scope;
    var scope = _props2$scope === undefined ? {} : _props2$scope;
    var noRender = _props2.noRender;
    var babelConfig = _props2.babelConfig;
    var readOnly = _props2.readOnly;
    var mode = _props2.mode;
    var editorOptions = _props2.editorOptions;


    return _react2.default.createElement(
      Playground,
      {
        code: this.state.code,
        collapsible: collapsible
      },
      _react2.default.createElement(_Preview2.default, {
        scope: scope,
        noRender: noRender
      }),
      _react2.default.createElement(_Editor2.default, {
        ref: 'editor',
        mode: mode,
        readOnly: readOnly,
        babelConfig: babelConfig,
        editorOptions: editorOptions
      }),
      collapsible && _react2.default.createElement(_Toggle2.default, null)
    );
  };

  return Playground;
}(_react2.default.Component);

Playground.propTypes = {
  code: _react2.default.PropTypes.string,
  scope: _react2.default.PropTypes.object,
  collapsible: _react2.default.PropTypes.bool,
  noRender: _react2.default.PropTypes.bool,
  babelConfig: _react2.default.PropTypes.object,
  editorOptions: _react2.default.PropTypes.object,

  readOnly: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.bool, _react2.default.PropTypes.string]),
  mode: _react2.default.PropTypes.string
};
Playground.childContextTypes = {
  playgroundToggle: _react2.default.PropTypes.func,
  playgroundCollapsed: _react2.default.PropTypes.bool,
  playgroundCode: _react2.default.PropTypes.string,
  playgroundChange: _react2.default.PropTypes.func
};
exports.Console = _ConsolePreview2.default;
exports.Preview = _Preview2.default;
exports.Editor = _Editor2.default;
exports.Toggle = _Toggle2.default;


Playground.Toggle = _Toggle2.default;
Playground.Console = _ConsolePreview2.default;
Playground.Preview = _Preview2.default;
Playground.Editor = _Editor2.default;

exports.default = Playground;