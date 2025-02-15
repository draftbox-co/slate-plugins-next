/** @jsx jsx */

import { jsx } from '__test-utils__/jsx';
import { idCreatorFixture } from '__tests__/common/transforms/withNodeID/fixtures';
import { withNodeID } from 'common/transforms/node-id';
import { Editor, Transforms } from 'slate';
import { withHistory } from 'slate-history';

const input = ((
  <editor>
    <hp>
      tes
      <cursor />t
    </hp>
  </editor>
) as any) as Editor;

const output = (
  <editor>
    <hp>tes</hp>
    <hp id={2}>
      <htext id={1}>t</htext>
    </hp>
  </editor>
) as any;

it('should add an id to the new element and text', () => {
  const editor = withNodeID({
    idCreator: idCreatorFixture,
    filterText: false,
  })(withHistory(input));

  Transforms.splitNodes(editor);

  editor.undo();
  editor.redo();

  expect(input.children).toEqual(output.children);
});
