// import { List, Repeat } from 'immutable';
// import {
//   CharacterMetadata,
//   ContentBlock,
//   genKey,
// } from 'draft-js';

// function createNewBlock(text) {
//   const { EMPTY } = CharacterMetadata;
//   const cChars = List(
//     Repeat(EMPTY, text.length)
//   );
//
//   const block = new ContentBlock({
//     key: genKey(),
//     type: 'unstyled',
//     text,
//     characterList: List(Repeat(charData, 1))
//   });
//
//   return block;
// }
//
// function createNewBlockWithEntity(text, entityKey) {
//   const { EMPTY } = CharacterMetadata;
//   var charData = CharacterMetadata.create({entity: entityKey});
//
//   const block = new ContentBlock({
//     key: genKey(),
//     type: 'unstyled',
//     text,
//     characterList: List(Repeat(charData, 1))
//   });
//
//   return block;
// }

function getCursorPosition(window, document) {
  const selection = window.getSelection();
  const activeEl = document.activeElement;
  console.log(selection, activeEl);

  return { top: 0, right: 0, bottom: 0, left: 0 };
}

module.exports = {
  getCursorPosition
};
