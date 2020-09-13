import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker,  } from '@react-google-maps/api';
import Modal from '../Modal/Modal';

const mapStyles = {
  height: "100vh",
  width: "100vw"
};

const defaultPosition = { 
  lat: 23.6850, 
  lng: 90.3563 
}; // Bangladesh

// give your Google MAP API Key here or set it into the environment variable
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API;

const Map = () => {
  // eslint-disable-next-line
  const [ map, setMyMap ] = useState(null);
  const [ open, setOpen ] = useState(false);
  const [ state, setState ] = useState({ 
    position: defaultPosition, 
    center: defaultPosition, 
    showMarker: false 
  });
  

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((currPosition) => {
        const clientCurrentPosition = {
          lat: currPosition.coords.latitude,
          lng: currPosition.coords.longitude
        };

        setState(prevState => ({ ...prevState, position: clientCurrentPosition, center: clientCurrentPosition, showMarker: true }));
      }, (err) => {
        alert('Your location is blocked. Please give the location access and reload');
      });
    } else {
      alert('To get the full experience, please enable your location');
    }
  }, []);

  const renderMap = () => (
    <GoogleMap
      mapContainerStyle={mapStyles}
      zoom={10}
      center={state.center}
      onLoad={map => setMyMap(map)}
    >
      { state.showMarker ? <Marker position={state.position} onClick={handleClickOpen} /> : null }
      { open ? <Modal coordinates={state.position} open={open} handleClose={handleClose} /> : null }
    </GoogleMap>
  );

  return isLoaded ? renderMap() : null;
}

export default Map;