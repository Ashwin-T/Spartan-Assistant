import Navbar from '../../../components/navbar/Navbar'
import useMobileState from '../../../hooks/useMobileState'

import './freshmenChat.css'

import { useEffect, useState } from 'react'

const FreshmenChat = () => {

    const [chatStyle, SetChatStyle] = useState('')
    
    useEffect(() => {
        if(window.innerWidth< 768){
            SetChatStyle('column center')
        }
        else{
            SetChatStyle('')
        }
    }, [])

    const Bar = () => {
        return ( 
            <>
                {useMobileState() ? 
                                    
                    null:

                    <div className="sidebar">
                        <Navbar navType = {2}/>
                    </div>
                }
                
            </>
         );
    }

    
    return (  
            <div className="flexbox column center">
                <div className= {"chatContainer flexbox " + chatStyle}>
                    <Bar/>
                    <div className="flexbox column center align-items-center chatContent">
                        <form className = "inputSection">
                            <input type = 'text' placeholder = 'Hey Everyone...'/>
                            <button className = 'buttonInput'>Send</button>
                        </form>
                    </div>

                </div>
            </div>
        );
}
 
export default FreshmenChat;