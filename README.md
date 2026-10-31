# 🌍 Geo Location Picker

**English** | [العربية](README.ar.md)

<img width="3840" height="1800" alt="preview-ezgif com-optimize" src="https://github.com/user-attachments/assets/df27ef5e-b187-42ff-80da-aca570d93624" />

<img width="724" height="1658" alt="phone" src="https://github.com/user-attachments/assets/a79692d2-9eb4-47b8-8bd1-779ce7498330" />


A lightweight and accessible React component library for selecting geographic data: countries by continent, country names, and international phone codes. Built with flexibility and styled using Tailwind CSS.

## ✨ Features

- 🌐 **GeoLocationPicker** – Select countries grouped by continent
- 🗼 **SelectCountry** – Searchable, accessible country dropdown with ISO 3166-1 alpha-2 values
- 📞 **SelectPhoneCode** – Select dialing prefixes while keeping country identity (e.g. US vs CA on `+1`)
- 🎛️ Controlled (`value`) and uncontrolled (`defaultValue`) usage, clearing, and `disabled` states
- 🌍 Localizable labels and country names, searchable in any language, RTL-ready
- 📋 Form friendly: `name`, `required`, `id`, ARIA labeling, no accidental submits
- 🏳️ Offline flags via emoji by default, or a custom `renderFlag`
- ⚡ Optimized with React's `useDeferredValue` for smooth typing
- 🎨 Default Tailwind-based styling, or bring your own CSS with `unstyled`
- 📦 Zero runtime dependencies

---

## 📦 Installation

Using **npm**:

```bash
npm install geo-location-picker
```

Using **yarn**:

```bash
yarn add geo-location-picker
```

Using **pnpm**:

```bash
pnpm add geo-location-picker
```

---

## 🧹 Components

### 1. `GeoLocationPicker`

```tsx
import { GeoLocationPicker } from 'geo-location-picker';

<GeoLocationPicker onChange={(selected) => console.log(selected)} />;
```

### 2. `SelectCountry`

```tsx
import { SelectCountry } from 'geo-location-picker';

// Uncontrolled with a saved ISO code
<SelectCountry
  defaultValue="MA"
  onChange={(selection) => console.log(selection)}
  // selection: { code: 'MA', name: 'Morocco', displayName: 'Morocco' } | null
/>;

// Controlled
<SelectCountry value={country} onChange={(s) => setCountry(s?.code ?? null)} />;
```

`value` / `defaultValue` take an ISO 3166-1 alpha-2 code (e.g. `'MA'`); English
country names are also accepted for backwards compatibility. Pass `value={null}`
to clear a controlled selection, or set `clearable` to show a clear button. The
legacy `onSelect` callback still fires with the English country name.

### 3. `SelectPhoneCode`

```tsx
import { SelectPhoneCode } from 'geo-location-picker';

<SelectPhoneCode
  defaultValue="CA"
  onChange={(selection) => console.log(selection)}
  // selection: { code: 'CA', name: 'Canada', displayName: 'Canada', dialCode: '+1' } | null
/>;
```

Countries are identified by ISO code, so countries sharing a dialing prefix
(e.g. the thirteen `+1` countries) never lose their identity. The legacy
`onSelect` callback still fires with the dialing prefix (e.g. `'+1'`).

---

## 🌍 Localization and RTL

All texts and country names are configurable on `SelectCountry` and
`SelectPhoneCode`:

```tsx
const displayNames = new Intl.DisplayNames(['fr'], { type: 'region' });

<SelectCountry
  getCountryName={(code) => displayNames.of(code) ?? code}
  labels={{
    placeholder: 'Choisir un pays',
    searchPlaceholder: 'Rechercher…',
    noResults: 'Aucun résultat',
    clear: 'Effacer la sélection',
  }}
/>;
```

- Searching matches the localized name, the English name, the ISO code, and
  (for `SelectPhoneCode`) the dialing prefix.
- Country identity (`code`, `name`) is independent of the display language.
- The layout uses CSS logical properties, so it follows the surrounding
  `dir="rtl"` automatically — no extra configuration needed for Arabic.

---

## 📋 Forms

