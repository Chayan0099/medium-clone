import Heading from "../components/Heading";
import Inputbox from "../components/Inputbox";
import PasswordInput from "../components/PasswordInput";

function Signin() {
    return <div>
      <div className="h-screen flex flex-col justify-center items-center">
    <Heading headname="Log In Your Account" buttomtext="Don't have an account?" linkto="Sign Up" clicked={'/signup'}></Heading>
    <Inputbox boxtype="text" boxname="Email"></Inputbox>
    <PasswordInput></PasswordInput>       
   </div>
   </div>
}

export default Signin; 