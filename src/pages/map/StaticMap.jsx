import {MdOutlineArrowBackIos} from 'react-icons/md'
const StaticMap  = ()=> {
    return (
        <>  
            <div className="flexbox back-arrow-wrapper">
                <MdOutlineArrowBackIos size = {40} onClick={()=>{window.history.back()}}/>   
            </div>
            <div className="static-map flexbox column center">
                <img src = 'images/staticmap.svg' alt="map"/>
            </div>
        </>
    )
}

export default StaticMap;