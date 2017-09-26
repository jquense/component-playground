import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  expandText: PropTypes.string,
  collapseText: PropTypes.string,
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
  playgroundToggle: PropTypes.func,
  playgroundCollapsed: PropTypes.bool,
};

Toggle.defaultProps ={
  collapseText: 'hide code',
  expandText: 'show code'
}


export default Toggle;
