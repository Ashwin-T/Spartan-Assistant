import Navbar from '../../../components/navbar/Navbar'
import useMobileState from '../../../hooks/useMobileState'

import './freshmenChat.css'

import {GrSend} from 'react-icons/gr'


const FreshmenChat = () => {

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
                <div className="chatContainer flexbox">
                    <Bar/>
                    <div className="flexbox column align-items-center chatContent">
                        <div className = "flexbox center space-between">
                            <input type = 'text' />
                            {/* <GrSend /> */}
                            <button>Submit</button>
                        </div>
                    </div>

                </div>
            </div>
        );
}
 
export default FreshmenChat;