import { useState } from "react"
type myType = 'password' | 'text'

function PasswordInput(){
    const [boxtype , setBoxtype] = useState<myType>('password')

    return  <div>
     <div className="flex flex-col ">
        <div className="text-2xl font-bold font-serif p-3">Password</div>
        <input id="myInput" className="text-2xl border-2 border-gray-200 rounded-lg p-2 font-serif" type={`${boxtype}`} placeholder="Enter your password"></input>
        <div className="flex gap-3 font-semibold mt-3 ml-1 font-serif"> 
        <input type='checkbox' className="" onClick={() => {
            if(boxtype === 'password') {
                setBoxtype('text') 
            } else {
                setBoxtype('password')
            }
        }}></input> 
        <div>Show Password</div>
        </div>
    </div>
</div> 
}

export default PasswordInput; 