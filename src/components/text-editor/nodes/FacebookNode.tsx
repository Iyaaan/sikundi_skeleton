/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
  ElementFormatType,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  Spread,
} from 'lexical';

import {BlockWithAlignableContents} from '@lexical/react/LexicalBlockWithAlignableContents';
import {
  DecoratorBlockNode,
  SerializedDecoratorBlockNode,
} from '@lexical/react/LexicalDecoratorBlockNode';
import * as React from 'react';

type FaceBookComponentProps = Readonly<{
  className: Readonly<{
    base: string;
    focus: string;
  }>;
  format: ElementFormatType | null;
  nodeKey: NodeKey;
  postID: string;
}>;

function FaceBookComponent({
  className,
  format,
  nodeKey,
  postID,
}: FaceBookComponentProps) {
  return (
    <BlockWithAlignableContents
      className={className}
      format={format}
      nodeKey={nodeKey}>
        <iframe 
          title='FaceBook'
          className='bg-border overflow-hidden border-none'
          src={`https://www.facebook.com/plugins/post.php?href=https://www.facebook.com/123/posts/${postID}/?mibextid=7i0OJ8&show_text=true&width=500`} 
          width="500" height="506" scrolling="no" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
    </BlockWithAlignableContents>
  );
}

export type SerializedFaceBookNode = Spread<
  {
    postID: string;
  },
  SerializedDecoratorBlockNode
>;

function convertYoutubeElement(
  domNode: HTMLElement,
): null | DOMConversionOutput {
  const postID = domNode.getAttribute('data-lexical-facebook');
  if (postID) {
    const node = $createFaceBookNode(postID);
    return {node};
  }
  return null;
}

export class FaceBookNode extends DecoratorBlockNode {
  __id: string;

  static getType(): string {
    return 'facebook';
  }

  static clone(node: FaceBookNode): FaceBookNode {
    return new FaceBookNode(node.__id, node.__format, node.__key);
  }

  static importJSON(serializedNode: SerializedFaceBookNode): FaceBookNode {
    const node = $createFaceBookNode(serializedNode.postID);
    node.setFormat(serializedNode.format);
    return node;
  }

  exportJSON(): SerializedFaceBookNode {
    return {
      ...super.exportJSON(),
      type: 'facebook',
      version: 1,
      postID: this.__id,
    };
  }

  constructor(id: string, format?: ElementFormatType, key?: NodeKey) {
    super(format, key);
    this.__id = id;
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('iframe');
    element.setAttribute('data-lexical-facebook', this.__id);
    element.setAttribute('width', '560');
    element.setAttribute('height', '315');
    element.setAttribute(
      'src',
      `https://www.facebook.com/plugins/post.php?href=https://www.facebook.com/123/posts/${this.__id}/?mibextid=7i0OJ8&show_text=true&width=500`,
    );
    element.setAttribute('frameborder', '0');
    element.setAttribute(
      'allow',
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
    );
    element.setAttribute('allowfullscreen', 'true');
    element.setAttribute('title', 'FaceBook');
    return {element};
  }

  static importDOM(): DOMConversionMap | null {
    return {
      iframe: (domNode: HTMLElement) => {
        if (!domNode.hasAttribute('data-lexical-facebook')) {
          return null;
        }
        return {
          conversion: convertYoutubeElement,
          priority: 1,
        };
      },
    };
  }

  updateDOM(): false {
    return false;
  }

  getId(): string {
    return this.__id;
  }

  getTextContent(
    _includeInert?: boolean | undefined,
    _includeDirectionless?: false | undefined,
  ): string {
    return `https://www.facebook.com/plugins/post.php?href=https://www.facebook.com/123/posts/${this.__id}/?mibextid=7i0OJ8&show_text=true&width=500`;
  }

  decorate(_editor: LexicalEditor, config: EditorConfig): JSX.Element {
    const embedBlockTheme = config.theme.embedBlock || {};
    const className = {
      base: embedBlockTheme.base || '',
      focus: embedBlockTheme.focus || '',
    };
    return (
      <FaceBookComponent
        className={className}
        format={this.__format}
        nodeKey={this.getKey()}
        postID={this.__id}
      />
    );
  }
}

export function $createFaceBookNode(postID: string): FaceBookNode {
  return new FaceBookNode(postID);
}

export function $isFaceBookNode(
  node: FaceBookNode | LexicalNode | null | undefined,
): node is FaceBookNode {
  return node instanceof FaceBookNode;
}
