
const nodes = [
    {
        "properties": {
            "room": {
                "name": "101",
                "geometry": {
                    "type": "Point",
                    "coordinates": [ // longitude, latitude
                        -122.06804132492216, 
                        37.36092511562485
                    ]
                },
                "otherNodes": [ // other nodes that are connected to this one (used for pathfinding)
                    [
                        [
                            -122.06804132492216, 
                            37.36098547189365 //longitude, latitude
                        ],
                        [
                            -122.0680444444529, 
                            37.36084326252483 //longitude, latitude
                        ]
                    ]
                ]
            } //if you want to use the room system, you need to add the room property, otherwise put intersection and kinda number it
        }
    },
    {
        "properties": {
            "room": {
                "name": "102",
                "geometry": {
                    "type": "Point",
                    "coordinates": [ 
                        -122.06804236476569, 
                        37.36084408932371
                    ]
                },
                "otherNodes": [ 
                    [
                        [
                            -122.06804132492216, 
                            37.36092594242282
                        ],
                        [
                            -122.06804236476569, 
                            37.360747353727824
                        ]
                    ]
                ]
                
            }
        }
    },
    {
        "properties": {
            "room": {
                "name": "102",
                "geometry": {
                    "type": "Point",
                    "coordinates": [ 
                        -122.06804236476569, 
                        37.36084408932371
                    ]
                },
                "otherNodes": [ 
                    [
                        [
                            -122.06804132492216, 
                            37.36092594242282
                        ],
                        [
                            -122.06804236476569, 
                            37.360747353727824
                        ]
                    ]
                ]
                
            }
        }
    },
]
export default nodes;
