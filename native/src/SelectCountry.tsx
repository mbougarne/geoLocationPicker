import React, { useDeferredValue, useEffect, useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';

import { countriesData } from '../../src/constants';
import { CountryFlag } from './CountryFlag';
import { selectCountryStyles } from './styles';
import type { SelectCountryProps } from './types';

export function SelectCountry({
  onSelect,
  placeholder = 'Select a country',
  styles,
  textInputProps,
  listProps,
}: SelectCountryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>();
  const deferredQuery = useDeferredValue(query);
  const [countries, setCountries] = useState(countriesData);

  useEffect(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();
    setCountries(
      normalizedQuery
        ? countriesData.filter((country) =>
            country.toLowerCase().includes(normalizedQuery)
          )
        : countriesData
    );
  }, [deferredQuery]);

  const selectCountry = (country: string) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setQuery('');
    onSelect?.(country);
  };

  return (
    <View style={[selectCountryStyles.root, styles?.root]}>
      <Pressable
        accessibilityRole="button"
        onPress={() => setIsOpen((open) => !open)}
        style={[selectCountryStyles.trigger, styles?.trigger]}
      >
        <Text style={[selectCountryStyles.triggerText, styles?.triggerText]}>
          {selectedCountry ?? placeholder}
        </Text>
      </Pressable>

      {isOpen && (
        <View style={[selectCountryStyles.dropdown, styles?.dropdown]}>
          <TextInput
            {...textInputProps}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={setQuery}
            placeholder={textInputProps?.placeholder ?? 'Search countries'}
            style={[selectCountryStyles.searchInput, styles?.searchInput]}
            value={query}
          />
          <FlatList
            {...listProps}
            data={countries}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled
            renderItem={({ item }) => {
              const isSelected = item === selectedCountry;
              return (
                <Pressable
                  accessibilityRole="radio"
                  accessibilityState={{ selected: isSelected }}
                  onPress={() => selectCountry(item)}
                  style={[
                    selectCountryStyles.country,
                    styles?.country,
                    isSelected && selectCountryStyles.selectedCountry,
                    isSelected && styles?.selectedCountry,
                  ]}
                >
                  <CountryFlag country={item} style={styles?.flag} />
                  <Text
                    style={[
                      selectCountryStyles.countryText,
                      styles?.countryText,
                      isSelected && selectCountryStyles.selectedCountryText,
                      isSelected && styles?.selectedCountryText,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              );
            }}
            keyExtractor={(item) => item}
            style={styles?.list}
          />
        </View>
      )}
    </View>
  );
}
