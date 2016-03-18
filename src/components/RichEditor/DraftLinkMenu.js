import React, { PropTypes } from 'react';
import {
  Entity
} from 'draft-js';

class DraftLinkMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showHover: false
    };

    this.handleConfirmLink = this._handleConfirmLink.bind(this);
  }

  _handleConfirmLink() {
    this.props.handleConfirmLink();
  }

  render() {
    const { url } = Entity.get(this.props.entityKey).getData();

    return (
      <a href={url} className="RichEditor-link" onMouseOver={this.handleLinkHover} onMouseOut={this.handleLinkHoverOut}></a>
    );
  }
}

DraftLinkMenu.propTypes = {
  rect: PropTypes.object,
  handleConfirmLink: PropTypes.func
};

export default DraftLinkMenu;
