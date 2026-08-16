import React from 'react';
import { getTotalCountriesPerContinent } from '../constants';
import type { StyleOverrides } from '../types';

type Slots = 'root' | 'tab' | 'activeTab' | 'inactiveTab';

type Props = StyleOverrides<Slots> & {
  data: Record<string, string[]>;
  activeTab: string;
  setActiveTab: (state: React.SetStateAction<string>) => void;
};

export const ContinentsTabs: React.FC<Props> = ({
  data,
  activeTab,
  setActiveTab,
  classNames,
  styles,
}) => {
  const totalCountries = getTotalCountriesPerContinent();

  return (
    <div
      className={`flex space-x-2 justify-center self-center ${classNames?.root ?? ''}`}
      style={styles?.root}
    >
      {['All', ...Object.keys(data)].map((continent) => (
        <button
          key={continent}
          className={`px-2 py-2 rounded-full hover:cursor-pointer text-sm ${
            activeTab === continent
              ? `bg-violet-500 text-white ${classNames?.activeTab ?? ''}`
              : `bg-gray-50 hover:bg-gray-100 ${classNames?.inactiveTab ?? ''}`
          } ${classNames?.tab ?? ''}`}
          style={
            activeTab === continent ? styles?.activeTab : styles?.inactiveTab
          }
          onClick={() => setActiveTab(continent)}
        >
          {continent} ({totalCountries[continent]})
        </button>
      ))}
    </div>
  );
};
