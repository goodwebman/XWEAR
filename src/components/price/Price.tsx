import CustomButton from '../CustomButton'

const Price = () => {
	return (
		<section className='px-[20px] '>
			<div className='max-w-[1500px] mx-auto gradient flex relative rounded-xl '>
				<div className=' py-[100px] flex-col  max-[1000px]:py-[50px] px-[90px] max-[900px]:px-[40px] max-[400px]:px-[15px]  '>
					<h1 className='uppercase font-[900] max-[580px]:text-[40px]  text-[52px] leading-[63px] text-white max-[580px]:text-center max-[467px]:text-[35px] max-[420px]:text-[30px] max-[575px]:leading-[40px]'>
						Рассчитать <br /> стоимость
					</h1>
					<p className='font-[500] max-w-[738px] max-[1500px]:max-w-[460px] text-[20px] leading-[32px] text-white pt-[20px] pb-[24px] max-[475px]:text-[16px] max-[580px]:text-center max-[420px]:text-[14px]'>
						Если вам не удалось найти то, что искали, вы всегда можете
						воспользоваться автоматическим расчетом стоимость заказа на
						маркетплейсе Poizon, включая комиссию сервиса и доставку.
					</p>
					<div className='gap-[80px] max-[930px]:gap-[40px] max-[769px]:gap-[14px] pb-[40px] max-[1500px]:pt-[70px] max-[746px]:pt-[10px]'>
						<div className='flex gap-[60px] max-[746px]:flex-col max-[746px]:gap-[30px] '>
							<div className='flex gap-[20px]  items-center '>
								<div className='p-[20px_32px] text-[24px] font-[700] rounded-full inline-block border-white max-[769px]:p-[10px_22px] text-white border-[1px]'>
									1
								</div>
								<div className='font-[400] max-[769px]:text-[16px] text-[18px] leading-[22px] text-white'>
									Подробная, пошаговая <br /> статья о том, как установить{' '}
									<br /> приложение Poizon
								</div>
							</div>
							<div className='flex gap-[20px] items-center'>
								<div className='p-[20px_32px] max-[769px]:p-[10px_22px] text-[24px] font-[700] rounded-full inline-block border-white text-white border-[1px]'>
									2
								</div>
								<div className='font-[400] text-[18px] max-[769px]:text-[16px]  leading-[22px] text-white'>
									Напишите нам в Telegram <br /> или WhatsApp какую вещь <br />{' '}
									хотите купить
								</div>
							</div>
						</div>
					</div>

					<div className='max-[1500px]:text-center max-[1500px]:mt-[20px]'>
						<CustomButton className='max-[441px]:p-4 max-[400px]:text-[15px] ' buttonText='Рассчитать стоимость' />
					</div>
				</div>
				<img
					className='absolute max-[745px]:hidden max-[1040px]:right-[-70px]  right-[30px] top-[-120px] max-[1500px]:w-[40%] max-[840px]:top-[-20px] max-[1200px]:w-[45%] max-[1040px]:w-[50%]'
					src='price-png.png'
					alt=''
				/>
			</div>
		</section>
	)
}

export default Price
