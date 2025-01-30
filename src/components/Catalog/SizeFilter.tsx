import React, { useEffect, useMemo, useState } from 'react'
import { Filters } from '../../types'

interface SizeFilterProps {
	sizes: (string | number)[]
	onFilterChange: (filters: Partial<Filters>) => void
	initialFilters?: Partial<Filters>
}

function SizeFilter({
	sizes,
	onFilterChange,
	initialFilters,
}: SizeFilterProps) {
	const [selectedSizes, setSelectedSizes] = useState<(string | number)[]>([])

	const sortedSizes = useMemo(() => {
		return [...sizes].sort((a, b) => {
			if (typeof a === 'number' && typeof b === 'number') {
				return a - b
			} else if (typeof a === 'string' && typeof b === 'string') {
				const numA = parseFloat(a)
				const numB = parseFloat(b)
				return numA - numB
			} else if (typeof a === 'number' && typeof b === 'string') {
				return 0
			} else if (typeof a === 'string' && typeof b === 'number') {
				return 0
			}
			return 0
		})
	}, [sizes])

	const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const size = e.target.value
		let updatedSizes = [...selectedSizes]

		if (selectedSizes.some(s => s.toString() === size.toString())) {
			updatedSizes = updatedSizes.filter(s => s.toString() !== size.toString())
		} else {
			updatedSizes.push(size)
		}

		setSelectedSizes(updatedSizes)
		onFilterChange({ size: updatedSizes })
	}

	useEffect(() => {
		if (initialFilters?.size) {
			setSelectedSizes(initialFilters.size)
		}
	}, [initialFilters?.size, sizes])
	return (
		<div className=' overflow-y-auto'>
			<div className='grid grid-cols-3 gap-x-[10px] gap-y-[10px] '>
				{sortedSizes.map(size => (
					<label
						key={size}
						className={`${
							selectedSizes.some(s => s.toString() === size.toString())
								? 'bg-[#49D0FF] text-white'
								: ''
						} cursor-pointer flex items-center justify-center border border-[#E6E7EB] rounded-md  p-[6px_20px]`}
					>
						<input
							type='checkbox'
							className='hidden'
							value={size}
							checked={selectedSizes.some(
								s => s.toString() === size.toString()
							)}
							onChange={handleSizeChange}
						/>
						{size}
					</label>
				))}
			</div>
		</div>
	)
}

export default SizeFilter
