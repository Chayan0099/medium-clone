import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BlogType } from "./Blog";
import Topbar from "../components/Topbar";
import './style.css';
import Navigator from "../components/Navigation"; 

function Read() {
    return <div>
        <Topbar publish={false} title="" content=""></Topbar>
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
        ).then((res) => {
            setBlog(res.data.blog);  
        }).
            catch((err) => {console.log(err)})
    },[])

    if(blog){ 
        return <div className="flex justify-center">
            <div className="font-serif p-10 max-w-screen-lg">
                <div className="text-5xl ">{blog.title}</div>
                <div className="prose text-xl pl-2" dangerouslySetInnerHTML={{__html:blog.content}}></div>
            </div>
        </div>
    }
    else{
        return <div>
            Can't render blog
        </div>
    }
}
export default Read;  