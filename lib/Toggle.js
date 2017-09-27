'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var propTypes = {
  expandText: _propTypes2.default.string,
  collapseText: _propTypes2.default.string
};

function Toggle(_ref, context) {
  var children = _ref.children,
      expandText = _ref.expandText,
      collapseText = _ref.collapseText,
      props = _objectWithoutProperties(_ref, ['children', 'expandText', 'collapseText']);

  var playgroundCollapsed = context.playgroundCollapsed,
      playgroundToggle = context.playgroundToggle;


  if (children) {
    return _react2.default.Children.only(_react2.default.cloneElement(children, {
      className: 'playground-code-toggle',
      collapsed: playgroundCollapsed
    }));
  }

  return _react2.default.createElement(
    'a',
    _extends({
      href: '#'
    }, props, {
      className: 'playground-code-toggle',
      onClick: playgroundToggle
    }),
    playgroundCollapsed ? expandText : collapseText
  );
}

Toggle.propTypes = propTypes;
Toggle.contextTypes = {
  playgroundToggle: _propTypes2.default.func,
  playgroundCollapsed: _propTypes2.default.bool
};

Toggle.defaultProps = {
  collapseText: 'hide code',
  expandText: 'show code'
};

exports.default = Toggle;
module.exports = exports['default'];