```tsx
<form onSubmit={handleSubmit}>
  <SelectCountry name="country" required aria-labelledby="country-label" />
  <SelectPhoneCode name="phoneCode" formValue="dialCode" />
  <button type="submit">Save</button>
</form>
```

- The trigger is `type="button"`, so opening the picker never submits the form.
- With `name` set, the selected ISO code is submitted with the form
  (`SelectPhoneCode` can submit the dialing prefix instead via
  `formValue="dialCode"`).
- `required` blocks empty submission through native form validation.
- `disabled`, `id`, `aria-label`, `aria-labelledby`, `aria-describedby`, and
  `aria-invalid` are supported for labeling and error association.
- Multiple instances on one page are fully independent.

---

## 🎨 Styling

The default look is built with **Tailwind CSS utilities**, but consumers do
**not** need Tailwind. Import the precompiled stylesheet:

```ts
import 'geo-location-picker/styles.css';
// (the previous path 'geo-location-picker/dist/src/index.css' still works)
```

The stylesheet contains only the theme variables and utilities the components
use — **no Tailwind preflight/reset** — so it never alters your application's
global styles.

### Using your own CSS theme (no Tailwind)

Set `unstyled` to drop every built-in class and style the slots from your own
design system:

```tsx
<SelectCountry
  unstyled
  classNames={{
    trigger: 'my-input',
    dropdown: 'my-popover',
    country: 'my-option',
    selectedCountry: 'my-option my-option--selected',
  }}
/>
```

State hooks for plain CSS are exposed as data attributes: `data-state="open|closed"`
and `data-disabled` on the trigger, `data-selected` and `data-active` on options.

### Flags

Flags render as emoji by default, which works offline with no image requests
and no dependencies. To use your own assets (e.g. SVG flags):

```tsx
<SelectCountry renderFlag={(code) => <img src={`/flags/${code}.svg`} alt="" />} />
```

### Styling Overrides

The web components support Tailwind classes and inline React styles through `classNames` and `styles` props.

A **slot** is a named visual part of a component. For example, `root` is the outer wrapper, `trigger` is the button that opens a selector, and `selectedCountry` is a selected country row. Slot names let you style a specific part without depending on the component's internal HTML structure.

Use `classNames` when you want to add Tailwind utility classes:

```tsx
<SelectCountry
  classNames={{
    root: 'bg-slate-100 text-slate-900',
    trigger: 'border-emerald-500 bg-white',
    dropdown: 'border-emerald-200',
    selectedCountry: 'bg-emerald-600 text-white',
  }}
  onSelect={(country) => console.log(country)}
/>
```

Use `styles` when you want to bypass Tailwind and provide React inline styles directly:

```tsx
<SelectPhoneCode
  styles={{
    root: { fontFamily: 'system-ui' },
    trigger: {
      backgroundColor: '#0f172a',
      borderColor: '#0f766e',
      borderRadius: 12,
      color: '#f8fafc',
    },
    dropdown: { backgroundColor: '#f8fafc' },
  }}
  onSelect={(code) => console.log(code)}
/>
```

The two props can be used together. `classNames` adds classes and `styles` adds inline styles; inline styles take precedence when both set the same CSS property.

Available slots depend on the component:

- `GeoLocationPicker`: `root`, `searchContainer`, `searchInput`, `selectAll`, `selectAllLabel`, `content`, `tabs`, `activeTab`, `inactiveTab`, `countryList`, `country`, `selectedCountry`
- `SelectCountry` and `SelectPhoneCode`: `root`, `container`, `trigger`, `dropdown`, `searchInput`, `list`, `country`, `selectedCountry`, `clearButton`, `noResults`

---

## 🧠 Props

### `GeoLocationPicker`

| Prop         | Type                                                    | Description                           |
| ------------ | ------------------------------------------------------- | ------------------------------------- |
| `onChange`   | `(value: Record<string, Set<string>>) => void`          | Called when country selection changes |
| `classNames` | `Partial<Record<GeoLocationPickerSlot, string>>`        | Tailwind classes keyed by visual slot |
| `styles`     | `Partial<Record<GeoLocationPickerSlot, CSSProperties>>` | Inline styles keyed by visual slot    |

