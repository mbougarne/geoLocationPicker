import { GeoLocationPicker, SelectCountry } from 'geo-location-picker';

import 'geo-location-picker/dist/src/index.css'
import { useEffect, useState } from 'react';

function App() {
  const [countries, setCountries] = useState<Record<string, Set<string>>>();
  const [country, setCountry] = useState<string>('');

  useEffect(() => {
    console.log(countries);
  }, [countries]);

  useEffect(() => {
    console.log(country);
  }, [country]);

  return (
    <>
      <SelectCountry onSelect={setCountry} />
      <GeoLocationPicker onChange={selected => setCountries(selected)}/>
    </>
  )
}

export default App
