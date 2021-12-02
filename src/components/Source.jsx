import { Route, Routes} from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Home from '../pages/home/Home';
import Map from '../pages/map/Map';

const Source = () => {
    return ( 
        <>
            <Navbar />
            <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/map" element={<Map />} />
            </Routes>
        </>
     );
}
 
export default Source; 