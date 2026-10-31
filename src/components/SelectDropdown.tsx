import {
  FC,
  KeyboardEvent,
  ReactNode,
  useDeferredValue,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { StyleOverrides, TSelectLabels } from '../types';

export type TDropdownOption = {
  code: string;
  searchText: string;
  triggerContent: ReactNode;
  optionContent: ReactNode;
};

export type SelectDropdownSlots =
  | 'root'
  | 'container'
  | 'trigger'
  | 'dropdown'
  | 'searchInput'
  | 'list'
  | 'country'
  | 'selectedCountry'
  | 'clearButton'
  | 'noResults';

export type SelectDropdownSharedProps = {
  disabled?: boolean;
  required?: boolean;
  id?: string;
  /** Form field name; when set, the selected value is submitted with the form. */
  name?: string;
  /** Drop all built-in classes so the consumer's CSS fully controls styling. */
  unstyled?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
};

type Props = StyleOverrides<SelectDropdownSlots> &
  SelectDropdownSharedProps & {
    options: TDropdownOption[];
    selectedCode: string | null;
    onSelectOption: (option: TDropdownOption) => void;
    onClear?: () => void;
    labels: TSelectLabels;
    formValue: string;
  };

const cx = (unstyled: boolean | undefined, base: string, extra?: string) =>
  [unstyled ? '' : base, extra ?? ''].filter(Boolean).join(' ');

const visuallyHidden: React.CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  border: 0,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  pointerEvents: 'none',
};

