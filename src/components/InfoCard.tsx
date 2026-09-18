import type { GeolocationData } from '../types';

interface InfoCardProps {
  data: GeolocationData;
  error: string | null;
}

export default function InfoCard({ data, error }: InfoCardProps) {
  if (error) {
    return (
      <section className="info-card error-state" aria-label="Error details">
        <p role="alert">{error}</p>
      </section>
    );
  }

  const {
    ip = '—',
    city = '—',
    region = '—',
    postalCode = '',
    timezone = '—',
    isp = '—',
  } = data;

  const locationFormatted =
    city !== '—' || region !== '—'
      ? `${city}, ${region} ${postalCode}`.trim()
      : '—';

  return (
    <section className="info-card" aria-label="IP Geolocation Details" aria-live="polite">
      <div className="info-item">
        <h2>IP ADDRESS</h2>
        <p>{ip || '—'}</p>
      </div>
      <div className="divider" role="separator" />
      <div className="info-item">
        <h2>LOCATION</h2>
        <p>{locationFormatted}</p>
      </div>
      <div className="divider" role="separator" />
      <div className="info-item">
        <h2>TIMEZONE</h2>
        <p>{timezone ? `UTC ${timezone}` : '—'}</p>
      </div>
      <div className="divider" role="separator" />
      <div className="info-item">
        <h2>ISP</h2>
        <p>{isp || '—'}</p>
      </div>
    </section>
  );
}