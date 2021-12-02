import { useState, useEffect, useRef } from 'react';
import InteractiveMap, {Marker} from 'react-map-gl';
import { MdOutlineShareLocation } from 'react-icons/md';

import * as roomData from "../../data/Rooms.json";

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
    

    const calculateWidth =()=>{//this sets the width of the map so it looks ok on mobile and computer
        if(window.innerWidth < 600){// 600 is the borderish from phone to computer 
            return '90vw';
        }
        return '60vw'
    }

    const calculateHeight =()=>{//this sets the width of the map so it looks ok on mobile and computer
        if(window.innerWidth < 600){// 600 is the borderish from phone to computer 
            return '60vh';
        }
        return '75vh'
    }

    const calculateZoom =()=>{//this sets the zoom of the map so it looks ok on mobile and computer
        if(window.innerWidth < 600){// 600 is the borderish from phone to computer 
            return 16.5
        }
        return 17
    }

    const widthX = calculateWidth(); //sets a variable to the value of width and zoom
    const zoomX = calculateZoom();
    const heightX = calculateHeight();

    useEffect(()=>{     
        setViewPort({
            latitude: 37.360158578662605,
            longitude: -122.06716285921868,
            zoom: zoomX,
            width: widthX,
            height: heightX,
            bearing: 90
        })

    }, [zoomX, widthX, heightX])// the useEffect will run on start-up and add data to the viewport object

   
    const formChange1 = (room)=>{
        setSubmittedRoom(false)
        setRestRoom(room) 
    }

    const formChange2 = (room)=>{
        setSubmittedRoom(false)
        setFindRoom(room)//sets searched to variable
    }
    

    const handleCheck = ()=>{
        // const restRoom = inputCurrentRoom.current.value;
        // const findRoom = inputFindingRoom.current.value;
        
        roomData.features.forEach((room)=>{//pushed a
            if(room.properties.name === restRoom || room.properties.name2 === restRoom){
                setCurrentRoom(room);
            }

            if(room.properties.name === findRoom || room.properties.name2 === findRoom){
                setFindingRoom(room);
            }
        }) 
    }

    const handleMap = ()=>{
        let currentRoom = {}, findingRoom = {};
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
        }
        else{
            alert('Please enter a valid room name')
        }

        setViewPort({
            longitude: -122.06716285921868,
            latitude: 37.360158578662605,
            zoom: zoomX,
            width: widthX,
            height: heightX,
            bearing: 90

        })

    }

    //important notice: do we want which style

    
    const MarkerPoints = ({currentRoom, findingRoom}) => {//marker for searched class

        console.log(currentRoom)
        console.log(findingRoom)

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

    
    return (
        <div className="flexbox center mapPageContainer">
            <div className="flexbox center column mapControls">
                <h1>
                    MV Maps
                </h1>

                <button onClick = {()=>{setViewPort({
                                                latitude: 37.360158578662605,
                                                longitude: -122.06716285921868,
                                                zoom: zoomX,
                                                width: widthX,
                                                height: heightX,
                                                bearing: 90
                                            })}} 
                className="refreshIcon"> <MdOutlineShareLocation /></button>

                <div className="flexbox center column">
                    <h3>What Room Are You In?</h3>
                    <input ref={inputCurrentRoom} value = {restRoom} type = 'text' className  = 'findRoom' onChange = {(e)=>formChange1(e.target.value)}/>
                    <h3>What Room Are You Going To?</h3>
                    <input ref={inputFindingRoom} value = {findRoom} type = 'text' className = 'findRoom' onChange = {(e)=>formChange2(e.target.value)}/>
                    <div>
                        <button className = 'go' onClick = {handleMap}>Go!</button>
                    </div>
                </div>
            </div>

            <br />
            <InteractiveMap
                            {...viewPort}
                            mapStyle = "mapbox://styles/ashwintalwalkar/ckuea6z3l17fq18nv6aobff7n"
                            mapboxApiAccessToken = "pk.eyJ1IjoiYXNod2ludGFsd2Fsa2FyIiwiYSI6ImNrdWQ5MTNsdTAwdTgyb3BmZ2N1MGhjOGIifQ.qPKo5Apru46tSyGaY7UE3w"
                            onViewportChange={viewPort => setViewPort(viewPort)}
                            > 

                        {(submittedRoom)? <MarkerPoints currentRoom={currentRoom} findingRoom={findingRoom} />: null}
            </InteractiveMap>
                
        </div>     
    ) 
}
 
export default Map;