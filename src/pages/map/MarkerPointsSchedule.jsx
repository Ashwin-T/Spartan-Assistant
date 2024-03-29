import{Popup, Source, Layer } from "react-map-gl";
import { useEffect, useState } from "react";
import Loading from '../../components/loading/Loading';
import axios from 'axios';

import { mapboxToken } from "../../tools/Secrets";
const MarkerPointsScheduleWay = ({schedule, ok , raw}) => {
    //marker for searched class
   
    const [directions, setDirections] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        
        setLoading(true);
        const getDirections = async () => {
            if(schedule.length > 0){
                const filteredSchedule = schedule.filter(item => item.properties.name !== 'free');
            let dataString = 'https://api.mapbox.com/directions/v5/mapbox/walking/';

            for(let i = 0; i < filteredSchedule.length; i++){
                dataString += `${filteredSchedule[i].geometry.coordinates[0]},${filteredSchedule[i].geometry.coordinates[1]};`;
            }
            dataString = dataString.slice(0, -1);

            dataString += `?alternatives=false&continue_straight=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${mapboxToken}`;
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
            else{
                setLoading(false);
            }
        }

        if(!ok){
            setDirections({});
            return;
        }
        else{
            getDirections();
        }

    }, [ok, raw, schedule])

    
    return (
        <>  
            {loading && schedule.length > 0 ? <Loading />:

            <>
                {ok && schedule.length > 0 && 
                <Source id='directionLayer' type='geojson' data={directions}>
                    <Layer type='line' source='my-data' paint={{ "line-color": 'green', "line-width": 5 }} />
                </Source>}
                {schedule.map((room, index) => {
                    if(room.properties.name !== 'free'){
                        return (
                            <Popup key={index} longitude={room.geometry.coordinates[0]} latitude={room.geometry.coordinates[1]} closeButton={false} closeOnClick={false} anchor='bottom'>
                                <div className="flexbox column center">
                                    <div>
                                        Period: {raw.filter(item => item.period === 1 || item.period === 2 || item.period === 3 || item.period === 4 || item.period === 5 || item.period === 6 || item.period === 7)[index].period}
                                    </div>
                                    <div>
                                        {room.properties.name.charAt(0).toUpperCase() + room.properties.name.slice(1)}
                                    </div>
                                </div>
                            </Popup>
                        );
                    }
                    return <></>;
                })}
            </>
            }
        </>
    );
};

export default MarkerPointsScheduleWay;