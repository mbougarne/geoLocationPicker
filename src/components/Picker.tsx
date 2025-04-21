import React, {
  useState,
  useCallback,
  FC,
  useEffect,
  useRef,
  useMemo,
  useDeferredValue,
} from 'react';

import { continentsData, getTotalCountries } from '../constants';
import { ContinentsTabs } from './ContinentsTabs';
import { TabContent } from './TabContent';

type Props = {
  onChange?: (selected: Record<string, Set<string>>) => void;
};

const allCountries = Object.values(continentsData).flat();

export const GeoLocationPicker: FC<Props> = ({ onChange }) => {
  const [countries, setCountries] = useState<string[] | null>(null);
  const [query, setQuery] = useState<string>('');
  const deferredQuery = useDeferredValue(query);
  const [isFading, setIsFading] = useState<boolean>(false);
  const [selectedCountries, setSelectedCountries] = useState<
    Record<string, Set<string>>
  >({});
  const [activeTab, setActiveTab] = useState('All');
  const totalCountries = getTotalCountries();
  const selectAllCheckboxRef = useRef<HTMLInputElement>(null);
  const data = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(continentsData).map(([k, v]) => [k, [...v]])
      ),
    []
  );
  const getSelectionStats = useCallback(() => {
    const selectedCount = Object.values(selectedCountries).reduce(
      (a, s) => a + (s ? s.size : 0),
      0
    );
    return { selectedCount, totalCountries };
  }, [totalCountries, selectedCountries]);

  useEffect(() => {
    if (!selectAllCheckboxRef.current) return;

    const { selectedCount, totalCountries } = getSelectionStats();

    if (selectedCount === totalCountries) {
      selectAllCheckboxRef.current.checked = true;
      selectAllCheckboxRef.current.indeterminate = false;
    } else if (selectedCount === 0) {
      selectAllCheckboxRef.current.checked = false;
      selectAllCheckboxRef.current.indeterminate = false;
    } else {
      selectAllCheckboxRef.current.checked = false;
      selectAllCheckboxRef.current.indeterminate = true;
    }
  }, [getSelectionStats]);

  useEffect(() => {
    if (data) {
      setCountries(() => data['All']);
    }
  }, [data]);

  useEffect(() => {
    if (deferredQuery) {
      const result: string[] = [];

      Object.values(data).forEach((countryList) => {
        result.push(
          ...countryList.filter((c) =>
            c.toLowerCase().includes(deferredQuery.toLowerCase())
          )
        );
      });
      setCountries(result);
      setActiveTab('All');
    } else {
      setCountries(null);
    }
  }, [deferredQuery, data]);

  useEffect(() => {
    if (query !== deferredQuery) {
      setIsFading(true);
    } else {
      const timer = setTimeout(() => setIsFading(false), 100); // give time for deferred update
      return () => clearTimeout(timer);
    }
  }, [query, deferredQuery]);

  useEffect(() => {
    onChange?.(selectedCountries);
  }, [onChange, selectedCountries]);

  const handleSelectAll = () => {
    const { selectedCount, totalCountries } = getSelectionStats();

    setSelectedCountries((prev) => {
      const newSelected = { ...prev };

      if (activeTab === 'All') {
        // Handle "All" tab
        if (selectedCount === totalCountries) {
          // Deselect all countries
          Object.keys(data).forEach((continent) => {
            delete newSelected[continent];
          });
        } else {
          // Select all countries
          Object.entries(data).forEach(([continent, countryList]) => {
            newSelected[continent] = new Set(countryList);
          });
        }
      } else {
        // Handle specific continent tab
        const currentTabCountries = data[activeTab];
        const isAllSelected =
          newSelected[activeTab]?.size === currentTabCountries.length;

        if (isAllSelected) {
          // Deselect all countries in the active tab
          delete newSelected[activeTab];
        } else {
          // Select all countries in the active tab
          newSelected[activeTab] = new Set(currentTabCountries);
        }
      }

      return newSelected;
    });
  };

  const onCountryChange = (continent: string, country: string) => {
    setSelectedCountries((prev) => {
      const newSelected = new Set(prev[continent] || []);
      if (newSelected.has(country)) {
        newSelected.delete(country);
      } else {
        newSelected.add(country);
      }

      const updatedSelected = { ...prev, [continent]: newSelected };

      if (newSelected.size === 0) {
        delete updatedSelected[continent];
      }

      return updatedSelected;
    });
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setQuery(() => value);
  };

  const countriesToRender = useMemo(() => {
    return activeTab === 'All'
      ? (countries ?? Object.values(data).flat())
      : data[activeTab];
  }, [activeTab, countries, data]);

  return (
    <div className="p-4 space-y-4">
      <div className="w-full max-w-full px-4 mx-auto">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="search-input"
            value={query}
            className="block w-full py-4 pr-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search or filter items..."
            onChange={onSearch}
          />
        </div>
      </div>
      <label className="flex items-center">
        <input
          type="checkbox"
          ref={selectAllCheckboxRef}
          onChange={handleSelectAll}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <strong className="ml-2">
          ({getSelectionStats().selectedCount}/
          {getSelectionStats().totalCountries}) Select All
        </strong>
      </label>

      <ContinentsTabs
        data={data}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div
        className={`transition-opacity duration-300 ${isFading ? 'opacity-50' : 'opacity-100'}`}
      >
        {activeTab === 'All' ? (
          <TabContent
            data={data}
            countries={countriesToRender}
            selectedCountries={selectedCountries}
            onCountryChange={onCountryChange}
          />
        ) : (
          <TabContent
            data={data}
            countries={allCountries}
            selectedCountries={selectedCountries}
            onCountryChange={onCountryChange}
          />
        )}
      </div>
    </div>
  );
};

export default GeoLocationPicker;
