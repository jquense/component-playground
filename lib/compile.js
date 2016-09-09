'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.execute = execute;
exports.compile = compile;

var _babelStandalone = require('babel-standalone');

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function execute(_ref) {
  var code = _ref.code;
  var scope = _ref.scope;

  var rest = _objectWithoutProperties(_ref, ['code', 'scope']);

  var scopeValues = Object.keys(scope).map(function (k) {
    return scope[k];
  });

  return eval(compile(_extends({ code: code, scope: scope }, rest))).apply(null, scopeValues);
}

function compile(_ref2) {
  var code = _ref2.code;
  var scope = _ref2.scope;
  var babelConfig = _ref2.babelConfig;
  var noRender = _ref2.noRender;

  var scopeKeys = Object.keys(scope).join(', ');
  if (noRender) {
    code = '\n      return class extends React.Component {\n        state = {}\n        render() {\n          return (' + code + ')\n        };\n      };';
  }

  code = '\n    ;(function(' + scopeKeys + ') {\n      ' + code + '\n    });';

  return (0, _babelStandalone.transform)(code, babelConfig).code;
}