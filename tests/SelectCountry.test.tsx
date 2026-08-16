import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SelectCountry } from '../src/components/SelectCountry';

describe('Test SelectCountry Component', () => {
  it('supports class and inline style overrides', () => {
    const { container } = render(
      <SelectCountry
        classNames={{ root: 'custom-root', trigger: 'custom-trigger' }}
        styles={{ root: { backgroundColor: 'black' } }}
      />
    );

    const root = container.firstElementChild;
    const trigger = screen.getByRole('button', { name: 'Select a country' });

    expect(root).not.toBeNull();
    expect(root).toHaveClass('custom-root');
    expect((root as HTMLElement).style.backgroundColor).toBe('black');
    expect(trigger).toHaveClass('custom-trigger');
  });

  it('filters countries and sets the selected country', async () => {
    const onSelect = vi.fn();

    render(<SelectCountry onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('button', { name: 'Select a country' }));
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'Morocco' },
    });

    await waitFor(() => {
      expect(screen.getByText('Morocco')).toBeInTheDocument();
      expect(screen.queryByText('Algeria')).not.toBeInTheDocument();
    });

    fireEvent.click(
      within(screen.getByRole('listbox')).getByDisplayValue('Morocco')
    );

    expect(onSelect).toHaveBeenCalledWith('Morocco');
    expect(screen.getByRole('button', { name: 'Morocco' })).toBeInTheDocument();
  });
});
