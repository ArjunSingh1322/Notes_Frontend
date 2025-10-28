import { createContext,useState } from "react";

export const NotesContext = createContext();

const Context=({children})=>{

let [username,setUsername] = useState("")
    return(
       <NotesContext.Provider value={{username,setUsername}}>
{children}
       </NotesContext.Provider>
    )
}



export default Context
