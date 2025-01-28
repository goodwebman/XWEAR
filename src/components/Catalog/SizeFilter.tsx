import React, { useState } from 'react';
import { Filters } from '../../types';

interface SizeFilterProps {
    sizes: (string | number)[];
    onFilterChange: (filters: Partial<Filters>) => void;
}

function SizeFilter({ sizes, onFilterChange }: SizeFilterProps) {
    const [selectedSizes, setSelectedSizes] = useState<(string | number)[]>([]);

    const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const size = e.target.value;
      let updatedSizes = [...selectedSizes];

      if (selectedSizes.some(s => s.toString() === size.toString())) {
        updatedSizes = updatedSizes.filter(s => s.toString() !== size.toString());
      } else {
          updatedSizes.push(size);
      }

      setSelectedSizes(updatedSizes);
        onFilterChange({ size: updatedSizes });
    };


    return (
        <div>
            <h3 className="font-bold mb-2">Размеры</h3>
            <div className="grid grid-cols-4 gap-2">
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

