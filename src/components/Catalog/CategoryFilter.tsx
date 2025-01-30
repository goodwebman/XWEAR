import React, { useState, useEffect } from 'react';
import { Filters } from '../../types';

interface CategoryFilterProps {
    categories: string[];
    onFilterChange: (filters: Partial<Filters>) => void;
      initialFilters?: Partial<Filters>;

}

function CategoryFilter({ categories, onFilterChange, initialFilters }: CategoryFilterProps) {
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
      useEffect(() => {
          if (initialFilters?.category) {
               setSelectedCategories(initialFilters.category)
          }
      }, [initialFilters?.category, categories])
  return (
            <div className="max-h-[267px] overflow-y-auto scrollable-container">
                <div className="flex flex-col gap-[20px]">
                    {categories.map(category => (
                            <label key={category} className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="mr-2 checkbox"
                                    value={category}
                                    checked={selectedCategories.includes(category)}
                                    onChange={handleCategoryChange}
                                />
                                <span className='custom-checkbox'></span>
                                {category}
                            </label>
                    ))}
                </div>
            </div>
  );
}

export default CategoryFilter;
