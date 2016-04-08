'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _babelStandalone = require('babel-standalone');

var _console = require('./console');

var _console2 = _interopRequireDefault(_console);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint new-cap:0 no-unused-vars:0 */


var Preview = _react2.default.createClass({
  displayName: 'Preview',

  propTypes: {
    code: _react2.default.PropTypes.string.isRequired,
    scope: _react2.default.PropTypes.object.isRequired,
    babelConfig: _react2.default.PropTypes.object
  },

  getInitialState: function getInitialState() {
    return {
      error: null
    };
  },
  getDefaultProps: function getDefaultProps() {
    return {
      esConsole: false,
      babelConfig: {
        plugins: ['transform-runtime'],
        presets: ['es2015-loose', 'react', 'stage-0']
      }
    };
  },
  componentDidMount: function componentDidMount() {
    this._executeCode();
  },
  componentDidUpdate: function componentDidUpdate(prevProps) {
    clearTimeout(this.timeoutID);
    if (this.props.code !== prevProps.code) {
      this._executeCode();
    }
  },
  _compileCode: function _compileCode() {
    var code = this.props.code;
    var noRender = this.props.noRender;

    if (this.props.es6Console) {
      noRender = false;
      code = (0, _console2.default)(code);
    }

    if (this.props.noRender) {
      return (0, _babelStandalone.transform)('(function(' + Object.keys(this.props.scope).join(',') + ', mountNode) {\n            return React.createClass({\n              getInitialState(){ return {} },\n              render: function(){\n                return (\n                  ' + code + '\n                )\n              }\n            });\n          });', this.props.babelConfig).code;
    } else {
      return (0, _babelStandalone.transform)('(function(' + Object.keys(this.props.scope).join(',') + ', mountNode) {' + code + '\n});', this.props.babelConfig).code;
    }
  },
  _setTimeout: function _setTimeout() {
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout.apply(null, arguments);
  },
  _executeCode: function _executeCode() {
    var mountNode = this.refs.mount;

    try {
      var scope = [];
      for (var s in this.props.scope) {
        if (this.props.scope.hasOwnProperty(s)) {
          scope.push(this.props.scope[s]);
        }
      }

      scope.push(mountNode);

      var compiledCode = this._compileCode();
      if (this.props.noRender) {
        var Component = _react2.default.createElement(eval(compiledCode).apply(null, scope));
        (0, _reactDom.render)(Component, mountNode);
      } else {
        eval(compiledCode).apply(null, scope);
      }

      this.setState({
        error: null
      });
    } catch (err) {
      var self = this;
      this._setTimeout(function () {
        self.setState({
          error: err.toString()
        });
      }, 500);
    }
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      this.state.error !== null ? _react2.default.createElement(
        'div',
        { className: 'playgroundError' },
        this.state.error
      ) : null,
      _react2.default.createElement('div', { ref: 'mount', className: 'previewArea' })
    );
  }
});

exports.default = Preview;
module.exports = exports['default'];