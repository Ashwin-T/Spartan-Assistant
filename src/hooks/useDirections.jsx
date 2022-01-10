import {useState, useEffect} from 'react';
import axios from 'axios';

const useDirections = (currentRoom, findingRoom) => {

    const [directions, setDirections] = useState([]);

    useEffect(() => {
        const getDirections = async () => {
            const dataString = `https://api.mapbox.com/directions/v5/mapbox/walking/${currentRoom.geometry.coordinates[0]}%2C${currentRoom.geometry.coordinates[1]}%3B${findingRoom.geometry.coordinates[0]}%2C${findingRoom.geometry.coordinates[1]}?alternatives=true&continue_straight=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=pk.eyJ1IjoiYXNod2ludGFsd2Fsa2FyIiwiYSI6ImNrdWQ5MTNsdTAwdTgyb3BmZ2N1MGhjOGIifQ.qPKo5Apru46tSyGaY7UE3w`
            const dataArray = await axios.get(dataString);
         
            
            const directionsObj = {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'LineString',
                    coordinates: dataArray.data.routes[0].geometry.coordinates
                }
                
            }

            await setDirections(directionsObj);

        }
        getDirections();
    })
    return (directions)
}
 
export default useDirections;