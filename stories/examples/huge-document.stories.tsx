import React, { useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import {
  EditablePlugins,
  HeadingPlugin,
  ParagraphPlugin,
  pipe,
} from 'slate-plugins-next/src';
import { Slate, withReact } from 'slate-react';
import { initialValueHugeDocument, nodeTypes } from '../config/initialValues';

export default {
  title: 'Examples/Huge Document',
};

const plugins = [ParagraphPlugin(nodeTypes), HeadingPlugin(nodeTypes)];

const withPlugins = [withReact, withHistory] as const;

export const Example = () => {
  const [value, setValue] = useState(initialValueHugeDocument);

  const editor = useMemo(() => pipe(createEditor(), ...withPlugins), []);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    >
      <EditablePlugins plugins={plugins} spellCheck autoFocus />
    </Slate>
  );
};
