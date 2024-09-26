import { Link } from "react-router-dom"

interface myProp {
    publish : boolean
}

const Topbar : React.FC<myProp> = ({publish}) =>
{
    return <div className="flex justify-between py-5 px-16 border-b border-black items-center">
        <button onClick={() =>{<Link to='/'></Link>}} className="font-bold text-4xl font-serif">BlogPost</button>
        <div className="flex gap-10 text-lg">
            <div>
                {publish === true? <button className="bg-green-500 hover:bg-green-600 font-serif px-4 py-1 rounded-full">
                    Publish
                </button> : <button className="font-serif px-4 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg"> Write </button>}
            </div>
            <div>
                <button className="font-serif py-1 px-3 rounded-full bg-gray-500 ">U</button>
            </div>
        </div>
    </div>
}

export default Topbar; 