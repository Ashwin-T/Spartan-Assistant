import { useState, useEffect, useRef } from "react";
import ReactMapGL, { Source, Layer, Popup } from "react-map-gl";
import { FaRoute, FaDirections, FaParking } from "react-icons/fa";
import {MdMap, MdDirectionsBike} from 'react-icons/md';
import { IoIosNavigate } from "react-icons/io";
import {GiVendingMachine} from 'react-icons/gi';
import { useNavigate } from "react-router-dom";
import { getPeriodsOnDay } from "mvhs-schedule";
import Alert from '@mui/material/Alert';
import moment from "moment";

import Navbar from "../../components/navbar/Navbar";
import MarkerPointsOneWay from "./MarkerPointsOneWay";
import MarkerPointsSchedule from "./MarkerPointsSchedule";
import * as roomData from "../../data/Rooms.json";
import * as otherData from "../../data/Other.json";

import "./map.css";
import './mapbox-gl.css';
// import * as otherData from "./Data/other.json";

//changing the map location by re-orient

const Map = () => {
    // latitude: 37.360257078662605
    // longitude: -122.06716285921868,
    //^ schools  center location
    let navigate = useNavigate();
    const [restRoom, setRestRoom] = useState(""); //sets initial value of 'search'
    const [findRoom, setFindRoom] = useState(""); //sets initial value of 'search'

    const [submittedRoom, setSubmittedRoom] = useState(false);
    const [submittedSchedule, setSubmittedSchedule] = useState(false);

    const [viewPort, setViewPort] = useState({}); // sets initial value of 'view port' to empty js object. viewport will help us setd

    const [currentRoom, setCurrentRoom] = useState({});
    const [findingRoom, setFindingRoom] = useState({});

    const inputCurrentRoom = useRef(null);
    const inputFindingRoom = useRef(null);

    const [singleDirectionsToggle, setSingleDirectionsToggle] = useState(false);
    const [scheduleDirectionToggle, setScheduleDirectionToggle] = useState(true);

    const [singleDirectionStyle, setSingleDirectionStyle] = useState({ color: "dodgerblue" });
    const [scheduleDirectionStyle, setScheduleDirectionStyle] = useState({ color: "dodgerblue" });

    const [schedule, setSchedule] = useState([]);
    const [rawSchedule, setRawSchedule] = useState([]);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleError = (message) =>{
        setError(true);
        setErrorMessage(message);
    }

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
            setError(false);
        } else {
            handleError("Please enter a valid room name");
        }

        setViewPort({
            latitude: 37.360205578662605,
            longitude: lon,
            zoom: zoomX,
            width: "100%",
            height: "100vh",
            bearing: 90,
        });
    };


    const handleSingleDirection = () => {
        setScheduleDirectionToggle(true);
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

        if(schedule.length === 0){
            const periodsLocal = JSON.parse(localStorage.getItem("periods"));
            await getPeriodsOnDay(new Date(moment().format('L'))).then((result) => {
                let resultArr = [];
                let roomObjects = [];

                setRawSchedule(result);
                for (let i = 0; i < result.length; i++) {
                    resultArr.push(periodsLocal[result[i].period - 1]);
                }

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
            });
        }

        if (!scheduleDirectionToggle) {
            setScheduleDirectionStyle({ color: "dodgerblue" });
            setSubmittedSchedule(false);
        }else {
            setScheduleDirectionStyle({ color: "#D7BE69" });
            
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
                onClick={(e)=> console.log(e.lngLat)}
            >
                
                <Navbar navType={1} />

                {submittedRoom && <MarkerPointsOneWay currentRoom={currentRoom} findingRoom={findingRoom} ok = {submittedRoom}/>}
                {submittedSchedule && <MarkerPointsSchedule schedule = {schedule} ok = {submittedSchedule} raw = {rawSchedule}/>}

                {
                    !submittedRoom && !submittedSchedule && 
                        <Source id='directionLayer' type='geojson' data={{
                            type: 'FeatureCollection',
                            features: [
                                {
                                    type: 'Feature',
                                    properties: {},
                                    geometry: {
                                        type: 'LineString',
                                        coordinates: ''
                                    }
                                }
                            ]
                        }}>
                           <Layer type='line' source='my-data' paint={{ "line-color": "green", "line-width": 5 }} />
                       </Source>
                }
                <div className='flexbox space-between'>
                    {singleDirectionsToggle && window.innerWidth > 768 && (
                        <div className=' controlContainer'>
                            <h3>Starting Room: </h3>
                            <input ref={inputCurrentRoom} value={restRoom} type='text' className='findRoom' placeholder='806' onChange={(e) => formChange1(e.target.value)} />
                            <h3>Ending Room: </h3>
                            <input ref={inputFindingRoom} value={findRoom} type='text' className='findRoom' placeholder='607' onChange={(e) => formChange2(e.target.value)} />
                            
                            {error && <div style = {{marginTop: '25px'}}>
                               <Alert variant="outlined"  severity="error" sx = {{width: '175px'}}>{errorMessage}</Alert>
                            </div>}

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
                            <h3>Your Periods For Today!</h3>
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
                        <div className="flexbox center column">
                            <button className='controlButton' onClick={()=>navigate('/staticmap')}>
                                {" "}
                                <MdMap size={40}/>
                            </button>
                        </div>
                    </div>

                    {singleDirectionsToggle && window.innerWidth < 768 && (
                        <div className='controlContainer'>
                            <h3>Starting Room:</h3>
                            <input ref={inputCurrentRoom} placeholder='806' type='text' className='findRoom' onChange={(e) => formChange1(e.target.value)} />
                            <h3>Ending Room:</h3>
                            <input ref={inputFindingRoom} placeholder='607' type='text' className='findRoom' onChange={(e) => formChange2(e.target.value)} />

                            {error && <div style = {{marginTop: '25px'}}>
                               <Alert variant="outlined"  severity="error" sx = {{width: '175px'}}>{errorMessage}</Alert>
                            </div>}

                            <div>
                                <button className='go' onClick={handleMap}>
                                    Navigate
                                </button>
                            </div>
                        </div>
                    )}

                    {   
                        otherData.features.map((place, index) => {
                            if(place.properties.name === 'Vending Machine'){
                                return <Popup key={index} longitude={place.geometry.coordinates[0]} latitude={place.geometry.coordinates[1]} closeButton={false} closeOnClick={false} anchor='bottom'><GiVendingMachine size = {20}/></Popup>
                            }
                            else if(place.properties.name === 'Parking Lot'){
                                return <Popup key={index} longitude={place.geometry.coordinates[0]} latitude={place.geometry.coordinates[1]} closeButton={false} closeOnClick={false} anchor='bottom'><FaParking size = {20}/></Popup>
                            }
                            else if(place.properties.name === 'Bike Rack'){
                                return <Popup key={index} longitude={place.geometry.coordinates[0]} latitude={place.geometry.coordinates[1]} closeButton={false} closeOnClick={false} anchor='bottom'><MdDirectionsBike size = {20}/></Popup>
                            }
                            else if(place.properties.name === 'Construction'){
                                const data = {
                                    type: 'FeatureCollection',
                                    features: [
                                        {
                                            type: 'Feature',
                                            properties: {},
                                            geometry: {
                                                type: 'Polygon',
                                                coordinates: place.geometry.coordinates
                                            }
                                        }
                                    ]
                                }
                                const dataLayer = {
                                    id: 'data',
                                    type: 'fill',
                                    paint: {
                                      'fill-color': "#FF0000",
                                    }
                                  };
                            
                                return(
                                    <Source key = {index} type="geojson" data={data}>
                                        <Layer {...dataLayer} />
                                    </Source>
                                )
                            }
                            else{
                                return null;
                            }
                        })
                    }
                </div>
            </ReactMapGL>
        </div>
    );
};

export default Map;
