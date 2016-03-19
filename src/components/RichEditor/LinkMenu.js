import React from 'react';
import Popover from '../Popover/Popover';
import {
  getVisibleSelectionRect
} from 'draft-js';

class LinkMenu extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      urlValue: '',
    };

    this.onLinkInputKeyDown = () => this._onLinkInputKeyDown;
    this.confirmLink = () => this._confirmLink;
    this.onURLChange = (e) => this.setState({ urlValue: e.target.value });
  }

  confirmLink(e) {
    this.props.confirmLink(e, this.state.urlValue);
  }

  _onLinkInputKeyDown(e) {
    if (e.which === 13) {
      this.confirmLink(e);
    }
  }

  render() {
    const selectionRect = getVisibleSelectionRect(window);
    console.log(selectionRect)
    return (
      <Popover
        selectionRect={selectionRect}
        editorState={this.props.editorState}
        toggleMenuClose={ this.props.toggleMenuClose }
      >
        <div style={{ marginBottom: 10 }}>
          <input
            onChange={this.onURLChange}
            ref="url"
            className="RichEditor-input"
            type="text"
            value={this.state.urlValue}
            onKeyDown={this.onLinkInputKeyDown}
          />
          <button onClick={this.confirmLink}>
            Confirm
          </button>
        </div>
      </Popover>
    );
  }
}

LinkMenu.propTypes = {
  toggleMenuClose: React.PropTypes.func,
  confirmLink: React.PropTypes.func,
  editorState: React.PropTypes.object
};

export default LinkMenu;
