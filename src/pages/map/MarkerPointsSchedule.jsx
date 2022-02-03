import{Popup, Source, Layer } from "react-map-gl";
import { useEffect, useState } from "react";
import Loading from '../../components/loading/Loading';
import axios from 'axios';
const MarkerPointsOneWay = ({schedule, ok , raw}) => {
    //marker for searched class
   
    const [directions, setDirections] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        
        setLoading(true);
        const getDirections = async () => {
            
            let dataString = 'https://api.mapbox.com/directions/v5/mapbox/walking/';

            for(let i = 0; i < schedule.length; i++){
                dataString += `${schedule[i].geometry.coordinates[0]},${schedule[i].geometry.coordinates[1]};`;
            }
            dataString = dataString.slice(0, -1);

            dataString += '?alternatives=false&continue_straight=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=pk.eyJ1IjoiYXNod2ludGFsd2Fsa2FyIiwiYSI6ImNrdWQ5MTNsdTAwdTgyb3BmZ2N1MGhjOGIifQ.qPKo5Apru46tSyGaY7UE3w'
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

        getDirections();

        if(!ok){
            setDirections({});
        }

        return () => {
            setDirections({});
        }

    }, [ok, schedule, raw])

    
    return (
        <>  
            {loading ? <Loading />:

            <>
                {ok && 
                <Source id='directionLayer' type='geojson' data={directions}>
                    <Layer type='line' source='my-data' paint={{ "line-color": "green", "line-width": 5 }} />
                </Source>}
                {schedule.filter(room => room.properties.name !== 'free').map((room, index) => {
                    return (
                        <Popup key={index} longitude={room.geometry.coordinates[0]} latitude={room.geometry.coordinates[1]} closeButton={false} closeOnClick={false} anchor='bottom'>
                            <div className="flexbox column center">
                                <div>
                                    Period: {raw.filter(item => item.period === 1 || item.period === 2 || item.period === 3 || item.period === 4 || item.period === 5 || item.period === 6 || item.period === 7)[index].period}
                                </div>
                                <div>
                                    {room.properties.name}
                                </div>
                            </div>
                        </Popup>
                    );
                })}
            </>
            }
        </>
    );
};

export default MarkerPointsOneWay;