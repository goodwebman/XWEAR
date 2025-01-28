import React, { useState } from 'react';
import { Filters } from '../../types';

interface ModelFilterProps {
    models: string[];
    onFilterChange: (filters: Partial<Filters>) => void;
}


function ModelFilter({ models, onFilterChange }: ModelFilterProps) {
    const [selectedModels, setSelectedModels] = useState<string[]>([]);

    const handleModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const model = e.target.value;
        let updatedModels = [...selectedModels]

        if (selectedModels.includes(model)) {
           updatedModels = updatedModels.filter(item => item !== model)
        } else {
           updatedModels.push(model)
        }

        setSelectedModels(updatedModels);
        onFilterChange({model: updatedModels})
    }

  return (
      <div>
           <h3 className="font-bold mb-2">Модели</h3>
          <div className="space-y-1">
          {models.map(model => (
              <label key={model} className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    value={model}
                    checked={selectedModels.includes(model)}
                    onChange={handleModelChange}
                  />
                  {model}
              </label>
          ))}
         </div>
      </div>
  );
}

export default ModelFilter;
