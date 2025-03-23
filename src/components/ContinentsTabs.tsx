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
    <div className="flex space-x-2 justify-center self-center">
      {['All', ...Object.keys(data)].map((continent) => (
        <button
          key={continent}
          className={`px-2 py-2 rounded-full hover:cursor-pointer text-sm ${
            activeTab === continent
              ? 'bg-violet-500 text-white'
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
