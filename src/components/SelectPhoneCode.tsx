import {
  FC,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { countriesWithPhoneCode as data } from '../constants';
import { getCountryFlag } from '../helpers';
import { TCountriesWithPhoneCode } from '../types';

type Props = {
  onSelect?: (country: string) => void;
};

const splitValue = (value: string): [string, string] | null => {
  if (!value.includes(',')) return null;
  const [first, second] = value.split(',');
  return [first, second];
};

export const SelectPhoneCode: FC<Props> = ({ onSelect }) => {
  const [countries, setCountries] = useState<TCountriesWithPhoneCode[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] =
    useState<string>('Select Phone Code');
  const [query, setQuery] = useState<string>('');
  const deferredQuery = useDeferredValue(query);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (deferredQuery) {
      setCountries(() =>
        data.filter(
          (c) =>
            c.name.toLowerCase().includes(deferredQuery.toLowerCase()) ||
            c.mobileCode.includes(deferredQuery)
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

    const splitted = splitValue(value);

    if (!splitted) return;

    const [phoneCode, countryName] = splitted;

    onSelect?.(phoneCode);
    setIsOpen(false);
    setSelectedCountry(`${countryName} ${phoneCode}`);
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setQuery(() => value);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="w-full max-w-full px-4 mx-auto">
        <div ref={dropdownRef} className="relative">
          <button
            className="w-full text-left pl-3 pr-10 py-2 border cursor-pointer border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm bg-white"
            onClick={handleToggleDropdown}
          >
            {selectedCountry}
          </button>

          {isOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
              <input
                role="combobox"
                type="text"
                placeholder="Search..."
                className="w-full px-3 py-2 border-b border-gray-200 focus:outline-none text-sm"
                onChange={onSearch}
              />
              <ul
                role="listbox"
                className="max-h-60 overflow-auto text-sm text-gray-700"
              >
                {countries.map((country) => (
                  <label
                    key={country.code}
                    className={`flex items-center px-3 py-2 cursor-pointer hover:bg-violet-100 hover:text-gray-700 rounded ${(selectedCountry === country.name || selectedCountry === country.mobileCode) && 'bg-violet-400 text-white'}`}
                  >
                    <input
                      type="radio"
                      name="country"
                      value={`${country.mobileCode},${country.name}`}
                      className="hidden"
                      onChange={onCountrySelected}
                    />
                    <span className="flex items-center">
                      <span className="mr-2">
                        {getCountryFlag(country.name)}
                      </span>
                      <span>{country.mobileCode}</span>
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

export default SelectPhoneCode;
