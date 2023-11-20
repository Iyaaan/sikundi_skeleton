import { $createParagraphNode, $createTextNode, $getRoot, createEditor } from "lexical";

const lexicalEditor = createEditor({
    namespace: "Editor",
    nodes: [],
    onError: console.error
});

export default function plainTextToLexicalState(text: string) {
    lexicalEditor.update(() => {
        const paragraph = $createParagraphNode();
        const textNode = $createTextNode(text);

        paragraph.append(textNode);

        $getRoot()
            .clear()
            .append(paragraph);
    });

    return lexicalEditor
}