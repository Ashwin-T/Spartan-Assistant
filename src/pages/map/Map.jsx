import { useState, useEffect, useRef } from "react";
import ReactMapGL, { Marker, Layer, Source, Popup } from "react-map-gl";
import { getPeriodsOnDay } from "mvhs-schedule";

import { FaRoute, FaDirections } from "react-icons/fa";
import { IoIosNavigate } from "react-icons/io";
import * as roomData from "../../data/Rooms.json";

import Navbar from "../../components/navbar/Navbar";
import useDirections from "../../hooks/useDirections";

import moment from "moment";
import "./map.css";
import './mapbox-gl.css';
// import * as otherData from "./Data/other.json";

//changing the map location by re-orient

const Map = () => {
    // latitude: 37.360257078662605
    // longitude: -122.06716285921868,
    //^ schools  center location

    const [restRoom, setRestRoom] = useState(""); //sets initial value of 'search'
    const [findRoom, setFindRoom] = useState(""); //sets initial value of 'search'

    const [submittedRoom, setSubmittedRoom] = useState(false);
    const [submittedSchedule, setSubmittedSchedule] = useState(false);

    const [viewPort, setViewPort] = useState({}); // sets initial value of 'view port' to empty js object. viewport will help us setd

    const [currentRoom, setCurrentRoom] = useState({

    });
    const [findingRoom, setFindingRoom] = useState({

    });

    const inputCurrentRoom = useRef(null);
    const inputFindingRoom = useRef(null);

    const [singleDirectionsToggle, setSingleDirectionsToggle] = useState(false);
    const [scheduleDirectionToggle, setScheduleDirectionToggle] = useState(true);

    const [singleDirectionStyle, setSingleDirectionStyle] = useState({ color: "dodgerblue" });
    const [scheduleDirectionStyle, setScheduleDirectionStyle] = useState({ color: "dodgerblue" });

    const [schedule, setSchedule] = useState([]);
    const colorArray = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#00ffff", "#ff00ff"];
    

    const calculateZoom = () => {
        //this sets the zoom of the map so it looks ok on mobile and computer
        if (window.innerWidth < 768) {
            // 600 is the borderish from phone to computer
            return 16.35;
        }
        return 17;
    };

    const calculateCenter = () => {
        //this sets the center of the map so it looks ok on mobile and computer
        if (window.innerWidth < 768) {
            // 600 is the borderish from phone to computer
            return -122.06586285921868;
        }
        return -122.06656285921868;
    };

    const lon = calculateCenter();
    const zoomX = calculateZoom();

    useEffect(() => {
        setViewPort({
            latitude: 37.360205578662605,
            longitude: lon,
            zoom: zoomX,
            width: "100vw",
            height: "100vh",
            bearing: 90,
        });

    }, [zoomX, lon]); // the useEffect will run on start-up and add data to the viewport object

    const formChange1 = (room) => {
        setSubmittedRoom(false);
        setRestRoom(room);
    };

    const formChange2 = (room) => {
        setSubmittedRoom(false);
        setFindRoom(room); //sets searched to variable
    };

    const handleMap = async () => {
        let currentRoom = {},
            findingRoom = {};

        roomData.features.forEach((room) => {
            //pushed a
            if (room.properties.name === restRoom || room.properties.name2 === restRoom) {
                currentRoom = room;
                setCurrentRoom(room);
            }

            if (room.properties.name === findRoom || room.properties.name2 === findRoom) {
                findingRoom = room;
                setFindingRoom(room);
            }
        });

        if ("type" in currentRoom && "type" in findingRoom) {
            setSubmittedRoom(true);
            handleSingleDirection();
        } else {
            alert("Please enter a valid room name");
        }

        setViewPort({
            latitude: 37.360205578662605,
            longitude: lon,
            zoom: zoomX,
            width: "100vw",
            height: "100vh",
            bearing: 90,
        });
    };

    //important notice: do we want which style

    const MarkerPointsOneWay = ({ currentRoom, findingRoom }) => {
        //marker for searched class

        return (
            <>
                <Source id='directionLayer' type='geojson' data={useDirections(currentRoom, findingRoom)}>
                    <Layer type='line' source='my-data' paint={{ "line-color": "dodgerblue", "line-width": 5 }} />
                </Source>

                <Marker longitude={currentRoom.geometry.coordinates[0]} latitude={currentRoom.geometry.coordinates[1]}>
                    <div className='mapIcon'>
                        <div className='searchMarkerCurrent'></div>
                    </div>
                </Marker>

                <Marker longitude={findingRoom.geometry.coordinates[0]} latitude={findingRoom.geometry.coordinates[1]}>
                    <div className='mapIcon'>
                        <div className='searchMarkerFind'></div>
                    </div>
                </Marker>

                <Popup longitude={currentRoom.geometry.coordinates[0]} latitude={currentRoom.geometry.coordinates[1]} closeButton={false} closeOnClick={false} anchor='bottom'>
                    {currentRoom.properties.name}
                </Popup>

                <Popup longitude={findingRoom.geometry.coordinates[0]} latitude={findingRoom.geometry.coordinates[1]} closeButton={false} closeOnClick={false} anchor='bottom'>
                    {findingRoom.properties.name}
                </Popup>
            </>
        );
    };

    const MarkerPointsSchedule = () => {
        //marker for searched class

        return (
            <>               
                {schedule.filter(room => room.properties.name !== 'free').map((room, index) => {
                    return (
                        <Popup key={index} longitude={room.geometry.coordinates[0]} latitude={room.geometry.coordinates[1]} closeButton={false} closeOnClick={false} anchor='bottom'>
                            {room.properties.name}
                        </Popup>
                    );
                })}                
            </>

        );
    };

    const handleSingleDirection = () => {
        setScheduleDirectionToggle(false);
        setSubmittedSchedule(false);
        setScheduleDirectionStyle({ color: "dodgerblue" });

        setSingleDirectionsToggle(!singleDirectionsToggle);

        if (singleDirectionsToggle) {
            setSingleDirectionStyle({ color: "dodgerblue" });
        } else {
            setSingleDirectionStyle({ color: "#D7BE69" });
        }
    };

    const handleScheduleDirections = async() => {
        setSingleDirectionsToggle(false);
        setSubmittedRoom(false);

        if (!scheduleDirectionToggle) {
            setScheduleDirectionStyle({ color: "dodgerblue" });
            setSubmittedSchedule(false);

        }else {
            setScheduleDirectionStyle({ color: "#D7BE69" });
            const periodsLocal = JSON.parse(localStorage.getItem("periods"));
            console.log(periodsLocal);
    
            await getPeriodsOnDay(new Date(moment().format('L'))).then((result) => {
                let resultArr = [];
                let roomObjects = [];

                for (let i = 0; i < result.length; i++) {
                    resultArr.push(periodsLocal[result[i].period - 1]);
                }
                console.log(resultArr);
                for (let i = 0; i < resultArr.length; i++) {
                    if (resultArr[i] !== undefined) {
                        roomData.features.forEach((room) => {
                            if (room.properties.name === resultArr[i] || room.properties.name2 === resultArr[i]) {
                                roomObjects.push(room);
                            }
                        });
                    }
                }        
                setSchedule(roomObjects);
                console.log(roomObjects);
            }); //change to moment().format('L') during school days
            setSubmittedSchedule(true);
        }

        setScheduleDirectionToggle(!scheduleDirectionToggle);


       
    };

    return (
        <div className='flexbox mapPageContainer'>
            <ReactMapGL
                {...viewPort}
                mapStyle='mapbox://styles/ashwintalwalkar/ckuea6z3l17fq18nv6aobff7n'
                mapboxApiAccessToken='pk.eyJ1IjoiYXNod2ludGFsd2Fsa2FyIiwiYSI6ImNrdWQ5MTNsdTAwdTgyb3BmZ2N1MGhjOGIifQ.qPKo5Apru46tSyGaY7UE3w'
                onViewportChange={(viewPort) => setViewPort(viewPort)}
                // onClick = {handleLocation}
            >
                <Navbar navType={1} />

                {submittedRoom && <MarkerPointsOneWay currentRoom={currentRoom} findingRoom={findingRoom} />}
                {submittedSchedule && <MarkerPointsSchedule />}

                <div className='flexbox space-between'>
                    {singleDirectionsToggle && window.innerWidth > 768 && (
                        <div className=' controlContainer'>
                            <h3>Starting Room: </h3>
                            <input ref={inputCurrentRoom} value={restRoom} type='text' className='findRoom' placeholder='103' onChange={(e) => formChange1(e.target.value)} />
                            <h3>Ending Room: </h3>
                            <input ref={inputFindingRoom} value={findRoom} type='text' className='findRoom' placeholder='413' onChange={(e) => formChange2(e.target.value)} />
                            <div>
                                <button className='go' onClick={handleMap}>
                                    Navigate
                                </button>
                            </div>
                        </div>
                    )}

                    {!scheduleDirectionToggle && window.innerWidth > 768 && (
                        <div className='flexbox column center controlContainer'>
                            <h2>Daily Schedule Route</h2>
                            <h3>Todays Periods</h3>
                            {schedule.map((room, index) => {
                                return (
                                    <li key={index}>
                                        {room.properties.name}
                                    </li>
                                );
                            })}
                        </div>
                    )}

                    {/* TODO: Add better styling */}
                    <div className='flexbox center mapControls'>
                        <div className='flexbox center column'>
                            <button
                                onClick={() => {
                                    setViewPort({
                                        latitude: 37.360205578662605,
                                        longitude: lon,
                                        zoom: zoomX,
                                        width: "100vw",
                                        height: "100vh",
                                        bearing: 90,
                                    });
                                }}
                                className='controlButton'>
                                {" "}
                                <IoIosNavigate size={40} />
                            </button>
                        </div>

                        <div className='flexbox center column'>
                            <button className='controlButton' onClick={handleSingleDirection}>
                                {" "}
                                <FaDirections size={40} style={singleDirectionStyle} />
                            </button>
                        </div>

                        <div className='flexbox center column'>
                            <button className='controlButton' onClick={handleScheduleDirections}>
                                {" "}
                                <FaRoute size={40} style={scheduleDirectionStyle} />
                            </button>
                        </div>
                    </div>

                    {singleDirectionsToggle && window.innerWidth < 768 && (
                        <div className=' controlContainer'>
                            <h3>Starting Room:</h3>
                            <input ref={inputCurrentRoom} value={restRoom} placeholder='103' type='text' className='findRoom' onChange={(e) => formChange1(e.target.value)} />
                            <h3>Ending Room:</h3>
                            <input ref={inputFindingRoom} value={findRoom} placeholder='413' type='text' className='findRoom' onChange={(e) => formChange2(e.target.value)} />
                            <div>
                                <button className='go' onClick={handleMap}>
                                    Navigate
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </ReactMapGL>
        </div>
    );
};

export default Map;
