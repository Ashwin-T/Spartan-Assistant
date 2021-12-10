import './freshmenChat.css'
import Navbar from '../../../components/navbar/Navbar'
import useMobileState from '../../../hooks/useMobileState'

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
                <div className="chatContainer">
                    <div className="chatContent">
                        <Bar />
                    </div>
                </div>
            </div>
        );
}
 
export default FreshmenChat;