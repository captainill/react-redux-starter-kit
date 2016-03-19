import React from 'react';
import classNames from 'classnames';
import PopoverMenu from '../Popover/PopoverMenu';
import Button from '../Popover/Button';
import RootCloseWrapper from 'react-overlays/lib/RootCloseWrapper';

class Popover extends React.Component {
  constructor(props) {
    super(props);

    this.onClose = this._onClose.bind(this);
  }

  _onClose() {
    console.log('onclose')
    if(this.props.toggleMenuClose) {
      this.props.toggleMenuClose();
    }
  }

  render() {
    if(!this.props.selectionRect) return false;

    const { top, left } = this.props.selectionRect;
    console.log(top, left);
    return (
      <div style={{ position: 'absolute', height: 120, top: top + 'px', left: left + 'px' }}>
        <RootCloseWrapper noWrap onRootClose={this.onClose}>
          <PopoverMenu
            id="popove-menu"
            title="PopoverMenu bottom">
              {this.props.children}
          </PopoverMenu>
        </RootCloseWrapper>
      </div>
    );
  }
}

Popover.propTypes = {
  children: React.PropTypes.object,
  toggleMenuClose: React.PropTypes.func,
  editorState: React.PropTypes.object,
  selectionRect: React.PropTypes.object
}


export default Popover;
