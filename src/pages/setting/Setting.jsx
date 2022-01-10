import { useEffect, useState } from 'react';
import './setting.css'

const Settings = ({init}) => {

    //settings have preview of graduation year, and schecule of rooms

    const [gradYear, setGradYear] = useState('');
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('Settings');

    useEffect(() => {
        if(init){
            setTitle('Set Up Your Account');
        }
    } , [init])


    return (
        <>

            <div className="flexbox column center">

                <div className="flexbox column center container">
                    <h1>{title}</h1>
                    <br />
                    <div className = 'settingsForm flexbox column center'>
                        <label>
                            Grad Year: 
                            <input value = {gradYear} type = 'text' onChange = {(e)=> {setGradYear(e.target.value)}}></input>
                        </label>
                        <br />
                        <label>
                            Schedule:
                            <input value = {schedule} type = 'text' onChange = {(e)=> {setSchedule(e.target.value)}}></input>
                        </label>
                    </div>
                </div>

            </div>
           
        </>
    )
}

export default Settings