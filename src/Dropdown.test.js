import React from 'react';
import { render, fireEvent, waitFor, queryByAltText, getAllByText, getAllByAltText } from '@testing-library/react';
import Dropdown from './Dropdown';

// Mock options for testing
const options = [
  { value: '1', label: 'Option 1', image: 'image1.png' },
  { value: '2', label: 'Option 2', image: 'image2.png' },
  // Add more options as needed
];

describe('Dropdown component', () => {
  it('renders the dropdown with options and handles selection', () => {
    // Mock onChange function
    const mockOnChange = jest.fn();

    // Render the component
    const { getByPlaceholderText, getByText, } = render(
      <Dropdown options={options} placeholder="Select an option" onChange={mockOnChange} />
    );

    // Get the input element
    const inputElement = getByPlaceholderText('Select an option');

    // Click on the input to open the dropdown
    fireEvent.click(inputElement);

    // Check if the dropdown list is visible
    const dropdownList = getByText('Option 1');
    expect(dropdownList).toBeInTheDocument();

    // Click on an option to select it
    fireEvent.click(dropdownList);

    // Check if the input value is updated
    expect(inputElement.value).toBe('Option 1');

    // Check if the onChange function is called with the selected option
    expect(mockOnChange).toHaveBeenCalledWith(options[0]);
  });

  it('closes the dropdown when clicked outside', () => {
    // Mock onChange function
    const mockOnChange = jest.fn();

    // Render the component
    const { getByPlaceholderText, getByText, container } = render(
      <Dropdown options={options} placeholder="Select an option" onChange={mockOnChange} />
    );

    // Get the input element
    const inputElement = getByPlaceholderText('Select an option');

    // Click on the input to open the dropdown
    fireEvent.click(inputElement);

    // Check if the dropdown list is visible
    const dropdownList = getByText('Option 1');
    expect(dropdownList).toBeInTheDocument();

    // Click outside the dropdown to close it
    fireEvent.click(container);

    // Check if the dropdown is closed
    expect(dropdownList).not.toBeInTheDocument();
  });

  it('filters options based on user input', async () => {
    // Render the component
    const { getByPlaceholderText, getByText, getAllByAltText } = render(
      <Dropdown options={options} placeholder="Select an option" onChange={() => {}} />
    );

    // Get the input element
    const inputElement = getByPlaceholderText('Select an option');

    // Type a filter value into the input
    fireEvent.change(inputElement, { target: { value: '1' } });

    // Click on the input to open the dropdown
    fireEvent.click(inputElement);

    // Use waitFor to wait for the element to be present
    await waitFor(() => {
      // Check if the filtered option is visible
      const filteredOption = getByText(/Option 1/); // Use a regex for partial matching
      expect(filteredOption).toBeInTheDocument();

      // Check if the total length of li elements is 1
      const liElements = getAllByAltText(/Option/); // Use a regex for partial matching
      expect(liElements).toHaveLength(1);
    });
  });
});