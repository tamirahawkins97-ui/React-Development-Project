export interface Coordinates {
  lat: number;
  lng: number;
}

export interface GeolocationData {
  ip: string;
  city: string;
  region: string;
  postalCode: string;
  timezone: string;
  isp: string;
}

export interface IpifyResponse {
  ip: string;
  location: {
    country: string;
    region: string;
    city: string;
    lat: number;
    lng: number;
    postalCode: string;
    timezone: string;
    geonameId: number;
  };
  isp: string;
}

export interface IpifyLocation {
  city: string;
  region: string;
  country: string;
  lat: number;
  lng: number;
  postalCode: string;
  timezone: string;
}

