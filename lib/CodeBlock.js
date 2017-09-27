'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _prismjs = require('prismjs');

var _prismjs2 = _interopRequireDefault(_prismjs);

require('prismjs/components/prism-css');

require('prismjs/components/prism-css-extras');

require('prismjs/components/prism-javascript');

require('prismjs/components/prism-jsx');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CodeBlock = function (_React$Component) {
  _inherits(CodeBlock, _React$Component);

  function CodeBlock() {
    var _temp, _this, _ret;

    _classCallCheck(this, CodeBlock);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.componentWillReceivProps = function (nextProps) {
      var lang = _this.props.language;
      var code = _this.props.code || _this.props.children;
      var nextLang = nextProps.language;
      var nextCode = nextProps.code || nextProps.children;

      if (nextLang !== lang || nextCode !== code) {
        _this.highlight(nextProps);
      }
    }, _this.highlight = function () {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props;

      var lang = props.language;
      var code = props.code || props.children;
      if (lang) {
        lang = lang.indexOf('language-') === 0 ? lang.replace('language-', '') : lang;
        lang = _prismjs2.default.languages[lang];
        if (lang) _this.setState({ code: _prismjs2.default.highlight(code, lang) });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  CodeBlock.prototype.componentWillMount = function componentWillMount() {
    this.highlight();
  };

  CodeBlock.prototype.render = function render() {
    var _ref = this.state || {},
        code = _ref.code;

    var theme = this.props.theme;
    var lang = this.props.language;

    lang = lang.indexOf('language-') === 0 ? lang : 'language-' + lang;

    return _react2.default.createElement(
      'div',
      { className: 'playground' + (theme ? ' prism-theme-' + theme : '') },
      _react2.default.createElement(
        'pre',
        { className: lang },
        _react2.default.createElement('code', {
          dangerouslySetInnerHTML: { __html: code }
        })
      )
    );
  };

  return CodeBlock;
}(_react2.default.Component);

CodeBlock.defaultProps = {
  language: 'jsx',
  theme: 'oceanicnext'
};
exports.default = CodeBlock;
module.exports = exports['default'];