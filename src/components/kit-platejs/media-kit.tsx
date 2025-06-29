import { CaptionPlugin } from '@platejs/caption/react';
import {
  AudioPlugin,
  FilePlugin,
  ImagePlugin,
  MediaEmbedPlugin,
  PlaceholderPlugin,
  VideoPlugin,
} from '@platejs/media/react';
import { KEYS } from 'platejs';

import { AudioElement } from '@/components/ui-platejs/media-audio-node.tsx';
import { MediaEmbedElement } from '@/components/ui-platejs/media-embed-node.tsx';
import { FileElement } from '@/components/ui-platejs/media-file-node.tsx';
import { ImageElement } from '@/components/ui-platejs/media-image-node.tsx';
import { PlaceholderElement } from '@/components/ui-platejs/media-placeholder-node.tsx';
import { MediaPreviewDialog } from '@/components/ui-platejs/media-preview-dialog.tsx';
import { MediaUploadToast } from '@/components/ui-platejs/media-upload-toast.tsx';
import { VideoElement } from '@/components/ui-platejs/media-video-node.tsx';

export const MediaKit = [
  ImagePlugin.configure({
    options: { disableUploadInsert: true },
    render: { afterEditable: MediaPreviewDialog, node: ImageElement },
  }),
  MediaEmbedPlugin.withComponent(MediaEmbedElement),
  VideoPlugin.withComponent(VideoElement),
  AudioPlugin.withComponent(AudioElement),
  FilePlugin.withComponent(FileElement),
  PlaceholderPlugin.configure({
    options: { disableEmptyPlaceholder: true },
    render: { afterEditable: MediaUploadToast, node: PlaceholderElement },
  }),
  CaptionPlugin.configure({
    options: {
      query: {
        allow: [KEYS.img, KEYS.video, KEYS.audio, KEYS.file, KEYS.mediaEmbed],
      },
    },
  }),
];
