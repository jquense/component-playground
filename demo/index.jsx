/* eslint new-cap:0 no-unused-vars:0 */
'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var Playground = require('../src/Playground');
var CodeBlock = require('../src/CodeBlock');
var Editor = require('../src/Editor');
var Button = require('./components/button');

require('codemirror/lib/codemirror.css');
require('../src/themes/oceanic.css');
require('./styles/demo.css');

var componentExample = require('raw!./examples/component.example');
var es6Example = require('raw!./examples/es6.example');

var Index = React.createClass({
  render() {
    return (
      <div className="component-documentation">
        <CodeBlock>
          {componentExample}
        </CodeBlock>
        <Playground
          codeText={componentExample}
          readOnly='nocursor'
          scope={{React, ReactDOM, Button}}
        />
        <Playground
          codeText={componentExample}
          scope={{React, ReactDOM, Button}}
          collapsableCode={true}
        />
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
