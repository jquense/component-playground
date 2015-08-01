/* eslint new-cap:0 no-unused-vars:0 */
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

var _babelCoreBrowser = require('babel-core/browser');

var _babelCoreBrowser2 = _interopRequireDefault(_babelCoreBrowser);

var Preview = _reactAddons2['default'].createClass({
  displayName: 'Preview',

  propTypes: {
    code: _reactAddons2['default'].PropTypes.string.isRequired,
    scope: _reactAddons2['default'].PropTypes.object.isRequired,
    babelConfig: _reactAddons2['default'].PropTypes.object
  },

  getInitialState: function getInitialState() {
    return {
      error: null
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      babelConfig: { stage: 1 }
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
    if (this.props.noRender) {
      return _babelCoreBrowser2['default'].transform('(function(' + Object.keys(this.props.scope).join(',') + ', mountNode) {\n              return React.createClass({\n                getInitialState(){ return {} },\n                render: function(){\n                  return (\n                    ' + this.props.code + '\n                  )\n                }\n              });\n            });', this.props.babelConfig).code;
    } else {
      return _babelCoreBrowser2['default'].transform('(function(' + Object.keys(this.props.scope).join(',') + ', mountNode) {' + this.props.code + '\n});', this.props.babelConfig).code;
    }
  },

  _setTimeout: function _setTimeout() {
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout.apply(null, arguments);
  },

  _executeCode: function _executeCode() {
    var mountNode = this.refs.mount.getDOMNode();

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
        var Component = _reactAddons2['default'].createElement(eval(compiledCode).apply(null, scope));
        _reactAddons2['default'].render(Component, mountNode);
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
    return _reactAddons2['default'].createElement(
      'div',
      null,
      this.state.error !== null ? _reactAddons2['default'].createElement(
        'div',
        { className: 'playgroundError' },
        this.state.error
      ) : null,
      _reactAddons2['default'].createElement('div', { ref: 'mount', className: 'previewArea' })
    );
  }
});

exports['default'] = Preview;
module.exports = exports['default'];