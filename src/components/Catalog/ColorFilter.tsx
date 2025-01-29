import React, { useState, useEffect } from 'react';
import { Filters } from '../../types';

interface ColorFilterProps {
    colors: string[];
    onFilterChange: (filters: Partial<Filters>) => void;
     initialFilters?: Partial<Filters>;
}


function ColorFilter({ colors, onFilterChange, initialFilters }: ColorFilterProps) {
    const [selectedColors, setSelectedColors] = useState<string[]>([]);


    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const color = e.target.value;
        let updatedColors = [...selectedColors]

        if (selectedColors.includes(color)) {
           updatedColors = updatedColors.filter(item => item !== color)
        } else {
           updatedColors.push(color)
        }

        setSelectedColors(updatedColors);
        onFilterChange({color: updatedColors})
    }
     useEffect(() => {
        if(initialFilters?.color) {
             setSelectedColors(initialFilters.color)
        }
    }, [initialFilters?.color, colors])
  return (

                   <div className="max-h-40 overflow-y-auto">
                         <div className="grid grid-cols-3 gap-2">
                                {colors.map(color => (
                                    <label key={color} className="flex items-center">
                                      <input
                                        type="checkbox"
                                        className="mr-2"
                                        value={color}
                                        checked={selectedColors.includes(color)}
                                        onChange={handleColorChange}
                                      />
                                      {color}
                                  </label>
                                ))}
                          </div>
                      </div>
  );
}

export default ColorFilter;
