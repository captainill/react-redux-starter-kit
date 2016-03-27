import { Modifier, EditorState, Entity, RichUtils } from 'draft-js';
import getSearchText from '../utils/getSearchText';

const addLink = (editorState, urlValue, urlTextValue, selection) => {
  const entityKey = Entity.create('LINK', 'MUTABLE', { url: urlValue });
  const checkurlTextValue = (urlTextValue === '') ? urlValue : urlTextValue;
  const content = editorState.getCurrentContent();
  let newContentState;
  let newEditorState;

  if (selection.isCollapsed()) {
    newContentState = Modifier.insertText(
      content,
      selection,
      checkurlTextValue,
      null,
      entityKey
    );
    newEditorState = EditorState.push(editorState, newContentState, 'insert-fragment');
  } else {
    newContentState = Modifier.replaceText(
      content,
      selection,
      checkurlTextValue,
      null,
      entityKey
    );
    newEditorState = EditorState.push(editorState, newContentState, 'insert-characters');
  }

  return RichUtils.toggleLink(
    newEditorState,
    editorState.getSelection(),
    entityKey
  );
};

export default addLink;
