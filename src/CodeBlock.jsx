import React from 'react';
import Prism from 'prismjs'

import 'prismjs/components/prism-css';
import 'prismjs/components/prism-css-extras';
import 'prismjs/components/prism-javascript';


Prism.languages.insertBefore('jsx', 'keyword', {
  'var': /\b(this)\b/g,
  'block-keyword': /\b(if|else|while|for|function)\b/g,
  'primitive': /\b(true|false|null|undefined)\b/g,
  'function': Prism.languages.function,
  'def':{
		pattern: /((?:var|let|const)\s+)([^\s]+)/g,
		lookbehind: true
	},
});

Prism.languages.insertBefore('jsx', {
  'qualifier': /\b[A-Z][a-z0-9_]+/g,
});

import 'prismjs/components/prism-jsx';

export default React.createClass({

  getDefaultProps() {
    return {
      language: 'jsx',
      theme: 'oceanicnext'
    }
  },

  componentWillMount() {
    this.highlight()
  },

  componentWillReceivProps(nextProps) {
    let lang = this.props.language;
    let code = this.props.code || this.props.children
    let nextLang = nextProps.language;
    let nextCode = nextProps.code || nextProps.children

    if (nextLang !== lang || nextCode !== code) {
      this.highlight(nextProps);
    }
  },

  highlight(props = this.props) {
    let lang = props.language;
    let code = props.code || props.children
    if (lang) {
      lang = lang.indexOf('language-') === 0 ? lang.replace('language-', '') : lang;
      lang = Prism.languages[lang]
      if (lang)
        this.setState({ code: Prism.highlight(code, lang) });
    }
  },

  render() {
    let { code } = this.state || {};
    let theme = this.props.theme;
    let lang = this.props.language;

    lang = lang.indexOf('language-') === 0 ? lang : 'language-' + lang;

    return (
      <div className={'playground' + (theme ? (' prism-theme-' + theme) : '')}>
        <pre className={lang}>
          <code
            dangerouslySetInnerHTML={{ __html: code }}
          />
        </pre>
      </div>
    )
  }
})
