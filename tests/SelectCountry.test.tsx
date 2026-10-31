import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SelectCountry } from '../src/components/SelectCountry';
import { countriesData, countryToCodeMap } from '../src/constants';

const openPicker = (triggerName: string | RegExp) => {
  fireEvent.click(screen.getByRole('button', { name: triggerName }));
  return screen.getByRole('combobox');
};

describe('Test SelectCountry Component', () => {
  it('maps every country name to an ISO code', () => {
    countriesData.forEach((name) => {
      expect(countryToCodeMap[name], `missing code for ${name}`).toMatch(
        /^[A-Z]{2}$/
      );
    });
  });

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
    const search = openPicker('Select a country');
    fireEvent.change(search, { target: { value: 'Morocco' } });

    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Morocco' })).toBeVisible();
      expect(screen.queryByRole('option', { name: 'Algeria' })).toBeNull();
    });

    fireEvent.click(screen.getByRole('option', { name: 'Morocco' }));

    expect(onSelect).toHaveBeenCalledWith('Morocco');
    expect(screen.getByRole('button', { name: 'Morocco' })).toBeInTheDocument();
  });

  it('shows a saved ISO code selection on initial render', () => {
    render(<SelectCountry defaultValue="MA" />);
    expect(screen.getByRole('button', { name: 'Morocco' })).toBeInTheDocument();
  });

  it('accepts an English country name as defaultValue', () => {
    render(<SelectCountry defaultValue="Morocco" />);
    expect(screen.getByRole('button', { name: 'Morocco' })).toBeInTheDocument();
  });

  it('follows the controlled value through prop changes and clearing', () => {
    const { rerender } = render(<SelectCountry value="MA" />);
    expect(screen.getByRole('button', { name: 'Morocco' })).toBeInTheDocument();

    rerender(<SelectCountry value="FR" />);
    expect(screen.getByRole('button', { name: 'France' })).toBeInTheDocument();

    rerender(<SelectCountry value={null} />);
    expect(
      screen.getByRole('button', { name: 'Select a country' })
    ).toBeInTheDocument();
  });

  it('does not change a controlled value on its own when an option is picked', () => {
    const onChange = vi.fn();

    render(<SelectCountry value="MA" onChange={onChange} />);
    openPicker('Morocco');
    fireEvent.click(screen.getByRole('option', { name: 'Algeria' }));

    expect(onChange).toHaveBeenCalledWith({
      code: 'DZ',
      name: 'Algeria',
      displayName: 'Algeria',
    });
    expect(screen.getByRole('button', { name: 'Morocco' })).toBeInTheDocument();
  });

  it('clears an uncontrolled selection with the clear button', () => {
    const onChange = vi.fn();

    render(<SelectCountry defaultValue="MA" clearable onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Clear selection' }));

    expect(onChange).toHaveBeenCalledWith(null);
    expect(
      screen.getByRole('button', { name: 'Select a country' })
    ).toBeInTheDocument();
  });

  it('does not open while disabled', () => {
    render(<SelectCountry disabled />);
    fireEvent.click(screen.getByRole('button', { name: 'Select a country' }));

    expect(screen.queryByRole('combobox')).toBeNull();
    expect(
      screen.getByRole('button', { name: 'Select a country' })
    ).toBeDisabled();
  });

  it('localizes labels and names, and searches localized names and ISO codes', async () => {
    const onChange = vi.fn();

    render(
      <SelectCountry
        onChange={onChange}
        getCountryName={(code, name) => (code === 'MA' ? 'Maroc' : name)}
        labels={{
          placeholder: 'Choisir un pays',
          searchPlaceholder: 'Rechercher',
          noResults: 'Aucun résultat',
        }}
      />
    );

    const search = openPicker('Choisir un pays');
    expect(search).toHaveAttribute('placeholder', 'Rechercher');

    fireEvent.change(search, { target: { value: 'maroc' } });
    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Maroc' })).toBeVisible();
    });

    fireEvent.click(screen.getByRole('option', { name: 'Maroc' }));
    expect(onChange).toHaveBeenCalledWith({
      code: 'MA',
      name: 'Morocco',
      displayName: 'Maroc',
    });
    expect(screen.getByRole('button', { name: 'Maroc' })).toBeInTheDocument();

    const searchAgain = openPicker('Maroc');
    fireEvent.change(searchAgain, { target: { value: 'MA' } });
    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Maroc' })).toBeVisible();
    });
  });

  it('announces an accessible empty state when nothing matches', async () => {
    render(<SelectCountry />);
    const search = openPicker('Select a country');
    fireEvent.change(search, { target: { value: 'zzzz' } });

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent('No results found');
      expect(screen.queryByRole('listbox')).toBeNull();
    });
  });

  it('supports full keyboard interaction', async () => {
    const onSelect = vi.fn();

    render(<SelectCountry onSelect={onSelect} />);
    const trigger = screen.getByRole('button', { name: 'Select a country' });
    trigger.focus();
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });

    const search = screen.getByRole('combobox');
    await waitFor(() => expect(search).toHaveFocus());

    const firstOption = screen.getByRole('option', { name: 'Algeria' });
    expect(search).toHaveAttribute('aria-activedescendant', firstOption.id);

    fireEvent.keyDown(search, { key: 'ArrowDown' });
    fireEvent.keyDown(search, { key: 'Enter' });

    expect(onSelect).toHaveBeenCalledWith('Angola');
    const updatedTrigger = screen.getByRole('button', { name: 'Angola' });
    expect(updatedTrigger).toHaveFocus();
    expect(screen.queryByRole('combobox')).toBeNull();
  });

  it('closes on Escape and returns focus to the trigger', () => {
    render(<SelectCountry />);
    const trigger = screen.getByRole('button', { name: 'Select a country' });
    const search = openPicker('Select a country');

    fireEvent.keyDown(search, { key: 'Escape' });

    expect(screen.queryByRole('combobox')).toBeNull();
    expect(trigger).toHaveFocus();
  });

  it('participates in form submission without triggering it', () => {
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
    const { container } = render(
      <form onSubmit={onSubmit}>
        <SelectCountry name="country" defaultValue="MA" />
      </form>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Morocco' }));
    fireEvent.click(screen.getByRole('option', { name: 'Algeria' }));

    expect(onSubmit).not.toHaveBeenCalled();
    const hidden = container.querySelector<HTMLInputElement>(
      'input[name="country"]'
    );
    expect(hidden?.value).toBe('DZ');
  });

  it('renders a required form field that blocks empty submission', () => {
    const { container } = render(
      <form>
        <SelectCountry name="country" required />
      </form>
    );

    const field = container.querySelector<HTMLInputElement>(
      'input[name="country"]'
    );
    expect(field).toBeRequired();
    expect(field?.value).toBe('');
    expect(
      (container.querySelector('form') as HTMLFormElement).checkValidity()
    ).toBe(false);
  });

  it('keeps multiple instances independent', () => {
    render(
      <>
        <SelectCountry name="first" labels={{ placeholder: 'First' }} />
        <SelectCountry name="second" labels={{ placeholder: 'Second' }} />
      </>
    );

    fireEvent.click(screen.getByRole('button', { name: 'First' }));
    fireEvent.click(screen.getByRole('option', { name: 'Morocco' }));

    expect(screen.getByRole('button', { name: 'Morocco' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Second' })).toBeInTheDocument();
    expect(
      document.querySelector<HTMLInputElement>('input[name="first"]')?.value
    ).toBe('MA');
    expect(
      document.querySelector<HTMLInputElement>('input[name="second"]')?.value
    ).toBe('');
  });

  it('uses a custom flag renderer when provided', () => {
    render(
      <SelectCountry
        defaultValue="MA"
        renderFlag={(code) => <img alt="" data-testid={`flag-${code}`} />}
      />
    );

    expect(screen.getByTestId('flag-MA')).toBeInTheDocument();
  });
});
