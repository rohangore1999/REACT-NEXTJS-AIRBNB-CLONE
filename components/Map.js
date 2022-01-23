import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

// import geolib from 'geolib';
import { getCenter } from 'geolib';


// NOTE: AS ALL THE LOCATION(longitude, latitude) we have are from LONDON LOCATIONS ONLY

function Map({ searchResults }) {

    // transforming the searchResults object into require object:
    // Object >>> { latitude: 52.516272, longitude: 13.377722 }

    const coordinates = searchResults.map((result) => (
        {
            // it will to coordinates a new object with below required structure
            longitude: result.long,
            latitude: result.lat
        }
    ))

    // console.log(coordinates);
    console.log(searchResults);

    // To get the Longitude and latitude of the center of locations coordinates
    const center = getCenter(coordinates)

    // for size of map
    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11
    })


    // for seleted location markers tooltip
    const [selecetedLocation, setSelecetedLocation] = useState({});

    return (
        <ReactMapGL
            //taking the mapbox style which we design
            mapStyle={'mapbox://styles/rohangore1999/ckyqx0afk52jt14o4rxwz15zm'}

            mapboxApiAccessToken={process.env.mapbox_key} //store in next.config.js

            {...viewport} // it will take the object which we declare above and burst(pop all the inside values) to all variables

            onViewportChange={(nextViewport) => setViewport(nextViewport)} //help to move the map, so every time we move it will send the new longi and lati value to our useState
        >

            {searchResults.map((result) => (
                <div key={result.long}>
                    <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p
                            role={'img'}
                            onClick={() => setSelecetedLocation(result)} //whenever we click on the pin it will store that information into the useState >> setSelecetedLocation
                            className='cursor-pointer text-2xl animate-bounce'
                            aria-label='push-pin'
                        >📍</p>
                    </Marker>

                    {/* This is the pop up if we click on marker. */}
                    {selecetedLocation.long === result.long ? (
                        <Popup
                            onClose={() => setSelecetedLocation({})} //after close will set of useState "setSelecetedLocation" to default
                            closeOnClick={true}
                            latitude={result.lat}
                            longitude={result.long}
                        >{result.title}</Popup>
                    ) : false}
                </div>
            ))}

        </ReactMapGL>
    );
}

export default Map;
