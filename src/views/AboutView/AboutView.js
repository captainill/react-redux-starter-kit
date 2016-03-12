import React from 'react';
import ReactTagSelect from 'react-tag-select';
import { Editor, EditorState } from 'draft-js';
import TagPicker from 'components/TagPicker/TagPicker';

require('./AboutView.scss');

type Props = {

};
export class AboutView extends React.Component {

  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = (editorState) => this.setState({ editorState });
  }

  render() {
    const tags = this.state.tags;
    return (
      <div>
        <Editor editorState={this.state.editorState} onChange={this.onChange} />;
        <TagPicker />
      </div>
    );
  }
}

export default AboutView;
