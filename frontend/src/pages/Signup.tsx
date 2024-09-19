import Inputbox from "../components/Inputbox";
import Heading from "../components/Heading";
import PasswordInput from "../components/PasswordInput";

function Singup() {
    return <> <div className="h-screen flex flex-col justify-center items-center">
    <Heading headname="Create New Account" buttomtext="Already have an account?" linkto="Log in" clicked={'/signin'}></Heading>
    <Inputbox boxtype="text" boxname="Username"></Inputbox>
    <Inputbox boxtype="text" boxname="Email"></Inputbox>
    <PasswordInput></PasswordInput>
    </div>
    </>
} 

export default Singup; 