import { accordionItems } from '../../data'
import Accordion from './Accordion'

const Footer = () => {
	return (
		<footer className='bg-[#121214] px-[20px]'>
			{/* MOBILE  */}
			<div className='max-[600px]:flex hidden flex-col py-[30px] justify-center'>
				<button className='mx-auto mb-[20px]'>
					<img src='/logo-footer.png' alt='logo-footer' />
				</button>

				<Accordion items={accordionItems} />

				<div className='flex mx-auto items-center gap-[10px] pt-[21px]'>
					<a href=''>
						<img src='/tg-footer.png' alt='' />
					</a>
					<a href=''>
						<img src='/wu-footer.png' alt='' />
					</a>
					<a href=''>
						<img src='/vk-footer.png' alt='' />
					</a>
				</div>

				<div className='mx-auto text-center mt-[20px] mb-[10px]'>
					<h1 className='font-[900] uppercase text-[16px] text-white pb-[10px]'>
						Подписка на новости
					</h1>
					<p className='text-[18px] text-[#DCDCE0]'>
						Будьте в курсе скидок и новостей
					</p>
				</div>

				<div className='pb-[5px]  flex items-center border-b border-white/40'>
					<input
						type='email'
						placeholder='Ваш email'
						className='bg-transparent flex-grow border-none outline-none text-white placeholder-white/60 py-1 '
					/>
					<button className='rounded-full bg-white w-8 h-8 flex items-center justify-center'>
						<svg
							width='6'
							height='10'
							viewBox='0 0 6 10'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M1 9L5 5L1 1'
								stroke='#121214'
								strokeWidth='1.6'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</button>
				</div>
				<p className='text-[16px] text-white/40 text-center mt-[15px]'>
					Подписываясь на рассылку вы соглашатесь с обработкой персональных
					данных
				</p>

				<div className='text-center mt-[20px]'>
					<p className='font-[500] text-[18px] underline text-white/40'>
						Политика конфиденциальности
					</p>
					<p className='font-[500] text-[18px] underline text-white/40'>
						Пользовательское соглашение
					</p>
				</div>

				<div className='mt-[35px] pb-[36px] mx-auto'>
					<img src='/readycode.png' alt='readycode' />
				</div>
			</div>

			{/* LAPTOP  */}
			<div className='hidden min-[600px]:flex  min-[1100px]:hidden flex-col py-[30px] justify-items-center'>
				<div className='grid grid-cols-3   py-[45px] '>
					<div className='text-[#DCDCE0] flex flex-col gap-[15px]'>
						<h1 className='text-white uppercase font-[900] text-[16px]'>
							<a href=''>Каталог</a>
						</h1>

						<p className='font-[400] text-[15px] leading-[28px]'>
							<a href=''>Одежда</a>
						</p>

						<p className='font-[400] text-[15px] leading-[28px]'>
							<a href=''>Обувь</a>
						</p>

						<p className='font-[400] text-[15px] leading-[28px]'>
							<a href=''>Аксессуары</a>
						</p>

						<p className='font-[400] text-[15px] leading-[28px]'>
							<a href=''>Расчет стоимости</a>
						</p>
					</div>
					<div className='text-white flex flex-col min-[700px]:items-center gap-[15px]'>
						<h1 className='uppercase font-[900] text-[16px]'>
							<a href=''>Информация </a>
						</h1>

						<p className='font-[400] text-[15px] leading-[28px]'>
							<a href=''>Блог</a>
						</p>

						<p className='font-[400] text-[15px] leading-[28px]'>
							<a href=''>Контакты</a>
						</p>

						<p className='font-[400] text-[15px] leading-[28px]'>
							<a href=''>Доставка</a>
						</p>

						<p className='font-[400] text-[15px] leading-[28px]'>
							<a href=''>Оплата</a>
						</p>
						<p className='font-[400] text-[15px] leading-[28px]'>
							<a href=''>FAQ</a>
						</p>
					</div>
					<div className='text-white flex flex-col gap-[15px] ml-auto '>
						<h1 className='uppercase font-[900] text-[16px]'>
							<a href=''>Контакты </a>
						</h1>

						<p className='font-[400] text-[15px] leading-[28px]'>
							<a className='underline ' href=''>
								info@xwear.info
							</a>
						</p>

						<p className='font-[400] text-[19px] leading-[28px]'>
							<a href=''>+7 993 608 38 85</a>
						</p>

						<div className='uppercase font-[900] text-[16px] flex flex-col gap-[10px]'>
							<a href=''>Мессенджеры</a>

							<div className='flex gap-[15px]'>
								<img src='/tg-footer.png' alt='' />
								<img src='/wu-footer.png' alt='' />
							</div>
						</div>

						<p className='uppercase font-[900] text-[16px]  '>
							<a href=''>Наши соц.сети</a>

							<img className='mt-[8px]' src='/vk-footer.png' alt='' />
						</p>
					</div>
				</div>
				<div className='flex items-center gap-[5px] justify-between'>
					<div className=' mt-[20px] mb-[10px]'>
						<h1 className='font-[900] uppercase text-[16px] text-white pb-[10px]'>
							Подписка на новости
						</h1>
						<p className='text-[18px] text-[#DCDCE0]'>
							Будьте в курсе скидок и новостей
						</p>
					</div>

					<div className='pb-[5px]  flex items-center border-b border-white/40'>
						<input
							type='email'
							placeholder='Ваш email'
							className='bg-transparent flex-grow border-none outline-none text-white placeholder-white/60 py-1 '
						/>
						<button className='rounded-full cursor-pointer bg-white w-8 h-8 flex items-center justify-center'>
							<svg
								width='6'
								height='10'
								viewBox='0 0 6 10'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M1 9L5 5L1 1'
									stroke='#121214'
									strokeWidth='1.6'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</button>
					</div>
				</div>

				<p className='text-[12px] text-white/40 '>
					Подписываясь на рассылку вы соглашатесь с обработкой персональных
					данных
				</p>

				<div className='flex justify-between items-center pt-[30px]'>
					<img src='/logo-footer.png' alt='' />
					<div className=' mt-[20px]'>
						<p className='font-[500] text-[14px] underline text-white/40'>
							<a href=''>Политика конфиденциальности</a>
						</p>
						<p className='font-[500] text-[14px] underline text-white/40'>
							<a href=''>Пользовательское соглашение</a>
						</p>
					</div>
					<img src='/readycode.png' alt='' />
				</div>
			</div>

			{/* DESKTOP */}

			<div className=' hidden min-[1100px]:block max-w-[1320px] mx-auto px-[20px]'>
				<div className='grid grid-cols-4 py-[45px] justify-between '>
					<div className='text-[#DCDCE0] flex flex-col justify-between'>
						<h1 className='text-white uppercase font-[900] text-[16px]'>
							<a href=''>Каталог</a>
						</h1>

						<p className='font-[400] text-[15px] leading-[28px]'>
							<a href=''>Одежда</a>
						</p>

						<p className='font-[400] text-[15px] leading-[28px]'>
							<a href=''>Обувь</a>
						</p>

						<p className='font-[400] text-[15px] leading-[28px]'>
							<a href=''>Аксессуары</a>
						</p>

						<p className='font-[400] text-[15px] leading-[28px]'>
							<a href=''>Расчет стоимости</a>
						</p>

						<a href='/' className='pt-[50px] flex '>
							<img className='max-w-[100px]' src='/logo-footer.png' alt='' />
						</a>
					</div>
					<div className='text-[#DCDCE0] flex flex-col  justify-between'>
						<h1 className='text-white uppercase font-[900] text-[16px]'>
							<a href=''>Информация </a>
						</h1>

						<p className='font-[400] text-[15px] leading-[28px]'>
							<a href=''>Блог</a>
						</p>

						<p className='font-[400] text-[15px] leading-[28px]'>
							<a href=''>Контакты</a>
						</p>

						<p className='font-[400] text-[15px] leading-[28px]'>
							<a href=''>Доставка</a>
						</p>

						<p className='font-[400] text-[15px] leading-[28px]'>
							<a href=''>Оплата</a>
						</p>
						<p className='font-[400] text-[15px] leading-[28px]'>
							<a href=''>FAQ</a>
						</p>

						<a href='/' className='pt-[50px]'>
							<img className='max-w-[140px]' src='/readycode.png' alt='' />
						</a>
					</div>
					<div className='text-[#DCDCE0] flex flex-col gap-[15px] '>
						<h1 className='text-white uppercase font-[900] text-[16px]'>
							<a href=''>Контакты </a>
						</h1>

						<p className='font-[400] text-[15px] leading-[28px]'>
							<a className='underline ' href=''>
								info@xwear.info
							</a>
						</p>

						<p className='font-[400] text-[19px] leading-[28px]'>
							<a href=''>+7 993 608 38 85</a>
						</p>

						<div className='uppercase font-[900] text-[16px] flex flex-col gap-[10px]'>
							<a href=''>Мессенджеры</a>

							<div className='flex gap-[15px]'>
								<img src='/tg-footer.png' alt='' />
								<img src='/wu-footer.png' alt='' />
							</div>
						</div>

						<p className='uppercase font-[900] text-[16px]  '>
							<a href=''>Наши соц.сети</a>

							<img className='mt-[8px]' src='/vk-footer.png' alt='' />
						</p>
					</div>
					<div className='text-white flex flex-col gap-[15px] justify-between'>
						<h1 className='text-white uppercase font-[900] text-[16px]'>
							Подписка на новости
						</h1>
						<p className='text-white font-[400] text-[15px] leading-[28px]'>
							Будьте в курсе скидок и новостей
						</p>
						<div className='pb-[5px]  flex items-center border-b border-white/40'>
							<input
								type='email'
								placeholder='Ваш email'
								className='bg-transparent flex-grow border-none outline-none text-white placeholder-white/60 py-1 '
							/>
							<button className='rounded-full cursor-pointer bg-white min-w-8 min-h-8 flex items-center justify-center'>
								<svg
									width='6'
									height='10'
									viewBox='0 0 6 10'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M1 9L5 5L1 1'
										stroke='#121214'
										strokeWidth='1.6'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</button>
						</div>
						<p className='text-[16px] text-white/40 mt-[15px]'>
							Подписываясь на рассылку вы соглашатесь с обработкой персональных
							данных
						</p>

						<div className=' mt-[20px]'>
							<p className='font-[500] text-[14px] underline text-white/40'>
								<a href=''>Политика конфиденциальности</a>
							</p>
							<p className='font-[500] text-[14px] underline text-white/40'>
								<a href=''>Пользовательское соглашение</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
