import React, { useState } from 'react';
import { Filters } from '../../types';

interface PriceFilterProps {
    onFilterChange: (filters: Partial<Filters>) => void;
}


function PriceFilter({ onFilterChange }: PriceFilterProps) {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);

    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       const newMinPrice = parseInt(e.target.value, 10)
        setMinPrice(newMinPrice);
      onFilterChange({price: [newMinPrice, maxPrice]})
    };

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMaxPrice = parseInt(e.target.value, 10)
        setMaxPrice(newMaxPrice);
        onFilterChange({price: [minPrice, newMaxPrice]})

    };

  return (
    <div>
      <h3 className="font-bold mb-2">Фильтр по цене</h3>
      <div className="flex items-center space-x-2">
        <input
          type="number"
          placeholder="Мин. цена"
          className="border rounded p-1"
            value={minPrice}
            onChange={handleMinPriceChange}
        />
        <input
          type="number"
          placeholder="Макс. цена"
          className="border rounded p-1"
            value={maxPrice}
            onChange={handleMaxPriceChange}
        />
      </div>
    </div>
  );
}

export default PriceFilter;
