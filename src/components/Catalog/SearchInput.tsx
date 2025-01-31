import React, { useState, useEffect, useRef } from 'react';

interface Props {
  onSearch: (searchTerm: string) => void;
}

const SearchInput: React.FC<Props> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      onSearch(searchTerm)
    }, [searchTerm, onSearch]);


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClearInput = () => {
    setSearchTerm('');
    if (inputRef.current) {
      inputRef.current.focus(); // Фокусируемся на инпуте после очистки
    }
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        placeholder="Поиск по названию и бренду..."
        value={searchTerm}
        onChange={handleInputChange}
        className="rounded-md border-2 border-gray-400 p-2 text-black focus:outline-none pl-10"
      />
         {searchTerm && (
        <button
            onClick={handleClearInput}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                />
            </svg>
        </button>
      )}
        <div className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21.75 21.75-2.625-2.625m0 0C18.878 19.244 17.25 20.5 15 20.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" />
          </svg>
          </div>
    </div>
  );
};

export default SearchInput;
