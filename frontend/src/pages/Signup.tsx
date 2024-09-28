import Inputbox from "../components/Inputbox";
import Heading from "../components/Heading";
import PasswordInput from "../components/PasswordInput";
import Sidecard from "../components/Sidecard";
import { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function Singup() {
    const [password, setPassword] = useState<string>('');
    const [ username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>(''); 
    const navigate = useNavigate(); 

    return <><div className="md:grid grid-cols-2"> 
        <div className="h-screen flex flex-col justify-center items-center">
        <Heading headname="Create New Account" buttomtext="Already have an account?" linkto="Log in" clicked={'/signin'}></Heading>
        <Inputbox boxtype="text" boxname="Username" invalue={username} setInvalue={setUsername}></Inputbox>
        <Inputbox boxtype="text" boxname="Email" invalue={email} setInvalue={setEmail}></Inputbox>
        <PasswordInput password={password} setPassword={setPassword} ></PasswordInput>
        <Button label='Sign Up' onclick={() => {console.log(password)}}></Button>
        </div>
        <div className="hidden md:block md:flex md:justify-center bg-gray-200">
            <Sidecard></Sidecard>
        </div>
    </div>
    </>
} 

export default Singup; 