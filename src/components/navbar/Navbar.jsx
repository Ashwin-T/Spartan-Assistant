import {Link} from 'react-router-dom'
import { getAuth } from "@firebase/auth";
import app from '../../tools/Firebase'

import { MdQuestionAnswer } from "react-icons/md";
import { FaMapMarkerAlt , FaQuestionCircle} from "react-icons/fa";
import {IoMdSettings} from 'react-icons/io'
import {AiOutlineMenuUnfold, AiOutlineMenuFold} from 'react-icons/ai'
import {useState} from 'react'
import './navbar.css'

const Navbar = ({navType}) => {

    const [isOpen, setIsOpen] = useState(false)
    const [styleType, setStyleType] = useState('default')
    const [type, setType] = useState(navType)

    let temp = isOpen

    const handleOpen = () => {
        temp = !isOpen
        setIsOpen(temp)

        if(temp){
            setStyleType('open')  
            setType(1);       
        }
        else{
            setStyleType('default')
            setType(navType);       
        }
    }

    const content = [
        {
            name: 'Map',
            icon: <FaMapMarkerAlt size = {35}/>,
            link: '/map'
        },
        {
            name: 'Chat',
            icon: <MdQuestionAnswer size = {35}/>,
            link: '/chat',
        },
        {
            name: 'Settings',
            icon: <IoMdSettings size = {35}/>,
            link: '/settings'
        },
        {
            name: 'Help',
            icon: <FaQuestionCircle size = {35}/>,
            link: '/help'
        }
        
    ]



    return (  
        <div className="flexbox column center">
            <nav className= {styleType}>
        
                <Link to = "/"><img alt = 'logo' src = 'images/logoNav.png' /></Link>

                {type === 1 ? 
                
                    <div>
                        {
                            content.map((item, index) => {
                                return(
                                    <Link key = {index} className = "link" to = {item.link}>{item.icon}</Link>
                                );
                            })
                        }
                        
                        <Link className = "link" to = "/"><img className = 'profile' alt = 'profile' src={`${getAuth().currentUser.photoURL}`} /></Link>
                        
                        {isOpen && <button className = "link"  onClick={handleOpen}><AiOutlineMenuFold size = {35}/></button>}
                    </div>

                : <div className= 'dropdown' onClick={handleOpen}>
                    
                    <AiOutlineMenuUnfold size = {35}/>
                    
                </div>}

                

            </nav>
        </div>
    );
}
 
export default Navbar;