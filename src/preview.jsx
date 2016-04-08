/* eslint new-cap:0 no-unused-vars:0 */
import React from 'react';
import { render } from 'react-dom'
import { transform } from 'babel-standalone';
import wrapInConsole from './console';

const Preview = React.createClass({
  propTypes: {
    code: React.PropTypes.string.isRequired,
    scope: React.PropTypes.object.isRequired,
    babelConfig: React.PropTypes.object
  },

  getInitialState() {
    return {
      error: null
    }
  },

  getDefaultProps() {
    return {
      esConsole: false,
      babelConfig: {
        plugins: ['transform-runtime'],
        presets: ['es2015-loose', 'react', 'stage-0']
      }
    }
  },

  componentDidMount() {
    this._executeCode();
  },

  componentDidUpdate(prevProps) {
    clearTimeout(this.timeoutID);
    if (this.props.code !== prevProps.code) {
      this._executeCode();
    }
  },

  _compileCode() {
    let code = this.props.code;
    let noRender = this.props.noRender

    if (this.props.es6Console) {
      noRender = false;
      code = wrapInConsole(code);
    }

    if (this.props.noRender) {
      return transform(
          `(function(${Object.keys(this.props.scope).join(',')}, mountNode) {
            return React.createClass({
              getInitialState(){ return {} },
              render: function(){
                return (
                  ${code}
                )
              }
            });
          });`,
      this.props.babelConfig
      ).code;
    }
    else {
      return transform(
        '(function(' + Object.keys(this.props.scope).join(',') + ', mountNode) {' +
           code +
        '\n});',
        this.props.babelConfig
      ).code;
    }
  },

  _setTimeout() {
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout.apply(null, arguments);
  },

  _executeCode() {
    var mountNode = this.refs.mount;

    try {
      var scope = [];
      for (var s in this.props.scope) {
        if (this.props.scope.hasOwnProperty(s)){
          scope.push(this.props.scope[s]);
        }
      }

      scope.push(mountNode)

      var compiledCode = this._compileCode();
      if (this.props.noRender) {
        var Component = React.createElement(
          eval(compiledCode).apply(null, scope)
        );
        render(Component, mountNode);
      }
      else {
        eval(compiledCode).apply(null, scope)
      }

      this.setState({
        error: null
      });
    } catch (err) {
      var self = this;
      this._setTimeout(function() {
        self.setState({
          error: err.toString()
        });
      }, 500);
    }
  },

  render() {
    return (
      <div>
        {this.state.error !== null ? <div className="playgroundError">{this.state.error}</div> : null}
        <div ref="mount" className="previewArea"/>
      </div>
    );
  },
});

export default Preview;
