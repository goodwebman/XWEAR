import React, { useState } from 'react';
import { Filters } from '../../types'


interface CategoryFilterProps {
    categories: string[];
    onFilterChange: (filters: Partial<Filters>) => void;
}

function CategoryFilter({ categories, onFilterChange }: CategoryFilterProps) {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const category = e.target.value;
        let updatedCategories = [...selectedCategories]

        if (selectedCategories.includes(category)) {
           updatedCategories = updatedCategories.filter(item => item !== category)
        } else {
           updatedCategories.push(category)
        }

        setSelectedCategories(updatedCategories);
        onFilterChange({category: updatedCategories})
    }

  return (
      <div>
           <h3 className="font-bold mb-2">Категория</h3>
          <div className="space-y-1">
          {categories.map(category => (
              <label key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    value={category}
                    checked={selectedCategories.includes(category)}
                    onChange={handleCategoryChange}
                  />
                  {category}
              </label>
          ))}
         </div>
      </div>
  );
}

export default CategoryFilter;
