import React, { useCallback, useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import FontSize from '@tiptap/extension-font-size';
import FloatingToolbar from '../FloatingToolBar';
import Underline from '@tiptap/extension-underline';

const styles = {
  container: {
    position: 'relative' as const,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editorWrapper: {
    width: '50%',
    padding: '1rem',
    borderRadius: '0.375rem',
    color: 'black',
    outline: 'none',
    border: 'none',
    background: 'white',
    boxSizing: 'border-box' as const,
  },
  editorContent: {
    outline: 'none',
    border: 'none',
    boxShadow: 'none',
    background: 'transparent',
  },
};

const TextBlock = ({ data, onChange }: any) => {
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      FontSize.configure({ types: ['textStyle'] }),
      Underline,
    ],
    content: data.content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange({ content: editor.getHTML() });
    },
  });

  const handleSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.toString() === '') {
      setShowToolbar(false);
      return;
    }

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    setToolbarPosition({
      top: rect.top + window.scrollY - 50,
      left: rect.left + window.scrollX,
    });
    setShowToolbar(true);
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('keyup', handleSelection);

    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('keyup', handleSelection);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      const toolbar = document.getElementById('floating-toolbar');
      if (toolbar && !toolbar.contains(e.target)) {
        setShowToolbar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const applyFormatting = (command: string) => {
    if (!editor) return;

    switch (command) {
      case 'bold':
        editor.chain().focus().toggleBold().run();
        break;
      case 'italic':
        editor.chain().focus().toggleItalic().run();
        break;
      case 'underline':
        editor.chain().focus().toggleUnderline?.().run();
        break;
      case 'strikethrough':
        editor.chain().focus().toggleStrike().run();
        break;
      default:
        break;
    }

    setShowToolbar(false);
  };

  const changeFontSize = (size: string) => {
    editor?.chain().focus().setFontSize(size).run();
  };

  const changeColor = (color: string) => {
    editor?.chain().focus().setColor(color).run();
  };

  return (
    <div style={styles.container}>
      <div style={styles.editorWrapper}>
        <EditorContent editor={editor} style={styles.editorContent} />
      </div>

      {showToolbar && editor && (
        <FloatingToolbar
          toolbarPosition={toolbarPosition}
          applyFormatting={applyFormatting}
          changeFontSize={changeFontSize}
          changeColor={changeColor}
        />
      )}
    </div>
  );
};

export default TextBlock;
