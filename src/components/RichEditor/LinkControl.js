import React, { PropTypes } from 'react';
import Button from '../Popover/Button';
import LinkMenu from './LinkMenu';
import {
  CompositeDecorator,
  EditorState,
  Entity,
  RichUtils,
} from 'draft-js';

class LinkControl extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showLinkMenu: false
    };

    // this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({ editorState });

    this.promptForLink = this._promptForLink.bind(this);
    this.confirmLink = this._confirmLink.bind(this);
    this.removeLink = this._removeLink.bind(this);
    this.toggleMenuClose = this._toggleMenuClose.bind(this);
  }

  _promptForLink(e) {
    e.preventDefault();
    const editorState = this.props.editorState;
    const selection = editorState.getSelection();
    console.log(!selection.isCollapsed())
    if (!selection.isCollapsed()) {
      this.setState({
        showLinkMenu: true,
      });
    // }, () => {
    //   setTimeout(() => this.refs.url.focus(), 0);
    // }
    }
  }

  _confirmLink(e, urlValue) {
    e.preventDefault();
    e.stopImmediatePropagation();

    const entityKey = Entity.create('LINK', 'MUTABLE', { url: urlValue });
    this.props.onToggle(entityKey);
    this.setState({
      showLinkMenu: false,
    });
    // this.setState({
    //   showLinkMenu: false,
    //   urlValue: '',
    // }, () => {
    //   setTimeout(() => this.refs.editor.focus(), 0);
    // });
  }

  _removeLink(e) {
    e.preventDefault();
    const editorState = this.props.editorState;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.props.onToggle(null);
    }
  }

  _toggleMenuClose() {
    this.setState({
      showLinkMenu: true
    });
  }

  render() {
    const { editorState } = this.props;
    let linkMenu;

    if (this.state.showLinkMenu) {
      linkMenu = (
        <LinkMenu
          editorState={editorState}
          confirmLink={this.confirmLink}
          toggleMenuClose={this.toggleMenuClose}
        />
      );
    }

    return (
      <div className="RichEditor-controls">
        { linkMenu }
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
