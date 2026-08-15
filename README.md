# 🌍 Geo Location Picker

<video src="./preview.webm" controls muted playsinline width="720"></video>

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

<GeoLocationPicker onChange={(selected) => console.log(selected)} />
```

### 2. `SelectCountry`

```tsx
import { SelectCountry } from 'geo-location-picker';

<SelectCountry onSelect={(country) => console.log(country)} />
```

### 3. `SelectPhoneCode`

```tsx
import { SelectPhoneCode } from 'geo-location-picker';

<SelectPhoneCode onSelect={(code) => console.log(code)} />
```

---

## 🎨 Styling

This library uses **Tailwind CSS** for styling. To apply styles correctly, make sure to import the package’s styles:

```ts
import 'geo-location-picker/dist/src/index.css';
```

Or extract and customize the styles if you're integrating into a custom Tailwind setup.

---

## 🧠 Props

### `GeoLocationPicker`

| Prop       | Type                                           | Description                             |
|------------|------------------------------------------------|-----------------------------------------|
| `onChange` | `(value: Record<string, Set<string>>) => void` | Called when country selection changes   |

### `SelectCountry`

| Prop       | Type                      | Description                           |
|------------|---------------------------|---------------------------------------|
| `onSelect` | `(value: string) => void` | Called when a country is selected     |

### `SelectPhoneCode`

| Prop       | Type                      | Description                            |
|------------|---------------------------|----------------------------------------|
| `onSelect` | `(value: string) => void` | Called when a phone code is selected   |

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

---

## 🪪 License

**ISC**
