import { JSX } from 'react';
import ReactCountryFlag from 'react-country-flag';

import { countryToCodeMap } from '../constants';

export const getCountryFlag = (
  country: string,
  width: string | number = '.85rem',
  height: string | number = '0.85rem'
): JSX.Element => {
  const countryCode = countryToCodeMap[country];

  if (!countryCode) return <span>🏳️</span>;

  return (
    <ReactCountryFlag countryCode={countryCode} svg style={{ width, height }} />
  );
};
