import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Playground from '../src/Playground';
import CodeBlock from '../src/CodeBlock';
import Button from './components/Button';

import 'codemirror/lib/codemirror.css';
import '../src/themes/oceanic.css';
import './styles/demo.css';

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
          readOnly='nocursor'
          code={componentExample}
          scope={{React, ReactDOM, Button}}
        />
        <Playground
          collapsible
          code={componentExample}
          scope={{React, ReactDOM, Button}}
        />
        <Playground
          collapsible
          code={componentExample}
          scope={{React, ReactDOM, Button}}
        />
        <Playground
          code={es6Example}
          style={{ display: 'flex' }}
        >
          <Playground.Editor style={{ flex: 2 }} />
          <Playground.Console style={{ flex: 1 }} />
        </Playground>
      </div>
    );
  }
});

ReactDOM.render(<Index/>, document.getElementById('root'));
