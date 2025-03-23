import { useState, useCallback, FC, useEffect, useRef } from 'react';

import { continentsData as data, getTotalCountries } from '../constants';
import { ContinentsTabs } from './ContinentsTabs';
import { TabContent } from './TabContent';

const allCountries = Object.values(data).flat();

export const GeoLocationPicker: FC = () => {
  const [selectedCountries, setSelectedCountries] = useState<
    Record<string, Set<string>>
  >({});
  const [activeTab, setActiveTab] = useState('All');
  const totalCountries = getTotalCountries();
  const selectAllCheckboxRef = useRef<HTMLInputElement>(null);

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

  const handleSelectAll = () => {
    const { selectedCount, totalCountries } = getSelectionStats();

    setSelectedCountries((prev) => {
      const newSelected = { ...prev };

      if (selectedCount === totalCountries) {
        Object.keys(data).forEach((continent) => {
          delete newSelected[continent];
        });
      } else {
        Object.entries(data).forEach(([continent, countryList]) => {
          newSelected[continent] = new Set(countryList);
        });
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

      {activeTab === 'All' ? (
        <TabContent
          data={data}
          countries={allCountries}
          selectedCountries={selectedCountries}
          onCountryChange={onCountryChange}
        />
      ) : (
        <TabContent
          data={data}
          countries={data[activeTab]}
          selectedCountries={selectedCountries}
          onCountryChange={onCountryChange}
        />
      )}
    </div>
  );
};

export default GeoLocationPicker;
