import {Link} from 'react-router-dom'
import { getAuth } from "@firebase/auth";
import { MdQuestionAnswer, MdSettings } from "react-icons/md";
import {AiOutlineMenuUnfold, AiOutlineMenuFold} from 'react-icons/ai'
import {FaHandsHelping} from 'react-icons/fa'
import {SiGooglemaps} from 'react-icons/si'
import {useEffect, useState} from 'react'
import { doc, getDoc, getFirestore} from "firebase/firestore";

import './navbar.css' 

const Navbar = ({navType}) => {

    const [isOpen, setIsOpen] = useState(false)
    const [styleType, setStyleType] = useState('default')
    const [type, setType] = useState(navType)

    const [freshmen, setFreshmen] = useState(false)

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

    useEffect(() => {
        
        const getData = async() => { 
            const docRef = doc(getFirestore(), "users", getAuth().currentUser.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                if(docSnap.data().gradYear === "2025"){
                    setFreshmen(true)
                    localStorage.setItem('freshmen', true)
                }
                else{
                    setFreshmen(false)
                    localStorage.setItem('freshmen', false)
                }
            } else {
            // doc.data() will be undefined in this case
            }
        }

        getData()
    } , [])

    const content = [
        {
            name: 'Map',
            icon: <SiGooglemaps size = {35}/>,
            link: '/map'
        },
        {
            name: 'Resources',
            icon: <FaHandsHelping size = {35}/>,
            link: '/resources',
        },
        {
            name: 'Settings',
            icon: <MdSettings size = {35}/>,
            link: '/settings'
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

                        {freshmen && <a href = 'https://mail.google.com/chat/u/0/#chat/welcome' target = '_blank' rel="noreferrer"><MdQuestionAnswer size = {35}/></a>}
                        
                        <Link className = "link" to = "/"><img className = 'profile' alt = 'profile' src={`${getAuth().currentUser.photoURL}`} /></Link>
                        
                        {isOpen && <button className = "link" onClick={handleOpen}><AiOutlineMenuFold size = {35}/></button>}
                    </div>

                : <div className= 'dropdown' onClick={handleOpen}>
                    
                    <AiOutlineMenuUnfold size = {35}/>
                    
                </div>}

                
            </nav>
        </div>
    );
}
 
export default Navbar;