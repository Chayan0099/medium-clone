import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import Heading from '@tiptap/extension-heading';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import { useState } from 'react';
import './style.css'; 

const Editor:React.FC = () => {
  const editor = useEditor({
    editorProps:{
      attributes:{
        class:'focus:outline-none text-lg font-serif max-w-screen-md mt-5' }
    },
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline, 
      Link.configure({
        openOnClick: true,
      }),
      Heading.configure({
        levels: [1, 2, 3], 
      }),
      Placeholder,
    ],
    content: '',
  });

  return (<div className='flex justify-center'>
    <div className='max-w-screen-md '>
      <div className='pt-5'>
        <input type='text' placeholder='Title' className='font-bold text-6xl max-w-500 font-serif focus:outline-none'></input>
      </div>
      {editor && 
      <BubbleMenu className='font-serif flex bg-gray-300 gap-1 p-1 rounded-lg border-2 border-black' editor={editor} tippyOptions={{duration:100}}>
      <button onClick={() => editor?.chain().focus().toggleBold().run()} className={`${editor.isActive('bold')? 'bg-green-400 hover:bg-green-500' : ''} hover:bg-gray-400 px-3 py-2 rounded-lg font-semibold` }>B</ button>
      <button className={`${editor.isActive('italic')? 'bg-green-400 hover:bg-green-500' : ''} hover:bg-gray-400 px-3 py-2 rounded-lg italic`} onClick={() => editor?.chain().focus().toggleItalic().run()}>I</button>
      <button className={`${editor.isActive('underline')? 'bg-green-400 hover:bg-green-500' : ''} hover:bg-gray-400 px-3 py-2 rounded-lg underline underline-offset-2`} onClick={() => editor?.chain().focus().toggleUnderline().run()}>U</button>
      <button className={`${editor.isActive('heading', {level: 1})? 'bg-green-400 hover:bg-green-500' : ''} hover:bg-gray-400 px-3 py-2 rounded-lg`}
      onClick={() => editor?.chain().focus().toggleHeading({level: 1}).run()}>H1</button>
      <button className={`${editor.isActive('heading', {level:3})? 'bg-green-400 hover:bg-green-500' : ''} hover:bg-gray-400 px-3 py-2 rounded-lg`} onClick={() => editor?.chain().focus().toggleHeading({level: 3}).run()}>H3</button> 
      </BubbleMenu>
      }
      <EditorContent editor={editor}/>
  </div>
</div>
  );
};

export default Editor;