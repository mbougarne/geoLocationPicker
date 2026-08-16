# React Native Entry

React Native selectors for countries and international phone codes, exported from the main `geo-location-picker` package.

## Status

The native entry provides `GeoLocationPicker`, `SelectCountry`, and `SelectPhoneCode` using React Native primitives.

## Usage

```tsx
import {
  GeoLocationPicker,
  SelectCountry,
  SelectPhoneCode,
} from 'geo-location-picker/native';

<SelectCountry
  onSelect={(country) => console.log(country)}
  styles={{
    trigger: { borderColor: '#0f766e' },
    selectedCountry: { backgroundColor: '#0f766e' },
  }}
/>

<SelectPhoneCode onSelect={(code) => console.log(code)} />

<GeoLocationPicker
  onChange={(selected) => console.log(selected)}
  styles={{
    activeTab: { backgroundColor: '#0f766e' },
    selectedCountry: { backgroundColor: '#ccfbf1' },
  }}
/>
```

The native entry uses `StyleSheet`-compatible `styles` slots instead of web Tailwind classes. Country rows render Unicode flags from the shared ISO country-code map and support the `flag` style slot. `react` and `react-native` are supplied by the consuming app.
