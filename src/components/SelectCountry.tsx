import { FC, useDeferredValue, useEffect, useRef, useState } from 'react';

import { countriesData as data } from '../constants';
import { getCountryFlag } from '../helpers';
import type { StyleOverrides } from '../types';

type Slots =
  | 'root'
  | 'container'
  | 'trigger'
  | 'dropdown'
  | 'searchInput'
  | 'list'
  | 'country'
  | 'selectedCountry';

type Props = StyleOverrides<Slots> & {
  onSelect?: (country: string) => void;
};

export const SelectCountry: FC<Props> = ({ onSelect, classNames, styles }) => {
  const [countries, setCountries] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] =
    useState<string>('Select a country');
  const [query, setQuery] = useState<string>('');
  const deferredQuery = useDeferredValue(query);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (deferredQuery) {
      setCountries(() =>
        data.filter((c) =>
          c.toLowerCase().includes(deferredQuery.toLowerCase())
        )
      );
    } else {
      setCountries(data);
    }
  }, [deferredQuery, data]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);
    if (query) {
      setQuery('');
    }
  };

  const onCountrySelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value) {
      onSelect?.(value);
      setIsOpen(false);
      setSelectedCountry(value);
    }
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setQuery(() => value);
  };

  return (
    <div
      className={`p-4 space-y-4 ${classNames?.root ?? ''}`}
      style={styles?.root}
    >
      <div
        className={`w-full max-w-full px-4 mx-auto ${classNames?.container ?? ''}`}
        style={styles?.container}
      >
        <div ref={dropdownRef} className="relative">
          <button
            className={`w-full text-left pl-3 pr-10 py-2 border cursor-pointer border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm bg-white ${classNames?.trigger ?? ''}`}
            style={styles?.trigger}
            onClick={handleToggleDropdown}
          >
            {selectedCountry}
          </button>

          {isOpen && (
            <div
              className={`absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg ${classNames?.dropdown ?? ''}`}
              style={styles?.dropdown}
            >
              <input
                role="combobox"
                type="text"
                placeholder="Search..."
                className={`w-full px-3 py-2 border-b border-gray-200 focus:outline-none text-sm ${classNames?.searchInput ?? ''}`}
                style={styles?.searchInput}
                onChange={onSearch}
              />
              <ul
                role="listbox"
                className={`max-h-60 overflow-auto text-sm text-gray-700 ${classNames?.list ?? ''}`}
                style={styles?.list}
              >
                {countries.map((country) => (
                  <label
                    key={country}
                    className={`flex items-center px-3 py-2 cursor-pointer hover:bg-violet-100 hover:text-gray-700 rounded ${selectedCountry === country ? `bg-violet-400 text-white ${classNames?.selectedCountry ?? ''}` : (classNames?.country ?? '')}`}
                    style={
                      selectedCountry === country
                        ? styles?.selectedCountry
                        : styles?.country
                    }
                  >
                    <input
                      type="radio"
                      name="country"
                      value={country}
                      className="hidden"
                      onChange={onCountrySelected}
                    />
                    <span className="flex items-center">
                      <span className="mr-2">{getCountryFlag(country)}</span>
                      <span>{country}</span>
                    </span>
                  </label>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectCountry;
