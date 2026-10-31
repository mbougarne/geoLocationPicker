export type { StyleOverrides } from './styles';

export type TCountriesWithPhoneCode = {
  name: string;
  code: string;
  timezone?: string;
  utc?: string;
  mobileCode: string;
};

export type TCountrySelection = {
  /** ISO 3166-1 alpha-2 country code, e.g. 'MA'. */
  code: string;
  /** Canonical English country name, e.g. 'Morocco'. */
  name: string;
  /** Name shown in the UI; differs from `name` when `getCountryName` is provided. */
  displayName: string;
};

export type TPhoneCodeSelection = TCountrySelection & {
  /** International dialing prefix, e.g. '+212'. Shared by several countries. */
  dialCode: string;
};

export type TSelectLabels = {
  /** Trigger text while nothing is selected. */
  placeholder: string;
  /** Placeholder and accessible label of the search input. */
  searchPlaceholder: string;
  /** Text shown when the search matches no country. */
  noResults: string;
  /** Accessible label of the clear button. */
  clear: string;
};
