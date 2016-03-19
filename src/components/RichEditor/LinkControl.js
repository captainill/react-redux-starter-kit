import React, { PropTypes } from 'react';
import PopoverMenu from '../Popover/PopoverMenu';
import Button from '../Popover/Button';
import RootCloseWrapper from 'react-overlays/lib/RootCloseWrapper';
import {
  CompositeDecorator,
  EditorState,
  Entity,
  RichUtils,
  getVisibleSelectionRect
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
    this.onClose = this._onClose.bind(this);
  }

  _onClose() {
    this.setState({
      showURLInput: false,
      urlValue: '',
    });
  }

  _promptForLink(e) {
    e.preventDefault();
    const editorState = this.props.editorState;
    const selection = editorState.getSelection();
    const rect = getVisibleSelectionRect(window);
    console.log('rect', rect);

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
    e.stopImmediatePropagation();
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
    /* eslint-disable */
    let popover;
    let urlInput;
    if (this.state.showURLInput) {
      popover = ( //rootclose needs to be below the content triggering it or the mouseup will close it right after the clik that renders
        <div style={{ height: 120 }}>
          <RootCloseWrapper noWrap onRootClose={this.onClose}>
            <PopoverMenu
              id="popover"
              title="Popover bottom">
                <strong>Holy guacamole!</strong> Check this info.
            </PopoverMenu>
          </RootCloseWrapper>
        </div>
      );
      /* eslint-enable */

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
        <button onClick={this.confirmLink}>
            Confirm
          </button>
        </div>
      );
    }

    return (
      <div className="RichEditor-controls">
        { popover }
        { urlInput }
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
      </div>
    );
  }
}

LinkControl.propTypes = {
  editorState: PropTypes.object,
  onToggle: PropTypes.func
};

export default LinkControl;
