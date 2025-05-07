'use client';

import React, { useEffect, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';

const TiptapEditor = ({ name, value, onChange, placeholder }) => {
  const [textColor, setTextColor] = useState('#000000');
  const [isMounted, setIsMounted] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: true,
          HTMLAttributes: {
            class: 'list-disc pl-4',
          },
        },
        listItem: {
          HTMLAttributes: {
            class: 'list-item',
          },
        },
      }),
      Underline,
      TextStyle,
      Color.configure({
        types: ['textStyle'],
      }),
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none p-2 min-h-[150px]',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange({ target: { name, value: html } }); // Return HTML to parent
    },
  });

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  }, [value, editor]);

  const applyColor = (color) => {
    editor?.chain().focus().setColor(color).run();
    setTextColor(color);
  };

  const handleTab = () => {
    editor?.chain().focus().insertContent('    ').run(); // Insert 4 spaces
  };

  if (!isMounted || !editor) {
    return (
      <div className="p-4 border rounded-lg bg-gray-50 animate-pulse">
        Loading editor...
      </div>
    );
  }

  return (
    <div className="border rounded-lg bg-white overflow-hidden">
      {/* Toolbar */}
      <div className="toolbar flex flex-wrap items-center gap-2 p-2 border-b bg-gray-50">
        {/* Text Formatting */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${editor.isActive('bold') ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${editor.isActive('italic') ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
          title="Italic"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded ${editor.isActive('underline') ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
          title="Underline"
        >
          <u>U</u>
        </button>

        {/* Color Picker */}
        <div className="relative group">
          <button
            type="button"
            className="p-2 rounded hover:bg-gray-100 flex items-center gap-1"
            title="Text color"
          >
            <span className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: textColor }} />
            <span>A</span>
          </button>
          <div className="absolute z-10 mt-1 p-2 bg-white border rounded-lg shadow-lg hidden group-hover:block">
            <input
              type="color"
              value={textColor}
              onChange={(e) => applyColor(e.target.value)}
              className="w-8 h-8 cursor-pointer"
            />
            <div className="grid grid-cols-5 gap-1 mt-2">
              {['#000000', '#ef4444', '#3b82f6', '#10b981', '#f59e0b'].map((color) => (
                <button
                  key={color}
                  type="button"
                  className="w-6 h-6 rounded-full border border-gray-200"
                  style={{ backgroundColor: color }}
                  onClick={() => applyColor(color)}
                  aria-label={`Color ${color}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* List Button */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
          title="Bullet List"
        >
          <span className="flex items-center">• List</span>
        </button>

        {/* Tab Button */}
        <button
          type="button"
          onClick={handleTab}
          className="p-2 rounded hover:bg-gray-100"
          title="Insert Tab"
        >
          <span className="flex items-center">↹ Tab</span>
        </button>
      </div>

      {/* Editor Content */}
      <div className="p-1">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TiptapEditor;