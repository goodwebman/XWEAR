const Pagination = ({
	prevPage,
	nextPage,
	totalPages,
	goToPage,
	currentPage,
}) => {
	return (
		<div className='flex justify-between items-center my-[60px] gap-6'>
			<button onClick={prevPage} className='cursor-pointer'>
				<svg
					width='8'
					height='14'
					viewBox='0 0 8 14'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M7 13L1 7L7 1'
						stroke='#000'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			</button>
			<div className='flex gap-[30px] items-center'>
				{Array.from({ length: totalPages }).map((_, index) => (
					<button
						key={index}
						onClick={() => goToPage(index)}
						className={`rounded-full  cursor-pointer w-[6px] h-[6px] ${
							currentPage === index
								? 'bg-[#121214] w-[10px] h-[10px]'
								: 'bg-[#121214]/70'
						}`}
					></button>
				))}
			</div>
			<button onClick={nextPage} className='cursor-pointer'>
				<svg
					width='8'
					height='14'
					viewBox='0 0 8 14'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					className='rotate-180'
				>
					<path
						d='M7 13L1 7L7 1'
						stroke='#000'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			</button>
		</div>
	)
}

export default Pagination
