/*
  ex.
const closetEditorParent = closest(btnTarget, function (el) {
  return el.className === 'RichEditor-root';
});
*/
function closest(el, fn) {
  return el && (
    fn(el) ? el : closest(el.parentNode, fn)
  );
}

function getElementOffset(el) {
  let _x = 0;
  let _y = 0;
  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _x += el.offsetLeft - el.scrollLeft;
    _y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return { top: _y, left: _x };
}

module.exports = {
  closest,
  getElementOffset
};
