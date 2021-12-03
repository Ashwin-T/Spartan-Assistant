import { Route, Routes} from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Home from '../pages/home/Home';
import Map from '../pages/map/Map';

const Source = () => {
    return ( 
        <>
            <Routes>
                    <Route exact path="/" element={<><Navbar /><Home /></>} />
                    <Route exact path="/map" element={<Map />} />
                    <Route exact path="/chat" />
                    <Route exact path="/settings" />
            </Routes>
        </>
     );
}
 
export default Source; 