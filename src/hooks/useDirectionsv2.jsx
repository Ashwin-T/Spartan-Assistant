import {useState, useEffect} from 'react';
import nodes from '../data/pathNodes.js';
const useDirections = (currentRoom, findingRoom) => { //inputs are room nums
    const [directions, setDirections] = useState([]);

    useEffect(() => {
        
        const map = new Map();
        const mapNameGen = new Map();

        const start = mapNameGen.get(currentRoom.properties.name);
        const end = mapNameGen.get(findingRoom.properties.name);

        const getDirections = () => {

            nodes.forEach(node => {        
                const coords = node.properties.room.geometry.coordinates[0] + '-' + node.properties.room.geometry.coordinates[1];

                map.set(coords, node.properties.room);
                mapNameGen.set(node.properties.room.name, coords);
            })

            // const dfs = (start, visted = new Set())=>{
            //     visted.add(start);

            //     const destinations = map.get(start).otherNodes[0];


            //     destinations.forEach(destination => {
            //         if(destination.name === end.name){
            //             console.log('found it');
            //             return;
            //         }
    
            //         if(!visted.has(destination)){
            //             dfs(destination, visted);
            //         }
            //     })

            // }


            //bfs
            const start = mapNameGen.get(currentRoom.properties.name);
            const queue = [start];
            const visited = new Set();

            while(queue.length > 0){

                const current = queue.shift();

                const destinations = map.get(current).otherNodes[0]

                destinations.forEach(destination => {

                    const tempCoords = destination[0]+'-'+destination[1];

                    if(tempCoords === mapNameGen.get(findingRoom.properties.name)){
                        console.log('found it');
                        return;
                    }

                    if(!visited.has(tempCoords)){
                        queue.push(tempCoords);
                        visited.add(tempCoords);
                    }
                })

            }      
            
        
            return(queue);


        }

        
        const directionsObj = {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString',
                coordinates: getDirections()
            }
            
        }

        console.log(directionsObj);

        setDirections(directionsObj);
    }, [])


    return (directions)
}
 
export default useDirections;