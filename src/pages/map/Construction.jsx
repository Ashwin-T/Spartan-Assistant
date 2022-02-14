
import { Source, Layer } from "react-map-gl";

const constructionCoords = [
    [
        [
            [-122.06591376463683, 37.36018852332536],
            [-122.06601233304356, 37.35974725573569],
            [-122.06579225705387, 37.35974725573569],
            [-122.06577078622549, 37.359580882853216],
            [-122.06513306976764, 37.3595638189000],
            [-122.065115206145, 37.360224731586825]
        ]
    ],
    [
        [
            [-122.06752065872784, 37.36014825552563],
            [-122.06751529102094, 37.36034875461623],
            [-122.06763338057628, 37.360361552412726],
            [-122.06764411599033, 37.36070709208356],
            [-122.06802522319214, 37.36069429434605],
            [-122.0680681648487, 37.360984375853995],
            [-122.0682560345959, 37.360984375853995],
            [-122.0682560345959, 37.360280499666594],
            [-122.06804132960308, 37.36023784239776],
            [-122.06804669731022, 37.36014825763118]
        ]
    ]
]

const Construction = () => {
    

    return (
        constructionCoords.map((coord, index) => {
            
            const dataLayer = {
                id: 'data',
                type: 'fill',
                paint: {
                'fill-color': "red",
                'fill-opacity': 0.5,
                'fill-outline-color': 'orange',
                }
            };
    
            const data = {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {
                            name: 'Construction',
                            description: 'Construction',
                            quantity: 2,
                        },
                        geometry: {
                            type: 'Polygon',
                            coordinates: coord
                        }
                    }
                ]
            
            }
            
            return(
                <Source key = {index} type="geojson" data={data}>
                    <Layer {...dataLayer} />
                </Source>
            )
        })
    )


    
}
 
export default Construction;