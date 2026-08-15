import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SelectPhoneCode } from '../src/components/SelectPhoneCode';

describe('Test SelectPhoneCode Component', () => {
  it('filters by phone code and reports the selected code', async () => {
    const onSelect = vi.fn();

    render(<SelectPhoneCode onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('button', { name: 'Select Phone Code' }));
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: '+212' },
    });

    await waitFor(() => {
      expect(screen.getByText('+212')).toBeInTheDocument();
      expect(screen.queryByText('+213')).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByDisplayValue('+212,Morocco'));

    expect(onSelect).toHaveBeenCalledWith('+212');
    expect(
      screen.getByRole('button', { name: 'Morocco +212' })
    ).toBeInTheDocument();
  });
});
