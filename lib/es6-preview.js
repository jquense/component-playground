/* eslint new-cap:0 no-unused-vars:0 */
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

var _babelCoreBrowser = require('babel-core/browser');

var _babelCoreBrowser2 = _interopRequireDefault(_babelCoreBrowser);

var _util = require('util');

var Preview = _reactAddons2['default'].createClass({
  displayName: 'Preview',

  propTypes: {
    code: _reactAddons2['default'].PropTypes.string.isRequired,
    scope: _reactAddons2['default'].PropTypes.object.isRequired,
    babelConfig: _reactAddons2['default'].PropTypes.object
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
    return _babelCoreBrowser2['default'].transform('(function(format, ' + Object.keys(this.props.scope).join(',') + ', mountNode) {\n          return React.createClass({\n            getInitialState(){ return { log: [] }},\n\n            componentDidMount(){\n              var console = {\n                log: (...args) => this.setState(state => ({log: state.log.concat(format(...args))}) )\n              };\n\n              ;(function(){\n                ' + this.props.code + '\n              })()\n            },\n\n            render() {\n              return (\n                <div style={{padding: 15}}>\n                  {this.state.log.map((x, idx) => {\n                    return (\n                      <div key={idx}\n                        style={{\n                          borderBottom: "1px solid #ccc",\n                          padding: "4px 0"\n                        }}>\n                        {x}\n                      </div>\n                    );\n                  })}\n                </div>\n              )\n            }\n          });\n        });', this.props.babelConfig).code;
  },

  _setTimeout: function _setTimeout() {
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout.apply(null, arguments);
  },

  _executeCode: function _executeCode() {
    var mountNode = this.refs.mount.getDOMNode();

    try {
      _reactAddons2['default'].unmountComponentAtNode(mountNode);
    } catch (e) {}

    try {
      var scope = [_util.format];
      for (var s in this.props.scope) {
        if (this.props.scope.hasOwnProperty(s)) {
          scope.push(this.props.scope[s]);
        }
      }
      scope.push(mountNode);
      var compiledCode = this._compileCode();

      var Component = _reactAddons2['default'].createElement(eval(compiledCode).apply(null, scope));
      _reactAddons2['default'].render(Component, mountNode);
    } catch (err) {
      this._setTimeout(function () {
        _reactAddons2['default'].render(_reactAddons2['default'].createElement(
          'div',
          { className: 'playgroundError' },
          err.toString()
        ), mountNode);
      }, 500);
    }
  },

  render: function render() {
    return _reactAddons2['default'].createElement('div', { ref: 'mount' });
  }
});

exports['default'] = Preview;
module.exports = exports['default'];