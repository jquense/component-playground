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

exports.default = _react2.default.createClass({
  displayName: 'CodeBlock',
  getDefaultProps: function getDefaultProps() {
    return {
      language: 'jsx',
      theme: 'oceanicnext'
    };
  },
  componentWillMount: function componentWillMount() {
    this.highlight();
  },
  componentWillReceivProps: function componentWillReceivProps(nextProps) {
    var lang = this.props.language;
    var code = this.props.code || this.props.children;
    var nextLang = nextProps.language;
    var nextCode = nextProps.code || nextProps.children;

    if (nextLang !== lang || nextCode !== code) {
      this.highlight(nextProps);
    }
  },
  highlight: function highlight() {
    var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];

    var lang = props.language;
    var code = props.code || props.children;
    if (lang) {
      lang = lang.indexOf('language-') === 0 ? lang.replace('language-', '') : lang;
      lang = _prismjs2.default.languages[lang];
      if (lang) this.setState({ code: _prismjs2.default.highlight(code, lang) });
    }
  },
  render: function render() {
    var _ref = this.state || {};

    var code = _ref.code;

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
  }
});
module.exports = exports['default'];