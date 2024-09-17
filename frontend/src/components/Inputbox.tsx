function Inputbox({boxname} :{boxname:string}){
    return <div className="h-screen bg-blue-200 flex justify-center items-center">
     <div className="flex flex-col p-5 justify- ">
        <div className="text-xl">{boxname}</div>
        <input type='text' placeholder="Enter Username"></input> 
    </div>
</div>
}

export default Inputbox; 