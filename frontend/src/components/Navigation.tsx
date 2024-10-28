import { useNavigate } from "react-router-dom";

export default function Navigator(){
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    if(!token || token === ""){
        navigate('/signup'); 
    }
}