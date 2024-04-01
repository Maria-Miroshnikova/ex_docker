import {useEffect, useState} from "react";
import App_3 from "./App_3";


const Pages = () => {

    const [serverIP, setServerIP] = useState("localhost::8000")

    const [isIpEntered, setIsIpEntered] = useState(false)

    const handleSubmit = (e: any) => {
        e.preventDefault()
        setServerIP(e.target.value)
        console.log("serverIP: " + e.target.value)
        setIsIpEntered(true)
    }

    //TODO: как отслеживать нажатие кнопки???? и ввод

    if (!isIpEntered)
        return(<div>
            <div>Default backend url: "localhost::8000". Enter it if backend runs locally.</div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type="text" placeholder="Enter ClasterIP for backend"
                       onChange={(e) => { console.log("changed: " + e.target.value)
                           setServerIP(e.target.value)}}
                />
                <button type="submit">ServerIP

                </button>
            </form>
        </div>)
    else
        return(<div>
            <App_3 serverIP={serverIP}/>
        </div>)
}

export default Pages;