'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

'use strict';

var propTypesArray = [{
  key: 'array',
  test: _reactAddons2['default'].PropTypes.array,
  isRequired: _reactAddons2['default'].PropTypes.array.isRequired
}, {
  key: 'boolean',
  test: _reactAddons2['default'].PropTypes.bool,
  isRequired: _reactAddons2['default'].PropTypes.bool.isRequired
}, {
  key: 'function',
  test: _reactAddons2['default'].PropTypes.func,
  isRequired: _reactAddons2['default'].PropTypes.func.isRequired
}, {
  key: 'number',
  test: _reactAddons2['default'].PropTypes.number,
  isRequired: _reactAddons2['default'].PropTypes.number.isRequired
}, {
  key: 'object',
  test: _reactAddons2['default'].PropTypes.object,
  isRequired: _reactAddons2['default'].PropTypes.array.isRequired
}, {
  key: 'string',
  test: _reactAddons2['default'].PropTypes.string,
  isRequired: _reactAddons2['default'].PropTypes.string.isRequired
}, {
  key: 'node',
  test: _reactAddons2['default'].PropTypes.node,
  isRequired: _reactAddons2['default'].PropTypes.node.isRequired
}, {
  key: 'element',
  test: _reactAddons2['default'].PropTypes.element,
  isRequired: _reactAddons2['default'].PropTypes.element.isRequired
}];

var getReactPropType = function getReactPropType(propTypeFunc) {
  var propType = {
    name: 'custom',
    isRequire: false
  };

  for (var i = 0; i < propTypesArray.length; i++) {
    if (propTypeFunc === propTypesArray[i].test) {
      propType.name = propTypesArray[i].key;

      break;
    }

    if (propTypeFunc === propTypesArray[i].isRequired) {
      propType.name = propTypesArray[i].key;
      propType.isRequired = true;

      break;
    }
  }

  return propType;
};

module.exports = _reactAddons2['default'].createClass({
  displayName: 'exports',

  propTypes: {
    componentClass: _reactAddons2['default'].PropTypes.renderable,
    propDescriptionMap: _reactAddons2['default'].PropTypes.object,
    ignore: _reactAddons2['default'].PropTypes.array
  },
  getDefaultProps: function getDefaultProps() {
    return {
      propDescriptionMap: {},
      ignore: []
    };
  },
  render: function render() {
    var propTypes = [];

    for (var propName in this.props.componentClass.propTypes) {
      if (this.props.ignore.indexOf(propName)) {
        propTypes.push({
          propName: propName,
          type: getReactPropType(this.props.componentClass.propTypes[propName]),
          description: this.props.propDescriptionMap[propName] || ''
        });
      }
    }

    return _reactAddons2['default'].createElement(
      'div',
      null,
      _reactAddons2['default'].createElement(
        'ul',
        null,
        propTypes.map(function (propObj) {
          return _reactAddons2['default'].createElement(
            'li',
            { key: propObj.propName },
            _reactAddons2['default'].createElement(
              'b',
              null,
              propObj.propName
            ),
            _reactAddons2['default'].createElement(
              'i',
              null,
              ': ' + propObj.type.name
            ),
            propObj.description && ' - ' + propObj.description,
            _reactAddons2['default'].createElement(
              'b',
              null,
              propObj.type.isRequired ? ' required' : ''
            )
          );
        })
      )
    );
  }
});