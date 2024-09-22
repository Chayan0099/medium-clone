import Inputbox from "../components/Inputbox";
import Heading from "../components/Heading";
import PasswordInput from "../components/PasswordInput";
import Sidecard from "../components/Sidecard";

function Singup() {
    return <><div className="md:grid grid-cols-2"> 
        <div className="h-screen flex flex-col justify-center items-center">
        <Heading headname="Create New Account" buttomtext="Already have an account?" linkto="Log in" clicked={'/signin'}></Heading>
        <Inputbox boxtype="text" boxname="Username"></Inputbox>
        <Inputbox boxtype="text" boxname="Email"></Inputbox>
        <PasswordInput></PasswordInput>
        </div>
        <div className="hidden md:block md:flex md:justify-center bg-gray-200">
            <Sidecard></Sidecard>
        </div>
    </div>
    </>
} 

export default Singup; 