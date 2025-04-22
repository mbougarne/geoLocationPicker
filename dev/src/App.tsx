import { useEffect, useState } from 'react';
import { GeoLocationPicker, SelectCountry, SelectPhoneCode } from 'geo-location-picker';

import 'geo-location-picker/dist/src/index.css'

function App() {
  const [countries, setCountries] = useState<Record<string, Set<string>>>();
  const [country, setCountry] = useState<string>('');
  const [phoneCode, setPhoneCode] = useState<string>('');

  useEffect(() => {
    console.log(countries);
  }, [countries]);

  useEffect(() => {
    console.log(country);
  }, [country]);

  useEffect(() => {
    console.log(phoneCode)
  }, [phoneCode]);

  return (
    <>
      <SelectCountry onSelect={setCountry} />
      <SelectPhoneCode onSelect={setPhoneCode} />
      <GeoLocationPicker onChange={selected => setCountries(selected)}/>
    </>
  )
}

export default App
