import React, { useState, useEffect } from 'react';
import { Filters } from '../../types';

interface SortingFilterProps {
    onFilterChange: (filters: Partial<Filters>) => void;
      initialFilters?: Partial<Filters>;
}

function SortingFilter({ onFilterChange, initialFilters }: SortingFilterProps) {
  const [sortingOption, setSortingOption] = useState<'asc' | 'desc' | null>(null);


  const handleSortingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value as 'asc' | 'desc' | '';
      setSortingOption(value === '' ? null : value);
       onFilterChange({ sorting: value === '' ? null : value });
    };
     useEffect(() => {
        if(initialFilters?.sorting) {
             setSortingOption(initialFilters.sorting)
        }
    }, [initialFilters?.sorting])
  return (
                   <div>
                         <select
                            className="border rounded p-1"
                              value={sortingOption || ''}
                            onChange={handleSortingChange}
                         >
                             <option value=''>По умолчанию</option>
                            <option value="asc">От дешевых к дорогим</option>
                             <option value="desc">От дорогих к дешевым</option>
                         </select>
                   </div>

  );
}

export default SortingFilter;
