'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _compile = require('./compile');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Preview = function (_React$Component) {
  _inherits(Preview, _React$Component);

  function Preview() {
    var _temp, _this, _ret;

    _classCallCheck(this, Preview);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      error: null
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Preview.prototype.componentDidMount = function componentDidMount() {
    this.executeCode();
  };

  Preview.prototype.componentDidUpdate = function componentDidUpdate(prevProps, _, prevContext) {
    clearTimeout(this.t);

    if (this.props.code !== prevProps.code || this.context.playgroundCode !== prevContext.playgroundCode) {
      this.executeCode();
    }
  };

  Preview.prototype.getCode = function getCode() {
    return this.props.code || this.context.playgroundCode;
  };

  Preview.prototype.executeCode = function executeCode() {
    var _this2 = this;

    var _props = this.props;
    var noRender = _props.noRender;
    var babelConfig = _props.babelConfig;
    var scope = _props.scope;

    var mountNode = this.refs.mount;
    var code = this.getCode();
    var render = function render(element) {
      return _reactDom2.default.render(element, mountNode);
    };

    scope = _extends({ render: render, React: _react2.default, ReactDOM: _reactDom2.default }, scope, { mountNode: mountNode });

    try {
      var result = (0, _compile.execute)({ code: code, scope: scope, noRender: noRender, babelConfig: babelConfig });

      if (noRender) {
        render(_react2.default.createElement(result));
      }

      this.setState({ error: null });
    } catch (err) {
      clearTimeout(this.t);
      this.t = setTimeout(function () {
        return _this2.setState({
          error: err.toString()
        });
      }, 500);
    }
  };

  Preview.prototype.render = function render() {
    var _props2 = this.props;
    var className = _props2.className;
    var style = _props2.style;


    return _react2.default.createElement(
      'div',
      {
        className: (0, _classnames2.default)(className, 'playground-preview'),
        style: style
      },
      this.state.error !== null && _react2.default.createElement(
        'div',
        { className: 'playground-preview-error' },
        _react2.default.createElement(
          'pre',
          null,
          this.state.error
        )
      ),
      _react2.default.createElement('div', { ref: 'mount', className: 'playground-preview-area' })
    );
  };

  return Preview;
}(_react2.default.Component);

Preview.propTypes = {
  code: _react2.default.PropTypes.string,
  scope: _react2.default.PropTypes.object,
  noRender: _react2.default.PropTypes.bool,
  babelConfig: _react2.default.PropTypes.object
};
Preview.defaultProps = {
  babelConfig: {
    presets: ['es2015-loose', 'react', 'stage-0']
  }
};
Preview.contextTypes = {
  playgroundCode: _react2.default.PropTypes.string
};
exports.default = Preview;
module.exports = exports['default'];