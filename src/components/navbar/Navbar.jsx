import {Link} from 'react-router-dom'
import { getAuth } from "@firebase/auth";
import { MdQuestionAnswer, MdSettings } from "react-icons/md";
import {AiOutlineMenuUnfold} from 'react-icons/ai'
import {FaHandsHelping} from 'react-icons/fa'
import {SiGooglemaps} from 'react-icons/si'
import {useLayoutEffect, useState} from 'react'
import { doc, getDoc, getFirestore} from "firebase/firestore";

import Popover from '@mui/material/Popover';

import './navbar.css' 

const Navbar = ({navType}) => {

    const [styleType, setStyleType] = useState('default')
    const [type, setType] = useState(navType)

    const [freshmen, setFreshmen] = useState(false)


    useLayoutEffect(() => {
        
        const getData = async() => { 
            const docRef = doc(getFirestore(), "users", getAuth().currentUser.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                if(docSnap.data().gradYear === "2025"){
                    setFreshmen(true)
                    localStorage.setItem('freshmen', 'true')
                }
                else{
                    setFreshmen(false)
                    localStorage.setItem('freshmen', 'false')
                }
            } 
            else {
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

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false)

    const handleOpen = (e) => {
        setOpen(true);
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false)
    };


    return (  
        <div className="nav-wrapper">
            <nav className= {styleType}>
                <Link to = "/" className="home-link"><img alt = 'logo' src = 'images/logoNav.png' /></Link>
                <div className="icon-wrapper">
                        {
                            content.map((item, index) => {
                                return(
                                    <Link key = {index} className = "link" to = {item.link}>{item.icon}</Link>
                                );
                            })
                        }

                        {freshmen && <a href = 'https://mail.google.com/chat/u/0/#chat/welcome' target = '_blank' rel="noreferrer"><MdQuestionAnswer size = {35}/></a>}
                        
                        <button onClick={handleOpen} ><img className = 'profile' alt = 'profile' src={getAuth().currentUser.photoURL} /></button>
                        
                        <Popover
                        open={open}
                        anchorEl = {anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'Center',
                        }}
                        >
                        <button onClick={handleClose} className = 'popover-close'>Sign Out</button>
                        </Popover>
                    </div>        
            </nav>
        </div>
    );
}
 
export default Navbar;