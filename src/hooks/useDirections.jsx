import {useState, useEffect} from 'react';
import axios from 'axios';
import {mapboxToken} from '../../tools/Secrets';

const useDirections = (currentRoom, findingRoom) => {

    const [directions, setDirections] = useState([]);

    useEffect(() => {
        const getDirections = async () => {
            const dataString = `https://api.mapbox.com/directions/v5/mapbox/walking/${currentRoom.geometry.coordinates[0]}%2C${currentRoom.geometry.coordinates[1]}%3B${findingRoom.geometry.coordinates[0]}%2C${findingRoom.geometry.coordinates[1]}?alternatives=true&continue_straight=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${mapboxToken}`;
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

        }
        getDirections();


    })
    return (directions)
}
 
export default useDirections;