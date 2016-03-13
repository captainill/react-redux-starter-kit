import React, { PropTypes } from 'react';

class StyleButton extends React.Component {
  static props: {
    style: PropTypes.object,
    active: PropTypes.boolean,
    label: PropTypes.string,
    onToggle: PropTypes.func
  }

  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

export default StyleButton;
