import React, { useMemo, useState } from 'react';
import { Code, FormatQuote, LooksOne, LooksTwo } from '@styled-icons/material';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import {
  BLOCKQUOTE,
  BlockquotePlugin,
  CodeBlockPlugin,
  CodePlugin,
  EditablePlugins,
  HeadingPlugin,
  HeadingToolbar,
  ParagraphPlugin,
  pipe,
  SoftBreakPlugin,
  ToolbarCodeBlock,
  ToolbarElement,
  withBreakEmptyReset,
  withDeleteStartReset,
  withList,
  withToggleType,
} from 'slate-plugins-next/src';
import { Slate, withReact } from 'slate-react';
import { initialValueSoftBreak, nodeTypes } from '../config/initialValues';

export default {
  title: 'Handlers/Soft Break',
  component: SoftBreakPlugin,
};

const resetOptions = {
  ...nodeTypes,
  types: [BLOCKQUOTE],
};

const withPlugins = [
  withReact,
  withHistory,
  withToggleType(nodeTypes),
  withDeleteStartReset(resetOptions),
  withBreakEmptyReset(resetOptions),
  withList(nodeTypes),
] as const;

export const BlockPlugins = () => {
  const plugins: any[] = [
    ParagraphPlugin(nodeTypes),
    HeadingPlugin(nodeTypes),
    BlockquotePlugin(nodeTypes),
    CodeBlockPlugin(nodeTypes),
    CodePlugin(nodeTypes),
    SoftBreakPlugin(),
  ];

  const createReactEditor = () => () => {
    const [value, setValue] = useState(initialValueSoftBreak);

    const editor = useMemo(() => pipe(createEditor(), ...withPlugins), []);

    return (
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      >
        <HeadingToolbar>
          <ToolbarElement type={nodeTypes.typeH1} icon={<LooksOne />} />
          <ToolbarElement type={nodeTypes.typeH2} icon={<LooksTwo />} />
          <ToolbarElement
            type={nodeTypes.typeBlockquote}
            icon={<FormatQuote />}
          />
          <ToolbarCodeBlock {...nodeTypes} icon={<Code />} />
        </HeadingToolbar>
        <EditablePlugins
          plugins={plugins}
          placeholder="Enter some rich text…"
          spellCheck
          autoFocus
        />
      </Slate>
    );
  };

  const Editor = createReactEditor();

  return <Editor />;
};
