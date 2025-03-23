import { getCountryFlag } from '../helpers';

type Props = {
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
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {countries.map((country) => {
        const isSelected = Object.entries(selectedCountries).some(
          ([_, selectedSet]) => selectedSet?.has(country)
        );

        return (
          <label key={country} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => {
                const countryContinent = Object.entries(data).find(
                  ([_, countryList]) => countryList.includes(country)
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
};
