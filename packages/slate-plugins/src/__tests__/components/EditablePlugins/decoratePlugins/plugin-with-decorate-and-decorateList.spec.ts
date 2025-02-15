import { Decorate } from 'common/types';
import { NodeEntry, Point } from 'slate';
import { decoratePlugins } from 'components/EditablePlugins/utils';

const nodeEntry: NodeEntry = [{ text: 'test' }, [0, 0]];
const point: Point = { path: [0, 0], offset: 0 };
const range = { anchor: point, focus: point };
const decorate: Decorate = () => [range];

const output = [range, range];

it('should be a list of ranges', () => {
  expect(decoratePlugins([{ decorate }], [decorate])(nodeEntry)).toEqual(
    output
  );
});
