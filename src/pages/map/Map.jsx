import { useState, useEffect, useRef } from 'react';
import InteractiveMap, {Marker, Source, Layer} from 'react-map-gl';
import { MdOutlineShareLocation } from 'react-icons/md';
import {IoIosNavigate} from 'react-icons/io';

import * as roomData from "../../data/Rooms.json";
import Navbar from "../../components/navbar/Navbar";

import './map.css';
// import * as otherData from "./Data/other.json";

//changing the map location by re-orient

const Map = () => {

    // latitude: 37.360257078662605
    // longitude: -122.06716285921868,
    //^ schools center location
    
    const [restRoom, setRestRoom] = useState('');//sets initial value of 'search'
    const [findRoom, setFindRoom] = useState('');//sets initial value of 'search'

    const [submittedRoom, setSubmittedRoom] = useState(false);
    const [viewPort, setViewPort] = useState({});// sets initial value of 'view port' to empty js object. viewport will help us setd


    const [currentRoom, setCurrentRoom] = useState({});
    const [findingRoom, setFindingRoom] = useState({});
    
    const inputCurrentRoom = useRef(null);
    const inputFindingRoom = useRef(null);

    const [menuToggle, setMenuToggle] = useState(false);

    const [menuStyle, setMenuStyle] = useState({color: 'dodgerblue'});

    const calculateZoom =()=>{//this sets the zoom of the map so it looks ok on mobile and computer
        if(window.innerWidth < 768){// 600 is the borderish from phone to computer 
            return 16.35
        }
        return 17
    }

    const calculateCenter = ()=>{//this sets the center of the map so it looks ok on mobile and computer
        if(window.innerWidth < 768){// 600 is the borderish from phone to computer
            return -122.06586285921868
        }
        return -122.06656285921868
    }

    
    const lon = calculateCenter();
    const zoomX = calculateZoom();

    useEffect(()=>{     
        setViewPort({
            latitude: 37.360205578662605,
            longitude: lon,
            zoom: zoomX,
            width: "100vw",
            height: "100vh",
            bearing: 90
        })

    }, [zoomX,lon])// the useEffect will run on start-up and add data to the viewport object

   
    const formChange1 = (room)=>{
        setSubmittedRoom(false)
        setRestRoom(room) 
    }

    const formChange2 = (room)=>{
        setSubmittedRoom(false)
        setFindRoom(room)//sets searched to variable
    }


    const handleMap = ()=>{
        let currentRoom = {}, findingRoom = {}, geojson = {};
        roomData.features.forEach((room)=>{//pushed a
            if(room.properties.name === restRoom || room.properties.name2 === restRoom){
                currentRoom = room
                setCurrentRoom(room);
                  
            }

            if(room.properties.name === findRoom || room.properties.name2 === findRoom){
                findingRoom = room
                setFindingRoom(room);
            }
        })


        if('type' in currentRoom && 'type' in findingRoom){
            setSubmittedRoom(true)
            handleMenu();
        }
        else{
            alert('Please enter a valid room name')
        }

        setViewPort({
            latitude: 37.360205578662605,
            longitude: lon,
            zoom: zoomX,
            width: "100vw",
            height: "100vh",
            bearing: 90
        })

    }

    //important notice: do we want which style

    
    const MarkerPoints = ({currentRoom, findingRoom}) => {//marker for searched class


        return ( 
        <>
            <Marker longitude={currentRoom.geometry.coordinates[0]}
                    latitude={currentRoom.geometry.coordinates[1]}
            >
                <div className="mapIcon">
                    <div className = 'searchMarkerCurrent'></div>
                </div>
            </Marker>

            <Marker longitude={findingRoom.geometry.coordinates[0]}
                    latitude={findingRoom.geometry.coordinates[1]}
            >
                <div className="mapIcon">
                    <div className = 'searchMarkerFind'></div>
                </div>
            </Marker>
        </> ); 
    }

    const handleMenu = ()=>{
        setMenuToggle(!menuToggle)
        if(menuToggle){
            setMenuStyle({color: 'dodgerblue'})
        }
        else{
            setMenuStyle({color: '#D7BE69'})
        }
    }

    
    return (
        <div className="flexbox mapPageContainer">

            <InteractiveMap
                            {...viewPort}
                            mapStyle = "mapbox://styles/ashwintalwalkar/ckuea6z3l17fq18nv6aobff7n"
                            mapboxApiAccessToken = "pk.eyJ1IjoiYXNod2ludGFsd2Fsa2FyIiwiYSI6ImNrdWQ5MTNsdTAwdTgyb3BmZ2N1MGhjOGIifQ.qPKo5Apru46tSyGaY7UE3w"
                            onViewportChange={viewPort => setViewPort(viewPort)}
                            > 

                        <Navbar />                    

                        {(submittedRoom)? <MarkerPoints currentRoom={currentRoom} findingRoom={findingRoom} />: null}

                        <div className="flexbox space-between">

                            {menuToggle && window.innerWidth > 768 && 
                                <div className="flexbox column center controlContainer">
                                    <h3>What Room Are You In Right Now?</h3>
                                    <input ref={inputCurrentRoom} value = {restRoom} type = 'text' className  = 'findRoom' onChange = {(e)=>formChange1(e.target.value)}/>
                                    <h3>What Room Are You Going To?</h3>
                                    <input ref={inputFindingRoom} value = {findRoom} type = 'text' className = 'findRoom' onChange = {(e)=>formChange2(e.target.value)}/>
                                    <div>
                                        <button className = 'go' onClick = {handleMap}>Navigate!</button>
                                    </div>
                                </div>
                            } 

                            
                            <div className="flexbox center column mapControls">
                                <div className="flexbox center column">
                                    <button onClick = {()=>{setViewPort({
                                                                latitude: 37.360205578662605,
                                                                longitude: lon,
                                                                zoom: zoomX,
                                                                width: "100vw",
                                                                height: "100vh",
                                                                bearing: 90
                                                            })}} 
                                className="controlButton"> <MdOutlineShareLocation size = {50}/></button>
                             </div>
                                <div className="flexbox center column">
                                    <button className="controlButton" onClick = {handleMenu}> <IoIosNavigate size = {50} style = {menuStyle}/></button>
                                </div>
                            </div>

                            {menuToggle && window.innerWidth < 768 && 
                                <div className="flexbox column center controlContainer">
                                    <h3>What Room Are You In Right Now?</h3>
                                    <input ref={inputCurrentRoom} value = {restRoom} type = 'text' className  = 'findRoom' onChange = {(e)=>formChange1(e.target.value)}/>
                                    <h3>What Room Are You Going To?</h3>
                                    <input ref={inputFindingRoom} value = {findRoom} type = 'text' className = 'findRoom' onChange = {(e)=>formChange2(e.target.value)}/>
                                    <div>
                                        <button className = 'go' onClick = {handleMap}>Navigate!</button>
                                    </div>
                                </div>
                            } 

                        </div>

            </InteractiveMap>

                
        </div>     
    ) 
}
 
export default Map;