import axios from 'axios'; 
import { useEffect, useState } from 'react';
import Topbar from '../components/Topbar';
import { useNavigate } from 'react-router-dom';
import SignBar from '../components/SignBar';
import IsSignedup from '../components/IsSignedup';

export type BlogType = {
    id:string,
    title:string,
    content:string,
    authorId:string
}

type Arrayof<T> = T[]; 

interface Renderblogtype {
    fetchLink: string
}

function Blog() {
    const signedUp = IsSignedup(); 
return <div>
{signedUp == false? <SignBar></SignBar>:<></>}
<Topbar write={true}></Topbar>
<RenderBlogs fetchLink='https://blog-post.chayansarkar2003.workers.dev/api/v1/blog/bulk'></RenderBlogs>
</div>
}

export const RenderBlogs : React.FC <Renderblogtype> = ({fetchLink}) => {
    const naviagate = useNavigate(); 
    const [blogs, setBlogs] = useState<Arrayof<BlogType>>(); 
    const token = localStorage.getItem('token'); 
    useEffect(() => {
       axios.get(fetchLink, 
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
        const items = blogs.map(blog => <div key={blog.id}onClick={() => {
            naviagate(`/read/${blog.id}`)
        }}className=' m-5 p-5 font-serif hover:bg-gray-200 flex flex-col rounded-lg max-w-screen-md'>
            <div className='font-bold text-3xl'>{blog.title}</div>
            <div className='text-lg flex flex-col flex-wrap max-h-32 ' dangerouslySetInnerHTML={{__html:`${blog.content.slice(0,300) + '...'}`}}></div>
        </div>)
        return <div className='flex flex-col items-center'>
            <div>
            {items}
            </div>
        </div>
    } else {
        return < div>
            No Blogs here
        </div>
    }

   }

export default Blog; 