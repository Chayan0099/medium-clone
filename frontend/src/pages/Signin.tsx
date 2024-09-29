import { useState } from "react";
import Heading from "../components/Heading";
import Inputbox from "../components/Inputbox";
import PasswordInput from "../components/PasswordInput";
import Sidecard from "../components/Sidecard";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signin() {
    const [password, setPassword] = useState<string>('');
    const [ email, setEmail ] = useState<string>(''); 
    const navigate = useNavigate(); 

    return <div className="md:grid grid-cols-2">
      <div className="h-screen flex flex-col justify-center items-center">
    <Heading headname="Log In Your Account" buttomtext="Don't have an account?" linkto="Sign Up" clicked={'/signup'}></Heading>
    <Inputbox invalue={email} setInvalue={setEmail} boxtype="text" boxname="Email"></Inputbox>
    <PasswordInput password={password} setPassword={setPassword}></PasswordInput> 
    <Button label='Sign In' onclick={async() => {
      try{
        const {data} = await axios.post('https://blog-post.chayansarkar2003.workers.dev/api/v1/user/signin', 
        {
          email: email,
          password: password
        }
      )
        localStorage.setItem('token', data.token); 
        navigate('../');
      } catch(e) {
        alert('Wrong Credentials')
      }

    }}></Button>      
   </div>
   <div className="hidden md:block md:flex md:justify-center bg-gray-200">
            <Sidecard></Sidecard>
        </div>
   </div>
}

export default Signin; 