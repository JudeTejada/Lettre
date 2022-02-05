import { useEditor, EditorContent, JSONContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
type EditorProps = {
  onChange: (value: JSONContent) => void;
};

export const Tiptap = ({ onChange }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        emptyEditorClass: 'tiptap-editor-is-empty',
        // Use a placeholder:
        placeholder: "Express your thought here..."
        // Use different placeholders depending on the node type:
        // placeholder: ({ node }) => {
        //   if (node.type.name === 'heading') {
        //     return 'What’s the title?'
        //   }

        //   return 'Can you add some further context?'
        // },
      })
    ],

    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      onChange(json);
    }
  });

  if (!editor) return null;

  return <EditorContent editor={editor} />;
};
