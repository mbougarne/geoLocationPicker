import { JSX } from 'react';

import { countryToCodeMap } from '../constants';

/** Regional-indicator emoji for an ISO 3166-1 alpha-2 code; works offline. */
export const getFlagEmoji = (countryCode: string): string => {
  if (!/^[A-Za-z]{2}$/.test(countryCode)) return '🏳️';

  return [...countryCode.toUpperCase()]
    .map((letter) => String.fromCodePoint(0x1f1e6 + letter.charCodeAt(0) - 65))
    .join('');
};

export const getCountryFlag = (country: string): JSX.Element => {
  const countryCode = countryToCodeMap[country];

  return (
    <span aria-hidden="true">
      {countryCode ? getFlagEmoji(countryCode) : '🏳️'}
    </span>
  );
};