### `SelectCountry` and `SelectPhoneCode`

| Prop             | Type                                             | Description                                                                               |
| ---------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| `value`          | `string \| null`                                 | Controlled ISO 3166-1 alpha-2 code (`null` clears)                                        |
| `defaultValue`   | `string`                                         | Uncontrolled initial ISO code (English names accepted)                                     |
| `onChange`       | `(selection: TCountrySelection \| null) => void` | Structured selection: `code`, `name`, `displayName` (+ `dialCode` for `SelectPhoneCode`)  |
| `onSelect`       | `(value: string) => void`                        | Legacy callback: English name (`SelectCountry`) or dialing prefix (`SelectPhoneCode`)      |
| `getCountryName` | `(code: string, name: string) => string`         | Localized display name; also matched when searching                                        |
| `renderFlag`     | `(code: string, name: string) => ReactNode`      | Custom flag renderer (defaults to emoji)                                                   |
| `labels`         | `Partial<TSelectLabels>`                         | `placeholder`, `searchPlaceholder`, `noResults`, `clear`                                   |
| `clearable`      | `boolean`                                        | Show a clear button when something is selected                                             |
| `disabled`       | `boolean`                                        | Disable the picker                                                                         |
| `name`           | `string`                                         | Form field name; submits the selected ISO code                                             |
| `formValue`      | `'code' \| 'dialCode'`                           | `SelectPhoneCode` only: which value the form submits (default `'code'`)                    |
| `required`       | `boolean`                                        | Participates in native form validation                                                     |
| `id`             | `string`                                         | Id of the trigger button                                                                   |
| `unstyled`       | `boolean`                                        | Drop all built-in classes                                                                  |
| `aria-*`         | `string`                                         | `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-invalid` on the trigger         |
| `classNames`     | `Partial<Record<Slot, string>>`                  | Classes keyed by visual slot (adds `clearButton`, `noResults` slots)                       |
| `styles`         | `Partial<Record<Slot, CSSProperties>>`           | Inline styles keyed by visual slot                                                         |

---

## ♿ Accessibility

`SelectCountry` and `SelectPhoneCode` implement the combobox/listbox pattern:

- Trigger button with `aria-haspopup="listbox"` and `aria-expanded`
- Search input with `role="combobox"`, `aria-controls`, `aria-autocomplete="list"`,
  and `aria-activedescendant` tracking the highlighted option
- Options are real `role="option"` elements with `aria-selected`
- Keyboard: Arrow keys open the picker and move the highlight, Home/End jump,
  Enter selects, Escape closes and returns focus to the trigger, Tab closes
- Empty search results are announced through a `role="status"` element

## 🚚 Migrating from 1.x

Public callbacks and slot names are unchanged, but 2.0 contains breaking
changes to markup and defaults:

- Flags render as **emoji** by default instead of SVG images fetched from a CDN
  (the `react-country-flag` dependency was removed). Pass `renderFlag` to keep
  using SVG assets.
- Options are now `li[role="option"]` elements instead of labels wrapping
  hidden radio inputs. CSS or tests targeting those radios must be updated;
  the `classNames`/`styles` slots are the supported styling surface.
- The shipped stylesheet no longer includes the Tailwind preflight reset. If
  your app relied on it, add your own reset.
- `SelectPhoneCode` option rows now show the country name next to the dialing
  prefix, and hidden radios no longer leak a `country` field into surrounding
  forms (use the `name` prop for form participation).

## Development

See [CONTRIBUTING.md](CONTRIBUTING.md) for prerequisites, local setup, development commands, and pull request expectations.

Quick start:

```bash
corepack enable
pnpm install
pnpm build
pnpm --filter dev dev
```

The demo runs in the `dev/` workspace and consumes the library through the pnpm workspace link. The root `build` command creates the distributable files in `dist/`.

## Project Documentation

- [Contributing and local development](CONTRIBUTING.md)
- [AI coding rules](docs/AGENTIC_RULES.md)
- [React Native package](native/README.md)
- [React Native development app](native-dev/README.md)

---

## 🪪 License

**ISC**
