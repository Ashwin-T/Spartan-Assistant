import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "@firebase/auth";
import {app} from "../../tools/Firebase";
import { useEffect, useState } from "react";
import moment from "moment";
import Loading from "../../components/loading/Loading";
import "./home.css";
import { FaDirections } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsFillPeopleFill, BsFillChatTextFill} from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import AddToMobile from "../../components/addToMobile/AddToMobile";

import * as FunWordsJSON from "../../data/FunWords.json";

const Home = () => {
    const auth = getAuth(app);
    const [user] = useAuthState(auth);

    const [today, setToday] = useState(moment().format("dddd") + " " + moment().format("MMM Do"));

    const [loading, setLoading] = useState(false);
    const [linkStyle, setLinkStyle] = useState();

    const [hasAdded, setHasAdded] = useState(localStorage.getItem("hasAdded") === "true");

    const [funWord, setFunWord] = useState("great");

    useEffect(() => {
        setLoading(true);
        const getData = async () => {
            if (window.innerWidth > 786) {
                setLinkStyle("wrap");
            } else {
                setLinkStyle("");
            }

            const day = today.split(" ")[0]

            if(day === "Saturday" || day === "Sunday") {
                setFunWord(FunWordsJSON.S[Math.floor(Math.random() * FunWordsJSON.S.length)]);
            }
            if(day === "Monday") { 
                setFunWord(FunWordsJSON.M[Math.floor(Math.random() * FunWordsJSON.M.length)]);
            }
            if(day === "Tuesday" || day === "Thursday") {
                setFunWord(FunWordsJSON.T[Math.floor(Math.random() * FunWordsJSON.T.length)]);
            }
            if(day === "Wednesday") {
                setFunWord(FunWordsJSON.W[Math.floor(Math.random() * FunWordsJSON.W.length)]);
            }
            if(day == "Friday") {
                setFunWord(FunWordsJSON.F[Math.floor(Math.random() * FunWordsJSON.F.length)]);
            }
            setLoading(false);
        }

        getData();

    }, []);

    return (
        <>
            {!loading ? (
                    <div className='flexbox row wrap full-size'>
                        <div className='welcome-container'>
                            <h1>Welcome {user.displayName.split(" ")[0]}</h1>
                            <h3>Have a {funWord} {today.split(" ")[0]}</h3>
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
                                    <a className = 'flexbox homeLinks' href = 'https://mvhs-orientation.netlify.app/' target = '_blank' rel="noreferrer">
                                        <BsFillChatTextFill style={{ color: "green" }} size={30} />
                                        <h3>Chat With Your Pod</h3>
                                    </a>
                                )}
                            </div>
                        </div>
                        {!hasAdded && window.innerWidth <= 786 &&
                            <div style = {{width: '100%'}} className="flexbox column center">
                                <AddToMobile setFunction = {setHasAdded} />
                            </div>
                        }
                         
                    </div>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default Home;
