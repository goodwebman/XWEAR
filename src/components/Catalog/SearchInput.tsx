import React, { useEffect, useRef, useState } from 'react'

interface Props {
	onSearch: (searchTerm: string) => void
	
}

const SearchInput: React.FC<Props> = ({ onSearch }) => {
	const [searchTerm, setSearchTerm] = useState('')
	

	useEffect(() => {
		onSearch(searchTerm)
	}, [searchTerm, onSearch])

	

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value)
	}

	

	return (
		<div className='relative'>
			<input
				
				type='text'
				placeholder='Поиск по каталогу товаров'
				value={searchTerm}
				onChange={handleInputChange}
				className=' border-[1px] border-white/11 w-full  text-white  rounded-3xl py-[12px] px-6 font-normal text-base max-[580px]:px-4 focus:outline-none transition-all duration-300 ease-in-out placeholder-[#a0a0a0] max-[400px]:text-[15px]'
			/>
			
		</div>
		
	)
}

export default SearchInput
