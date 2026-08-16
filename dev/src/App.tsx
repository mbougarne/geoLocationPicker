import { useState } from 'react';
import {
  GeoLocationPicker,
  SelectCountry,
  SelectPhoneCode,
} from 'geo-location-picker';

import 'geo-location-picker/dist/src/index.css';
import { ComponentConfig, ComponentKey, StyleEditor } from './StyleEditor';

const initialStyles: Record<ComponentKey, ComponentConfig> = {
  country: {
    classNames: {
      root: 'rounded-lg bg-emerald-50',
      trigger: 'border-emerald-500 focus:ring-emerald-500',
      dropdown: 'border-emerald-200',
      selectedCountry: 'bg-emerald-600 text-white',
    },
    styles: {
      trigger: { borderRadius: 10 },
    },
  },
  phone: {
    classNames: {
      root: 'rounded-lg bg-slate-50',
      trigger: 'border-sky-500 focus:ring-sky-500',
      dropdown: 'border-sky-200',
      selectedCountry: 'bg-sky-600 text-white',
    },
    styles: {
      trigger: { borderRadius: 10 },
    },
  },
  picker: {
    classNames: {
      root: 'rounded-lg bg-amber-50',
      searchInput: 'border-amber-500 bg-white',
      tabs: 'flex-wrap',
      activeTab: 'bg-amber-600',
      country: 'rounded-md bg-white px-2 py-1',
      selectedCountry: 'bg-amber-600 text-white',
    },
    styles: {
      root: { border: '1px solid #fde68a' },
      searchInput: { borderRadius: 10 },
    },
  },
};

function App() {
  const [countries, setCountries] = useState<Record<string, Set<string>>>({});
  const [country, setCountry] = useState<string>('');
  const [phoneCode, setPhoneCode] = useState<string>('');
  const [activeComponent, setActiveComponent] =
    useState<ComponentKey>('country');
  const [componentStyles, setComponentStyles] =
    useState<Record<ComponentKey, ComponentConfig>>(initialStyles);

  const updateComponentStyles = (
    component: ComponentKey,
    config: ComponentConfig
  ) => {
    setComponentStyles((current) => ({ ...current, [component]: config }));
  };

  return (
    <main className="min-h-screen bg-slate-100 p-[25px] text-slate-900">
      <div className="grid min-h-[calc(100vh-50px)] gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,30%)]">
        <div className="min-w-0 space-y-6">
          <header>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              Styling playground
            </p>
            <h1 className="mt-2 text-3xl font-bold">Geo Location Picker</h1>
            <p className="mt-2 max-w-2xl text-slate-600">
              This demo uses both Tailwind classes and inline styles through the
              component styling slots.
            </p>
          </header>

          <section className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-lg font-semibold">Country selector</h2>
              <SelectCountry
                onSelect={setCountry}
                classNames={componentStyles.country.classNames}
                styles={componentStyles.country.styles}
              />
              <p className="mt-3 text-sm text-slate-600">
                Selected country: <strong>{country || 'None'}</strong>
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-lg font-semibold">
                Phone code selector
              </h2>
              <SelectPhoneCode
                onSelect={setPhoneCode}
                classNames={componentStyles.phone.classNames}
                styles={componentStyles.phone.styles}
              />
              <p className="mt-3 text-sm text-slate-600">
                Selected code: <strong>{phoneCode || 'None'}</strong>
              </p>
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold">Continent picker</h2>
            <GeoLocationPicker
              onChange={setCountries}
              classNames={componentStyles.picker.classNames}
              styles={componentStyles.picker.styles}
            />
            <p className="mt-3 text-sm text-slate-600">
              Selected countries:{' '}
              <strong>
                {Object.values(countries).reduce(
                  (total, selected) => total + selected.size,
                  0
                )}
              </strong>
            </p>
          </section>
        </div>

        <aside className="min-w-0 lg:sticky lg:top-[25px] lg:max-h-[calc(100vh-50px)] lg:overflow-y-auto">
          <StyleEditor
            component={activeComponent}
            config={componentStyles[activeComponent]}
            onChange={(config) =>
              updateComponentStyles(activeComponent, config)
            }
            onComponentChange={setActiveComponent}
          />
        </aside>
      </div>
    </main>
  );
}

export default App;
