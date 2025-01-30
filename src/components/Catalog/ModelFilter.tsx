import React, { useState, useEffect } from 'react';
import { Filters } from '../../types';

interface ModelFilterProps {
    models: string[];
    onFilterChange: (filters: Partial<Filters>) => void;
      initialFilters?: Partial<Filters>;
}

function ModelFilter({ models, onFilterChange, initialFilters }: ModelFilterProps) {
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
    useEffect(() => {
        if(initialFilters?.model) {
            setSelectedModels(initialFilters.model)
        }
    }, [initialFilters?.model, models])
  return (

                   <div className="max-h-[300px] overflow-y-auto">
                         <div className="flex flex-col gap-[10px]">
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
