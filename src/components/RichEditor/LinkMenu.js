import React from 'react';
import Popover from '../Popover/Popover';

class LinkMenu extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      urlValue: props.urlText,
      urlTextValue: props.linkText
    };

    this.onLinkInputKeyDown = this._onLinkInputKeyDown.bind(this);
    this.applyLink = this._applyLink.bind(this);
    this.onURLChange = (e) => this.setState({ urlValue: e.target.value });
    this.onURLTextChange = (e) => this.setState({ urlTextValue: e.target.value });
  }

  _applyLink(e) {
    this.props.applyLink(e, this.state.urlValue, this.state.urlTextValue);
  }

  _onLinkInputKeyDown(e) {
    if (e.which === 13) {
      this.applyLink(e);
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
          <label htmlFor="text-input">
            Text
            <input
              onChange={this.onURLTextChange}
              id="text-input"
              ref="urlText"
              className="RichEditor-input"
              type="text"
              placeholder=""
              value={this.state.urlTextValue}
            />
          </label>
        </div>
        <div>
          <label htmlFor="url-input">
            Link
            <input
              onChange={this.onURLChange}
              id="url-input"
              ref="url"
              className="RichEditor-input"
              type="text"
              placeholder="type url or paste"
              value={this.state.urlValue}
              onKeyDown={this.onLinkInputKeyDown}
            />
          </label>
          <button onClick={this.applyLink}>
            Apply
          </button>
        </div>
      </Popover>
    );
  }
}

LinkMenu.propTypes = {
  selectionRect: React.PropTypes.object,
  toggleMenuClose: React.PropTypes.func,
  applyLink: React.PropTypes.func,
  editorState: React.PropTypes.object,
  linkText: React.PropTypes.string,
  urlText: React.PropTypes.string
};

export default LinkMenu;
