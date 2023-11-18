/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {$insertNodeToNearestRoot} from '@lexical/utils';
import {COMMAND_PRIORITY_EDITOR, createCommand, LexicalCommand} from 'lexical';
import {useEffect} from 'react';

import {$createFaceBookNode, FaceBookNode} from '../../nodes/FacebookNode';

export const INSERT_FACEBOOK_COMMAND: LexicalCommand<string> = createCommand(
  'INSERT_FACEBOOK_COMMAND',
);

export default function FaceBookPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([FaceBookNode])) {
      throw new Error('FaceBookPlugin: FaceBookNode not registered on editor');
    }

    return editor.registerCommand<string>(
      INSERT_FACEBOOK_COMMAND,
      (payload) => {
        const faceBookNode = $createFaceBookNode(payload);
        $insertNodeToNearestRoot(faceBookNode);

        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor]);

  return null;
}
