import { useState, useCallback, FC, useEffect, useRef } from 'react';

import { getCountryFlag } from '../helpers';
import { continentsData as data, getTotalCountries } from '../constants';
import { ContinentsTabs } from './ContinentsTabs';

type SelectedCountriesState = Record<string, Set<string>>;

export const GeoLocationPicker: FC = () => {
  const [selectedCountries, setSelectedCountries] =
    useState<SelectedCountriesState>({});
  const [activeTab, setActiveTab] = useState('All');
  const totalCountries = getTotalCountries();
  const selectAllCheckboxRef = useRef<HTMLInputElement>(null);

  // Calculate the total number of selected countries across all tabs
  const getTotalSelectedCountries = useCallback(() => {
    return Object.values(selectedCountries).reduce(
      (acc, set) => acc + (set ? set.size : 0),
      0
    );
  }, [selectedCountries]);

  const getSelectionStats = useCallback(() => {
    const selectedCount = getTotalSelectedCountries();
    return { selectedCount, totalCountries };
  }, [getTotalSelectedCountries, totalCountries]);

  const handleSelectAll = () => {
    const { selectedCount, totalCountries } = getSelectionStats();

    setSelectedCountries((prev) => {
      const newSelected = { ...prev };

      if (selectedCount === totalCountries) {
        // If all countries are selected, deselect all
        Object.keys(data).forEach((continent) => {
          delete newSelected[continent];
        });
      } else {
        // If not all countries are selected, select all
        Object.entries(data).forEach(([continent, countryList]) => {
          newSelected[continent] = new Set(countryList);
        });
      }

      return newSelected;
    });
  };

  const handleCountryChange = (continent: string, country: string) => {
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

  const renderCountries = (countries: string[], continent?: string) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {countries.map((country) => {
          // Determine if the country is selected
          const isSelected = Object.entries(selectedCountries).some(
            ([cont, selectedSet]) => selectedSet?.has(country)
          );

          return (
            <label key={country} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => {
                  const countryContinent = Object.entries(data).find(
                    ([cont, countryList]) => countryList.includes(country)
                  )?.[0];
                  if (countryContinent) {
                    handleCountryChange(countryContinent, country);
                  }
                }}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="flex items-center">
                <span className="mr-2">{getCountryFlag(country)}</span>
                <span>{country}</span>
              </span>
            </label>
          );
        })}
      </div>
    );
  };

  // Update the Select All checkbox state (checked, unchecked, indeterminate)
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
  }, [selectedCountries, getSelectionStats]);

  return (
    <div className="p-4 space-y-4">
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

      {activeTab === 'All'
        ? renderCountries(Object.values(data).flat())
        : renderCountries(data[activeTab], activeTab)}
    </div>
  );
};

export default GeoLocationPicker;
