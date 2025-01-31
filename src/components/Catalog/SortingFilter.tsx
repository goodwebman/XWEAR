import React, { useEffect, useState } from 'react'
import { Filters } from '../../types'

interface SortingFilterProps {
	onFilterChange: (filters: Partial<Filters>) => void
	initialFilters?: Partial<Filters>
}

function SortingFilter({ onFilterChange, initialFilters }: SortingFilterProps) {
	const [sortingOption, setSortingOption] = useState<'asc' | 'desc' | null>(
		null
	)

	const handleSortingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value as 'asc' | 'desc' | ''
		setSortingOption(value === '' ? null : value)
		onFilterChange({ sorting: value === '' ? null : value })
	}
	useEffect(() => {
		if (initialFilters?.sorting) {
			setSortingOption(initialFilters.sorting)
		}
	}, [initialFilters?.sorting])
	return (
		<div>
			<span className='text-[#3C3C3C]'>Сортировать по </span>
			<select
				className='text-black font-[700] rounded p-1 focus:border-none'
				value={sortingOption || ''}
				onChange={handleSortingChange}
			>
				<option value=''>Стандарту</option>
				<option value='asc'>От дешевых к дорогим</option>
				<option value='desc'>От дорогих к дешевым</option>
			</select>
		</div>
	)
}

export default SortingFilter
