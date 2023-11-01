'use client'

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
    CAN_REDO_COMMAND,
    CAN_UNDO_COMMAND,
    REDO_COMMAND,
    UNDO_COMMAND,
    SELECTION_CHANGE_COMMAND,
    FORMAT_TEXT_COMMAND,
    FORMAT_ELEMENT_COMMAND,
    $getSelection,
    $isRangeSelection,
    $createParagraphNode,
    $getNodeByKey
} from "lexical"
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link"
import {
    $isParentElementRTL,
    $wrapNodes,
    $isAtNodeEnd
} from "@lexical/selection"
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils"
import {
    INSERT_ORDERED_LIST_COMMAND,
    INSERT_UNORDERED_LIST_COMMAND,
    REMOVE_LIST_COMMAND,
    $isListNode,
    ListNode
} from "@lexical/list"
import { createPortal } from "react-dom"
import {
    $createHeadingNode,
    $createQuoteNode,
    $isHeadingNode
} from "@lexical/rich-text"
import {
    $createCodeNode,
    $isCodeNode,
    getDefaultCodeLanguage,
    getCodeLanguages
} from "@lexical/code"
import { twMerge } from "tailwind-merge"
import { Toggle } from "../../toggle"
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, Code, Italic, Link, Redo2, Strikethrough, Underline, Undo2 } from "lucide-react"
import { Separator } from "../../separator"

const LowPriority = 1

const supportedBlockTypes = new Set([
    "paragraph",
    "quote",
    "code",
    "h1",
    "h2",
    "ul",
    "ol"
])

const blockTypeToBlockName = {
    code: "Code Block",
    h1: "Large Heading",
    h2: "Small Heading",
    h3: "Heading",
    h4: "Heading",
    h5: "Heading",
    ol: "Numbered List",
    paragraph: "Normal",
    quote: "Quote",
    ul: "Bulleted List"
}

function Divider() {
    return <div className="divider" />
}

function positionEditorElement(editor:any, rect:any) {
    if (rect === null) {
        editor.style.opacity = "0"
        editor.style.top = "-1000px"
        editor.style.left = "-1000px"
    } else {
        editor.style.opacity = "1"
        editor.style.top = `${rect.top + rect.height + window.pageYOffset + 10}px`
        editor.style.left = `${
            rect.left + window.pageXOffset - editor.offsetWidth / 2 + rect.width / 2
        }px`
    }
}

function FloatingLinkEditor({ editor }: { editor:any }) {
    const editorRef = useRef(null);
    const inputRef = useRef(null);
    const mouseDownRef = useRef(false);
    const [linkUrl, setLinkUrl] = useState("");
    const [isEditMode, setEditMode] = useState(false);
    const [lastSelection, setLastSelection] = useState(null);

    const updateLinkEditor = useCallback(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            const node = getSelectedNode(selection);
            const parent = node.getParent();
            if ($isLinkNode(parent)) {
                setLinkUrl(parent.getURL());
            } else if ($isLinkNode(node)) {
                setLinkUrl(node.getURL());
            } else {
                setLinkUrl("");
            }
        }
        const editorElem = editorRef.current;
        const nativeSelection = window.getSelection();
        const activeElement = document.activeElement;

        if (editorElem === null) {
            return;
        }

        const rootElement = editor.getRootElement();
        if (
            selection !== null &&
            !nativeSelection?.isCollapsed &&
            rootElement !== null &&
            rootElement.contains(nativeSelection?.anchorNode)
        ) {
        const domRange = nativeSelection?.getRangeAt(0);
        let rect;
        if (nativeSelection?.anchorNode === rootElement) {
            let inner = rootElement;
            while (inner.firstElementChild != null) {
                inner = inner.firstElementChild;
            }
            rect = inner.getBoundingClientRect();
        } else {
            rect = domRange?.getBoundingClientRect();
        }

        if (!mouseDownRef.current) {
            positionEditorElement(editorElem, rect);
        }
        //   @ts-ignore
        setLastSelection(selection);
        } else if (!activeElement || activeElement.className !== "link-input") {
            positionEditorElement(editorElem, null);
            setLastSelection(null);
            setEditMode(false);
            setLinkUrl("");
        }

        return true;
    }, [editor]);

    useEffect(() => {
        return mergeRegister(
            editor.registerUpdateListener(({ editorState }: {editorState:any}) => {
                editorState.read(() => {
                    updateLinkEditor();
                });
            }),

            editor.registerCommand(
                SELECTION_CHANGE_COMMAND,
                () => {
                    updateLinkEditor();
                    return true;
                },
                LowPriority
            )
        );
    }, [editor, updateLinkEditor]);

    useEffect(() => {
        editor.getEditorState().read(() => {
            updateLinkEditor();
        });
    }, [editor, updateLinkEditor]);

    useEffect(() => {
        if (isEditMode && inputRef.current) {
            // @ts-ignore
            inputRef.current?.focus();
        }
    }, [isEditMode]);

    return (
        <div ref={editorRef} className="link-editor">
            {isEditMode ? (
                <input
                ref={inputRef}
                className="link-input"
                value={linkUrl}
                onChange={(event) => {
                    setLinkUrl(event.target.value);
                }}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                    event.preventDefault();
                    if (lastSelection !== null) {
                        if (linkUrl !== "") {
                            editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
                        }
                        setEditMode(false);
                    }
                    } else if (event.key === "Escape") {
                        event.preventDefault();
                        setEditMode(false);
                    }
                }}
                />
            ) : (
                <>
                    <div className="link-input">
                        <a href={linkUrl} target="_blank" rel="noopener noreferrer">
                            {linkUrl}
                        </a>
                        <div
                            className="link-edit"
                            role="button"
                            tabIndex={0}
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() => {
                                setEditMode(true);
                            }}
                        />
                    </div>
                </>
            )}
        </div>
    );
}

