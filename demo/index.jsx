/* eslint new-cap:0 no-unused-vars:0 */
'use strict';
require('babel-core/polyfill')
var React = require('react');
var ReactDOM = require('react-dom');
var Playground = require('playground');
var Button = require('./components/button');

require('./styles/syntax.css');
require('./styles/codemirror.css');
require('./styles/demo.css');

var componentExample = require("raw!./examples/component.example");
var es6Example = require("raw!./examples/es6.example");

var Index = React.createClass({
  render() {
    return (
      <div className="component-documentation">
        <Playground codeText={componentExample} scope={{React, ReactDOM, Button}} babelConfig={{ stage: 0 }}/>
        <Playground codeText={componentExample} scope={{React, ReactDOM, Button}} collapsableCode={true}/>
        <Playground
          codeText={componentExample}
          scope={{React, ReactDOM, Button}}
          collapsableCode={true} />
        <Playground codeText={es6Example} es6Console={true} scope={{React, ReactDOM, Button}} />
      </div>
    );
  }
});

ReactDOM.render(<Index/>, document.getElementById('root'));
