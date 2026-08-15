import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { GeoLocationPicker } from '../src/components/Picker';

describe('Test GeoLocationPicker Component', () => {
  it('filters the tab content results when searching', async () => {
    render(<GeoLocationPicker />);

    fireEvent.change(screen.getByRole('textbox', { name: '' }), {
      target: { value: 'Morocco' },
    });

    await waitFor(() => {
      expect(screen.getByText('Morocco')).toBeInTheDocument();
      expect(screen.queryByText('Algeria')).not.toBeInTheDocument();
    });
  });

  it('sets the selected country from the tab', async () => {
    const onChange = vi.fn();

    render(<GeoLocationPicker onChange={onChange} />);
    fireEvent.click(screen.getByRole('checkbox', { name: /Morocco/ }));

    await waitFor(() => {
      expect(onChange).toHaveBeenLastCalledWith({
        Africa: new Set(['Morocco']),
      });
    });
  });
});
