import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker,  } from '@react-google-maps/api';
import Modal from '../Modal/Modal';

const mapStyles = {
  height: "100vh",
  width: "100vw"
};

const myPosition = { 
  lat: 23.81975079, 
  lng: 90.43176054
}; // Bashundhara R/A, Block F

// give your Google MAP API Key here
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API;

const Map = () => {
  // eslint-disable-next-line
  const [ map, setMyMap ] = useState(null);
  // eslint-disable-next-line
  const [ center, setCenter ] = useState(myPosition);
  const [ open, setOpen ] = useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderMap = () => (
    <GoogleMap
      mapContainerStyle={mapStyles}
      zoom={13}
      center={center}
      onLoad={map => setMyMap(map)}
    >
      <Marker position={myPosition} onClick={handleClickOpen} />
      { open ? <Modal coordinates={myPosition} open={open} handleClose={handleClose} /> : null }
    </GoogleMap>
  );

  return isLoaded ? renderMap() : null;
}

export default Map;