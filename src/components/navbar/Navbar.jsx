import {Link} from 'react-router-dom'
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "@firebase/auth";
import app from '../../tools/Firebase'

import { MdPermContactCalendar } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import {IoMdSettings} from 'react-icons/io'
import {FaQuestionCircle} from 'react-icons/fa'

import './navbar.css'

const Navbar = () => {

    const auth = getAuth(app);
    const [user] = useAuthState(auth);

    return (  
        <div className="flexbox center">
            <nav>
            
            <Link to = "/"><img alt = 'logo' src = 'images/logoNav.png' /></Link>
                <div>
                    <Link className = "link" to = "/map"><FaMapMarkerAlt size = {35}/></Link>
                    <Link className = "link" to = "/contact"><MdPermContactCalendar  size = {35}/></Link>
                    <Link className = "link" to = "/settings"><IoMdSettings  size = {35}/></Link>
                    <Link className = "link" to = "/help"><FaQuestionCircle size = {35}/></Link>
                    <Link className = "link" to = "/"><img className = 'profile' alt = 'profile' src={`${user.photoURL}`} /></Link>
                </div>

            </nav>
        </div>
    );
}
 
export default Navbar;