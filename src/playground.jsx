/* eslint new-cap:0 no-unused-vars:0 */
import React from 'react';

import Editor from "./editor";
import Preview from "./preview";
import EsPreview from "./es6-preview";

const ReactPlayground = React.createClass({
  propTypes: {
    codeText: React.PropTypes.string.isRequired,
    scope: React.PropTypes.object.isRequired,
    collapsableCode: React.PropTypes.bool,
    noRender: React.PropTypes.bool,
    es6Console: React.PropTypes.bool,
    babelConfig: React.PropTypes.object,

    expandedText: React.PropTypes.string,
    collapsedText: React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      theme: 'monokai',
      previewBefore: true,
      noRender: false,
      collapsedText: 'hide code',
      expandedText: 'show code'
    }
  },

  getInitialState() {
    return {
      code: this.props.codeText,
      expandedCode: false
    };
  },

  _handleCodeChange(code) {
    this.setState({ code });
  },

  _toggleCode(e) {
    e.preventDefault()
    this.setState({
      expandedCode: !this.state.expandedCode
    }, ()=> {
      this.refs.editor.refresh()
    });
  },

  render() {

    let preview = (
      <div className="playgroundPreview">
        { this.props.es6Console ?
          <EsPreview
            {...this.props}
            code={this.state.code}
          />
        :
          <Preview
            {...this.props}
            code={this.state.code}
          />
        }
      </div>
    );

    return (
      <div className={"playground" + (this.props.collapsableCode ? " collapsableCode" : "")}>
        {
          this.props.previewBefore && preview
        }
        <div
          className={"playgroundCode"  + (this.state.expandedCode ? " expandedCode" : "")}
          aria-hidden={!this.state.expandedCode}
        >
          <Editor
            ref='editor'
            {...this.props}
            className="playgroundStage"
            onChange={this._handleCodeChange}
            codeText={this.state.code}
          />
        </div>
        {
          !!this.props.collapsableCode &&
            <div className="playgroundToggleCodeBar">
              <a href='#' className="playgroundToggleCodeLink" onClick={this._toggleCode}>
                {this.state.expandedCode ? this.props.collapsedText : this.props.expandedText }
              </a>
            </div>
        }
        {
          !this.props.previewBefore && preview
        }
      </div>
    );
  },
});

export default ReactPlayground;
