import { useEffect, useState } from "react";
import { BlogType } from "./Blog";
import axios from "axios";

type Arrayof<T> = T[]; 

function Profile(){
    const [blogs, setBlogs] = useState<Arrayof<BlogType>>();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [count, setCount] = useState<number>(); 

    const token = localStorage.getItem('token');
    useEffect(() => {
        axios.get('https://blog-post.chayansarkar2003.workers.dev/api/v1/user/getinfo',{
            headers:{
                'Authorization':token
            }
        }).then((res) => {
            setName(res.data.info.name);
            setEmail(res.data.info.email);
        })
        axios.get('https://blog-post.chayansarkar2003.workers.dev/api/v1/blog/myblogs',{
            headers:{
                'Authorization':token
            }
        }).then((res) => {
            setBlogs(res.data.blogs); 
            setCount(res.data.blogs.length);
        })
    },[])
    return <div> 
    <div className="flex justify-center mt-10">
        <div className="p-10 text-2xl font-serif border max-w-screen-md rounded-lg shadow">
            <div>Name : {name} </div>
            <div>Email : {email}</div>
            <div>Blogs : {count}</div>
        </div>
    </div>
        <div className="text-center my-10 text-3xl font-bold font-serif">
            Your Blogs
        </div>
    </div>
}
export default Profile; 