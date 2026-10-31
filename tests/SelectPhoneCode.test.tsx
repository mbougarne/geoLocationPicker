import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SelectPhoneCode } from '../src/components/SelectPhoneCode';
import { countriesWithPhoneCode } from '../src/constants';

describe('Test SelectPhoneCode Component', () => {
  it('uses unique ISO codes for every dialing entry', () => {
    const codes = countriesWithPhoneCode.map((c) => c.code);
    expect(new Set(codes).size).toBe(codes.length);
    codes.forEach((code) => expect(code).toMatch(/^[A-Z]{2}$/));
  });

  it('filters by phone code and reports the selected code', async () => {
    const onSelect = vi.fn();

    render(<SelectPhoneCode onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('button', { name: 'Select Phone Code' }));
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: '+212' },
    });

    await waitFor(() => {
      expect(
        screen.getByRole('option', { name: '+212 Morocco' })
      ).toBeVisible();
      expect(screen.queryByRole('option', { name: '+213 Algeria' })).toBeNull();
    });

    fireEvent.click(screen.getByRole('option', { name: '+212 Morocco' }));

    expect(onSelect).toHaveBeenCalledWith('+212');
    expect(
      screen.getByRole('button', { name: 'Morocco +212' })
    ).toBeInTheDocument();
  });

  it('keeps countries that share a dialing prefix distinct', async () => {
    const onChange = vi.fn();

    render(<SelectPhoneCode onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Select Phone Code' }));
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '+1' } });

    await waitFor(() => {
      expect(
        screen.getByRole('option', { name: '+1 United States' })
      ).toBeVisible();
      expect(screen.getByRole('option', { name: '+1 Canada' })).toBeVisible();
    });

    fireEvent.click(screen.getByRole('option', { name: '+1 Canada' }));

    expect(onChange).toHaveBeenCalledWith({
      code: 'CA',
      name: 'Canada',
      displayName: 'Canada',
      dialCode: '+1',
    });
    expect(
      screen.getByRole('button', { name: 'Canada +1' })
    ).toBeInTheDocument();
  });

  it('shows the right country for a controlled ISO value on a shared prefix', () => {
    const { rerender } = render(<SelectPhoneCode value="US" />);
    expect(
      screen.getByRole('button', { name: 'United States +1' })
    ).toBeInTheDocument();

    rerender(<SelectPhoneCode value="CA" />);
    expect(
      screen.getByRole('button', { name: 'Canada +1' })
    ).toBeInTheDocument();

    rerender(<SelectPhoneCode value={null} />);
    expect(
      screen.getByRole('button', { name: 'Select Phone Code' })
    ).toBeInTheDocument();
  });

  it('submits the ISO code by default and the dialing prefix on request', () => {
    const { container, rerender } = render(
      <SelectPhoneCode name="phone" defaultValue="CA" />
    );
    expect(
      container.querySelector<HTMLInputElement>('input[name="phone"]')?.value
    ).toBe('CA');

    rerender(
      <SelectPhoneCode name="phone" defaultValue="CA" formValue="dialCode" />
    );
    expect(
      container.querySelector<HTMLInputElement>('input[name="phone"]')?.value
    ).toBe('+1');
  });

  it('searches localized country names', async () => {
    render(
      <SelectPhoneCode
        getCountryName={(code, name) => (code === 'MA' ? 'المغرب' : name)}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Select Phone Code' }));
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'المغرب' },
    });

    await waitFor(() => {
      expect(screen.getByRole('option', { name: '+212 المغرب' })).toBeVisible();
    });
  });

  it('clears the selection', () => {
    const onChange = vi.fn();

    render(<SelectPhoneCode defaultValue="MA" clearable onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Clear selection' }));

    expect(onChange).toHaveBeenCalledWith(null);
    expect(
      screen.getByRole('button', { name: 'Select Phone Code' })
    ).toBeInTheDocument();
  });
});
