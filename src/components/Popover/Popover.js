import React from 'react';
import classNames from 'classnames';
import PopoverMenu from '../Popover/PopoverMenu';
import Button from '../Popover/Button';
import RootCloseWrapper from 'react-overlays/lib/RootCloseWrapper';

require('./Popover.scss');

class Popover extends React.Component {
  constructor(props) {
    super(props);

    this.onClose = this._onClose.bind(this);
  }

  _onClose() {
    if (this.props.toggleMenuClose) {
      this.props.toggleMenuClose();
    }
  }

  render() {
    const { bottom, left } = this.props.selectionRect;

    const style = {
      left: left + 'px',
      top: bottom + 'px',
      position: 'absolute'
    };

    return (
      <div role="tooltip" {...this.props} className="Popover top" style={style} title={null}>
        <div className="Popover-arrow" />
        <div className="Popover-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Popover.propTypes = {
  children: React.PropTypes.object,
  toggleMenuClose: React.PropTypes.func,
  editorState: React.PropTypes.object,
  selectionRect: React.PropTypes.object
};

export default Popover;
