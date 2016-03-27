import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Button from '../Popover/Button';
import LinkMenu from './LinkMenu';
import addLink from './modifiers/addLink';
import {
  CompositeDecorator,
  EditorState,
  Entity,
  RichUtils,
  getVisibleSelectionRect
} from 'draft-js';
import { closest, getElementOffset } from '../../utils/domHelpers';

class LinkControl extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showLinkMenu: false,
      selectionRect: null,
      linkText: '',
      urlText: ''
    };

    // this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({ editorState });

    this.promptForLink = this._promptForLink.bind(this);
    this.applyLink = this._applyLink.bind(this);
    // this.removeLink = this._removeLink.bind(this);
    this.toggleMenuClose = this._toggleMenuClose.bind(this);
    this.addDocumentClick = this._addDocumentClick.bind(this);
    this.removeDocumentClick = this._removeDocumentClick.bind(this);
    this.resetState = this._resetState.bind(this);
  }

  componentWillUnmount() {
    this.removeDocumentClick();
  }

  _promptForLink(e) {
    e.preventDefault();
    const editorState = this.props.editorState;
    const selection = editorState.getSelection();
    const block = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey());
    const blockText = block.getText();
    const url = (block.getEntityAt(0)) ? Entity.get(block.getEntityAt(0)).getData().url : '';
    let selectionRect;

    if (selection.isCollapsed()) {
      const btnTargetOffset = getElementOffset(e.target);
      selectionRect = { bottom: btnTargetOffset.top + 20, left: btnTargetOffset.left };
    } else {
      selectionRect = getVisibleSelectionRect(window);
    }

    this.setState({
      showLinkMenu: true,
      linkText: blockText,
      urlText: url,
      selectionRect
    });

    this.addDocumentClick();
    // }, () => {
    //   setTimeout(() => this.refs.url.focus(), 0);
    // }
    // }
  }

  _applyLink(e, urlValue, urlTextValue) {
    e.preventDefault();

    const selection = this.props.editorState.getSelection();
    const newEditorState = addLink(this.props.editorState, urlValue, urlTextValue, selection);

    this.props.onToggle(newEditorState);
    this.resetState();
    // this.setState({
    //   showLinkMenu: false,
    //   urlValue: '',
    // }, () => {
    //   setTimeout(() => this.refs.editor.focus(), 0);
    // });
  }

  _toggleMenuClose() {
    this.resetState();
  }

  _resetState() {
    this.setState({
      showLinkMenu: false,
      selectionRect: null
    });
  }

  _addDocumentClick() {
    window.__myapp_container.addEventListener('click', this.handleDocumentClick);
  }

  _removeDocumentClick() {
    window.__myapp_container.removeEventListener('click', this.handleDocumentClick);
  }

  /* using fat arrow to bind to instance */
  handleDocumentClick = (e) => {
    if (!this.state.showLinkMenu) return;

    const linkmenu = ReactDOM.findDOMNode(this.refs.linkmenu);
    const promptbutton = ReactDOM.findDOMNode(this.refs.promptbutton);
    if (!promptbutton.contains(e.target) && !linkmenu.contains(e.target)) {
      this.toggleMenuClose();
      this.removeDocumentClick();
    }
  }

  render() {
    const { editorState } = this.props;
    let linkMenu;

    if (this.state.showLinkMenu) {
      linkMenu = (
        <LinkMenu
          ref="linkmenu"
          editorState={editorState}
          applyLink={this.applyLink}
          toggleMenuClose={this.toggleMenuClose}
          selectionRect={this.state.selectionRect}
          linkText={this.state.linkText}
          urlText={this.state.urlText}
        />
      );
    }

    return (
      <div className="RichEditor-controls">
        { linkMenu }
        <div className="RichEditor-linkControl">
          <button
            ref="promptbutton"
            onMouseDown={this.promptForLink}
            style={{ marginRight: 10 }}
          >
            Add Link
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
