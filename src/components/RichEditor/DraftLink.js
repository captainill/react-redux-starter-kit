import React, { PropTypes } from 'react';
import {
  Entity
} from 'draft-js';

const DraftLink = (props) => {
  const { url } = Entity.get(props.entityKey).getData();
  return (
    <a href={url} className="RichEditor-link" >
      { props.children }
    </a>
  );
};

DraftLink.propTypes = {
  children: PropTypes.array,
  entityKey: PropTypes.string
};

export default DraftLink;
