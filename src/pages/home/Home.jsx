import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "@firebase/auth";
import app from '../../tools/Firebase'
import {useEffect, useState} from 'react'
import moment from 'moment';
import Loading from '../../components/loading/Loading';
import './home.css';

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

    const links = [
        {
            name: 'Periods.io',
            link: 'https://periods.io',
            description: 'Manage your time more effectively by tracking the remaining time in class',
            image: 'images/periodsioLogo.png'
        },
        {
            name: 'Mvhs.io',
            link: 'https://mvhs.io',
            description: 'Mvhs.io is a versitle app for MVHS staff and students.',
            image: 'images/mvhsioLogo.png'
        },
        {
            name: 'MVHS Website',
            link: 'https://mvhs.mvla.net',
            description: 'MVHS Offical Website',
            image: 'images/mvhslogo.png'
        }
    ]


    return (
        <>
        <div className="flexbox column center">
            {!loading ?
                <div className="flexbox column center container">
                    <h1>Welcome {user.displayName.split(" ")[0]}!</h1>

                    <h3>Today is: {today}</h3>
                    <div className = 'flexbox center homeLinks'>
                            {links.map((link, index) => {
                                return (
                                    <a key = {index} className="flexbox align-items-center importantLinks" href={link.link} target="_blank" rel="noopener noreferrer">
                                        <img src={link.image} alt={link.name} /> 
                                        <h3>{link.name}</h3>
                                    </a>
                                )
                            })}
                    </div>
                </div>
            : <Loading />}
        </div>
        </>
    );
}


export default Home;

 
