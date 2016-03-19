import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Button from '../Popover/Button';
import LinkMenu from './LinkMenu';
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
      showLinkMenu: false,
      selectionRect: null
    };

    // this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({ editorState });

    this.promptForLink = this._promptForLink.bind(this);
    this.confirmLink = this._confirmLink.bind(this);
    // this.removeLink = this._removeLink.bind(this);
    this.toggleMenuClose = this._toggleMenuClose.bind(this);
    this.addDocumentClick = this._addDocumentClick.bind(this);
    this.removeDocumentClick = this._removeDocumentClick.bind(this);
    this.resetState = this._resetState.bind(this);
  }

  _promptForLink(e) {
    e.preventDefault();
    const editorState = this.props.editorState;
    const selection = editorState.getSelection();
    console.log(!selection.isCollapsed())
    if (!selection.isCollapsed()) {
      this.setState({
        showLinkMenu: true,
        selectionRect: getVisibleSelectionRect(window)
      });
    this.addDocumentClick();
    // }, () => {
    //   setTimeout(() => this.refs.url.focus(), 0);
    // }
    }
  }

  _confirmLink(e, urlValue) {
    e.preventDefault();
    const entityKey = Entity.create('LINK', 'MUTABLE', { url: urlValue });
    this.props.onToggle(entityKey);
    this.resetState();
    // this.setState({
    //   showLinkMenu: false,
    //   urlValue: '',
    // }, () => {
    //   setTimeout(() => this.refs.editor.focus(), 0);
    // });
  }

  _toggleMenuClose() {
    console.log('toggle menu close');
    this.resetState();
  }

  _resetState() {
    this.setState({
      showLinkMenu: false,
      selectionRect: null
    });
  }

  componentWillUnmount() {
    this.removeDocumentClick();
  }

  _addDocumentClick() {
    console.log('_addDocumentClick doc click')
    window.__myapp_container.addEventListener('click', this.handleDocumentClick);
  }

  _removeDocumentClick() {
    console.log('remove the doc click')
    window.__myapp_container.removeEventListener('click', this.handleDocumentClick);
  }

  /* using fat arrow to bind to instance */
  handleDocumentClick = (e) => {
    if (!this.state.showLinkMenu)  return;

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
          confirmLink={this.confirmLink}
          toggleMenuClose={this.toggleMenuClose}
          selectionRect={this.state.selectionRect}
        />
      );
    }

    console.log('linkMenu', linkMenu);

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
