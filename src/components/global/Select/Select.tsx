import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';

export interface SelectOption {
  text: string;
  value: string;
}

interface SelectProps {
  className?: string;
  defaultValue?: string;
  label?: string;
  onChange: (option: SelectOption) => void;
  options: Array<SelectOption>;
}

function Select({
  defaultValue,
  label,
  options,
  onChange,
  className,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<SelectOption>();

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOption = (value: string) => () => {
    const selectedOption = options.find((option) => option.value === value);

    setSelectedOption(selectedOption);
    onChange(selectedOption as SelectOption);
  };

  useEffect(() => {
    if (defaultValue) {
      const selectedOption = options.find(
        (option) => option.value === defaultValue,
      );

      setSelectedOption(selectedOption);
    } else {
      const defaultOption = options[0];
      setSelectedOption(defaultOption);
    }
  }, [defaultValue, options]);

  return (
    <div onClick={toggleOpen} className={className}>
      {label && (
        <label
          id="listbox-label"
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="mt-1 relative">
        <button
          type="button"
          className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
        >
          <span className="flex items-center">
            <span className="block">{selectedOption?.text}</span>
          </span>
          <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon className="h-5 w-5 text-gray-400" />
          </span>
        </button>

        {isOpen && (
          <ul
            className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
            tabIndex={-1}
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-option-3"
          >
            {options.map(({ text, value }) => (
              <li
                key={value}
                className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9"
                id="listbox-option-0"
                role="option"
                onClick={handleClickOption(value)}
              >
                <div className="flex items-center">
                  <span className="font-normal block">{text}</span>
                </div>
                {value === selectedOption?.value && (
                  <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                    <CheckIcon className="h-5 w-5" />
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Select;
