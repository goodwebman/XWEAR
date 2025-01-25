import { useRef, useState } from 'react'

const slides = [
	{
		id: 1,
		title: 'Широкий ассортимент Одежды',
		description: 'Одежда от известные брендов у нас в каталоге. Только качественные вещи.',
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
	{
		id: 3,
		title: 'Широкий ассортимент Одежды',
		description:
			'Одежда от известные брендов у нас в каталоге. Только качественные вещи.',
		buttonText: 'Перейти в каталог',
		image: 'slider-bg.jpg',
	},
]

const Slider = () => {
	const [currentSlide, setCurrentSlide] = useState(0)
	const sliderRef = useRef<HTMLDivElement>(null)

	const prevSlide = () => {
		if (currentSlide === 0) {
			setCurrentSlide(slides.length - 1)
		} else {
			setCurrentSlide(currentSlide - 1)
		}
	}

	const nextSlide = () => {
		if (currentSlide === slides.length - 1) {
			setCurrentSlide(0)
		} else {
			setCurrentSlide(currentSlide + 1)
		}
	}
	const goToSlide = (index: number) => {
		setCurrentSlide(index)
		if (sliderRef.current) {
			sliderRef.current.scrollTo({
				left: index * sliderRef.current.offsetWidth,
				behavior: 'smooth',
			})
		}
	}

	return (
		<div className='mt-[50px] w-full px-[40px] '>
			<div className='relative w-full  max-w-[1500px] mx-auto overflow-hidden '>
				<div
					className='relative    flex transition-transform duration-300 ease-in-out'
					style={{ transform: `translateX(-${currentSlide * 100}%)` }}
				>
					{slides.map((slide, index) => (
						<div
							key={index}
							className='w-full h-full rounded-2xl max-[700px]:!bg-[-500px] max-[660px]:!bg-[-400px]  max-[630px]:!bg-[-500px] max-[570px]:!bg-[-550px] max-[490px]:!bg-[-600px] max-[390px]:!bg-[-750px] flex-shrink-0 object-left '
							style={{
								backgroundImage: `url(${slide.image})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center ',
								backgroundRepeat: 'no-repeat',
							}}
						>
							<div className='max-w-[610px] pt-[90px] max-[660px]:pt-[40px] pl-[90px] max-[1240px]:pl-[30px] flex-1 space-y-6 md:mr-12'>
								<h2 className='text-[#171819] max-[1100px]:text-[40px] max-[700px]:text-[30px] max-[1100px]:w-[80%] text-[51px] uppercase font-[900] leading-[63px] max-[700px]:leading-[40px] max-[490px]:text-[20px] max-[490px]:leading-[26px]'>
									{slide.title}
								</h2>
								<p className='text-[20px] leading-[32px] max-[1100px]:w-[80%] font-[400] max-w-[535px]'>
									{slide.description}
								</p>

								<button className='bg-[#121214] hover:bg-black/90 hover:shadow-2xl border-[2px] border-black  inline-flex duration-300 text-white font-bold  rounded-[10px] gap-[23px] px-[27px] py-[20px] whitespace-nowrap cursor-pointer max-[400px]:py-[10px] max-[400px]:gap-[5px] max-[400px]:px-[16px] hover:stroke-black '>
									<span>{slide.buttonText}</span>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth='1.5'
										stroke='white'
										className='w-[18px] h-[26px]  '
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='m8.25 4.5 7.5 7.5-7.5 7.5'
										/>
									</svg>
								</button>

								<div className='flex items-center gap-[15px] pb-[50px] pt-[63px]'>
									<button
										onClick={prevSlide}
										className='bg-white cursor-pointer p-2 rounded-full flex items-center  hover:bg-[#F0F2F6] transition duration-300 justify-center w-[67px] h-[67px]'
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
										className='bg-white cursor-pointer     hover:bg-[#F0F2F6]  p-2 rounded-full flex items-center justify-center   transition duration-300 w-[67px] h-[67px]'
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
				<div className='absolute top-1/2 right-12 transform -translate-y-1/2 flex gap-[40px] flex-col space-y-2 z-10 max-[1100px]:hidden'>
					{slides.map((_, index) => (
						<button
							key={index}
							className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 ${
								currentSlide === index
									? 'bg-white scale-140'
									: 'bg-white scale-80'
							}`}
							onClick={() => goToSlide(index)}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default Slider
