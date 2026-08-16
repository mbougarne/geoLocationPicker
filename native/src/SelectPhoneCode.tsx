import { useDeferredValue, useEffect, useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';

import { countriesWithPhoneCode } from '../../src/constants';
import { CountryFlag } from './CountryFlag';
import { selectPhoneCodeStyles } from './styles';
import type { SelectPhoneCodeProps } from './types';

export function SelectPhoneCode({
  onSelect,
  placeholder = 'Select phone code',
  styles,
  textInputProps,
  listProps,
}: SelectPhoneCodeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>();
  const deferredQuery = useDeferredValue(query);
  const [countries, setCountries] = useState(countriesWithPhoneCode);

  useEffect(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();
    setCountries(
      normalizedQuery
        ? countriesWithPhoneCode.filter(
            (country) =>
              country.name.toLowerCase().includes(normalizedQuery) ||
              country.mobileCode.includes(normalizedQuery)
          )
        : countriesWithPhoneCode
    );
  }, [deferredQuery]);

  const selectCountry = (countryName: string, phoneCode: string) => {
    setSelectedCountry(`${countryName} ${phoneCode}`);
    setIsOpen(false);
    setQuery('');
    onSelect?.(phoneCode);
  };

  return (
    <View style={[selectPhoneCodeStyles.root, styles?.root]}>
      <Pressable
        accessibilityRole="button"
        onPress={() => setIsOpen((open) => !open)}
        style={[selectPhoneCodeStyles.trigger, styles?.trigger]}
      >
        <Text style={[selectPhoneCodeStyles.triggerText, styles?.triggerText]}>
          {selectedCountry ?? placeholder}
        </Text>
      </Pressable>

      {isOpen && (
        <View style={[selectPhoneCodeStyles.dropdown, styles?.dropdown]}>
          <TextInput
            {...textInputProps}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={setQuery}
            placeholder={
              textInputProps?.placeholder ?? 'Search country or code'
            }
            style={[selectPhoneCodeStyles.searchInput, styles?.searchInput]}
            value={query}
          />
          <FlatList
            {...listProps}
            data={countries}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled
            renderItem={({ item }) => {
              const isSelected =
                selectedCountry === `${item.name} ${item.mobileCode}`;
              return (
                <Pressable
                  accessibilityRole="radio"
                  accessibilityState={{ selected: isSelected }}
                  onPress={() => selectCountry(item.name, item.mobileCode)}
                  style={[
                    selectPhoneCodeStyles.country,
                    styles?.country,
                    isSelected && selectPhoneCodeStyles.selectedCountry,
                    isSelected && styles?.selectedCountry,
                  ]}
                >
                  <CountryFlag country={item.name} style={styles?.flag} />
                  <Text
                    style={[
                      selectPhoneCodeStyles.countryText,
                      styles?.countryText,
                      isSelected && selectPhoneCodeStyles.selectedCountryText,
                      isSelected && styles?.selectedCountryText,
                    ]}
                  >
                    {item.name} {item.mobileCode}
                  </Text>
                </Pressable>
              );
            }}
            keyExtractor={(item) => item.code}
            style={styles?.list}
          />
        </View>
      )}
    </View>
  );
}
