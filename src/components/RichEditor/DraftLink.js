import React, { PropTypes } from 'react';
import {
  Entity
} from 'draft-js';

class DraftLink extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showHover: false
    };

    this.handleLinkHover = this._handleLinkHover.bind(this);
    this.handleLinkHoverOut = this._handleLinkHoverOut.bind(this);
  }

  _handleLinkHover() {
    this.setState({ showHover: true });
  }

  _handleLinkHoverOut() {
    this.setState({ showHover: false });
  }

  render() {
    const { url } = Entity.get(this.props.entityKey).getData();

    return (
      <a href={url} className="RichEditor-link" onMouseOver={this.handleLinkHover} onMouseOut={this.handleLinkHoverOut}>
        { this.props.children }

        {(() => { // eslint-disable-line
          if (this.state.showHover) {
            return (
              <span
                className="RichEditor-link-hover"
              >
                { url }
              </span>
            );
          }
        })()}
      </a>
    );
  }
}

DraftLink.propTypes = {
  children: PropTypes.array,
  entityKey: PropTypes.string
};

export default DraftLink;
