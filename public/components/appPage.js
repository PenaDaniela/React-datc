import React from 'react';
import { setInterval } from 'timers';
const { compose, withProps, withStateHandlers } = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
  } = require("react-google-maps");

import Markers from './Markers.js';


class AppPage extends React.Component{
    constructor(){
        super();
    }

    render(){

        const MapWithAMakredInfoWindow = compose(
            withScriptjs, withGoogleMap
           )
          (props =>
                <GoogleMap defaultZoom={6} defaultCenter={{ lat: 45.971427, lng: 24.803049 }}>

                <Markers />

                </GoogleMap>
            );

        return(
            <div>
                <MapWithAMakredInfoWindow
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAz4Ze9pFXnYYmTAjfIv_Dnp3-GlGZv7gA&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `600px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                />

            </div>
        )
    }
}


export default AppPage;