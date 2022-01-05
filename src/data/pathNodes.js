
const nodes = [
    {
        "properties": {
            "room": "101" //if you want to use the room system, you need to add the room property, otherwise put intersection and kinda number it
        },
        "geometry": {
            "type": "Point",
            "coordinates": [ // longitude, latitude
                -122.06789041802074,
                37.360983970335326
            ]
        },
        "otherNodes": [ // other nodes that are connected to this one (used for pathfinding)
            [
                
            ]
        ]
        
    }
]
export default nodes;
