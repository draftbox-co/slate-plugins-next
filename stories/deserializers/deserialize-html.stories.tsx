import React, { useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import {
  ActionItemPlugin,
  BlockquotePlugin,
  BoldPlugin,
  CodeBlockPlugin,
  CodePlugin,
  EditablePlugins,
  HeadingPlugin,
  HighlightPlugin,
  ImagePlugin,
  ItalicPlugin,
  LinkPlugin,
  ListPlugin,
  MediaEmbedPlugin,
  MentionPlugin,
  ParagraphPlugin,
  pipe,
  SoftBreakPlugin,
  StrikethroughPlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  TablePlugin,
  UnderlinePlugin,
  withDeserializeHtml,
  withImageUpload,
  withLink,
  withList,
  withMention,
  withTable,
  withVoid,
} from 'slate-plugins-next/src';
import { Slate, withReact } from 'slate-react';
import { initialValuePasteHtml, nodeTypes } from '../config/initialValues';

export default {
  title: 'Deserializers/HTML',
  component: withDeserializeHtml,
};

const plugins = [
  ParagraphPlugin(nodeTypes),
  BlockquotePlugin(nodeTypes),
  CodeBlockPlugin(nodeTypes),
  HeadingPlugin(nodeTypes),
  ImagePlugin(nodeTypes),
  LinkPlugin(nodeTypes),
  ListPlugin(nodeTypes),
  TablePlugin(nodeTypes),
  ActionItemPlugin(nodeTypes),
  MentionPlugin(nodeTypes),
  MediaEmbedPlugin(nodeTypes),
  BoldPlugin(nodeTypes),
  CodePlugin(nodeTypes),
  ItalicPlugin(nodeTypes),
  StrikethroughPlugin(nodeTypes),
  HighlightPlugin(nodeTypes),
  UnderlinePlugin(nodeTypes),
  SubscriptPlugin(nodeTypes),
  SuperscriptPlugin(nodeTypes),
  SoftBreakPlugin(),
];

const withPlugins = [
  withReact,
  withHistory,
  withTable(nodeTypes),
  withLink(nodeTypes),
  withDeserializeHtml(plugins),
  withImageUpload(nodeTypes),
  withMention(nodeTypes),
  withList(nodeTypes),
  withVoid([nodeTypes.typeMediaEmbed]),
] as const;

export const Example = () => {
  const createReactEditor = () => () => {
    const [value, setValue] = useState(initialValuePasteHtml);

    const editor = useMemo(() => pipe(createEditor(), ...withPlugins), []);

    return (
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      >
        <EditablePlugins
          plugins={plugins}
          placeholder="Paste in some HTML..."
        />
      </Slate>
    );
  };

  const Editor = createReactEditor();

  return <Editor />;
};
