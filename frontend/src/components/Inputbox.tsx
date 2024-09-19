function Inputbox({boxname, boxtype} :{boxname:string, boxtype:string}){
    return <div>
     <div className="flex flex-col ">
        <div className="text-2xl font-bold font-serif p-3">{boxname}</div>
        <input className="text-2xl border-2 border-gray-200 rounded-lg p-2 font-serif"type={boxtype} placeholder={`Enter your ${boxname}`}></input> 
    </div>
</div>
}

export default Inputbox; 