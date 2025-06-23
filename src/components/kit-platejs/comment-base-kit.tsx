import { BaseCommentPlugin } from '@platejs/comment';

import { CommentLeafStatic } from '@/components/ui-platejs/comment-node-static.tsx';

export const BaseCommentKit = [BaseCommentPlugin.withComponent(CommentLeafStatic)];
