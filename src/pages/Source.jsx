import React from 'react'
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Home from './home/Home';
import Map from './map/Map';
import Chat from './chat/Chat';
import Setting from './setting/Setting';


const Source = () => {

    
    return ( 
        <>
            <Routes>
                <Route exact path="/" element={<><Navbar navType = {1}/><Home /></>} />
                <Route exact path="/map" element={<Map />} />
                <Route exact path="/chat" element={<><Chat /></>}/>
                <Route exact path="/settings" element={<><Navbar navType = {1}/><Setting init = {false}/></>} />
            </Routes>   
        </>
     );
}
 
export default Source; 