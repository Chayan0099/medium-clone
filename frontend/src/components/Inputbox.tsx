function Inputbox({boxname, boxtype, invalue, setInvalue} :{boxname:string, boxtype:string, invalue:string, setInvalue:(value:string) => (void)}){
    return <div>
     <div className="flex flex-col ">
        <div className="text-2xl font-bold font-serif p-3">{boxname}</div>
        <input className="text-2xl border-2 border-gray-200 rounded-lg p-2 font-serif"type={boxtype} value={invalue} onChange={(e) => {
            setInvalue(e.target.value)
        }} placeholder={`Enter your ${boxname}`}></input> 
    </div>
</div>
}

export default Inputbox; 