import { getBlockAboveSelection } from 'common/queries/getBlockAboveSelection';
import { getText } from 'common/queries/getText';
import { Editor } from 'slate';

/**
 * Get the block text before the selection: from the start of the block to the anchor.
 * Return the text and its range.
 */
export const getTextFromBlockStartToAnchor = (editor: Editor) => {
  const { selection } = editor;

  if (!selection) return { text: '' };

  const blockEntry = getBlockAboveSelection(editor);

  const blockPath = blockEntry ? blockEntry[1] : [];
  const start = Editor.start(editor, blockPath);
  const range = { anchor: start, focus: selection.anchor };

  return {
    text: getText(editor, range),
    range,
  };
};
