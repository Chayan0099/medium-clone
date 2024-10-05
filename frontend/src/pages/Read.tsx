import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BlogType } from "./Blog";
import Topbar from "../components/Topbar";

function Read() {
    return <div>
        <Topbar publish={false}></Topbar>
        <Render></Render>
    </div>
}

function Render(){
    const [blog, setBlog] = useState<BlogType>(); 
    const params = useParams();
    const token = localStorage.getItem('token');
    useEffect(() =>{
        axios.get(`https://blog-post.chayansarkar2003.workers.dev/api/v1/blog/${params.id}`,
            {
                headers:{
                    'Authorization':token
                }
            }
        ).then((res) => {setBlog(res.data.blog)}).catch((err) => {console.log(err)})
    },[])

    if(blog){
        return <div>
            <div>{blog.title}</div>
            <div>{blog.content}</div>
        </div>
    }
    else{
        return <div>
            Can't render blog
        </div>
    }
}
export default Read;  