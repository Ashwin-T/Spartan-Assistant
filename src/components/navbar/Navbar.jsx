import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "@firebase/auth";
import { MdQuestionAnswer, MdSettings } from "react-icons/md";
import { FaHandsHelping } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import { useLayoutEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";

import Popover from "@mui/material/Popover";

import * as gradData from "../../data/GraduationData.json";

import "./navbar.css";

const Navbar = ({ navType }) => {
    const [freshmen, setFreshmen] = useState(false);
    let navigate = useNavigate();

    useLayoutEffect(() => {
        const getData = async () => {
            const docRef = doc(getFirestore(), "users", getAuth().currentUser.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log(docSnap.data().gradYear + " " + gradData.freshmanGraduationYear);
                if (docSnap.data().gradYear === gradData.freshmanGraduationYear) {
                    setFreshmen(true);
                    localStorage.setItem("freshmen", "true");
                } else {
                    setFreshmen(false);
                    localStorage.setItem("freshmen", "false");
                }
            } else {
                // doc.data() will be undefined in this case
            }
        };

        getData();
    }, []);

    const content = [
        {
            name: "Map",
            icon: <SiGooglemaps size={35} />,
            link: "/map",
        },
        {
            name: "Resources",
            icon: <FaHandsHelping size={35} />,
            link: "/resources",
        },
        {
            name: "Settings",
            icon: <MdSettings size={35} />,
            link: "/settings",
        },
    ];

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    const handleOpen = (e) => {
        setOpen(true);
        setAnchorEl(e.currentTarget);
    };
    const handleSignOut = () => {
        navigate("/");
        getAuth().signOut();
    };
    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    return (
        <div className='nav-wrapper'>
            <nav className='default'>
                <Link to='/' className='home-link'>
                    <img alt='logo' src='images/logoNav.png' />
                </Link>
                <div className='icon-wrapper'>
                    {content.map((item, index) => {
                        return (
                            <Link key={index} className='link' to={item.link}>
                                {item.icon}
                            </Link>
                        );
                    })}

                    {freshmen && (
                        <a href='https://mvhs-orientation-test.netlify.app' target='_blank' rel='noreferrer'>
                            <MdQuestionAnswer size={35} />
                        </a>
                    )}
                    <Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "Bottom",
                            horizontal: "Right",
                        }}>
                        <button onClick={handleSignOut} className='popover-close'>
                            Sign Out
                        </button>
                    </Popover>
                    <button onClick={handleOpen} className='hello-world2'>
                        <img className='profile' alt='profile' src={getAuth().currentUser.photoURL} />
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
