import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';

import { execute } from './compile';

class Preview extends React.Component {
  static propTypes = {
    code: PropTypes.string,
    scope: PropTypes.object,
    noRender: PropTypes.bool,
    babelConfig: PropTypes.object
  }

  static defaultProps = {
    babelConfig: {
      presets: ['es2015-loose', 'react', 'stage-0']
    }
  }

  static contextTypes = {
    playgroundCode: PropTypes.string,
  }

  state = {
    error: null
  }
  componentWillReceiveProps(_, nextContext = {}) {
    this.contextChanged = this.context.playgroundCode !== nextContext.playgroundCode
  }
  componentDidMount() {
    this.executeCode();
  }

  componentDidUpdate(prevProps) {
    clearTimeout(this.t);

    if (
      (this.props.code !== prevProps.code) ||
      this.contextChanged
    ) {
      this.contextChanged = false
      this.executeCode();
    }
  }

  getCode() {
    return this.props.code || this.context.playgroundCode;
  }

  executeCode() {
    let { noRender, babelConfig, scope } = this.props;
    let mountNode = this.refs.mount;
    let code = this.getCode();
    let render = (element) => ReactDOM.render(element, mountNode);

    scope = { render, React, ReactDOM, ...scope, mountNode };

    try {
      let result = execute({ code, scope, noRender, babelConfig })

      if (noRender) {
        render(React.createElement(result));
      }

      this.setState({ error: null });
    }
    catch (err) {
      clearTimeout(this.t);
      this.t = setTimeout(() => this.setState({
        error: err.toString()
      }), 500);
    }
  }

  render() {
    let { className, style } = this.props;

    return (
      <div
        className={cn(className, 'playground-preview')}
        style={style}
      >
        {this.state.error !== null  &&
          <div className="playground-preview-error">
            <pre>{this.state.error}</pre>
          </div>
        }
        <div ref="mount" className="playground-preview-area"/>
      </div>
    );
  }
}

export default Preview;
