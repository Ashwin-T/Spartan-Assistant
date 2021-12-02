import {Link} from 'react-router-dom'
import { BsFillChatRightDotsFill } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import {FaUserCircle} from "react-icons/fa";

import './navbar.css'
const Navbar = () => {
    return (  
        <div className="flexbox center">
            <nav>
            
            <Link to = "/"><img alt = 'logo' src = 'images/logoNav.png' /></Link>
                <div>
                    <Link className = "link" to = "/map"><FaMapMarkerAlt size = {35}/></Link>
                    <Link className = "link" to = "/chat"><BsFillChatRightDotsFill  size = {35}/></Link>
                    <Link className = "link" to = "/user"><FaUserCircle  size = {35}/></Link>
                </div>


            </nav>
        </div>
    );
}
 
export default Navbar;