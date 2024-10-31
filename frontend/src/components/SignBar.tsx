import { useNavigate } from "react-router-dom"

export default function SignBar() {
    const navigate = useNavigate(); 
   return <div className="flex items-center border-b border-black gap-5 text-2xl justify-center p-3 font-mono bg-gray-300">
        <div>
            Signup to read and write blogs!
        </div>
        <button className='bg-white py-1 px-2 rounded-lg border-2 border-black hover:bg-gray-200'onClick={() => {
            navigate('/signup')
        }}>Signup</button>
    </div>
}