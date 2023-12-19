import React, { useState, useEffect, useRef } from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { useOutsideClickHandler } from './hook';
import './Dropdown.css';

const Dropdown = ({ options, placeholder, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    console.log(options.filter((option) =>
    option.label.toLowerCase().includes(event.target.value.toLowerCase())
  ))
    setFilteredOptions(
      options.filter((option) =>
        option.label.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  const handleOptionClick = (option) => {
    setInputValue(option.label);
    setIsOpen(false);
    onChange(option);
  };

  const dropdownRef = useRef(null);

  const handleOutsideClick = () => {
    setIsOpen(false);
  };

  // Attach the hook to the dropdown element
  useOutsideClickHandler(dropdownRef, handleOutsideClick);

  return (
    <div className={isOpen ? "dropdown open" : "dropdown"} ref={dropdownRef}>
      <div
        className="dropdown-input-wrapper"
          onClick={() => setIsOpen(!isOpen)}
      >
        <input
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={() => setIsOpen(true)}
          className="dropdown-toggle"
        />
        <div>
          {isOpen ? <HiChevronUp /> : <HiChevronDown />}
        </div>
      </div>
      {isOpen && (
         <ul className="dropdown-list">
          {filteredOptions.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option)}
            >
              <img src={option.image} alt={option.label} />
              <span>{option.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;