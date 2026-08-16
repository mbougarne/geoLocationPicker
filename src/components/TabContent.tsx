import { getCountryFlag } from '../helpers';
import type { StyleOverrides } from '../types';

type Slots = 'root' | 'country' | 'selectedCountry';

type Props = StyleOverrides<Slots> & {
  data: Record<string, string[]>;
  countries: string[];
  selectedCountries: Record<string, Set<string>>;
  onCountryChange: (continent: string, country: string) => void;
};

export const TabContent: React.FC<Props> = ({
  data,
  countries,
  selectedCountries,
  onCountryChange,
  classNames,
  styles,
}) => (
  <div
    className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2 ${classNames?.root ?? ''}`}
    style={styles?.root}
  >
    {countries.map((country) => {
      const isSelected = Object.entries(selectedCountries).some(
        ([, selectedSet]) => selectedSet?.has(country)
      );

      return (
        <label
          key={country}
          className={`flex items-center space-x-2 ${isSelected ? (classNames?.selectedCountry ?? '') : (classNames?.country ?? '')}`}
          style={isSelected ? styles?.selectedCountry : styles?.country}
        >
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => {
              const countryContinent = Object.entries(data).find(
                ([, countryList]) => countryList.includes(country)
              )?.[0];
              if (countryContinent) {
                onCountryChange(countryContinent, country);
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
