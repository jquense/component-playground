'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint new-cap:0 no-unused-vars:0 */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Editor = require('./Editor');

var _Editor2 = _interopRequireDefault(_Editor);

var _Preview = require('./Preview');

var _Preview2 = _interopRequireDefault(_Preview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactPlayground = _react2.default.createClass({
  displayName: 'ReactPlayground',

  propTypes: {
    codeText: _react2.default.PropTypes.string.isRequired,
    scope: _react2.default.PropTypes.object.isRequired,
    collapsableCode: _react2.default.PropTypes.bool,
    noRender: _react2.default.PropTypes.bool,
    es6Console: _react2.default.PropTypes.bool,
    babelConfig: _react2.default.PropTypes.object,

    expandedText: _react2.default.PropTypes.string,
    collapsedText: _react2.default.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      theme: 'oceanicnext',
      previewBefore: true,
      noRender: false,
      collapsedText: 'hide code',
      expandedText: 'show code'
    };
  },
  getInitialState: function getInitialState() {
    return {
      code: this.props.codeText,
      expandedCode: false
    };
  },
  _handleCodeChange: function _handleCodeChange(code) {
    this.setState({ code: code });
  },
  _toggleCode: function _toggleCode(e) {
    var _this = this;

    e.preventDefault();
    this.setState({
      expandedCode: !this.state.expandedCode
    }, function () {
      _this.refs.editor.refresh();
    });
  },
  render: function render() {

    var preview = _react2.default.createElement(
      'div',
      { className: 'playgroundPreview' },
      _react2.default.createElement(_Preview2.default, _extends({}, this.props, {
        code: this.state.code
      }))
    );

    return _react2.default.createElement(
      'div',
      { className: 'playground' + (this.props.collapsableCode ? ' collapsableCode' : '') },
      this.props.previewBefore && preview,
      _react2.default.createElement(
        'div',
        {
          className: 'playgroundCode' + (this.state.expandedCode ? ' expandedCode' : ''),
          'aria-hidden': !this.state.expandedCode
        },
        _react2.default.createElement(_Editor2.default, _extends({
          ref: 'editor'
        }, this.props, {
          className: 'playgroundStage',
          onChange: this._handleCodeChange,
          codeText: this.state.code
        }))
      ),
      !!this.props.collapsableCode && _react2.default.createElement(
        'div',
        { className: 'playgroundToggleCodeBar' },
        _react2.default.createElement(
          'a',
          { href: '#', className: 'playgroundToggleCodeLink', onClick: this._toggleCode },
          this.state.expandedCode ? this.props.collapsedText : this.props.expandedText
        )
      ),
      !this.props.previewBefore && preview
    );
  }
});

exports.default = ReactPlayground;
module.exports = exports['default'];