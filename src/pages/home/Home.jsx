import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "@firebase/auth";
import app from '../../tools/Firebase'
import {useEffect, useState} from 'react'
import moment from 'moment';
import Loading from '../../components/loading/Loading';
import './home.css';
import {FaDirections} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {BsFillPeopleFill} from 'react-icons/bs';
import {FiSettings} from 'react-icons/fi';
const Home = () => {

    const auth = getAuth(app);
    const [user] = useAuthState(auth);

    const [today, setToday] = useState(moment().format('MMMM Do YYYY, h:mm:ss a'));

    const [loading, setLoading] = useState(false);


    useEffect(() => {

        setLoading(true);

        setToday(moment().format('dddd') + " " + moment().format("MMM Do"));

        setLoading(false);
    }, [])



    return (
        <>
        <div className="flexbox column center">
            {!loading ?
                <div className="flexbox column center container">
                    <h1>Welcome {user.displayName.split(" ")[0]}!</h1>

                    <h3>Today is: {today}</h3>
                    <div className = 'flexbox center'>
                            <Link className = 'flexbox center importantLinks' to = {{pathname: '/map'}}>
                                <FaDirections style = {{color: 'dodgerblue'}} size = {35}/>
                                <h3>Find Your Classes</h3>
                            </Link>
                            <Link className = 'flexbox center importantLinks' to = {{pathname: '/resources'}}>
                                <BsFillPeopleFill style = {{color: 'green'}}size = {35}/>
                                <h3>Resources to Help</h3>
                            </Link>
                            <Link className = 'flexbox center importantLinks' to = {{pathname: '/settings'}}>
                                <FiSettings style = {{color: 'grey'}}size = {35}/>
                                <h3>Update Your Settings</h3>
                            </Link>
                    </div>
                </div>
            : <Loading />}
        </div>
        </>
    );
}


export default Home;

 
