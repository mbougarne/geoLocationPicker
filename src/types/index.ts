export type { StyleOverrides } from './styles';

export type TCountriesWithPhoneCode = {
  name: string;
  code: string;
  timezone?: string;
  utc?: string;
  mobileCode: string;
};
