import { useCallback, useEffect, useState } from 'react';
import InfoCard from './components/InfoCard';
import MapView from './components/MapView';
import SearchBar from './components/SearchBar';
import type { Coordinates, GeolocationData, IpifyResponse } from './types';
import './App.css';

const INITIAL_COORDINATES: Coordinates = { lat: 51.505, lng: -0.09 };

const INITIAL_GEO_DATA: GeolocationData = {
  ip: '',
  city: '',
  region: '',
  postalCode: '',
  timezone: '',
  isp: '',
};

export default function App() {
  const [geoData, setGeoData] = useState<GeolocationData>(INITIAL_GEO_DATA);
  const [coordinates, setCoordinates] = useState<Coordinates>(INITIAL_COORDINATES);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGeolocation = useCallback(async (searchQuery = '') => {
    setIsLoading(true);
    setError(null);

    const apiKey = import.meta.env.VITE_IPIFY_API_KEY;
    if (!apiKey) {
      setError('API key is missing. Add VITE_IPIFY_API_KEY to your .env file.');
      setIsLoading(false);
      return;
    }

    const url = new URL('https://geo.ipify.org/api/v2/country,city');
    url.searchParams.set('apiKey', apiKey);

    if (searchQuery) {
      const isIpAddress = /^(\d{1,3}\.){3}\d{1,3}$/.test(searchQuery);
      url.searchParams.set(isIpAddress ? 'ipAddress' : 'domain', searchQuery);
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          response.status === 422
            ? 'Invalid IP address or domain provided.'
            : `Failed to fetch data (Status ${response.status})`
        );
      }

      const data: IpifyResponse = await response.json();
      setGeoData({
        ip: data.ip,
        city: data.location.city,
        region: data.location.region,
        postalCode: data.location.postalCode,
        timezone: data.location.timezone,
        isp: data.isp,
      });
      setCoordinates({ lat: data.location.lat, lng: data.location.lng });
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'An unexpected error occurred.'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const requestId = window.setTimeout(() => {
      void fetchGeolocation();
    }, 0);

    return () => window.clearTimeout(requestId);
  }, [fetchGeolocation]);

  return (
    <main className="app-container">
      <header className="header-banner">
        <h1 className="title">IP Address Tracker</h1>
        <SearchBar onSearch={fetchGeolocation} isLoading={isLoading} />
        <InfoCard data={geoData} error={error} />
      </header>

      <MapView
        coordinates={coordinates}
        locationLabel={`${geoData.city}, ${geoData.region}`}
      />
    </main>
  );
}