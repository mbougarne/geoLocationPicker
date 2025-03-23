import React from 'react';
import { getTotalCountriesPerContinent } from '../constants';

type Props = {
  data: Record<string, string[]>;
  activeTab: string;
  setActiveTab: (state: React.SetStateAction<string>) => void;
};

export const ContinentsTabs: React.FC<Props> = ({
  data,
  activeTab,
  setActiveTab,
}) => {
  const totalCountries = getTotalCountriesPerContinent();

  return (
    <div className="flex space-x-2">
      {['All', ...Object.keys(data)].map((continent) => (
        <button
          key={continent}
          className={`px-4 py-2 border rounded-full hover:cursor-pointer border-transparent ${
            activeTab === continent
              ? 'bg-blue-300 text-white'
              : 'bg-gray-50 hover:bg-gray-100'
          }`}
          onClick={() => setActiveTab(continent)}
        >
          {continent} ({totalCountries[continent]})
        </button>
      ))}
    </div>
  );
};
