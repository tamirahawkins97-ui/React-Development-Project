import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L, { type LatLngTuple } from 'leaflet';
import type { Coordinates } from '../types';
import 'leaflet/dist/leaflet.css';

const customMarker = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface ChangeViewProps {
  center: LatLngTuple;
}

function ChangeView({ center }: ChangeViewProps) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 13, { duration: 1.5 });
  }, [center, map]);
  return null;
}

interface MapViewProps {
  coordinates: Coordinates;
  locationLabel: string;
}

export default function MapView({ coordinates, locationLabel }: MapViewProps) {
  const position: LatLngTuple = [coordinates.lat, coordinates.lng];

  return (
    <div className="map-wrapper" aria-label="Interactive map">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        className="leaflet-container"
      >
        <ChangeView center={position} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customMarker}>
          <Popup>{locationLabel || 'Selected Location'}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}