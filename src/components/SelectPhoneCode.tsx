import { FC, ReactNode, useMemo, useState } from 'react';

import { countriesWithPhoneCode } from '../constants';
import { getFlagEmoji } from '../helpers';
import type {
  StyleOverrides,
  TPhoneCodeSelection,
  TSelectLabels,
} from '../types';
import {
  SelectDropdown,
  SelectDropdownSharedProps,
  SelectDropdownSlots,
  TDropdownOption,
} from './SelectDropdown';

const defaultLabels: TSelectLabels = {
  placeholder: 'Select Phone Code',
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
    /** Called with the dialing prefix, e.g. '+212' (kept for backwards compatibility). */
    onSelect?: (phoneCode: string) => void;
    /** Called with structured selection metadata, or null when cleared. */
    onChange?: (selection: TPhoneCodeSelection | null) => void;
    /** Localized display name for a country; searching matches it too. */
    getCountryName?: (code: string, name: string) => string;
    /** Custom flag renderer, e.g. to use SVG flag assets. Defaults to emoji. */
    renderFlag?: (code: string, name: string) => ReactNode;
    /** Show a clear button when a phone code is selected. */
    clearable?: boolean;
    /** Which value the form submits under `name`: the ISO code (default, stable
     * for countries that share a prefix) or the dialing prefix. */
    formValue?: 'code' | 'dialCode';
    labels?: Partial<TSelectLabels>;
  };

type PhoneOption = TDropdownOption & TPhoneCodeSelection;

const resolveCode = (value: string | null | undefined): string | null => {
  if (!value) return null;
  const upper = value.toUpperCase();
  const match = countriesWithPhoneCode.find(
    (country) => country.code === upper || country.name === value
  );
  return match?.code ?? null;
};

export const SelectPhoneCode: FC<Props> = ({
  value,
  defaultValue,
  onSelect,
  onChange,
  getCountryName,
  renderFlag,
  clearable,
  formValue = 'code',
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

  const options = useMemo<PhoneOption[]>(
    () =>
      countriesWithPhoneCode.map(({ name, code, mobileCode }) => {
        const displayName = getCountryName?.(code, name) ?? name;
        const flag = (
          <span className={unstyled ? undefined : 'me-2'} aria-hidden="true">
            {renderFlag ? renderFlag(code, name) : getFlagEmoji(code)}
          </span>
        );

        return {
          code,
          name,
          displayName,
          dialCode: mobileCode,
          searchText:
            `${displayName} ${name} ${code} ${mobileCode}`.toLowerCase(),
          triggerContent: (
            <span className={unstyled ? undefined : 'flex items-center'}>
              {flag}
              <span>
                {displayName} {mobileCode}
              </span>
            </span>
          ),
          optionContent: (
            <span className={unstyled ? undefined : 'flex items-center'}>
              {flag}
              <span>
                {mobileCode} {displayName}
              </span>
            </span>
          ),
        };
      }),
    [getCountryName, renderFlag, unstyled]
  );

  const selectedOption =
    options.find((option) => option.code === selectedCode) ?? null;

  const handleSelect = (option: TDropdownOption) => {
    const { code, name, displayName, dialCode } = option as PhoneOption;
    if (!isControlled) setInternalCode(code);
    onSelect?.(dialCode);
    onChange?.({ code, name, displayName, dialCode });
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
      formValue={
        formValue === 'dialCode'
          ? (selectedOption?.dialCode ?? '')
          : (selectedCode ?? '')
      }
      unstyled={unstyled}
      classNames={classNames}
      styles={styles}
      {...shared}
    />
  );
};

export default SelectPhoneCode;
