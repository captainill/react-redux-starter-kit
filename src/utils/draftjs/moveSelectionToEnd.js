import {
  EditorState,
  SelectionState,
} from 'draft-js';

/**
 * Returns a new EditorState where the Selection is at the end.
 *
 * This ensures to mimic the textarea behaviour where the Selection is placed at
 * the end. This is needed when blocks are added without the editor having had
 * focus yet. It still works to place the Selection at a specific location by
 * clicking on the text.
 */
const moveSelectionToEnd = (editorState) => {
  const content = editorState.getCurrentContent();
  const blockMap = content.getBlockMap();

  const key = blockMap.last().getKey();
  const length = blockMap.last().getLength();
  console.log('length', length);

  const selection = new SelectionState({
    anchorKey: key,
    anchorOffset: length,
    focusKey: key,
    focusOffset: length,
  });

  return EditorState.acceptSelection(editorState, selection);
};

export default moveSelectionToEnd;
