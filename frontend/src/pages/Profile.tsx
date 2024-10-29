import { useEffect, useState } from "react";
import axios from "axios";
import Topbar from "../components/Topbar";
import { RenderBlogs } from "./Blog";

function Profile(){
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [count, setCount] = useState<number>(); 

    const token = localStorage.getItem('token');
    useEffect(() => {
        axios.get('https://blog-post.chayansarkar2003.workers.dev./api/v1/user/getinfo',{
            headers:{
                'Authorization':token
            }
        }).then((res) => {
            setCount(res.data.info._count.blogs)
            setName(res.data.info.name);
            setEmail(res.data.info.email);
        })
    },[])
    return <div> 
        <Topbar write={true}></Topbar>
    <div className="flex justify-center mt-10">
        <div className="p-10 text-2xl font-serif border max-w-screen-md rounded-lg shadow">
            <div>Name : {name} </div>
            <div>Email : {email}</div>
            <div>Blogs : {count}</div>
        </div>
    </div>
       <RenderBlogs fetchLink="https://blog-post.chayansarkar2003.workers.dev/api/v1/blog/myblogs"></RenderBlogs>
    </div>
}
export default Profile; 