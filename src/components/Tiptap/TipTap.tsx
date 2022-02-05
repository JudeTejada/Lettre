import { Editor, EditorContent } from '@tiptap/react';

type EditorProps = {
  editor: Editor;
};

export const Tiptap = ({ editor }: EditorProps) => {
  return <EditorContent editor={editor} />;
};
