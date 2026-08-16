import { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';

import { continentsData } from '../../src/constants';
import { CountryFlag } from './CountryFlag';
import { geoLocationStyles } from './styles';
import type { GeoLocationPickerProps } from './types';

const continentNames = Object.keys(continentsData);
const tabs = ['All', ...continentNames];

export function GeoLocationPicker({
  onChange,
  styles,
  textInputProps,
}: GeoLocationPickerProps) {
  const [activeTab, setActiveTab] = useState('All');
  const [query, setQuery] = useState('');
  const [selectedCountries, setSelectedCountries] = useState<
    Record<string, Set<string>>
  >({});
  const onChangeRef = useRef(onChange);
  const hasSelectionChange = useRef(false);
  const countriesToRender = useMemo(() => {
    const countries =
      activeTab === 'All'
        ? Object.values(continentsData).flat()
        : (continentsData[activeTab] ?? []);
    const normalizedQuery = query.trim().toLowerCase();

    return normalizedQuery
      ? countries.filter((country) =>
          country.toLowerCase().includes(normalizedQuery)
        )
      : countries;
  }, [activeTab, query]);

  const selectedCount = Object.values(selectedCountries).reduce(
    (total, countries) => total + countries.size,
    0
  );
  const totalCount = Object.values(continentsData).reduce(
    (total, countries) => total + countries.length,
    0
  );

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!hasSelectionChange.current) return;
    onChangeRef.current?.(selectedCountries);
  }, [selectedCountries]);

  const toggleCountry = (country: string) => {
    const continent = continentNames.find((name) =>
      continentsData[name].includes(country)
    );
    if (!continent) return;

    hasSelectionChange.current = true;
    setSelectedCountries((current) => {
      const next = { ...current };
      const selected = new Set(next[continent] ?? []);

      if (selected.has(country)) selected.delete(country);
      else selected.add(country);

      if (selected.size === 0) delete next[continent];
      else next[continent] = selected;

      return next;
    });
  };

  const toggleSelectAll = () => {
    hasSelectionChange.current = true;
    setSelectedCountries((current) => {
      const next = { ...current };
      const names = activeTab === 'All' ? continentNames : [activeTab];
      const selectedInScope = names.reduce(
        (total, name) => total + (next[name]?.size ?? 0),
        0
      );
      const totalInScope = names.reduce(
        (total, name) => total + continentsData[name].length,
        0
      );

      if (selectedInScope === totalInScope) {
        names.forEach((name) => delete next[name]);
      } else {
        names.forEach((name) => {
          next[name] = new Set(continentsData[name]);
        });
      }

      return next;
    });
  };

  return (
    <View style={[geoLocationStyles.root, styles?.root]}>
      <TextInput
        {...textInputProps}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={setQuery}
        placeholder={textInputProps?.placeholder ?? 'Search countries'}
        style={[geoLocationStyles.searchInput, styles?.searchInput]}
        value={query}
      />

      <View style={[geoLocationStyles.tabs, styles?.tabs]}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <Pressable
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[
                geoLocationStyles.tab,
                styles?.tab,
                isActive && geoLocationStyles.activeTab,
                isActive && styles?.activeTab,
              ]}
            >
              <Text
                style={[
                  geoLocationStyles.tabText,
                  styles?.tabText,
                  isActive && geoLocationStyles.activeTabText,
                  isActive && styles?.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: selectedCount === totalCount }}
        onPress={toggleSelectAll}
        style={[geoLocationStyles.selectAll, styles?.selectAll]}
      >
        <Text style={[geoLocationStyles.selectAllText, styles?.selectAllText]}>
          Select all ({selectedCount}/{totalCount})
        </Text>
      </Pressable>

      <FlatList
        data={countriesToRender}
        keyExtractor={(country) => country}
        nestedScrollEnabled
        renderItem={({ item: country }) => {
          const isSelected = Object.values(selectedCountries).some((set) =>
            set.has(country)
          );

          return (
            <Pressable
              accessibilityRole="checkbox"
              accessibilityState={{ checked: isSelected }}
              onPress={() => toggleCountry(country)}
              style={[
                geoLocationStyles.country,
                styles?.country,
                isSelected && geoLocationStyles.selectedCountry,
                isSelected && styles?.selectedCountry,
              ]}
            >
              <CountryFlag country={country} style={styles?.flag} />
              <Text
                style={[
                  geoLocationStyles.countryText,
                  styles?.countryText,
                  isSelected && geoLocationStyles.selectedCountryText,
                  isSelected && styles?.selectedCountryText,
                ]}
              >
                {country}
              </Text>
            </Pressable>
          );
        }}
        style={styles?.countryList}
      />
    </View>
  );
}
