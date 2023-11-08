import type {Klass, LexicalNode} from 'lexical'

import {AutoLinkNode, LinkNode} from '@lexical/link'
import {ListItemNode, ListNode} from '@lexical/list'
import {OverflowNode} from '@lexical/overflow'
import {HorizontalRuleNode} from '@lexical/react/LexicalHorizontalRuleNode'
import {HeadingNode, QuoteNode} from '@lexical/rich-text'
import {TableCellNode, TableNode, TableRowNode} from '@lexical/table'

// import {ImageNode} from '@sikundi/components/ui/text-editor/nodes/ImageNode'
// import {PageBreakNode} from '@sikundi/components/ui/text-editor/nodes/PageBreakNode'
// import {TweetNode} from '@sikundi/components/ui/text-editor/nodes/TweetNode'
// import {YouTubeNode} from '@sikundi/components/ui/text-editor/nodes/YouTubeNode'

const PlaygroundNodes: Array<Klass<LexicalNode>> = [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
    OverflowNode,
    HorizontalRuleNode,
    // ImageNode,
//   TweetNode,
//   YouTubeNode,
//   PageBreakNode,
];

export default PlaygroundNodes;
