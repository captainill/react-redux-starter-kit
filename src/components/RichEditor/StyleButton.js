import React, { PropTypes } from 'react';

const StyleButton = (props) => {
  const className = (props.active) ? 'RichEditor-activeButton' : 'RichEditor-styleButton';

  const onToggle = (e) => {
    e.preventDefault();
    props.onToggle(props.style);
  };

  return (
    <span className={className} onMouseDown={onToggle}>
      {props.label}
    </span>
  );
};

StyleButton.propTypes = {
  style: PropTypes.string,
  active: PropTypes.bool,
  label: PropTypes.string,
  onToggle: PropTypes.func
};

export default StyleButton;
