import { useState } from 'react'

function ColorFilter({ colors, onFilterChange }) {
	const [selectedColors, setSelectedColors] = useState([])

	const handleColorChange = e => {
		const color = e.target.value
		let updatedColors = [...selectedColors]

		if (selectedColors.includes(color)) {
			updatedColors = updatedColors.filter(item => item !== color)
		} else {
			updatedColors.push(color)
		}

		setSelectedColors(updatedColors)
		onFilterChange({ color: updatedColors })
	}

	return (
		<div>
			<h3 className='font-bold mb-2'>Цвета</h3>
			<div className='grid grid-cols-4 gap-2'>
				{colors.map(color => (
					<label key={color} className='flex items-center'>
						<input
							type='checkbox'
							className='mr-2'
							value={color}
							checked={selectedColors.includes(color)}
							onChange={handleColorChange}
						/>
						{color}
					</label>
				))}
			</div>
		</div>
	)
}

export default ColorFilter
