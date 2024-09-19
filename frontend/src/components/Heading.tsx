import { Link } from "react-router-dom"

function Heading({headname, buttomtext, linkto, clicked }: {headname:string,buttomtext:string, linkto:string, clicked:any}){
    return <div className="font-serif">
        <div className="text-4xl font-bold mb-2">{headname}</div>
        <div className="flex justify-center text-lg gap-1 text-gray-500">
            <div>{buttomtext}</div>
            <Link className="underline hover:pointer hover:text-blue-500"to={`${clicked}`}>{linkto}</Link>
        </div>
    </div>
}

export default Heading; 