import React, { useRef, useState, useEffect } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/mode-markdown';

const MarkdownAceEditor = ({data}: any) => {
  const aceRef = useRef<any>(null);
  const [editorContent, setEditorContent] = useState(data.content || 'Start typing...');
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });
  const [selectedText, setSelectedText] = useState('');

  // Listen for text selection
  const handleSelection = () => {
    const editor = aceRef.current?.editor;
    const selection = editor.getSelection();
    const text = selection.getRange().isEmpty() ? '' : editor.session.getTextRange(selection.getRange());
    setSelectedText(text);

    if (text) {
      const cursorPos = selection.getCursor(); // Row, column
      const coords = editor.renderer.textToScreenCoordinates(cursorPos.row, cursorPos.column);
      setToolbarPosition({ top: coords.pageY - 40, left: coords.pageX });
      setShowToolbar(true);
    } else {
      setShowToolbar(false);
    }
  };

  // Format selected text
  const applyFormatting = (wrapper: string) => {
    const editor = aceRef.current?.editor;
    const selection = editor.getSelection();
    const range = selection.getRange();
    const currentText = editor.session.getTextRange(range);
    editor.session.replace(range, `${wrapper}${currentText}${wrapper}`);
    setShowToolbar(false);
  };

  useEffect(() => {
    const editor = aceRef.current?.editor;
    if (editor) {
      editor.container.addEventListener('mouseup', handleSelection);
      return () => editor.container.removeEventListener('mouseup', handleSelection);
    }
  }, []);

  return (
    <div className="relative">
      <AceEditor
        ref={aceRef}
        mode="markdown"
        theme="github"
        value={editorContent}
        onChange={setEditorContent}
        name="markdown-ace"
        width="100%"
        height="300px"
        editorProps={{ $blockScrolling: true }}
      />

      {showToolbar && (
        <div
          style={{
            position: 'absolute',
            top: toolbarPosition.top,
            left: toolbarPosition.left,
            background: 'white',
            border: '1px solid #ccc',
            padding: '6px 8px',
            borderRadius: '6px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            zIndex: 1000,
          }}
        >
          <button onClick={() => applyFormatting('**')}>Bold</button>
          <button onClick={() => applyFormatting('_')}>Italic</button>
          <button onClick={() => applyFormatting('~~')}>Strike</button>
        </div>
      )}
    </div>
  );
};

export default MarkdownAceEditor;
