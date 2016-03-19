import React from 'react';
import Popover from '../Popover/Popover';

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

    return (
      <Popover
        selectionRect={this.props.selectionRect}
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
  selectionRect: React.PropTypes.object,
  toggleMenuClose: React.PropTypes.func,
  confirmLink: React.PropTypes.func,
  editorState: React.PropTypes.object
};

export default LinkMenu;
