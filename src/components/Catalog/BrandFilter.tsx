import React, { useState, useEffect } from 'react';
import { Filters } from '../../types';

interface BrandFilterProps {
    brands: string[];
    onFilterChange: (filters: Partial<Filters>) => void;
     initialFilters?: Partial<Filters>;
}

function BrandFilter({ brands, onFilterChange, initialFilters }: BrandFilterProps) {
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
    useEffect(() => {
        if(initialFilters?.brand) {
            setSelectedBrands(initialFilters.brand)
        }
      }, [initialFilters?.brand, brands])
  return (

                   <div className="max-h-[300px] overflow-y-auto">
                       <div className="flex flex-col gap-[10px]">
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
