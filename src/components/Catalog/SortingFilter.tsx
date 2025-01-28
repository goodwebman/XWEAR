import React, { useState } from 'react';

function SortingFilter({ onFilterChange }) {
  const [sortingOption, setSortingOption] = useState(null);

  const handleSortingChange = (e) => {
      const value = e.target.value;
      setSortingOption(value);
      onFilterChange({ sorting: value });
    };

  return (
    <div>
      <h3 className="font-bold mb-2">Сортировка по цене</h3>
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