export const SelectDropdown: FC<Props> = ({
  options,
  selectedCode,
  onSelectOption,
  onClear,
  labels,
  formValue,
  disabled,
  required,
  id,
  name,
  unstyled,
  classNames,
  styles,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-invalid': ariaInvalid,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const deferredQuery = useDeferredValue(query);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const reactId = useId();
  const baseId = id ?? reactId;
  const listboxId = `${baseId}-listbox`;
  const optionId = (code: string) => `${baseId}-option-${code}`;

  const selectedOption = useMemo(
    () => options.find((option) => option.code === selectedCode) ?? null,
    [options, selectedCode]
  );

  const filteredOptions = useMemo(() => {
    const normalized = deferredQuery.trim().toLowerCase();
    if (!normalized) return options;
    return options.filter((option) => option.searchText.includes(normalized));
  }, [options, deferredQuery]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [deferredQuery]);

  useEffect(() => {
    const activeOption = filteredOptions[activeIndex];
    if (isOpen && activeOption) {
      document
        .getElementById(`${baseId}-option-${activeOption.code}`)
        ?.scrollIntoView?.({ block: 'nearest' });
    }
  }, [isOpen, activeIndex, filteredOptions, baseId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setQuery('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const closeDropdown = () => {
    setIsOpen(false);
    setQuery('');
  };

  const openDropdown = () => {
    const selectedIndex = selectedOption ? options.indexOf(selectedOption) : 0;
    setActiveIndex(selectedIndex < 0 ? 0 : selectedIndex);
    setIsOpen(true);
  };

  const handleToggle = () => {
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  const selectOption = (option: TDropdownOption) => {
    onSelectOption(option);
    closeDropdown();
    triggerRef.current?.focus();
  };

  const onTriggerKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) openDropdown();
    }
  };

  const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (filteredOptions.length) {
          setActiveIndex((i) => (i + 1) % filteredOptions.length);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (filteredOptions.length) {
          setActiveIndex(
            (i) => (i - 1 + filteredOptions.length) % filteredOptions.length
          );
        }
        break;
      case 'Home':
        e.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setActiveIndex(Math.max(filteredOptions.length - 1, 0));
        break;
      case 'Enter': {
        // preventDefault so selecting never submits a surrounding form
        e.preventDefault();
        const active = filteredOptions[activeIndex];
        if (active) selectOption(active);
        break;
      }
      case 'Escape':
        e.preventDefault();
        closeDropdown();
        triggerRef.current?.focus();
        break;
      case 'Tab':
        closeDropdown();
        break;
    }
  };

  const activeOption = filteredOptions[activeIndex];

  return (
    <div
      className={cx(unstyled, 'p-4 space-y-4', classNames?.root)}
      style={styles?.root}
    >
      <div
        className={cx(
          unstyled,
          'w-full max-w-full px-4 mx-auto',
          classNames?.container
        )}
        style={styles?.container}
      >
        <div ref={dropdownRef} className="relative">
          <button
            ref={triggerRef}
            type="button"
            id={baseId}
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-required={required || undefined}
            aria-invalid={ariaInvalid}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
            aria-describedby={ariaDescribedby}
            data-state={isOpen ? 'open' : 'closed'}
            data-disabled={disabled || undefined}
            className={cx(
              unstyled,
              'w-full text-start ps-3 pe-10 py-2 border cursor-pointer border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm bg-white disabled:cursor-not-allowed disabled:opacity-50',
              classNames?.trigger
            )}
            style={styles?.trigger}
            onClick={handleToggle}
            onKeyDown={onTriggerKeyDown}
          >
            {selectedOption
              ? selectedOption.triggerContent
              : labels.placeholder}
          </button>

          {onClear && selectedOption && !disabled && (
            <button
              type="button"
              aria-label={labels.clear}
              className={cx(
                unstyled,
                'absolute end-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600',
                classNames?.clearButton
              )}
              style={styles?.clearButton}
              onClick={onClear}
            >
              ×
            </button>
          )}

          {name &&
            (required ? (
              <input
                tabIndex={-1}
                aria-hidden="true"
                name={name}
                value={formValue}
                required
                onChange={() => undefined}
                onFocus={() => triggerRef.current?.focus()}
                style={visuallyHidden}
              />
            ) : (
              <input type="hidden" name={name} value={formValue} />
            ))}

          {isOpen && (
            <div
              className={cx(
                unstyled,
                'absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg',
                classNames?.dropdown
              )}
              style={styles?.dropdown}
            >
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-expanded={true}
                aria-controls={listboxId}
                aria-activedescendant={
                  activeOption ? optionId(activeOption.code) : undefined
                }
                aria-autocomplete="list"
                aria-label={labels.searchPlaceholder}
                placeholder={labels.searchPlaceholder}
                value={query}
                className={cx(
                  unstyled,
                  'w-full px-3 py-2 border-b border-gray-200 focus:outline-none text-sm',
                  classNames?.searchInput
                )}
                style={styles?.searchInput}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
              />
              {filteredOptions.length === 0 ? (
                <div
                  role="status"
                  className={cx(
                    unstyled,
                    'px-3 py-2 text-sm text-gray-500',
                    classNames?.noResults
                  )}
                  style={styles?.noResults}
                >
                  {labels.noResults}
                </div>
              ) : (
                <ul
                  role="listbox"
                  id={listboxId}
                  aria-label={ariaLabel ?? labels.placeholder}
                  className={cx(
                    unstyled,
                    'max-h-60 overflow-auto text-sm text-gray-700',
                    classNames?.list
                  )}
                  style={styles?.list}
                >
                  {filteredOptions.map((option, index) => {
                    const isSelected = option.code === selectedCode;
                    const isActive = index === activeIndex;

                    return (
                      <li
                        key={option.code}
                        id={optionId(option.code)}
                        role="option"
                        aria-selected={isSelected}
                        data-selected={isSelected || undefined}
                        data-active={isActive || undefined}
                        className={cx(
                          unstyled,
                          `flex items-center px-3 py-2 cursor-pointer rounded ${
                            isSelected
                              ? 'bg-violet-400 text-white'
                              : isActive
                                ? 'bg-violet-100 text-gray-700'
                                : ''
                          }`,
                          isSelected
                            ? classNames?.selectedCountry
                            : classNames?.country
                        )}
                        style={
                          isSelected ? styles?.selectedCountry : styles?.country
                        }
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => selectOption(option)}
                      >
                        {option.optionContent}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
