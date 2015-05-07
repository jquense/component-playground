'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

var _editor = require('./editor');

var _editor2 = _interopRequireDefault(_editor);

var _preview = require('./preview');

var _preview2 = _interopRequireDefault(_preview);

var _es6Preview = require('./es6-preview');

var _es6Preview2 = _interopRequireDefault(_es6Preview);

var _doc = require('./doc');

var _doc2 = _interopRequireDefault(_doc);

/* eslint new-cap:0 no-unused-vars:0 */
'use strict';

var ReactPlayground = _reactAddons2['default'].createClass({
  displayName: 'ReactPlayground',

  propTypes: {
    codeText: _reactAddons2['default'].PropTypes.string.isRequired,
    scope: _reactAddons2['default'].PropTypes.object.isRequired,
    collapsableCode: _reactAddons2['default'].PropTypes.bool,
    docClass: _reactAddons2['default'].PropTypes.renderable,
    propDescriptionMap: _reactAddons2['default'].PropTypes.string,
    theme: _reactAddons2['default'].PropTypes.string,
    noRender: _reactAddons2['default'].PropTypes.bool,
    es6Console: _reactAddons2['default'].PropTypes.bool,
    babelConfig: _reactAddons2['default'].PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      theme: 'monokai',
      noRender: false
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
    return _reactAddons2['default'].createElement(
      'div',
      { className: 'playground' + (this.props.collapsableCode ? ' collapsableCode' : '') },
      this.props.docClass ? _reactAddons2['default'].createElement(_doc2['default'], {
        componentClass: this.props.docClass,
        propDescriptionMap: this.props.propDescriptionMap }) : '',
      _reactAddons2['default'].createElement(
        'div',
        { className: 'playgroundCode' + (this.state.expandedCode ? ' expandedCode' : '') },
        _reactAddons2['default'].createElement(_editor2['default'], {
          onChange: this._handleCodeChange,
          className: 'playgroundStage',
          codeText: this.state.code,
          theme: this.props.theme })
      ),
      this.props.collapsableCode ? _reactAddons2['default'].createElement(
        'div',
        { className: 'playgroundToggleCodeBar' },
        _reactAddons2['default'].createElement(
          'span',
          { className: 'playgroundToggleCodeLink', onClick: this._toggleCode },
          this.state.expandedCode ? 'collapse' : 'expand'
        )
      ) : '',
      _reactAddons2['default'].createElement(
        'div',
        { className: 'playgroundPreview' },
        this.props.es6Console ? _reactAddons2['default'].createElement(_es6Preview2['default'], {
          code: this.state.code,
          scope: this.props.scope }) : _reactAddons2['default'].createElement(_preview2['default'], {
          code: this.state.code,
          scope: this.props.scope,
          babelConfig: this.props.babelConfig,
          noRender: this.props.noRender })
      )
    );
  } });

exports['default'] = ReactPlayground;
module.exports = exports['default'];