/* eslint new-cap:0 no-unused-vars:0 */
'use strict';
exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

var _editor = require("./editor");

var _editor2 = _interopRequireDefault(_editor);

var _preview = require("./preview");

var _preview2 = _interopRequireDefault(_preview);

var _es6Preview = require("./es6-preview");

var _es6Preview2 = _interopRequireDefault(_es6Preview);

var _doc = require("./doc");

var _doc2 = _interopRequireDefault(_doc);

var ReactPlayground = _reactAddons2['default'].createClass({
  displayName: 'ReactPlayground',

  propTypes: {
    codeText: _reactAddons2['default'].PropTypes.string.isRequired,
    scope: _reactAddons2['default'].PropTypes.object.isRequired,
    collapsableCode: _reactAddons2['default'].PropTypes.bool,
    docClass: _reactAddons2['default'].PropTypes.renderable,
    propDescriptionMap: _reactAddons2['default'].PropTypes.string,
    noRender: _reactAddons2['default'].PropTypes.bool,
    es6Console: _reactAddons2['default'].PropTypes.bool,
    babelConfig: _reactAddons2['default'].PropTypes.object,

    expandedText: _reactAddons2['default'].PropTypes.string,
    collapsedText: _reactAddons2['default'].PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      theme: 'monokai',
      previewBefore: true,
      noRender: false,
      expandedText: 'hide code',
      collapsedText: 'show code'
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

  _toggleCode: function _toggleCode() {
    this.setState({
      expandedCode: !this.state.expandedCode
    });
  },

  render: function render() {

    var preview = _reactAddons2['default'].createElement(
      'div',
      { className: 'playgroundPreview' },
      this.props.es6Console ? _reactAddons2['default'].createElement(_es6Preview2['default'], {
        code: this.state.code,
        scope: this.props.scope }) : _reactAddons2['default'].createElement(_preview2['default'], {
        code: this.state.code,
        scope: this.props.scope,
        babelConfig: this.props.babelConfig,
        noRender: this.props.noRender })
    );

    return _reactAddons2['default'].createElement(
      'div',
      { className: "playground" + (this.props.collapsableCode ? " collapsableCode" : "") },
      this.props.previewBefore && preview,
      _reactAddons2['default'].createElement(
        'div',
        { className: "playgroundCode" + (this.state.expandedCode ? " expandedCode" : "") },
        _reactAddons2['default'].createElement(_editor2['default'], _extends({}, this.props, {
          className: 'playgroundStage',
          onChange: this._handleCodeChange,
          codeText: this.state.code
        }))
      ),
      !!this.props.collapsableCode && _reactAddons2['default'].createElement(
        'div',
        { className: 'playgroundToggleCodeBar' },
        _reactAddons2['default'].createElement(
          'span',
          { className: 'playgroundToggleCodeLink', onClick: this._toggleCode },
          this.state.expandedCode ? this.props.collapsedText : this.props.expandedText
        )
      ),
      !this.props.previewBefore && preview,
      !!this.props.docClass && _reactAddons2['default'].createElement(_doc2['default'], {
        componentClass: this.props.docClass,
        propDescriptionMap: this.props.propDescriptionMap })
    );
  }
});

exports['default'] = ReactPlayground;
module.exports = exports['default'];