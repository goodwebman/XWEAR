import React, { useState, useEffect } from 'react';
import { Filters } from '../../types';

interface SizeFilterProps {
    sizes: (string | number)[];
    onFilterChange: (filters: Partial<Filters>) => void;
     initialFilters?: Partial<Filters>;
}

function SizeFilter({ sizes, onFilterChange, initialFilters }: SizeFilterProps) {
    const [selectedSizes, setSelectedSizes] = useState<(string | number)[]>([]);


    const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const size = e.target.value;
      let updatedSizes = [...selectedSizes];

      if (selectedSizes.some(s => s.toString() === size.toString())) {
        updatedSizes = updatedSizes.filter(s => s.toString() !== size.toString());
      } else {
          updatedSizes.push(size);
      }
    updatedSizes.sort((a, b) => {
        if (typeof a === 'number' && typeof b === 'number') {
            return a - b;
        } else if (typeof a === 'string' && typeof b === 'string') {
            const numA = parseFloat(a);
            const numB = parseFloat(b);
            return numA - numB;
        } else if(typeof a === 'number' && typeof b === 'string'){
             return -1
         } else if(typeof a === 'string' && typeof b === 'number'){
             return 1
        }
        else {
             return 0
        }
    });

      setSelectedSizes(updatedSizes);
        onFilterChange({ size: updatedSizes });
    };

     useEffect(() => {
         if(initialFilters?.size) {
             setSelectedSizes(initialFilters.size)
         }
      }, [initialFilters?.size, sizes])
    return (

                  <div className="max-h-40 overflow-y-auto">
                        <div className="grid grid-cols-3  gap-2">
                            {sizes.map(size => (
                                    <label key={size} className="flex items-center">
                                      <input
                                        type="checkbox"
                                        className="mr-1"
                                        value={size}
                                        checked={selectedSizes.some(s => s.toString() === size.toString())}
                                        onChange={handleSizeChange}
                                      />
                                    {size}
                                  </label>
                         ))}
                    </div>
                </div>
    );
}

export default SizeFilter;

