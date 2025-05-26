import React from 'react';
import {
  Bold, Italic, Underline, Strikethrough,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Indent, Outdent,
  Eraser, Text, Paintbrush
} from 'lucide-react';

const styles = {
  toolbar: {
    position: 'absolute' as const,
    background: '#fff',
    border: '1px solid #d1d5db',
    padding: '8px',
    borderRadius: '6px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    zIndex: 1000,
    color: '#000',
    width: '480px',
    display: 'flex',
    flexWrap: 'wrap' as const,
    alignItems: 'center',
    gap: '8px'
  },
  iconBtn: {
    background: 'none',
    border: 'none',
    padding: '6px',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'background 0.2s',
  },
  icon: {
    width: '20px',
    height: '20px',
    color: '#333'
  },
  select: {
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    padding: '4px 8px',
    fontSize: '14px',
    outline: 'none',
    background: '#fff',
    color: '#000'
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  colorInput: {
    width: '24px',
    height: '24px',
    padding: 0,
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    cursor: 'pointer'
  }
};

const FloatingToolbar = React.forwardRef<HTMLDivElement, any>(
  ({ toolbarPosition, applyFormatting, changeFontSize, changeColor }, ref) => {
    return (
      <div
        ref={ref}
        id="floating-toolbar"
        style={{
          ...styles.toolbar,
          top: toolbarPosition.top,
          left: toolbarPosition.left,
        }}
      >
        {/* Text Formatting */}
        <button onClick={() => applyFormatting('bold')} style={styles.iconBtn} title="Bold">
          <Bold style={styles.icon} />
        </button>
        <button onClick={() => applyFormatting('italic')} style={styles.iconBtn} title="Italic">
          <Italic style={styles.icon} />
        </button>
        <button onClick={() => applyFormatting('underline')} style={styles.iconBtn} title="Underline">
          <Underline style={styles.icon} />
        </button>
        <button onClick={() => applyFormatting('strikethrough')} style={styles.iconBtn} title="Strikethrough">
          <Strikethrough style={styles.icon} />
        </button>
        {/* Font Family */}
        <select onChange={(e) => applyFormatting('fontFamily', e.target.value)} style={styles.select}>
          <option value="serif">Serif</option>
          <option value="sans-serif">Sans Serif</option>
          <option value="monospace">Monospace</option>
        </select>

        {/* Font Size */}
        <div style={styles.flex}>
          <Text style={{ ...styles.icon, color: '#6b7280' }} />
          <select onChange={(e) => changeFontSize(e.target.value)} style={styles.select}>
            {[12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80].map(size => (
              <option key={size} value={`${size}px`}>{size}</option>
            ))}
          </select>
        </div>

        {/* Text Color */}
        <label style={styles.label}>
          <Paintbrush style={{ ...styles.icon, color: '#6b7280' }} />
          <input type="color" onChange={(e) => changeColor(e.target.value)} style={styles.colorInput} />
        </label>

        {/* Alignment */}
        <button onClick={() => applyFormatting('justifyLeft')} style={styles.iconBtn} title="Align Left">
          <AlignLeft style={styles.icon} />
        </button>
        <button onClick={() => applyFormatting('justifyCenter')} style={styles.iconBtn} title="Align Center">
          <AlignCenter style={styles.icon} />
        </button>
        <button onClick={() => applyFormatting('justifyRight')} style={styles.iconBtn} title="Align Right">
          <AlignRight style={styles.icon} />
        </button>
        <button onClick={() => applyFormatting('justifyFull')} style={styles.iconBtn} title="Justify">
          <AlignJustify style={styles.icon} />
        </button>

        {/* Lists & Indent */}
        <button onClick={() => applyFormatting('insertUnorderedList')} style={styles.iconBtn} title="Bullet List">
          <List style={styles.icon} />
        </button>
        <button onClick={() => applyFormatting('insertOrderedList')} style={styles.iconBtn} title="Numbered List">
          <ListOrdered style={styles.icon} />
        </button>
        <button onClick={() => applyFormatting('indent')} style={styles.iconBtn} title="Indent">
          <Indent style={styles.icon} />
        </button>
        <button onClick={() => applyFormatting('outdent')} style={styles.iconBtn} title="Outdent">
          <Outdent style={styles.icon} />
        </button>

        {/* Clear Formatting */}
        <button onClick={() => applyFormatting('removeFormat')} style={styles.iconBtn} title="Clear Formatting">
          <Eraser style={styles.icon} />
        </button>
      </div>
    );
  }
);

FloatingToolbar.displayName = 'FloatingToolbar';

export default FloatingToolbar;
