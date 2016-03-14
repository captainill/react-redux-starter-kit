import React, { PropTypes } from 'react';
import {
  CompositeDecorator,
  EditorState,
  Entity,
  RichUtils
} from 'draft-js';

class LinkControl extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showURLInput: false,
      urlValue: '',
    };

    // this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({ editorState });

    this.promptForLink = this._promptForLink.bind(this);
    this.onURLChange = (e) => this.setState({ urlValue: e.target.value });
    this.confirmLink = this._confirmLink.bind(this);
    this.onLinkInputKeyDown = this._onLinkInputKeyDown.bind(this);
    this.removeLink = this._removeLink.bind(this);
  }

  _promptForLink(e) {
    e.preventDefault();
    const editorState = this.props.editorState;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.setState({
        showURLInput: true,
        urlValue: '',
      });
    // }, () => {
    //   setTimeout(() => this.refs.url.focus(), 0);
    // }
    }
  }

  _confirmLink(e) {
    e.preventDefault();
    const { urlValue } = this.state;
    const entityKey = Entity.create('LINK', 'MUTABLE', { url: urlValue });
    this.props.onToggle(entityKey);
    this.setState({
      showURLInput: false,
      urlValue: '',
    });
    // this.setState({
    //   showURLInput: false,
    //   urlValue: '',
    // }, () => {
    //   setTimeout(() => this.refs.editor.focus(), 0);
    // });
  }

  _onLinkInputKeyDown(e) {
    if (e.which === 13) {
      this._confirmLink(e);
    }
  }

  _removeLink(e) {
    e.preventDefault();
    const editorState = this.props.editorState;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.props.onToggle(null);
    }
  }

  render() {
    let urlInput;
    if (this.state.showURLInput) {
      urlInput = (
        <div style={{ marginBottom: 10 }}>
          <input
            onChange={this.onURLChange}
            ref="url"
            className="RichEditor-input"
            type="text"
            value={this.state.urlValue}
            onKeyDown={this.onLinkInputKeyDown}
          />
          <button onMouseDown={this.confirmLink}>
            Confirm
          </button>
        </div>
      );
    }

    return (
      <div className="RichEditor-controls">
        <div className="RichEditor-linkControl">
          <button
            onMouseDown={this.promptForLink}
            style={{ marginRight: 10 }}
          >
            Add Link
          </button>
          <button onMouseDown={this.removeLink}>
            Remove Link
          </button>
        </div>
        { urlInput }
      </div>
    );
  }
}

LinkControl.propTypes = {
  editorState: PropTypes.object,
  onToggle: PropTypes.func
};

export default LinkControl;
