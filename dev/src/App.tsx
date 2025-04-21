import { GeoLocationPicker } from 'geo-location-picker';

import 'geo-location-picker/dist/src/index.css'
import { useEffect, useState } from 'react';

function App() {
  const [countries, setCountries] = useState<Record<string, Set<string>>>();

  useEffect(() => {
    console.log(countries);
  }, [countries]);

  return (
    <>
      <GeoLocationPicker onChange={selected => setCountries(selected)}/>
    </>
  )
}

export default App
