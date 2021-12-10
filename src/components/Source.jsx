import { Route, Routes} from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Home from '../pages/home/Home';
import Map from '../pages/map/Map';
import Chat from '../pages/chat/Chat';

const Source = () => {
    return ( 
        <>
            <Routes>
                    <Route exact path="/" element={<><Navbar navType = {1}/><Home /></>} />
                    <Route exact path="/map" element={<Map />} />
                    <Route exact path="/chat" element={<><Chat /></>}/>
                    <Route exact path="/settings" />
            </Routes>
        </>
     );
}
 
export default Source; 