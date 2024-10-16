import { useEditor, EditorContent, BubbleMenu, JSONContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Heading from '@tiptap/extension-heading';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import './style.css'; 
import Topbar from '../components/Topbar';
import { useState } from 'react';

const Editor:React.FC = () => {
  const [title, setTitle] = useState<string>(''); 
  const [content, setContent] = useState<string>(); 

  const editor = useEditor({
    editorProps:{
      attributes:{
        class:'focus:outline-none text-lg font-serif max-w-screen-md mt-5' }
    },
    extensions: [
      StarterKit,
      Underline, 
      Link.configure({
        openOnClick: true,
      }),
      Placeholder,
      Heading.configure({
        levels:[1,3]
      })
    ],
    content: '',
    onUpdate({editor}){
     const html = editor.getHTML(); 
     function htmlDecode(content:any) {
        let e = document.createElement('div');
        e.innerHTML = content;
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    }; 
    setContent(htmlDecode(html) || "")
    console.log(html)
    console.log(htmlDecode(html)); 
    }
  });

  return (
  <div>
    <Topbar publish={true} title={title} content={content || ""}></Topbar>
  <div className='flex justify-center'>
    <div className='max-w-screen-md '>
      <div className='pt-5'>
        <input type='text' placeholder='Title' className='font-bold text-6xl max-w-500 font-serif focus:outline-none' onChange={(e) =>{
          console.log(e.target.value); 
          setTitle(e.target.value); 
        }}></input>
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
      <EditorContent editor={editor} className='prose'/>
  </div>
</div>
</div>
  );
};

export default Editor;