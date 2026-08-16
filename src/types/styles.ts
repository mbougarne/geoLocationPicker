import type { CSSProperties } from 'react';

export type StyleOverrides<Slot extends string> = {
  classNames?: Partial<Record<Slot, string>>;
  styles?: Partial<Record<Slot, CSSProperties>>;
};
