# 🌍 Geo Location Picker

<img width="3840" height="1800" alt="preview-ezgif com-optimize" src="https://github.com/user-attachments/assets/df27ef5e-b187-42ff-80da-aca570d93624" />

A lightweight and accessible React component library for selecting geographic data: countries by continent, country names, and international phone codes. Built with flexibility and styled using Tailwind CSS.

## ✨ Features

- 🌐 **GeoLocationPicker** – Select countries grouped by continent
- 🗼 **SelectCountry** – Simple searchable dropdown for countries
- 📞 **SelectPhoneCode** – Select country phone codes with flags
- ⚡ Optimized with React's `useDeferredValue` for smooth typing
- 🎨 Styled using TailwindCSS
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

<SelectCountry onSelect={(country) => console.log(country)} />;
```

### 3. `SelectPhoneCode`

```tsx
import { SelectPhoneCode } from 'geo-location-picker';

<SelectPhoneCode onSelect={(code) => console.log(code)} />;
```

---

## 🎨 Styling

This library uses **Tailwind CSS** for styling. To apply styles correctly, make sure to import the package’s styles:

```ts
import 'geo-location-picker/dist/src/index.css';
```

Or extract and customize the styles if you're integrating into a custom Tailwind setup.

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
- `SelectCountry` and `SelectPhoneCode`: `root`, `container`, `trigger`, `dropdown`, `searchInput`, `list`, `country`, `selectedCountry`

---

## 🧠 Props

### `GeoLocationPicker`

| Prop         | Type                                                    | Description                           |
| ------------ | ------------------------------------------------------- | ------------------------------------- |
| `onChange`   | `(value: Record<string, Set<string>>) => void`          | Called when country selection changes |
| `classNames` | `Partial<Record<GeoLocationPickerSlot, string>>`        | Tailwind classes keyed by visual slot |
| `styles`     | `Partial<Record<GeoLocationPickerSlot, CSSProperties>>` | Inline styles keyed by visual slot    |

### `SelectCountry`

| Prop         | Type                                                | Description                           |
| ------------ | --------------------------------------------------- | ------------------------------------- |
| `onSelect`   | `(value: string) => void`                           | Called when a country is selected     |
| `classNames` | `Partial<Record<SelectCountrySlot, string>>`        | Tailwind classes keyed by visual slot |
| `styles`     | `Partial<Record<SelectCountrySlot, CSSProperties>>` | Inline styles keyed by visual slot    |

### `SelectPhoneCode`

| Prop         | Type                                                  | Description                           |
| ------------ | ----------------------------------------------------- | ------------------------------------- |
| `onSelect`   | `(value: string) => void`                             | Called when a phone code is selected  |
| `classNames` | `Partial<Record<SelectPhoneCodeSlot, string>>`        | Tailwind classes keyed by visual slot |
| `styles`     | `Partial<Record<SelectPhoneCodeSlot, CSSProperties>>` | Inline styles keyed by visual slot    |

---

## ♿ Accessibility

- Full keyboard navigation
- ARIA roles applied for dropdown inputs
- Focus ring and hover state styling

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
