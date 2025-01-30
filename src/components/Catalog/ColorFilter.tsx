import { useEffect, useState } from 'react'
import { Filters } from '../../types'

interface ColorFilterProps {
	colors: string[]
	colorHex: string[]
	onFilterChange: (filters: Partial<Filters>) => void
	initialFilters?: Partial<Filters>
}

function ColorFilter({
	colors,
	onFilterChange,
	initialFilters,
	colorHex,
}: ColorFilterProps) {
	const [selectedColors, setSelectedColors] = useState<string[]>([])

	const handleColorChange = (color: string, index: number) => {
		setSelectedColors(prevSelected => {
			const updatedColors = prevSelected.includes(color)
				? prevSelected.filter(item => item !== color)
				: [...prevSelected, color]

			onFilterChange({ color: updatedColors })
			return updatedColors
		})
	}

	useEffect(() => {
		if (initialFilters?.color) {
			setSelectedColors(initialFilters.color)
		}
	}, [initialFilters?.color, colors])

	return (
		<div className=''>
			<div className='grid grid-cols-3 gap-x-[10px] gap-y-[10px]'>
				{colors.map((color, index) => (
					<label
						key={color}
						className='flex flex-col items-center cursor-pointer'
					>
						{' '}
						{/* flex-col для вертикального выравнивания */}
						<input
							type='checkbox'
							className='hidden'
							value={color}
							checked={selectedColors.includes(color)}
							onChange={() => handleColorChange(color, index)}
						/>
						<div
							className={`w-8 h-8 rounded-full border-2 ${
								selectedColors.includes(color)
									? 'border-[#6ECFFF]'
									: 'border-gray-300' // Вернул границу для невыбранных цветов
							}`}
							style={{ backgroundColor: `#${colorHex[index]}` }}
						/>
						<span className='text-center text-[13px] mt-1'>{color}</span>{' '}
						{/* Добавили span для текста */}
					</label>
				))}
			</div>
		</div>
	)
}

export default ColorFilter
