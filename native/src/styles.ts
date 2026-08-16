import { StyleSheet } from 'react-native';

export const geoLocationStyles = StyleSheet.create({
  root: { padding: 16, gap: 12 },
  searchInput: {
    borderColor: '#d1d5db',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  tabs: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tab: {
    borderColor: '#e5e7eb',
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  activeTab: { backgroundColor: '#8b5cf6', borderColor: '#8b5cf6' },
  tabText: { color: '#374151', fontSize: 13 },
  activeTabText: { color: '#ffffff' },
  selectAll: { alignItems: 'center', flexDirection: 'row', gap: 8 },
  selectAllText: { color: '#111827', fontSize: 15, fontWeight: '600' },
  countryList: { gap: 4 },
  country: {
    alignItems: 'center',
    borderRadius: 6,
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  countryText: { color: '#374151', fontSize: 15 },
  selectedCountry: { backgroundColor: '#ede9fe' },
  selectedCountryText: { color: '#5b21b6', fontWeight: '600' },
});

export const selectCountryStyles = StyleSheet.create({
  root: { padding: 16, gap: 12 },
  trigger: {
    borderColor: '#d1d5db',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  triggerText: { color: '#111827', fontSize: 16 },
  dropdown: {
    borderColor: '#e5e7eb',
    borderRadius: 8,
    borderWidth: 1,
    maxHeight: 280,
  },
  searchInput: {
    borderBottomColor: '#e5e7eb',
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  country: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  countryText: { color: '#374151', fontSize: 15 },
  selectedCountry: { backgroundColor: '#8b5cf6' },
  selectedCountryText: { color: '#ffffff' },
});

export const selectPhoneCodeStyles = StyleSheet.create({
  root: { padding: 16, gap: 12 },
  trigger: {
    borderColor: '#d1d5db',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  triggerText: { color: '#111827', fontSize: 16 },
  dropdown: {
    borderColor: '#e5e7eb',
    borderRadius: 8,
    borderWidth: 1,
    maxHeight: 280,
  },
  searchInput: {
    borderBottomColor: '#e5e7eb',
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  country: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  countryText: { color: '#374151', fontSize: 15 },
  selectedCountry: { backgroundColor: '#0ea5e9' },
  selectedCountryText: { color: '#ffffff' },
});
