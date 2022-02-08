import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import "./setting.css";
import { FaGraduationCap } from "react-icons/fa";
import { doc, getFirestore, setDoc, getDoc } from "firebase/firestore";
import * as roomData from "../../data/Rooms.json";
import { useNavigate } from "react-router-dom";

const Settings = ({ init }) => {
    //settings have preview of graduation year, and schecule of rooms

    const navigate = useNavigate();

    const [gradYear, setGradYear] = useState(2022);

    const [periodOne, setPeriodOne] = useState("");
    const [periodTwo, setPeriodTwo] = useState("");
    const [periodThree, setPeriodThree] = useState("");
    const [periodFour, setPeriodFour] = useState("");
    const [periodFive, setPeriodFive] = useState("");
    const [periodSix, setPeriodSix] = useState("");
    const [periodSeven, setPeriodSeven] = useState("");

    const [title, setTitle] = useState("Settings");
    const styleName = init ? 'init' : '';

    const db = getFirestore();

    useEffect(() => {
        if (init) {
            setTitle("Lets Get You Set Up");
        }


        const getData = async () => {
            const docRef = doc(db, "users", getAuth().currentUser.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setGradYear(docSnap.data().gradYear);
                setPeriodOne(docSnap.data().periods[0]);
                setPeriodTwo(docSnap.data().periods[1]);
                setPeriodThree(docSnap.data().periods[2]);
                setPeriodFour(docSnap.data().periods[3]);
                setPeriodFive(docSnap.data().periods[4]);
                setPeriodSix(docSnap.data().periods[5]);
                setPeriodSeven(docSnap.data().periods[6]);

                localStorage.setItem("periods", JSON.stringify(docSnap.data().periods));
            } else {
                // doc.data() will be undefined in this case
            }
        };

        getData();
    }, [init, db]);

    const handleRoomCheck = (roomNumber) => {
        return roomData.features.some((room) => room.properties.name === roomNumber || room.properties.name2 === roomNumber);
    };

    const submit = async () => {
        const periods = [periodOne, periodTwo, periodThree, periodFour, periodFive, periodSix, periodSeven];
        await setDoc(doc(db, "users", getAuth().currentUser.uid), {
            name: getAuth().currentUser.displayName,
            periods: periods,
            gradYear: gradYear,
        });
        localStorage.setItem("allow", "true");
        localStorage.setItem("periods", JSON.stringify([...periods]));

        const isFreshmen = gradYear === "2025" ? true : false;
        localStorage.setItem("freshmen", isFreshmen);
        navigate("/");
    };

    const changePage = () => {
        if (periodOne === "" || periodTwo === "" || periodThree === "" || periodFour === "" || periodFive === "" || periodSix === "" || periodSeven === "") {
            alert("Please fill out all periods");
            return;
        }
        if (!handleRoomCheck(periodOne) || !handleRoomCheck(periodTwo) || !handleRoomCheck(periodThree) || !handleRoomCheck(periodFour) || !handleRoomCheck(periodFive) || !handleRoomCheck(periodSix) || !handleRoomCheck(periodSeven)) {
            alert("Please enter a valid room number");
            return;
        }
        if (gradYear < 2022) {
            alert("Please enter a valid graduation year");
            return;
        }
        submit();

        // if (page === 0) {
        //     if (gradYear > 2021) {
        //         //change per year
        //         setPage(1);
        //     } else {
        //         alert("Please enter a valid graduation year");
        //     }
        // } else if (page === 1) {
        // if (periodOne !== "" && periodTwo !== "" && periodThree !== "" && periodFour !== "") {
        //     if (handleRoomCheck(periodOne) && handleRoomCheck(periodTwo) && handleRoomCheck(periodThree) && handleRoomCheck(periodFour)) {
        //         setPage(2);
        //     } else {
        //         alert("Please enter a valid room number");
        //     }
        // } else {
        //     alert("Please fill out all periods");
        // }
        // } else if (page === 2) {
        //     if (periodFive !== "" && periodSix !== "" && periodSeven !== "") {
        //         if (handleRoomCheck(periodFive) && handleRoomCheck(periodSix) && handleRoomCheck(periodSeven)) {
        //             submit();
        //         } else {
        //             alert("Please enter a valid room number");
        //         }
        //     } else {
        //         alert("Please fill out all periods");
        //     }
        // }
    };
    return (
        <>
            <div className={'setting-container ' + styleName}>
                <div className='year-container'>
                    <div className='main-resources-container' style={{ marginLeft: 2 + "rem" }}>
                        <h1 className='main-resources'>{title}</h1>
                        <div className='right-triangle-title'></div>
                    </div>

                    <div className='year-sub-container'>
                        <h2>
                            What Year Do You Graduate <FaGraduationCap /> ?
                        </h2>
                        <input type='number' value={gradYear} onChange={(e) => setGradYear(e.target.value)} />
                    </div>
                </div>
                <div className='schedule-container'>
                    <div>
                        <div className='promptPeriod column'>
                            <h2>Enter in your Rooms</h2>
                            <p>(or free)</p>
                        </div>
                        <div className='periodContainers'>
                            <h2>Period 1</h2>
                            <input placeholder="806" className='info-input' type='text' value={periodOne} onChange={(e) => setPeriodOne(e.target.value.toLowerCase())} />
                        </div>
                        <div className='periodContainers'>
                            <h2>Period 2</h2>
                            <input placeholder='' className='info-input' type='text' value={periodTwo} onChange={(e) => setPeriodTwo(e.target.value.toLowerCase())} />
                        </div>
                        <div className='periodContainers'>
                            <h2>Period 3</h2>
                            <input placeholder='' className='info-input' type='text' value={periodThree} onChange={(e) => setPeriodThree(e.target.value.toLowerCase())} />
                        </div>
                    </div>
                    <div>
                        <div className='periodContainers'>
                            <h2>Period 4</h2>
                            <input placeholder='' className='info-input' type='text' value={periodFour} onChange={(e) => setPeriodFour(e.target.value.toLowerCase())} />
                        </div>
                        <div className='periodContainers'>
                            <h2>Period 5</h2>
                            <input placeholder='' type='text' value={periodFive} className='info-input' onChange={(e) => setPeriodFive(e.target.value.toLowerCase())} />
                        </div>
                        <div className='periodContainers'>
                            <h2>Period 6</h2>
                            <input placeholder='' type='text' value={periodSix} className='info-input' onChange={(e) => setPeriodSix(e.target.value.toLowerCase())} />
                        </div>
                        <div className='periodContainers'>
                            <h2>Period 7</h2>
                            <input placeholder='' type='text' value={periodSeven} className='info-input' onChange={(e) => setPeriodSeven(e.target.value.toLowerCase())} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='flexBox row center'>
                <button className='submit-button' onClick={changePage}>
                    Submit
                </button>
            </div>
        </>
    );
    // return (
    //     <>
    //         <div className={`flexbox column center ${init}`}>
    //             <div className={"flexbox settings container side-container"}>
    //                 <div className='left flexbox column center'>
    //                     <h1>Hey {getAuth().currentUser.displayName.split(" ")[0]}!</h1>
    //                     <h2>{title}</h2>
    //                 </div>
    //                 <div className='right flexbox column center'>
    //                     {page === 0 && (
    //                         <>
    //                             <h2>What Year Do You Graduate?</h2>
    //                             <input className='year-input' type='number' value={gradYear} onChange={(e) => setGradYear(e.target.value)} />
    //                         </>
    //                     )}
    //                     {page > 0 && <h2>Enter In the Rooms of Your Schedule</h2>}

    //                     <div className='flexbox column center scheduleInputs'>
    //                         {page === 1 && (
    //                             <>
    //                                 <div className='flexbox periodContainers column center'>
    //                                     <div className='periodTitle'>Period 1</div>
    //                                     <input placeholder="Ex: 806 or 'free'" className='info-input' type='text' value={periodOne} onChange={(e) => setPeriodOne(e.target.value.toLowerCase())} />
    //                                 </div>
    //                                 <div className='flexbox periodContainers column center'>
    //                                     <div className='periodTitle'>Period 2</div>
    //                                     <input placeholder='' className='info-input' type='text' value={periodTwo} onChange={(e) => setPeriodTwo(e.target.value.toLowerCase())} />
    //                                 </div>
    //                                 <div className='flexbox periodContainers column center'>
    //                                     <div className='periodTitle'>Period 3</div>
    //                                     <input placeholder='' className='info-input' type='text' value={periodThree} onChange={(e) => setPeriodThree(e.target.value.toLowerCase())} />
    //                                 </div>
    //                                 <div className='flexbox periodContainers column center'>
    //                                     <div className='periodTitle'>Period 4</div>
    //                                     <input placeholder='' className='info-input' type='text' value={periodFour} onChange={(e) => setPeriodFour(e.target.value.toLowerCase())} />
    //                                 </div>
    //                             </>
    //                         )}
    //                         {page === 2 && (
    //                             <>
    //                                 <div className='flexbox periodContainers column center'>
    //                                     <div className='periodTitle'>Period 5</div>
    //                                     <input placeholder='' type='text' value={periodFive} className='info-input' onChange={(e) => setPeriodFive(e.target.value.toLowerCase())} />
    //                                 </div>
    //                                 <div className='flexbox periodContainers column center'>
    //                                     <div className='periodTitle'>Period 6</div>
    //                                     <input placeholder='' type='text' value={periodSix} className='info-input' onChange={(e) => setPeriodSix(e.target.value.toLowerCase())} />
    //                                 </div>
    //                                 <div className='flexbox periodContainers column center'>
    //                                     <div className='periodTitle'>Period 7</div>
    //                                     <input placeholder='' type='text' value={periodSeven} className='info-input' onChange={(e) => setPeriodSeven(e.target.value.toLowerCase())} />
    //                                 </div>
    //                             </>
    //                         )}
    //                     </div>
    //                     <button className='submit-button' onClick={changePage}>
    //                         {page < 2 ? "Next" : "Submit"}
    //                     </button>
    //                 </div>
    //             </div>
    //         </div>
    //     </>
    // );
};

export default Settings;
