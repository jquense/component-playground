import React from 'react';

const propTypes = {
  expandText: React.PropTypes.string,
  collapseText: React.PropTypes.string,
};

function Toggle({ children, expandText, collapseText, ...props }, context) {
  let { playgroundCollapsed, playgroundToggle } = context;

  if (children) {
    return React.Children.only(React.cloneElement(children, {
      className: 'playground-code-toggle',
      collapsed: playgroundCollapsed,
    }));
  }

  return (
    <a
      href='#'
      {...props}
      className='playground-code-toggle'
      onClick={playgroundToggle}
    >
      {playgroundCollapsed ? expandText : collapseText}
    </a>
  );
}

Toggle.propTypes = propTypes;
Toggle.contextTypes = {
  playgroundToggle: React.PropTypes.func,
  playgroundCollapsed: React.PropTypes.bool,
};

Toggle.defaultProps ={
  collapseText: 'hide code',
  expandText: 'show code'
}


export default Toggle;
