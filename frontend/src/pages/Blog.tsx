import axios from 'axios'; 
import { useEffect, useState } from 'react';
import Topbar from '../components/Topbar';

type BlogType = {
    id:string,
    title:string,
    content:string,
    authorId:string
}

type Arrayof<T> = T[]; 

function Blog() {
return <div>
<Topbar publish={false}></Topbar>
<RenderBlogs></RenderBlogs>
</div>
}

function RenderBlogs() {
    const [blogs, setBlogs] = useState<Arrayof<BlogType>>(); 
    const token = localStorage.getItem('token'); 
    useEffect(() => {
       axios.get('http://localhost:8787/api/v1/blog/bulk', 
        {headers:{
            'Authorization':token
        }}
       ).then((res) => {
        setBlogs(res.data.blogs)
       }).catch((err) => {
        console.log(err)
       })
    },[]); 
   
    if(blogs) {
        const items = blogs.map(blog => <div className=' m-5 p-5 font-serif hover:bg-gray-200 flex flex-col self-start rounded-lg max-w-screen-md'>
            <div className='font-bold text-3xl'>{blog.title}</div>
            <div className='text-lg'>{blog.content}</div>
        </div>)
        return <div className='flex flex-col items-center'>
            {items}
        </div>
    } else {
        return <div>
            No Blogs here
        </div>
    }

   }

export default Blog; 