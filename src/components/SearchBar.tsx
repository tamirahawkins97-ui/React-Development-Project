import { useState, type FormEvent, type ChangeEvent } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const IP_OR_DOMAIN_REGEX =
  /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/;

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState<string>('');
  const [validationError, setValidationError] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = query.trim();

    if (!trimmed) {
      setValidationError('Please enter an IP address or domain name.');
      return;
    }

    if (!IP_OR_DOMAIN_REGEX.test(trimmed)) {
      setValidationError('Please enter a valid IPv4 address or domain.');
      return;
    }

    setValidationError('');
    onSearch(trimmed);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (validationError) setValidationError('');
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form" role="search">
        <label htmlFor="ip-input" className="sr-only">
          Search for any IP address or domain
        </label>
        <input
          id="ip-input"
          type="text"
          placeholder="Search for any IP address or domain"
          value={query}
          onChange={handleChange}
          aria-invalid={Boolean(validationError)}
          aria-describedby={validationError ? 'search-error' : undefined}
          disabled={isLoading}
        />
        <button type="submit" aria-label="Submit search" disabled={isLoading}>
          {isLoading ? (
            <span className="spinner" aria-hidden="true" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14" viewBox="0 0 11 14">
              <path fill="none" stroke="#FFF" strokeWidth="3" d="M2 1l6 6-6 6" />
            </svg>
          )}
        </button>
      </form>
      {validationError && (
        <p id="search-error" className="error-message" role="alert">
          {validationError}
        </p>
      )}
    </div>
  );
}