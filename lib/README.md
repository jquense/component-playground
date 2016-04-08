# component-playground
A component for rendering React components with editable source and live preview

![Component Playground]
(http://i.imgur.com/se3avpr.png)


###Installation

```
npm install @jquense/component-playground
```

### Set up

require and go.

```javascript
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Playground = require('component-playground');
var Button = require('./components/button');

var componentExample = require("raw!./examples/component.example");

var Index = React.createClass({
  render() {
    return (
      <div className="component-documentation">
        <Playground codeText={componentExample} scope={{React: React, Button: Button}}/>
      </div>
    );
  }
});

ReactDOM.render(<Index/>, document.getElementById('root'));
```

###Props

####`codeText`
_React.PropTypes.string.isRequired_

`codeText` takes a string of JSX markup as its value. While you can just pass it a string, I find it is easier to make a separate file and use Webpack's raw loader to load in the raw source. In the example above I use the .example extension, and an examples folder to organize my samples. The only requirement for this code is that at the bottom you need to add:

```
React.render(<YourComponentName/>, mountNode);
```

An example file would look like:

```
var ComponentExample = React.createClass({
  render: function() {
    return (
        <p>Hi</p>
    )
  }
});

React.render(<ComponentExample/>, mountNode);
```

####scope
_React.PropTypes.object.isRequired_

When evaluating the JSX, it needs to be provided a scope object. At the very least, React needs to be provided to the scope, if any custom tags aren't being used. See below:

```
<Playground codeText={componentExample} scope={{React: React}}/>
```

Any module/component that is used inside the playground needs to be added to the scope object. See `/demo` for an example of how this works.

###theme
_React.PropTypes.string_

String specifying which CodeMirror theme to initialize with. Defaults to 'monokai'.

###noRender
_React.PropTypes.bool_

If set to true, removes the need to create a class or call React.render within the example code.
When true, examples should be structured as the interior of a render method, see below:

```
<Button buttonStyle={this._getButtonStyle()}>
  <p>My Button</p>
</Button>
```

###collapsableCode
_React.PropTypes.bool_

Allows the user to collapse the code block.

```
<Playground collapsableCode={true} codeText={componentExample} scope={{React: React}}/>
```

###es6Console
_React.PropTypes.bool_

Turns preview into a simple console for testing out ES6 code. Use `console.log()` in the playground to generate output.

```
<Playground
  es6Console={true}
  codeText={es6Example} />
```

###babelConfig
_React.PropTypes.object_

An object of [configuration options](http://babeljs.io/docs/usage/options/) that the playground should pass to babel. Use to adjust, or limit the features you want the playground to support.

```
<Playground
  babelConfig={{ stage: 0, loose: ['all']}}
  codeText={es6Example} />
```
