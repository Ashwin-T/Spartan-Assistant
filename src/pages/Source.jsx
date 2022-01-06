import { Route, Routes} from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Home from './home/Home';
import Map from './map/Map';
import Info from './chat/Info';
import Setting from './setting/Setting';

const Source = () => {
    return ( 
        <>
            <Routes>
                    <Route exact path="/" element={<><Navbar navType = {1}/><Home /></>} />
                    <Route exact path="/map" element={<Map />} />
                    <Route exact path="/chat" element={<><Navbar navType = {1}/><Info /></>}/>
                    <Route exact path="/settings" element={<><Navbar navType = {1}/><Setting /></>} />
            </Routes>
        </>
     );
}
 
export default Source; 