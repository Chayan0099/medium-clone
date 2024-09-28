import { MouseEventHandler } from "react"

function Button({onclick, label} : {onclick: MouseEventHandler, label: string}) {
    return <div>
        <button className='bg-gray-500 text-3xl font-serif mt-5 py-3 px-24 rounded-lg hover:bg-gray-600 click:text-white active:bg-gray-700 active:text-white active:siz' onClick={onclick} >{label}</button>
    </div>
}

export default Button