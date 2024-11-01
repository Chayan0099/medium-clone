import { useNavigate } from "react-router-dom";
import Button from "./Button";

export function IsSignedup(){
    const token = localStorage.getItem('token');
    if(!token || token == ""){
        return false;
    }
    else {
        return true; 
    }
}
export function NotSigned() {
    const navigate = useNavigate();
        return <div className="flex bg-red-700 items-center flex-col h-screen justify-center">
            <div className="text-6xl font-mono">Sign Up or Login first!</div>
            <Button onclick={() => {navigate('/signup')}} label="Sign Up"></Button>
            <Button onclick={() => {navigate('/signin')}} label="Sign In"></Button>
        </div>
}