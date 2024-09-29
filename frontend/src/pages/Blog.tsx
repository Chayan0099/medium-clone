import axios from "axios";
import Topbar from "../components/Topbar";
import { useNavigate } from "react-router-dom";
type blogtype = {
    title:string,
    content:string
}

async function Blog (){
    const navigate = useNavigate(); 
    const token = localStorage.getItem('token'); 
    const {data} = await axios.get('https://blog-post.chayansarkar2003.workers.dev/api/v1/blog', {
        headers:{
            authorization: token
        }
    })
    const blogs = data.blogs; 
    if(!token) {
        navigate('/signup')
    } else { 
        return <div>
        <Topbar publish={false}></Topbar>
        <div>
            {blogs.map((blog:blogtype) => {<SingleBlog title={blog.title} content={blog.content}></SingleBlog>})}
        </div>
    </div>
    }
}

function SingleBlog({title, content}:{title:string, content:string}) {
    return <div>
        <div>{title}</div>
        <div>{content}</div>
    </div>
}

export default Blog; 