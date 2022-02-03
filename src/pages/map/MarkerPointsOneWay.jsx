import{ Marker, Popup, Source, Layer } from "react-map-gl";
import { useEffect, useState } from "react";
import Loading from '../../components/loading/Loading';

import axios from 'axios';
const MarkerPointsOneWay = ({ currentRoom, findingRoom, ok }) => {
    //marker for searched class
   
    const [directions, setDirections] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getDirections = async () => {
            setLoading(true);
            const dataString = `https://api.mapbox.com/directions/v5/mapbox/walking/${currentRoom.geometry.coordinates[0]},${currentRoom.geometry.coordinates[1]};${findingRoom.geometry.coordinates[0]},${findingRoom.geometry.coordinates[1]}?alternatives=false&continue_straight=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=pk.eyJ1IjoiYXNod2ludGFsd2Fsa2FyIiwiYSI6ImNrdWQ5MTNsdTAwdTgyb3BmZ2N1MGhjOGIifQ.qPKo5Apru46tSyGaY7UE3w`;
            const dataArray = await axios.get(dataString);
         
            const directionsObj = {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: dataArray.data.routes[0].geometry.coordinates
                        }
                    }
                ]
            }

            await setDirections(directionsObj);
            setLoading(false);

        }

        getDirections(currentRoom, findingRoom)

        if(!ok){
            setDirections({});
        }

        console.log(ok)

    }, [currentRoom, findingRoom, ok])

    
    return (
        <>
            {loading ? <Loading /> : <>
                {ok && <Source id='directionLayer' type='geojson' data={directions}>
                    <Layer type='line' source='my-data' paint={{ "line-color": "dodgerblue", "line-width": 5 }} />
                </Source>}

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
            </>}
        </>
    );
};

export default MarkerPointsOneWay;