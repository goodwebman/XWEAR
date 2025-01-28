import React from 'react';
import { useNavigate } from 'react-router-dom';

function TypeSelectionPage() {
    const navigate = useNavigate();

    const handleTypeChange = (type) => {
        navigate(`/catalog/${type.toLowerCase()}`)
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="space-x-4">
                <button className="p-4 bg-gray-200 rounded hover:bg-gray-300" onClick={() => handleTypeChange('Обувь')}>Обувь</button>
                <button className="p-4 bg-gray-200 rounded hover:bg-gray-300" onClick={() => handleTypeChange('Одежда')}>Одежда</button>
                <button className="p-4 bg-gray-200 rounded hover:bg-gray-300" onClick={() => handleTypeChange('Аксессуары')}>Аксессуары</button>
            </div>
        </div>
    );
}

export default TypeSelectionPage;
