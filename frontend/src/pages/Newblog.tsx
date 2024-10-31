import { useEditor, EditorContent, BubbleMenu} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import './style.css'; 
import Topbar from '../components/Topbar';
import { useState } from 'react';
import axios from 'axios';

const Editor:React.FC = () => {
  const [title, setTitle] = useState<string>(''); 
  const [content, setContent] = useState<string>(); 

  const editor = useEditor({
    editorProps:{
      attributes:{
        class:'focus:outline-none text-lg font-serif max-w-screen-md mt-5' }
    },
    extensions: [
      StarterKit.configure({
        heading:{
          levels: [1,3]
        }
      }),
      Underline, 
      Link.configure({
        openOnClick: true,
      }),
      Placeholder,
    ],
    content: '',
    onUpdate({editor}){
      setContent(editor.getHTML()); 
    ; 
    }
  });

  return (
  <div className=''>
    <Topbar write={false}></Topbar>
  <div className='flex justify-start pl-10 md:justify-center md:pl-0'>
    <div className='max-w-screen-sm'>
      <div className='pt-5'>
        <input type='text' placeholder='Title' className='flex flex-wrap font-bold text-6xl font-serif focus:outline-none' size={15} onChange={(e) =>{ 
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
  <div className='fixed right-24 bottom-16'>
      <button className='md:fixed right-48 bottom-32 bg-lime-400 text-3xl font-bold font-serif py-4 px-6 rounded-lg hover:bg-lime-600' onClick={() => {
        const token = localStorage.getItem('token');
        axios.post('https://blog-post.chayansarkar.workers.dev/api/v1/blog/createBlog', {
          title,
          content
        }, {
          headers:{
            'Authorization': token
          }
        }).then((res) => {
          if (res.data.id) {
            alert("Blog publish")
          }
          else{
            alert("Blog can't be published")
          }
        })
        
      }}>Publish</button>
    </div>
</div>
  );
};

export default Editor;