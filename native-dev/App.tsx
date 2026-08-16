import { useCallback, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  GeoLocationPicker,
  SelectCountry,
  SelectPhoneCode,
} from 'geo-location-picker-native';

export default function App() {
  const [country, setCountry] = useState('None');
  const [phoneCode, setPhoneCode] = useState('None');
  const [selectedCount, setSelectedCount] = useState(0);
  const handlePickerChange = useCallback(
    (selected: Record<string, Set<string>>) => {
      const count = Object.values(selected).reduce(
        (total, countries) => total + countries.size,
        0
      );
      setSelectedCount(count);
    },
    []
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} nestedScrollEnabled>
        <Text style={styles.eyebrow}>React Native playground</Text>
        <Text style={styles.title}>Geo Location Picker</Text>
        <Text style={styles.description}>
          Runtime preview for the native selectors and picker.
        </Text>

        <View style={styles.card}>
          <Text style={styles.heading}>Country selector</Text>
          <SelectCountry
            onSelect={setCountry}
            styles={{
              root: styles.componentRoot,
              trigger: styles.greenTrigger,
              selectedCountry: styles.greenSelected,
            }}
          />
          <Text style={styles.result}>Selected: {country}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>Phone code selector</Text>
          <SelectPhoneCode
            onSelect={setPhoneCode}
            styles={{
              root: styles.componentRoot,
              trigger: styles.blueTrigger,
              selectedCountry: styles.blueSelected,
            }}
          />
          <Text style={styles.result}>Selected: {phoneCode}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>Continent picker</Text>
          <GeoLocationPicker
            onChange={handlePickerChange}
            styles={{
              root: styles.componentRoot,
              activeTab: styles.tealTab,
              selectedCountry: styles.tealSelected,
            }}
          />
          <Text style={styles.result}>Selected countries: {selectedCount}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#f8fafc', flex: 1 },
  content: { gap: 16, padding: 24 },
  eyebrow: {
    color: '#0f766e',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  title: { color: '#0f172a', fontSize: 30, fontWeight: '800' },
  description: { color: '#475569', fontSize: 16 },
  card: {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    borderRadius: 14,
    borderWidth: 1,
    padding: 8,
  },
  heading: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  componentRoot: { padding: 16 },
  greenTrigger: { borderColor: '#059669' },
  greenSelected: { backgroundColor: '#059669' },
  blueTrigger: { borderColor: '#0284c7' },
  blueSelected: { backgroundColor: '#0284c7' },
  tealTab: { backgroundColor: '#0f766e', borderColor: '#0f766e' },
  tealSelected: { backgroundColor: '#ccfbf1' },
  result: { color: '#475569', padding: 16, paddingTop: 0 },
});
