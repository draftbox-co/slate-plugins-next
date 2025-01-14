import { SlatePlugin } from 'common/types';
import { deserializeIframe } from 'elements/media-embed/deserializeIframe';
import { renderElementMediaEmbed } from './renderElementMediaEmbed';
import { MediaEmbedPluginOptions } from './types';

/**
 * Enables support for embeddable media such as YouTube
 * or Vimeo videos, Instagram posts and tweets or Google Maps.
 */
export const MediaEmbedPlugin = (
  options?: MediaEmbedPluginOptions
): SlatePlugin => ({
  renderElement: renderElementMediaEmbed(options),
  deserialize: deserializeIframe(options),
});
