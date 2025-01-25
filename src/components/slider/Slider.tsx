'use client'

import { useRef, useState } from 'react'

const slides = [
	{
		id: 1,
		title: 'Широкий ассортимент Одежды',
		description:
			'Одежда от известные брендов у нас в каталоге. Только качественные вещи.',
		buttonText: 'Перейти в каталог',
		image: 'slider-bg.jpg',
	},
	{
		id: 2,

		title: 'Широкий ассортимент Одежды',
		description:
			'Одежда от известные брендов у нас в каталоге. Только качественные вещи.',
		buttonText: 'Перейти в каталог',
		image: 'slider-bg.jpg',
	},
	{
		id: 3,
		title: 'Широкий ассортимент Одежды',
		description:
			'Одежда от известные брендов у нас в каталоге. Только качественные вещи.',
		buttonText: 'Перейти в каталог',
		image: 'slider-bg.jpg',
	},
]

const Slider: React.FC = () => {
	const [currentSlide, setCurrentSlide] = useState(0)
	const sliderRef = useRef<HTMLDivElement>(null)

	const goToSlide = (index: number) => {
		setCurrentSlide(index)
		if (sliderRef.current) {
			sliderRef.current.scrollTo({
				left: index * sliderRef.current.offsetWidth,
				behavior: 'smooth',
			})
		}
	}

	const nextSlide = () => {
		if (sliderRef.current) {
			const next = (currentSlide + 1) % slides.length
			goToSlide(next)
		}
	}

	const prevSlide = () => {
		if (sliderRef.current) {
			const next = (currentSlide - 1 + slides.length) % slides.length
			goToSlide(next)
		}
	}

	return (
		<div className='relative overflow-hidden '>
			<div
				ref={sliderRef}
				className='flex max-w-[1500px] mt-[50px]  transition-transform duration-500  overflow-hidden m-auto snap-x scroll-smooth scrollbar-hide'
				style={{ width: '100%', scrollSnapType: 'x mandatory' }}
			>
				{slides.map((slide, index) => (
					<div
						key={index}
						className={`flex-shrink-0  snap-start w-full  relative `}
						style={{ width: '100%' }}
					>
						<div className='relative w-full h-full'>
							<img
								src={slide.image}
								alt='slide'
								className=' block w-full h-auto  object-cover '
							/>
						</div>
						<div className=' absolute top-1/2 left-0 transform -translate-y-1/2 pl-6 sm:pl-16  w-2/3 sm:w-1/2 '>
							<h1 className='text-[#171819] text-[51px] pt-[80px] uppercase font-[900] leading-[63px]'>
								{slide.title}
							</h1>
							<p className='text-[20px] leading-[32px] pt-[20px] font-[400] max-w-[535px]'>
								{slide.description}
							</p>

							<button className='bg-[#121214] inline-flex mt-[20px]  text-white font-bold  rounded-[10px] gap-[23px] px-[27px] py-[20px] cursor-pointer mb-[180px]'>
								<span>{slide.buttonText}</span>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth='1.5'
									stroke='white'
									className='w-[18px] h-[26px]'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='m8.25 4.5 7.5 7.5-7.5 7.5'
									/>
								</svg>
							</button>

							<div className='absolute bottom-10 left-[70px] right-0 flex  gap-[15px]'>
								<button
									onClick={prevSlide}
									className='bg-white p-2 rounded-full flex items-center  hover:bg-[#F0F2F6] transition duration-300 justify-center w-[67px] h-[67px]'
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										stroke-width='1.5'
										stroke='currentColor'
										className='size-6'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M15.75 19.5 8.25 12l7.5-7.5'
										/>
									</svg>
								</button>
								<button
									onClick={nextSlide}
									className='bg-white    hover:bg-[#F0F2F6]  p-2 rounded-full flex items-center justify-center   transition duration-300 w-[67px] h-[67px]'
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										stroke-width='1.5'
										stroke='currentColor'
										className='w-[24px] h-[28px]'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='m8.25 4.5 7.5 7.5-7.5 7.5'
										/>
									</svg>
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Slider

{
	/* <div className='max-w-[570px] pt-[20px] pl-[20px] flex-1 space-y-6 md:mr-12'>
							<h2 className='text-[#171819] text-[51px] uppercase font-[900] leading-[63px]'>
								{slide.title}
							</h2>
							<p className='text-[20px] leading-[32px] font-[400] max-w-[535px]'>
								{slide.description}
							</p>

							<button className='bg-[#121214] inline-flex  text-white font-bold  rounded-[10px] gap-[23px] px-[27px] py-[20px] cursor-pointer mb-[180px]'>
								<span>{slide.buttonText}</span>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth='1.5'
									stroke='white'
									className='w-[18px] h-[26px]'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='m8.25 4.5 7.5 7.5-7.5 7.5'
									/>
								</svg>
							</button>
						</div> */
}
