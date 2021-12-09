import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "@firebase/auth";
import app from '../../tools/Firebase'
import {useEffect, useState} from 'react'
import moment from 'moment';
import Loading from '../../components/loading/Loading';
import axios from 'axios';


import './home.css';

const Home = () => {

    const auth = getAuth(app);
    const [user] = useAuthState(auth);

    const [today, setToday] = useState(moment().format('MMMM Do YYYY, h:mm:ss a'));

    const [quote, setQuote] = useState('');

    useEffect(() => {
        setToday(moment().format('dddd') + " " + moment().format("MMM Do"));

        const setApiQuote = async () => {
            console.log("Getting quote...");
            const dataArray = await axios.get(`https://type.fit/api/quotes`)
            const randomIndex = Math.floor(Math.random() * dataArray.data.length);
            let author;
            if(dataArray.data[randomIndex].author === null){
                author = "Anonymous";
            }
            else{
                author = dataArray.data[randomIndex].author;
            }
            setQuote("'" + dataArray.data[randomIndex].text +  "' -" + author);
        }
        setApiQuote();

    }, [])

    return (
        
        <div className="flexbox column center">

            {(quote !== '') ?
            <div className="flexbox column center homeContainer">
                <h1>Welcome {user.displayName.split(" ")[0]}!</h1>

                <h2>Today is: {today}</h2>
                <h3>Quote of the hour:</h3>
                <h2>{quote}</h2>
    
                
            </div>

            : <Loading />}

            
        </div>
    );
}
 
export default Home;