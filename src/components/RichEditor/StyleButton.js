import React, { PropTypes } from 'react';

const StyleButton = (props) => {
  let className = 'RichEditor-styleButton';
  className += (props.active) ? ' RichEditor-activeButton' : '';

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
