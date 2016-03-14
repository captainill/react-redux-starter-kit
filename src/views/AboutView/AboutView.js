import React from 'react';
import RichEditor from 'components/RichEditor/RichEditor';
import TagPicker from 'components/TagPicker/TagPicker';

require('./AboutView.scss');

type Props = {

};
export class AboutView extends React.Component {
  render() {
    return (
      <div className="py4">
        <div className="max-width-4 mx-auto mb4">
          <div className="mb4">
            <RichEditor />
          </div>
          <div className="mb4">
            <TagPicker />
          </div>
        </div>
      </div>
    );
  }
}

export default AboutView;
