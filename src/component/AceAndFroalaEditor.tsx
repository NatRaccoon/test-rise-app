// components/AceAndFroalaEditor.tsx

import React, { useState, useRef, useEffect } from 'react';
import AceEditor from 'react-ace';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditor from 'react-froala-wysiwyg';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/mode-markdown';

type Props = {
  value: string;
  onChange: (newValue: string) => void;
};

const AceAndFroalaEditor: React.FC<Props> = ({ value, onChange }) => {
  const [showFroalaEditor, setShowFroalaEditor] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const froalaRef = useRef<any>(null);
  const aceEditorRef = useRef<any>(null);

  const handleTextHighlight = () => {
    const selected = window.getSelection()?.toString();
    if (selected) {
      setSelectedText(selected);
      setShowFroalaEditor(true);
    }
  };

  const handleSaveFormattedText = (formattedText: string) => {
    const updatedValue = value.replace(selectedText, formattedText);
    onChange(updatedValue); // propagate to parent
    setShowFroalaEditor(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (froalaRef.current && !froalaRef.current.contains(event.target)) {
        setShowFroalaEditor(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="relative">
        <AceEditor
          mode="markdown"
          theme="github"
          value={value}
          onChange={onChange}
          name="ace-editor"
          width="100%"
          height="300px"
          ref={aceEditorRef}
          editorProps={{ $blockScrolling: true }}
        />
      </div>

      {/* Text highlight logic */}
      <div>
        {aceEditorRef.current && aceEditorRef.current.editor && (
          <div onMouseUp={handleTextHighlight} />
        )}
      </div>

      {showFroalaEditor && (
        <div
          ref={froalaRef}
          className="froala-popup absolute"
          style={{ top: '50px', left: '100px', zIndex: 9999 }}
        >
          <FroalaEditor
            tag="textarea"
            model={selectedText}
            onModelChange={(model: any) => handleSaveFormattedText(model)}
            config={{
              toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'alignLeft', 'alignCenter'],
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AceAndFroalaEditor;