// @ts-ignore
function Select({ onChange, className, options, value }) {
    return (
        <select className={className} onChange={onChange} value={value}>
            <option hidden={true} value="" />
            {options.map((option:string) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}

// @ts-ignore
function getSelectedNode(selection) {
    const anchor = selection.anchor;
    const focus = selection.focus;
    const anchorNode = selection.anchor.getNode();
    const focusNode = selection.focus.getNode();
    if (anchorNode === focusNode) {
        return anchorNode;
    }
    const isBackward = selection.isBackward();
    if (isBackward) {
        return $isAtNodeEnd(focus) ? anchorNode : focusNode;
    } else {
        return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
    }
}

function BlockOptionsDropdownList({
    editor,
    blockType,
    toolbarRef,
    setShowBlockOptionsDropDown
}:any) {
    const dropDownRef = useRef(null);

    useEffect(() => {
        const toolbar = toolbarRef.current;
        const dropDown = dropDownRef.current;

        if (toolbar !== null && dropDown !== null) {
            const { top, left } = toolbar.getBoundingClientRect();
            // @ts-ignore
            dropDown.style.top = `${top + 40}px`;
            // @ts-ignore
            dropDown.style.left = `${left}px`;
        }
    }, [dropDownRef, toolbarRef]);

    useEffect(() => {
        const dropDown = dropDownRef.current;
        const toolbar = toolbarRef.current;

        if (dropDown !== null && toolbar !== null) {
            // @ts-ignore
            const handle = (event) => {
                const target = event.target;
                // @ts-ignore
                if (!dropDown.contains(target) && !toolbar.contains(target)) {
                    setShowBlockOptionsDropDown(false);
                }
            };
            document.addEventListener("click", handle);

            return () => {
                document.removeEventListener("click", handle);
            };
        }
    }, [dropDownRef, setShowBlockOptionsDropDown, toolbarRef]);

    const formatParagraph = () => {
            if (blockType !== "paragraph") {
                editor.update(() => {
                    const selection = $getSelection();

                    if ($isRangeSelection(selection)) {
                    $wrapNodes(selection, () => $createParagraphNode());
                    }
                });
            }
            setShowBlockOptionsDropDown(false);
    };

    const formatLargeHeading = () => {
            if (blockType !== "h1") {
            editor.update(() => {
                const selection = $getSelection();

                if ($isRangeSelection(selection)) {
                    $wrapNodes(selection, () => $createHeadingNode("h1"));
                }
            });
            }
            setShowBlockOptionsDropDown(false);
    };

    const formatSmallHeading = () => {
            if (blockType !== "h2") {
            editor.update(() => {
                const selection = $getSelection();

                if ($isRangeSelection(selection)) {
                    $wrapNodes(selection, () => $createHeadingNode("h2"));
                }
            });
            }
            setShowBlockOptionsDropDown(false);
    };

    const formatBulletList = () => {
            if (blockType !== "ul") {
                editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND);
            } else {
                editor.dispatchCommand(REMOVE_LIST_COMMAND);
            }
            setShowBlockOptionsDropDown(false);
    };

    const formatNumberedList = () => {
            if (blockType !== "ol") {
                editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND);
            } else {
                editor.dispatchCommand(REMOVE_LIST_COMMAND);
            }
            setShowBlockOptionsDropDown(false);
    };

    const formatQuote = () => {
            if (blockType !== "quote") {
                editor.update(() => {
                    const selection = $getSelection();

                    if ($isRangeSelection(selection)) {
                        $wrapNodes(selection, () => $createQuoteNode());
                    }
                });
            }
            setShowBlockOptionsDropDown(false);
    };

    const formatCode = () => {
            if (blockType !== "code") {
                editor.update(() => {
                    const selection = $getSelection();

                    if ($isRangeSelection(selection)) {
                        $wrapNodes(selection, () => $createCodeNode());
                    }
                });
            }
            setShowBlockOptionsDropDown(false);
    };

    return (
        <div className="dropdown" ref={dropDownRef}>
            <button type={'button'} className="item" onClick={formatParagraph}>
                <span className="icon paragraph" />
                <span className="text">Normal</span>
                {blockType === "paragraph" && <span className="active" />}
            </button>
            <button type={'button'} className="item" onClick={formatLargeHeading}>
                <span className="icon large-heading" />
                <span className="text">Large Heading</span>
                {blockType === "h1" && <span className="active" />}
            </button>
            <button type={'button'} className="item" onClick={formatSmallHeading}>
                <span className="icon small-heading" />
                <span className="text">Small Heading</span>
                {blockType === "h2" && <span className="active" />}
            </button>
            <button type={'button'} className="item" onClick={formatBulletList}>
                <span className="icon bullet-list" />
                <span className="text">Bullet List</span>
                {blockType === "ul" && <span className="active" />}
            </button>
            <button type={'button'} className="item" onClick={formatNumberedList}>
                <span className="icon numbered-list" />
                <span className="text">Numbered List</span>
                {blockType === "ol" && <span className="active" />}
            </button>
            <button type={'button'} className="item" onClick={formatQuote}>
                <span className="icon quote" />
                <span className="text">Quote</span>
                {blockType === "quote" && <span className="active" />}
            </button>
            <button type={'button'} className="item" onClick={formatCode}>
                <span className="icon code" />
                <span className="text">Code Block</span>
                {blockType === "code" && <span className="active" />}
            </button>
        </div>
    );
}

export default function ToolbarPlugin() {
    const [editor] = useLexicalComposerContext();
    const toolbarRef = useRef(null);
    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);
    const [blockType, setBlockType] = useState("paragraph");
    const [selectedElementKey, setSelectedElementKey] = useState(null);
    const [showBlockOptionsDropDown, setShowBlockOptionsDropDown] = useState(
        false
    );
    const [codeLanguage, setCodeLanguage] = useState("");
    const [isRTL, setIsRTL] = useState(false);
    const [isLink, setIsLink] = useState(false);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);
    const [isCode, setIsCode] = useState(false);

    const updateToolbar = useCallback(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            const anchorNode = selection.anchor.getNode();
            const element =
                anchorNode.getKey() === "root"
                ? anchorNode
                : anchorNode.getTopLevelElementOrThrow();
            const elementKey = element.getKey();
            const elementDOM = editor.getElementByKey(elementKey);
            if (elementDOM !== null) {
                setSelectedElementKey(elementKey);
                if ($isListNode(element)) {
                    const parentList = $getNearestNodeOfType(anchorNode, ListNode);
                    const type = parentList ? parentList.getTag() : element.getTag();
                    setBlockType(type);
                } else {
                    const type = $isHeadingNode(element)
                        ? element.getTag()
                        : element.getType();
                    setBlockType(type);
                    if ($isCodeNode(element)) {
                        setCodeLanguage(element.getLanguage() || getDefaultCodeLanguage());
                    }
                }
            }
            // Update text format
            setIsBold(selection.hasFormat("bold"));
            setIsItalic(selection.hasFormat("italic"));
            setIsUnderline(selection.hasFormat("underline"));
            setIsStrikethrough(selection.hasFormat("strikethrough"));
            setIsCode(selection.hasFormat("code"));
            setIsRTL($isParentElementRTL(selection));

            // Update links
            const node = getSelectedNode(selection);
            const parent = node.getParent();
            if ($isLinkNode(parent) || $isLinkNode(node)) {
                setIsLink(true);
            } else {
                setIsLink(false);
            }
        }
    }, [editor]);

    useEffect(() => {
        return mergeRegister(
            editor.registerUpdateListener(({ editorState }) => {
                editorState.read(() => {
                updateToolbar();
                });
            }),
            editor.registerCommand(
                SELECTION_CHANGE_COMMAND,
                (_payload, newEditor) => {
                updateToolbar();
                return false;
                },
                LowPriority
            ),
            editor.registerCommand(
                CAN_UNDO_COMMAND,
                (payload) => {
                setCanUndo(payload);
                return false;
                },
                LowPriority
            ),
            editor.registerCommand(
                CAN_REDO_COMMAND,
                (payload) => {
                setCanRedo(payload);
                return false;
                },
                LowPriority
            )
        );
    }, [editor, updateToolbar]);

    const codeLanguges = useMemo(() => getCodeLanguages(), []);
    const onCodeLanguageSelect = useCallback(
        (e:any) => {
            editor.update(() => {
                if (selectedElementKey !== null) {
                    const node = $getNodeByKey(selectedElementKey);
                    if ($isCodeNode(node)) {
                        node.setLanguage(e.target.value);
                    }
                }
            });
        },
        [editor, selectedElementKey]
    );

    const insertLink = useCallback(() => {
        if (!isLink) {
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://");
        } else {
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
        }
    }, [editor, isLink]);

    return (
        <Fragment>
            <div ref={toolbarRef} className={twMerge(['flex items-center rounded-md flex-wrap gap-2'])}>
                <Toggle pressed={false} type={'button'} size={"sm"}
                    disabled={!canUndo}
                    className="block"
                    // @ts-ignore
                    onClick={() => editor.dispatchCommand(UNDO_COMMAND)}
                    aria-label="Undo"
                >
                    <Undo2 className="h-4 w-4" />
                </Toggle>
                <Toggle pressed={false} type={'button'} size={"sm"}
                    disabled={!canRedo}
                    className="block"
                    // @ts-ignore
                    onClick={() => editor.dispatchCommand(REDO_COMMAND)}
                    aria-label="Redo"
                >
                    <Redo2 className="h-4 w-4" />
                </Toggle>
                <Separator orientation="vertical" className="h-5" />
                <Toggle type={'button'} size={"sm"}
                    onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
                    pressed={isBold}
                    className="block"
                    aria-label="Format Bold"
                >
                    <Bold className="h-4 w-4" />
                </Toggle>
                <Toggle type={'button'} size={"sm"}
                    onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
                    pressed={isItalic}
                    className="block"
                    aria-label="Format Italics"
                >
                    <Italic className="h-4 w-4" />
                </Toggle>
                <Toggle type={'button'} size={"sm"}
                    onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
                    pressed={isUnderline}
                    className="block"
                    aria-label="Format Underline"
                >
                    <Underline className="h-4 w-4" />
                </Toggle>
                <Toggle type={'button'} size={"sm"}
                    onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")}
                    pressed={isStrikethrough}
                    className="block"
                    aria-label="Format Strikethrough"
                >
                    <Strikethrough className="h-4 w-4" />
                </Toggle>
                <Toggle type={'button'} size={"sm"}
                    onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")}
                    pressed={isCode}
                    className="block"
                    aria-label="Insert Code"
                >
                    <Code className="h-4 w-4" />
                </Toggle>
                <Toggle type={'button'} size={"sm"}
                    onClick={insertLink}
                    pressed={isLink}
                    className="block"
                    aria-label="Insert Link"
                >
                    <Link className="h-4 w-4" />
                </Toggle>
                {isLink &&
                    createPortal(<FloatingLinkEditor editor={editor} />, document.body)}
                <Divider />
                <Separator orientation="vertical" className="h-5" />
                <Toggle pressed={false} type={'button'} size={"sm"}
                    onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}
                    className="block"
                    aria-label="Left Align"
                >
                    <AlignLeft className="h-4 w-4" />
                </Toggle>
                <Toggle pressed={false} type={'button'} size={"sm"}
                    onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")}
                    className="block"
                    aria-label="Center Align"
                >
                    <AlignCenter className="h-4 w-4" />
                </Toggle>
                <Toggle pressed={false} type={'button'} size={"sm"}
                    onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")}
                    className="block"
                    aria-label="Right Align"
                >
                    <AlignRight className="h-4 w-4" />
                </Toggle>
                <Toggle pressed={false} type={'button'} size={"sm"}
                    onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")}
                    className="block"
                    aria-label="Justify Align"
                >
                    <AlignJustify className="h-4 w-4" />
                </Toggle>
            </div>
            <Separator className="my-1" />
        </Fragment>
    );
}
