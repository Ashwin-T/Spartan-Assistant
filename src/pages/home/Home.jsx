import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "@firebase/auth";
import app from '../../tools/Firebase'
import {useEffect, useState} from 'react'
import moment from 'moment';
import Loading from '../../components/loading/Loading';
import Setting from '../setting/Setting';
import { doc, getDoc, getFirestore } from "firebase/firestore";

// import axios from 'axios';
import './home.css';

const Home = () => {

    const auth = getAuth(app);
    const [user] = useAuthState(auth);

    const [today, setToday] = useState(moment().format('MMMM Do YYYY, h:mm:ss a'));

    const [loading, setLoading] = useState(false);
    // const [quote, setQuote] = useState('');
    const [dontRedirect, setDontRedirect] = useState(true);


    useEffect(() => {

        setLoading(true);

        setToday(moment().format('dddd') + " " + moment().format("MMM Do"));

        // const setApiQuote = async () => {
        //     const dataArray = await axios.get(`https://type.fit/api/quotes`)
        //     const randomIndex = Math.floor(Math.random() * dataArray.data.length);
        //     let author;
        //     if(dataArray.data[randomIndex].author === null){
        //         author = "Anonymous";
        //     }
        //     else{
        //         author = dataArray.data[randomIndex].author;
        //     }
        //     setQuote("'" + dataArray.data[randomIndex].text +  "' -" + author);
        // }
        // setApiQuote();


        const db = getFirestore();

        setLoading(true);

        const auth = getAuth();

        const checkData = async () => {
            const docRef = doc(db, "users", auth.currentUser.uid);
            const docSnap = await getDoc(docRef);

            console.log(getAuth().currentUser.uid)

            if (docSnap.exists()) {
                setDontRedirect(true);
            } else {
            // doc.data() will be undefined in this case
            setDontRedirect(false);
            }
        }

        checkData();

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

        loading ? <Loading /> : !dontRedirect ? <Setting init = {true}/> : 
        
        <div className="flexbox column center">

            {!loading ?
                <div className="flexbox column center container">
                    <h1>Welcome {user.displayName.split(" ")[0]}!</h1>

                    <h3>Today is: {today}</h3>
                    {/* <h4>Quote of the Hour:</h4>
                    <h5>{quote}</h5> */}

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
    );
}
 
export default Home;