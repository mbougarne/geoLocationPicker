import { FC, ReactNode, useMemo, useState } from 'react';

import { countriesData, countryToCodeMap } from '../constants';
import { getFlagEmoji } from '../helpers';
import type {
  StyleOverrides,
  TCountrySelection,
  TSelectLabels,
} from '../types';
import {
  SelectDropdown,
  SelectDropdownSharedProps,
  SelectDropdownSlots,
  TDropdownOption,
} from './SelectDropdown';

const defaultLabels: TSelectLabels = {
  placeholder: 'Select a country',
  searchPlaceholder: 'Search...',
  noResults: 'No results found',
  clear: 'Clear selection',
};

type Props = StyleOverrides<SelectDropdownSlots> &
  SelectDropdownSharedProps & {
    /** Controlled value: an ISO 3166-1 alpha-2 code (e.g. 'MA'); null clears. */
    value?: string | null;
    /** Uncontrolled initial value: an ISO code. English names are also accepted. */
    defaultValue?: string;
    /** Called with the canonical English country name (kept for backwards compatibility). */
    onSelect?: (country: string) => void;
    /** Called with structured selection metadata, or null when cleared. */
    onChange?: (selection: TCountrySelection | null) => void;
    /** Localized display name for a country; searching matches it too. */
    getCountryName?: (code: string, name: string) => string;
    /** Custom flag renderer, e.g. to use SVG flag assets. Defaults to emoji. */
    renderFlag?: (code: string, name: string) => ReactNode;
    /** Show a clear button when a country is selected. */
    clearable?: boolean;
    labels?: Partial<TSelectLabels>;
  };

type CountryOption = TDropdownOption & TCountrySelection;

const isoCodes = new Set(Object.values(countryToCodeMap));

const resolveCode = (value: string | null | undefined): string | null => {
  if (!value) return null;
  const upper = value.toUpperCase();
  if (isoCodes.has(upper)) return upper;
  return countryToCodeMap[value] ?? null;
};

export const SelectCountry: FC<Props> = ({
  value,
  defaultValue,
  onSelect,
  onChange,
  getCountryName,
  renderFlag,
  clearable,
  labels,
  unstyled,
  classNames,
  styles,
  ...shared
}) => {
  const isControlled = value !== undefined;
  const [internalCode, setInternalCode] = useState<string | null>(() =>
    resolveCode(defaultValue)
  );
  const selectedCode = isControlled ? resolveCode(value) : internalCode;

  const options = useMemo<CountryOption[]>(
    () =>
      countriesData.map((name) => {
        const code = countryToCodeMap[name];
        const displayName = getCountryName?.(code, name) ?? name;
        const flag = (
          <span className={unstyled ? undefined : 'me-2'} aria-hidden="true">
            {renderFlag ? renderFlag(code, name) : getFlagEmoji(code)}
          </span>
        );
        const content = (
          <span className={unstyled ? undefined : 'flex items-center'}>
            {flag}
            <span>{displayName}</span>
          </span>
        );

        return {
          code,
          name,
          displayName,
          searchText: `${displayName} ${name} ${code}`.toLowerCase(),
          triggerContent: content,
          optionContent: content,
        };
      }),
    [getCountryName, renderFlag, unstyled]
  );

  const handleSelect = (option: TDropdownOption) => {
    const { code, name, displayName } = option as CountryOption;
    if (!isControlled) setInternalCode(code);
    onSelect?.(name);
    onChange?.({ code, name, displayName });
  };

  const handleClear = clearable
    ? () => {
        if (!isControlled) setInternalCode(null);
        onChange?.(null);
      }
    : undefined;

  return (
    <SelectDropdown
      options={options}
      selectedCode={selectedCode}
      onSelectOption={handleSelect}
      onClear={handleClear}
      labels={{ ...defaultLabels, ...labels }}
      formValue={selectedCode ?? ''}
      unstyled={unstyled}
      classNames={classNames}
      styles={styles}
      {...shared}
    />
  );
};

export default SelectCountry;
