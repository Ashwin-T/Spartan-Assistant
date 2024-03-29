import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { FaGraduationCap } from "react-icons/fa";
import { doc, getFirestore, setDoc, getDoc } from "firebase/firestore";
// import {motion} from "framer-motion";
import Alert from "@mui/material/Alert";

import "./setting.css";

import * as roomData from "../../data/Rooms.json";
import * as gradData from "../../data/GraduationData.json";

import Loading from "../../components/loading/Loading";
import Navbar from "../../components/navbar/Navbar";

const Settings = ({ init, setDontRedirect  }) => {
    //settings have preview of graduation year, and schecule of rooms

    // const [showSuccess, setShowSuccess] = useState(false);

    const [gradYear, setGradYear] = useState("");

    const [periodOne, setPeriodOne] = useState("");
    const [periodTwo, setPeriodTwo] = useState("");
    const [periodThree, setPeriodThree] = useState("");
    const [periodFour, setPeriodFour] = useState("");
    const [periodFive, setPeriodFive] = useState("");
    const [periodSix, setPeriodSix] = useState("");
    const [periodSeven, setPeriodSeven] = useState("");

    const [periodOneStyle, setPeriodOneStyle] = useState("");
    const [periodTwoStyle, setPeriodTwoStyle] = useState("");
    const [periodThreeStyle, setPeriodThreeStyle] = useState("");
    const [periodFourStyle, setPeriodFourStyle] = useState("");
    const [periodFiveStyle, setPeriodFiveStyle] = useState("");
    const [periodSixStyle, setPeriodSixStyle] = useState("");
    const [periodSevenStyle, setPeriodSevenStyle] = useState("");

    const [gradYearStyle, setGradYearStyle] = useState("");

    const [title, setTitle] = useState("Settings");
    const styleName = init ? "init" : "";

    const db = getFirestore();

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [loading, setLoading] = useState(true);

    const [studentID, setStudentID] = useState("");
    const [studentIDStyle, setStudentIDStyle] = useState("");

    const handleError = (message) => {
        setError(true);
        setErrorMessage(message);
    };

    useEffect(() => {
        setLoading(true);
        if (init) {
            setTitle("Let's Set Up");
        }

        const getData = async () => {
            const docRef = doc(db, "users", getAuth().currentUser.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setGradYear(docSnap.data()?.gradYear);
                setStudentID(docSnap.data()?.studentID);
                setPeriodOne(docSnap.data()?.periods[0]);
                setPeriodTwo(docSnap.data()?.periods[1]);
                setPeriodThree(docSnap.data()?.periods[2]);
                setPeriodFour(docSnap.data()?.periods[3]);
                setPeriodFive(docSnap.data()?.periods[4]);
                setPeriodSix(docSnap.data()?.periods[5]);
                setPeriodSeven(docSnap.data()?.periods[6]);

                localStorage.setItem("periods", JSON.stringify(docSnap.data().periods));
            } else {
                // doc.data() will be undefined in this case
            }
            setLoading(false);
        };
        
        getData();

    }, [init, db]);

    const handleRoomCheck = (roomNumber) => {
        return roomData.features.some((room) => room.properties.name === roomNumber || room.properties.name2 === roomNumber);
    };

    const submit = async () => {
        setLoading(true);
        const periods = [periodOne, periodTwo, periodThree, periodFour, periodFive, periodSix, periodSeven];
        await setDoc(doc(db, "users", getAuth().currentUser.uid), {
            name: getAuth().currentUser.displayName,
            periods: periods,
            gradYear: "" + Math.floor(gradYear),
            studentID: studentID,
        });
        localStorage.setItem("allow", "true");
        localStorage.setItem("periods", JSON.stringify([...periods]));

        const isFreshmen = gradYear === gradData.freshmanGraduationYear ? true : false;
        localStorage.setItem("freshmen", isFreshmen);
        setError(false);
        // navigate("/");
        setLoading(false);
        
        if (init) {
            setDontRedirect(true)
        }
    };

    const changePage = () => {

        setPeriodOneStyle("");
        setPeriodTwoStyle("");
        setPeriodThreeStyle("");
        setPeriodFourStyle("");
        setPeriodFiveStyle("");
        setPeriodSixStyle("");
        setPeriodSevenStyle("");
        setGradYearStyle("");
        setStudentIDStyle("");

        if (periodOne === "" || periodTwo === "" || periodThree === "" || periodFour === "" || periodFive === "" || periodSix === "" || periodSeven === "") {
            handleError("Please fill out all periods");
            if(periodOne === ""){
                setPeriodOneStyle("errorUnderline");
            }
            if(periodTwo === ""){
                setPeriodTwoStyle("errorUnderline");
            }
            if(periodThree === ""){
                setPeriodThreeStyle("errorUnderline");
            }
            if(periodFour === ""){
                setPeriodFourStyle("errorUnderline");
            }
            if(periodFive === ""){
                setPeriodFiveStyle("errorUnderline");
            }
            if(periodSix === ""){
                setPeriodSixStyle("errorUnderline");
            }
            if(periodSeven === ""){
                setPeriodSevenStyle("errorUnderline");
            }
            if(gradYear === ""){
                setGradYearStyle("errorUnderline");
            }
            if(studentID === "" || studentID.length !== 9 || !studentID.includes("1000")){
                setStudentIDStyle("errorUnderline");
            }
            return;
        }
        if (!handleRoomCheck(periodOne) || !handleRoomCheck(periodTwo) || !handleRoomCheck(periodThree) || !handleRoomCheck(periodFour) || !handleRoomCheck(periodFive) || !handleRoomCheck(periodSix) || !handleRoomCheck(periodSeven)) {
            handleError("Please enter a valid room number");

            if(!handleRoomCheck(periodOne)){
                setPeriodOneStyle("errorUnderline");
            }
            if(!handleRoomCheck(periodTwo)){
                setPeriodTwoStyle("errorUnderline");
            }
            if(!handleRoomCheck(periodThree)){
                setPeriodThreeStyle("errorUnderline");
            }
            if(!handleRoomCheck(periodFour)){
                setPeriodFourStyle("errorUnderline");
            }
            if(!handleRoomCheck(periodFive)){
                setPeriodFiveStyle("errorUnderline");
            }
            if(!handleRoomCheck(periodSix)){
                setPeriodSixStyle("errorUnderline");
            }
            if(!handleRoomCheck(periodSeven)){
                setPeriodSevenStyle("errorUnderline");
            }
            return;
        }
        if (gradYear === '' || gradYear > gradData.freshmanGraduationYear || gradYear < gradData.currentGraduationYear) {
            if(gradYear !== "2022"){
                handleError("Please enter a valid graduation year");
                setGradYearStyle("errorUnderline");
                return;
            }
        }
        submit();
    };

    return (
        <>

            {!loading ? 
            <>
                {!init && <Navbar type = {1} />}

                <div className={"setting-container " + styleName}>
                    <div className='year-container'>
                        <div className='main-resources-container' style = {title !== "Settings" ? {marginTop: 1.5 + "rem" , marginLeft: 2 + "rem" } : { marginLeft: 2 + "rem" }}>
                            <h1 className='main-resources' >{title}</h1>
                            <div className='right-triangle-title'></div>
                        </div>

                        <div className='year-sub-container'>
                            <h2 className= {gradYearStyle}>
                                What Year Do You Graduate <FaGraduationCap size={40} />?
                            </h2>
                            <input type='number' placeholder='202X' value={gradYear} onChange={(e) => setGradYear(e.target.value)} />
                            <h2 className= {studentIDStyle}>
                                What is your student ID number?
                            </h2>
                            <input type='text' placeholder='1000XXXXX' value={studentID} onChange={(e) => setStudentID(e.target.value)} />
                        </div>
                    </div>
                    <div className='schedule-container'>
                        <div>
                            <div className='promptPeriod column'>
                                <h2>Enter in Your Rooms</h2>
                                <p>(portables or free is acceptable)</p>
                            </div>
                            <div className='periodContainers'>
                                <h2 className = {periodOneStyle}>Period 1</h2>
                                <input placeholder='806' className='info-input' type='text' value={periodOne} onChange={(e) => setPeriodOne(e.target.value.toLowerCase())} />
                            </div>
                            <div className='periodContainers'>
                                <h2 className = {periodTwoStyle}>Period 2</h2>
                                <input placeholder='607' className='info-input' type='text' value={periodTwo} onChange={(e) => setPeriodTwo(e.target.value.toLowerCase())} />
                            </div>
                            <div className='periodContainers'>
                                <h2 className = {periodThreeStyle}>Period 3</h2>
                                <input placeholder='' className='info-input' type='text' value={periodThree} onChange={(e) => setPeriodThree(e.target.value.toLowerCase())} />
                            </div>
                        </div>
                        <div>
                            <div className='periodContainers'>
                                <h2 className = {periodFourStyle}>Period 4</h2>
                                <input placeholder='' className='info-input' type='text' value={periodFour} onChange={(e) => setPeriodFour(e.target.value.toLowerCase())} />
                            </div>
                            <div className='periodContainers'>
                                <h2 className = {periodFiveStyle}>Period 5</h2>
                                <input placeholder='' type='text' value={periodFive} className='info-input' onChange={(e) => setPeriodFive(e.target.value.toLowerCase())} />
                            </div>
                            <div className='periodContainers'>
                                <h2 className = {periodSixStyle}>Period 6</h2>
                                <input placeholder='' type='text' value={periodSix} className='info-input' onChange={(e) => setPeriodSix(e.target.value.toLowerCase())} />
                            </div>
                            <div className='periodContainers'>
                                <h2 className = {periodSevenStyle}>Period 7</h2>
                                <input placeholder='free' type='text' value={periodSeven} className='info-input' onChange={(e) => setPeriodSeven(e.target.value.toLowerCase())} />
                            </div>
                        </div>
                    </div>
                </div>

                {error &&
                    <div className='flexbox row center errorBar'>
                        <Alert variant='outlined' severity='error'>
                            {errorMessage}
                        </Alert>
                    </div>
                }

                <br />
                <div className='flexbox column center'>
                    <button className='submit-button' onClick={changePage}>
                        Submit
                    </button>
                </div>
            </>
            : <Loading  />}
        </>
    );
};

export default Settings;
