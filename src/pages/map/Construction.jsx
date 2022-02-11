
import { Source, Layer } from "react-map-gl";

const Construction = ({place}) => {
    const data = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'Polygon',
                    coordinates: [place.geometry.coordinates]
                }
            }
        ]
    }
    const dataLayer = {
        id: 'data',
        type: 'fill',
        paint: {
          'fill-color': "#FF0000",
          'fill-opacity': 0.3
        }
      };

    return(
        <Source type="geojson" data={data}>
            <Layer {...dataLayer} />
        </Source>
    )
}
 
export default Construction;