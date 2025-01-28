import React, { useState } from 'react';
import { Filters } from '../../types';

interface BrandFilterProps {
    brands: string[];
    onFilterChange: (filters: Partial<Filters>) => void;
}

function BrandFilter({ brands, onFilterChange }: BrandFilterProps) {
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

    const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const brand = e.target.value;
        let updatedBrands = [...selectedBrands]

        if (selectedBrands.includes(brand)) {
           updatedBrands = updatedBrands.filter(item => item !== brand)
        } else {
           updatedBrands.push(brand)
        }

        setSelectedBrands(updatedBrands);
        onFilterChange({brand: updatedBrands})
    }

  return (
      <div>
           <h3 className="font-bold mb-2">Бренды</h3>
          <div className="space-y-1">
          {brands.map(brand => (
              <label key={brand} className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    value={brand}
                    checked={selectedBrands.includes(brand)}
                    onChange={handleBrandChange}
                  />
                  {brand}
              </label>
          ))}
         </div>
      </div>
  );
}

export default BrandFilter;
