
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
                "name": "103",
                "geometry": {
                    "type": "Point",
                    "coordinates": [ 
                        -122.0677724128627, 37.360926130345305
                    ]
                },
                "otherNodes": [ 
                    [
                        [
                            -122.0677724128627, 37.36098048749244
                        ],
                        [
                            -122.06777178567344, 37.360845841276586
                        ]
                    ]
                ]
                
            }
        }
    },
    {
        "properties": {
            "room": {
                "name": "104",
                "geometry": {
                    "type": "Point",
                    "coordinates": [ 
                        -122.06777178567344, 37.360845841276586
                    ]
                },
                "otherNodes": [ 
                    [
                        [
                            -122.06777178567344, 37.36075109009082
                        ],
                        [
                            -122.0677724128627, 37.360926130345305
                        ]
                    ]
                ]
                
            }
        }
    },
    {
        "properties": {
            "room": {
                "name": "105",
                "geometry": {
                    "type": "Point",
                    "coordinates": [ 
                        -122.06777171673126, 37.3609274034289
                    ]
                },
                "otherNodes": [ 
                    [
                        [
                            -122.06777373212782, 37.36098135351871
                        ],
                        [
                            -122.06777171673126, 37.36084514282133
                        ]
                    ]
                ]
                
            }
        }
    },
    {
        "properties": {
            "room": {
                "name": "106",
                "geometry": {
                    "type": "Point",
                    "coordinates": [ 
                        -122.06777171673126, 37.36084514282133
                    ]
                },
                "otherNodes": [ 
                    [
                        [
                            -122.06777138272669, 37.360750880492624 
                        ],
                        [
                            -122.06777171673126, 37.3609274034289
                        ]
                    ]
                ]
                
            }
        }
    },
    {
        "properties": {
            "room": {
                "name": "107",
                "geometry": {
                    "type": "Point",
                    "coordinates": [ 
                        -122.06750875363277, 37.36092396169402
                    ]
                },
                "otherNodes": [ 
                    [
                        [
                            -122.06750875363277, 37.36099198686133 
                        ],
                        [
                            -122.06750596384262, 37.360842627173135
                        ]
                    ]
                ]
                
            }
        }
    },
    {
        "properties": {
            "room": {
                "name": "108",
                "geometry": {
                    "type": "Point",
                    "coordinates": [ 
                        -122.06750596384262, 37.360842627173135
                    ]
                },
                "otherNodes": [ 
                    [
                        [
                            -122.06750782370273, 37.36075020147466
                        ],
                        [
                            -122.06750875363277, 37.36092396169402
                        ]
                    ]
                ]
                
            }
        }
    },
    {
        "properties": {
            "room": {
                "name": "109",
                "geometry": {
                    "type": "Point",
                    "coordinates": [ 
                        -122.06735884061483, 37.360753872807656
                    ]
                },
                "otherNodes": [ 
                    [
                        [
                            122.06750323906947, 37.36075176612698
                        ],
                        [
                            -122.06725543489333, 37.360753356039524
                        ]
                    ]
                ]
                
            }
        }
    },
    {
        "properties": {
            "room": {
                "name": "110",
                "geometry": {
                    "type": "Point",
                    "coordinates": [ 
                        -122.06725543489333, 37.360753356039524
                    ]
                },
                "otherNodes": [ 
                    [
                        [
                            -122.06719771324597, 37.36075419617295
                        ],
                        [
                            -122.06735884061483, 37.360753872807656
                        ]
                    ]
                ]
                
            }
        }
    },
    {
        "properties": {
            "room": {
                "name": "111",
                "geometry": {
                    "type": "Point",
                    "coordinates": [ 
                        -122.067131154936, 37.36075327473374
                    ]
                },
                "otherNodes": [ 
                    [
                        [
                            -122.06698592010002, 37.36075327473374
                        ],
                        [
                            -122.06725543489333, 37.360753356039524
                        ]
                    ]
                ]
                
            }
        }
    },
]
export default nodes;
