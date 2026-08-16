import { CSSProperties } from 'react';

type ComponentKey = 'country' | 'phone' | 'picker';

type ComponentConfig = {
  classNames: Record<string, string>;
  styles: Record<string, CSSProperties>;
};

type Props = {
  component: ComponentKey;
  config: ComponentConfig;
  onChange: (config: ComponentConfig) => void;
  onComponentChange: (component: ComponentKey) => void;
};

const componentLabels: Record<ComponentKey, string> = {
  country: 'SelectCountry',
  phone: 'SelectPhoneCode',
  picker: 'GeoLocationPicker',
};

const slots: Record<ComponentKey, string[]> = {
  country: [
    'root',
    'container',
    'trigger',
    'dropdown',
    'searchInput',
    'list',
    'country',
    'selectedCountry',
  ],
  phone: [
    'root',
    'container',
    'trigger',
    'dropdown',
    'searchInput',
    'list',
    'country',
    'selectedCountry',
  ],
  picker: [
    'root',
    'searchContainer',
    'searchInput',
    'selectAll',
    'selectAllLabel',
    'content',
    'tabs',
    'activeTab',
    'inactiveTab',
    'countryList',
    'country',
    'selectedCountry',
  ],
};

const updateClassName = (
  config: ComponentConfig,
  slot: string,
  value: string
): ComponentConfig => ({
  ...config,
  classNames: { ...config.classNames, [slot]: value },
});

const updateStyle = (
  config: ComponentConfig,
  slot: string,
  property: keyof CSSProperties,
  value: string
): ComponentConfig => ({
  ...config,
  styles: {
    ...config.styles,
    [slot]: { ...config.styles[slot], [property]: value },
  },
});

const inputClassName =
  'w-full rounded-md border border-slate-300 bg-white px-2.5 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100';

export function StyleEditor({
  component,
  config,
  onChange,
  onComponentChange,
}: Props) {
  return (
    <section className="rounded-xl border border-slate-200 bg-slate-950 p-4 text-slate-100 shadow-sm">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
            Live controls
          </p>
          <h2 className="mt-1 text-xl font-semibold">Style editor</h2>
        </div>
        <label className="min-w-52 text-sm font-medium text-slate-300">
          Component
          <select
            className={`${inputClassName} mt-1 text-slate-900`}
            value={component}
            onChange={(event) =>
              onComponentChange(event.target.value as ComponentKey)
            }
          >
            {Object.entries(componentLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {slots[component].map((slot) => (
          <div key={slot} className="rounded-lg border border-slate-800 p-3">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400">
              {slot} className
              <input
                className={`${inputClassName} mt-1`}
                value={config.classNames[slot] ?? ''}
                placeholder="e.g. bg-fuchsia-100 text-slate-900"
                onChange={(event) =>
                  onChange(updateClassName(config, slot, event.target.value))
                }
              />
            </label>

            <div className="mt-2 grid grid-cols-2 gap-2">
              {(['backgroundColor', 'color', 'borderColor'] as const).map(
                (property) => (
                  <label
                    key={property}
                    className="text-xs font-medium text-slate-400"
                  >
                    {property}
                    <input
                      className={`${inputClassName} mt-1 h-9 p-1`}
                      type="color"
                      value={String(
                        config.styles[slot]?.[property] ?? '#ffffff'
                      )}
                      onChange={(event) =>
                        onChange(
                          updateStyle(
                            config,
                            slot,
                            property,
                            event.target.value
                          )
                        )
                      }
                    />
                  </label>
                )
              )}
              <label className="text-xs font-medium text-slate-400">
                borderRadius
                <input
                  className={`${inputClassName} mt-1`}
                  type="number"
                  min="0"
                  max="32"
                  value={Number.parseInt(
                    String(config.styles[slot]?.borderRadius ?? 0),
                    10
                  )}
                  onChange={(event) =>
                    onChange(
                      updateStyle(
                        config,
                        slot,
                        'borderRadius',
                        `${event.target.value}px`
                      )
                    )
                  }
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export type { ComponentConfig, ComponentKey };
