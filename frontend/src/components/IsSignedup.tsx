export default function IsSignedup(){
    const token = localStorage.getItem('token');
    if(!token || token == ""){
        return false;
    }
    else {
        return true; 
    }
}