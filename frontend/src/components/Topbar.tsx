import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

interface TopbarProp {
    publish : boolean
    title: string
    content: string 
}

const Topbar : React.FC<TopbarProp> = ({publish, title, content}) =>
{   
    const [ initial, setInitial] = useState<string>()
    const token = localStorage.getItem('token');
    useEffect(() =>{
              axios.get('https://blog-post.chayansarkar2003.workers.dev/api/v1/user/getinfo',{
                headers:{
                    'Authorization':token
                }
            }).then((res) => {
                setInitial(res.data.info.name)
            }).catch((err) => {
                console.log(err)
            })
        
    })
    const navigate = useNavigate(); 
    return <div className="flex justify-between py-5 px-16 border-b border-black items-center">
        <button onClick={() =>{navigate('/')}} className="font-bold text-4xl font-serif">BlogPost</button>
        <div className="flex gap-10 text-lg">
            <div>
                {publish === true? <button onClick={async () => {  
                    await axios.post('https://blog-post.chayansarkar2003.workers.dev/api/v1/blog/createBlog',{
                       title: title,
                       content: content
                    },
                    {
                        headers:{
                            'Authorization': token
                        }
                    })
                    console.log('published')
                }} className="bg-green-500 hover:bg-green-600 font-serif px-4 py-1 rounded-full">
                    Publish
                </button> : <button onClick={() =>{navigate('/new-blog')}} className="font-serif px-4 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg"> Write </button>}
            </div>
            <div>
                <button className="font-serif py-1 px-3 rounded-full bg-gray-500 " onClick={() =>{
                    navigate('/profile'); 
                }}>{initial? initial[0].toUpperCase() : "A"}</button>
            </div>
        </div>
    </div>
}

export default Topbar; 