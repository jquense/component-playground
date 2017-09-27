'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = ConsolePreview;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _util = require('util');

var _Preview = require('./Preview');

var _Preview2 = _interopRequireDefault(_Preview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function wrapInConsole(code) {
  return '\n    class Console extends React.Component {\n      constructor(...args) {\n        super(...args)\n        this.state = { log: [] }\n        this.console = {\n          log: (...args) => this.setState(state => ({\n            log: [...state.log, format(...args)]\n          }))\n        }\n      }\n\n      componentWillMount(){\n        this.runCode()\n      }\n\n      componentWillReceiveProps() {\n        this.runCode()\n      }\n\n      runCode() {\n        (function(console) {\n          ' + code + '\n        })(this.console)\n      }\n\n      render() {\n        return (\n          <div style={{padding: 15}}>\n            {this.state.log.map((x, idx) => {\n              return (\n                <div key={idx}\n                  style={{\n                    borderBottom: "1px solid #ccc",\n                    padding: "4px 0",\n                  }}>\n                  <pre style={{ margin: 0 }}>{x}</pre>\n                </div>\n              );\n            })}\n          </div>\n        )\n      }\n    }\n\n    ReactDOM.render(<Console />, mountNode);\n    ';
}

function ConsolePreview(_ref, context) {
  var className = _ref.className,
      code = _ref.code,
      scope = _ref.scope,
      props = _objectWithoutProperties(_ref, ['className', 'code', 'scope']);

  return _react2.default.createElement(_Preview2.default, _extends({}, props, {
    noRender: false,
    className: (0, _classnames2.default)(className, 'playground-console'),
    scope: _extends({ React: _react2.default, ReactDOM: _reactDom2.default, format: _util.format }, scope),
    code: wrapInConsole(code || context.playgroundCode)
  }));
}

ConsolePreview.propTypes = {
  code: _propTypes2.default.string,
  scope: _propTypes2.default.object
};

ConsolePreview.contextTypes = {
  playgroundCode: _propTypes2.default.string
};
module.exports = exports['default'];