import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "@firebase/auth";
import app from "../../tools/Firebase";
import { useEffect, useState } from "react";
import moment from "moment";
import Loading from "../../components/loading/Loading";
import "./home.css";
import { FaDirections } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsFillPeopleFill } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { ImHangouts } from "react-icons/im";
const Home = () => {
    const auth = getAuth(app);
    const [user] = useAuthState(auth);

    const [today, setToday] = useState(moment().format("MMMM Do YYYY, h:mm:ss a"));

    const [loading, setLoading] = useState(false);
    const [linkStyle, setLinkStyle] = useState();

    useEffect(() => {
        setLoading(true);

        setToday(moment().format("dddd") + " " + moment().format("MMM Do"));

        if (window.innerWidth > 786) {
            setLinkStyle("wrap");
        } else {
            setLinkStyle("");
        }

        setLoading(false);
    }, []);

    return (
        <>
            <div>
                {!loading ? (
                    <div>
                        <div className='flexbox row wrap full-size'>
                            <div className='welcome-container'>
                                <h1>Welcome, {user.displayName.split(" ")[0]}.</h1>
                                <h3>Have a great {today.split(" ")[0]}</h3>
                            </div>
                            <div className='right-triangle'></div>
                            <div className='action-container'>
                                <h3>Actions</h3>
                                <div className={"links flexbox column center " + linkStyle}>
                                    <Link className='flexbox homeLinks' to={{ pathname: "/map" }}>
                                        <FaDirections style={{ color: "dodgerblue" }} size={30} />
                                        <h3>Find Your Classes</h3>
                                    </Link>
                                    <Link className='flexbox homeLinks' to={{ pathname: "/resources" }}>
                                        <BsFillPeopleFill style={{ color: "#D7BE69" }} size={30} />
                                        <h3>Resources to Help</h3>
                                    </Link>
                                    <Link className='flexbox homeLinks' to={{ pathname: "/settings" }}>
                                        <FiSettings style={{ color: "grey" }} size={30} />
                                        <h3>Update Settings</h3>
                                    </Link>
                                    {localStorage.getItem("freshmen") === "true" && (
                                        <a className = 'flexbox homeLinks' href = 'https://mail.google.com/chat/u/0/#chat/welcome' target = '_blank' rel="noreferrer">
                                            <ImHangouts style={{ color: "green" }} size={30} />
                                            <h3>Chat With Your Pod</h3>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    // <div className='flexbox column center container'>
                    //     <h1>Welcome, {user.displayName.split(" ")[0]}.</h1>

                    //     <h3>Today is {today}</h3>
                    // <div className={"links flexbox column center " + linkStyle}>
                    //     <Link className='flexbox center homeLinks' to={{ pathname: "/map" }}>
                    //         <FaDirections style={{ color: "dodgerblue" }} size={30} />
                    //         <h3>Find Your Classes</h3>
                    //     </Link>
                    //     <Link className='flexbox center homeLinks' to={{ pathname: "/resources" }}>
                    //         <BsFillPeopleFill style={{ color: "#D7BE69" }} size={30} />
                    //         <h3>Resources to Help</h3>
                    //     </Link>
                    //     <Link className='flexbox center homeLinks' to={{ pathname: "/settings" }}>
                    //         <FiSettings style={{ color: "grey" }} size={30} />
                    //         <h3>Update Settings</h3>
                    //     </Link>
                    //         {localStorage.getItem("freshmen") === "true" && (
                    //             <Link className='flexbox center homeLinks' to={{ pathname: "/settings" }}>
                    //                 <ImHangouts style={{ color: "green" }} size={30} />
                    //                 <h3>Chat With Your Pod</h3>
                    //             </Link>
                    //         )}
                    //     </div>
                    // </div>
                    <Loading />
                )}
            </div>
        </>
    );
};

export default Home;
